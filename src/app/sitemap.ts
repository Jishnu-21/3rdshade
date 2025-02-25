import { MetadataRoute } from 'next'

async function fetchAllPaths() {
  // This would be your API call to fetch all work/projects
  // For now using mock data
  const works = [
    { id: 1, slug: 'brand-strategy-campaign-2024' },
    { id: 2, slug: 'digital-marketing-success-story' },
    { id: 3, slug: 'social-media-growth-case' }
  ]
  return works
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://3rdshade.com'
  
  // Fetch all dynamic paths
  const works = await fetchAllPaths()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ]

  // Dynamic work pages
  const workPages = works.map(work => ({
    url: `${baseUrl}/work/${work.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...workPages]
}
