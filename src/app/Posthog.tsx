'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

// Core sections based on SEO structure
const CORE_SECTIONS = {
  home: '/',
  services: '/services',
  realty: '/services/realty',
  live: '/live',
  finance: '/finance'
} as const

// Language variants
const LANGUAGES = {
  en: '',
  hi: '/hi',
  mr: '/mr'
} as const

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || !process.env.NEXT_PUBLIC_POSTHOG_HOST) {
      console.warn('PostHog configuration missing')
      return
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // We'll capture pageviews manually
      persistence: 'localStorage',
      autocapture: true,
      capture_pageleave: true,
      cross_subdomain_cookie: true,
      disable_session_recording: true // Use disable_session_recording instead of enable_recording
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (!pathname || !posthog) return

    // Determine language from path
    let language = 'en'
    if (pathname.startsWith('/hi/')) language = 'hi'
    if (pathname.startsWith('/mr/')) language = 'mr'

    // Determine section from path
    let section = 'other'
    for (const [name, path] of Object.entries(CORE_SECTIONS)) {
      if (pathname === path || pathname === `/hi${path}` || pathname === `/mr${path}`) {
        section = name
        break
      }
    }

    // Get referrer information
    const referrer = document.referrer
    let referrerDomain = 'direct'
    try {
      if (referrer) {
        const url = new URL(referrer)
        referrerDomain = url.hostname
      }
    } catch (error) {
      console.error('Error parsing referrer:', error)
    }

    // Track pageview with language and section properties
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      $referrer: referrer,
      language,
      section,
      referrer_domain: referrerDomain,
      search_params: searchParams?.toString() || '',
      pathname
    })
  }, [pathname, searchParams, posthog])

  return null
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}