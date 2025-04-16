export const defaultMetadata = {
  metadataBase: new URL('https://3rdshade.com'),
  title: '3rdShade | Global Marketing Agency in Pune, India',
  description: '3rdShade is a global marketing agency headquartered in Pune, offering international brand strategy and digital solutions. From our Viman Nagar office, we serve clients worldwide with local expertise and global reach.',
  keywords: [
    // Local Keywords
    'marketing agency viman nagar',
    'digital agency weikfield it park',
    'marketing services nagar road',
    'advertising agency pune',
    // Regional Keywords
    'top marketing agency maharashtra',
    'digital marketing pune region',
    'brand strategy western india',
    'creative agency pune metro',
    // National Keywords
    'best marketing agency india',
    'digital transformation company',
    'brand development india',
    'strategic marketing solutions',
    // Global Keywords
    'global marketing agency',
    'international brand strategy',
    'worldwide digital solutions',
    'cross-border marketing services'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://3rdshade.com',
    siteName: '3rdShade - Global Marketing Agency',
    title: '3rdShade | International Marketing Solutions from India',
    description: 'Transform your global presence with 3rdShade. From our Pune headquarters, we deliver world-class marketing strategies and creative solutions for businesses worldwide.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '3rdShade - Global Marketing Agency based in Pune, India'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '3rdShade | Global Marketing Excellence from India',
    description: 'Partner with 3rdShade for world-class marketing solutions. Local expertise meets global vision - transforming businesses worldwide from our Pune headquarters.',
    images: ['/images/twitter-image.jpg']
  },
  alternates: {
    canonical: 'https://3rdshade.com',
    languages: {
      'en-US': 'https://3rdshade.com/en',
      'hi-IN': 'https://3rdshade.com/hi',
      'mr-IN': 'https://3rdshade.com/mr'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
}
