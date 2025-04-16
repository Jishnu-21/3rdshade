import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/admin/',
          '/*?*',  // Prevent crawling of URLs with query parameters
          '/*.json$',  // Prevent crawling of JSON files
        ]
      }
    ],
    sitemap: 'https://3rdshade.com/sitemap.xml'
  }
}
