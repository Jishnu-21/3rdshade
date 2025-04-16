import { NextRequest, NextResponse } from 'next/server'

const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

// Core sections to track
const CORE_SECTIONS = ['/', '/services', '/realities', '/live', '/finance']

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get('days') || '7')

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Prepare PostHog API request
    const body = {
      date_from: startDate.toISOString(),
      date_to: endDate.toISOString(),
      events: [{
        id: '$pageview',
        name: '$pageview',
        type: 'events',
        order: 0
      }]
    }

    // Fetch analytics data from PostHog
    const response = await fetch(`${POSTHOG_HOST}/api/projects/_/insights/trend/?personal_api_key=${POSTHOG_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error('Failed to fetch analytics data')
    }

    const data = await response.json()

    // Process daily views
    const dailyViews = data.result[0].data.map((count: number, index: number) => {
      const date = new Date(startDate)
      date.setDate(date.getDate() + index)
      return {
        date: date.toISOString().split('T')[0],
        views: count
      }
    })

    // Fetch top pages
    const topPagesResponse = await fetch(`${POSTHOG_HOST}/api/projects/_/insights/path/?personal_api_key=${POSTHOG_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...body,
        properties: {
          path: CORE_SECTIONS.map(path => ({ value: path, type: 'exact' }))
        }
      })
    })

    if (!topPagesResponse.ok) {
      throw new Error('Failed to fetch top pages')
    }

    const topPagesData = await topPagesResponse.json()
    const topPages = topPagesData.result
      .filter((item: any) => item.path && CORE_SECTIONS.some(path => item.path.startsWith(path)))
      .map((item: any) => ({
        path: item.path,
        views: item.total_pageviews
      }))
      .sort((a: any, b: any) => b.views - a.views)
      .slice(0, 10)

    // Fetch referrers
    const referrersResponse = await fetch(`${POSTHOG_HOST}/api/projects/_/insights/trend/?personal_api_key=${POSTHOG_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...body,
        breakdown: '$referrer',
        events: [{
          id: '$pageview',
          name: '$pageview',
          type: 'events',
          math: 'total'
        }]
      })
    })

    if (!referrersResponse.ok) {
      throw new Error('Failed to fetch referrers')
    }

    const referrersData = await referrersResponse.json()
    const referrers = referrersData.result
      .filter((item: any) => item.breakdown_value && item.breakdown_value !== '(none)')
      .map((item: any) => ({
        source: item.breakdown_value,
        views: item.data.reduce((sum: number, count: number) => sum + count, 0)
      }))
      .sort((a: any, b: any) => b.views - a.views)
      .slice(0, 10)

    return NextResponse.json({
      dailyViews,
      topPages,
      referrers
    })

  } catch (error) {
    console.error('Analytics API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}