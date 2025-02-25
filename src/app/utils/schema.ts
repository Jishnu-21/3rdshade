export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '3rdShade',
    url: 'https://3rdshade.com',
    logo: 'https://3rdshade.com/images/logo.png',
    description: 'Premier marketing agency specializing in brand strategy, digital marketing, and creative solutions.',
    sameAs: [
      'https://www.linkedin.com/company/3rdshade',
      'https://twitter.com/3rdshade',
      'https://instagram.com/3rdshade'
    ]
  }
}

export function generateWorkSchema(work: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    description: work.description,
    datePublished: work.publishDate,
    image: work.imageUrl,
    creator: {
      '@type': 'Organization',
      name: '3rdShade'
    },
    publisher: {
      '@type': 'Organization',
      name: '3rdShade',
      logo: {
        '@type': 'ImageObject',
        url: 'https://3rdshade.com/images/logo.png'
      }
    }
  }
}

export function generateServiceSchema(service: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: '3rdShade'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Global'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Marketing Services',
      itemListElement: service.features.map((feature: string) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: feature
        }
      }))
    }
  }
}
