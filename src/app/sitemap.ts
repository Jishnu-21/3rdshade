import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://3rdshade.com'
  
  // Core sections from SEO strategy
  const coreSections = [
    '/about',
    '/services',
    '/contact-us',
    '/work'
  ]

  // Service categories that actually exist
  const services = [
    'digital-marketing',
    'branding',
    'social-media',
    'consulting',
    'website-development',
    'unnati',
    'shuruwat',
    'seo',
    'realty',
    'ui-ux-design',
    'performance-marketing',
    'e-commerce-listing',
    'social-media-management',
  ]

  // Use a static date for lastModified to prevent unnecessary updates
  const lastModified = '2025-03-25'

  const sitemap: MetadataRoute.Sitemap = []

  // Add core sections in all languages
  coreSections.forEach(section => {
    sitemap.push({
      url: `${baseUrl}${section}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: section === '' ? 1 : 0.9
    })
  })

  // Add service pages with language variants
  services.forEach(service => {
    sitemap.push({
      url: `${baseUrl}/services/${service}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8
    })
  })

  return sitemap
}
