import { Metadata } from 'next'

interface LocalizedMetadata {
  title: string
  description: string
  keywords: string[]
}

type SupportedLanguage = 'en' | 'hi' | 'mr'
type CoreSection = 'services' | 'realities' | 'live' | 'finance'

const baseMetadata: Record<SupportedLanguage, LocalizedMetadata> = {
  en: {
    title: '3rdshade | Digital Innovation & Reality Solutions in Pune',
    description: 'Leading digital innovation company in Pune, specializing in AR/VR solutions, live streaming, and financial technology. Serving businesses across Maharashtra and India.',
    keywords: ['digital innovation pune', 'AR VR solutions pune', 'live streaming services pune', 'fintech solutions maharashtra', 'technology company pune']
  },
  hi: {
    title: '3rdshade | पुणे में डिजिटल इनोवेशन और रियलिटी सॉल्यूशंस',
    description: 'पुणे की अग्रणी डिजिटल इनोवेशन कंपनी, जो AR/VR समाधान, लाइव स्ट्रीमिंग और फिनटेक में विशेषज्ञता रखती है। महाराष्ट्र और भारत के व्यवसायों की सेवा में।',
    keywords: ['पुणे डिजिटल इनोवेशन', 'पुणे एआर वीआर सोल्यूशंस', 'पुणे लाइव स्ट्रीमिंग', 'महाराष्ट्र फिनटेक', 'पुणे टेक्नोलॉजी कंपनी']
  },
  mr: {
    title: '3rdshade | पुण्यातील डिजिटल इनोव्हेशन आणि रिअॅलिटी सोल्यूशन्स',
    description: 'पुण्यातील अग्रगण्य डिजिटल इनोव्हेशन कंपनी, AR/VR सोल्यूशन्स, लाइव्ह स्ट्रीमिंग आणि फिनटेक मध्ये विशेषज्ञ. महाराष्ट्र आणि भारतातील व्यवसायांची सेवा.',
    keywords: ['पुणे डिजिटल इनोव्हेशन', 'पुणे एआर व्हीआर', 'पुणे लाइव्ह स्ट्रीमिंग', 'महाराष्ट्र फिनटेक', 'पुणे टेक्नॉलॉजी कंपनी']
  }
}

const CORE_SECTIONS: Record<CoreSection, Record<SupportedLanguage, LocalizedMetadata>> = {
  services: {
    en: {
      title: 'Digital Services',
      description: 'Professional digital services in Pune. Expert solutions for businesses, powered by innovative technology.',
      keywords: ['digital services pune', 'business technology pune', 'IT services maharashtra']
    },
    hi: {
      title: 'डिजिटल सेवाएं',
      description: 'पुणे में पेशेवर डिजिटल सेवाएं। व्यवसायों के लिए विशेषज्ञ समाधान, नवीन तकनीक द्वारा संचालित।',
      keywords: ['पुणे डिजिटल सेवाएं', 'पुणे बिजनेस टेक्नोलॉजी', 'महाराष्ट्र आईटी सेवाएं']
    },
    mr: {
      title: 'डिजिटल सेवा',
      description: 'पुण्यात व्यावसायिक डिजिटल सेवा. व्यवसायांसाठी तज्ञ सोल्यूशन्स, नवीन तंत्रज्ञानाद्वारे समर्थित.',
      keywords: ['पुणे डिजिटल सेवा', 'पुणे बिझनेस टेक्नॉलॉजी', 'महाराष्ट्र आयटी सेवा']
    }
  },
  realities: {
    en: {
      title: 'AR/VR Solutions',
      description: 'Advanced reality solutions in Pune. Transforming businesses with AR/VR technology.',
      keywords: ['AR VR pune', 'virtual reality maharashtra', 'augmented reality solutions pune']
    },
    hi: {
      title: 'AR/VR समाधान',
      description: 'पुणे में उन्नत रियलिटी समाधान। AR/VR तकनीक के साथ व्यवसायों का रूपांतरण।',
      keywords: ['पुणे एआर वीआर', 'महाराष्ट्र वर्चुअल रियलिटी', 'पुणे ऑगमेंटेड रियलिटी']
    },
    mr: {
      title: 'AR/VR सोल्यूशन्स',
      description: 'पुण्यात प्रगत रिअॅलिटी सोल्यूशन्स. AR/VR तंत्रज्ञानासह व्यवसायांचे रूपांतर.',
      keywords: ['पुणे एआर व्हीआर', 'महाराष्ट्र व्हर्च्युअल रिअॅलिटी', 'पुणे ऑगमेंटेड रिअॅलिटी']
    }
  },
  live: {
    en: {
      title: 'Live Streaming',
      description: 'Professional live streaming services in Pune. High-quality broadcasts for events and businesses.',
      keywords: ['live streaming pune', 'event broadcast maharashtra', 'professional streaming pune']
    },
    hi: {
      title: 'लाइव स्ट्रीमिंग',
      description: 'पुणे में पेशेवर लाइव स्ट्रीमिंग सेवाएं। इवेंट्स और व्यवसायों के लिए उच्च गुणवत्ता वाला प्रसारण।',
      keywords: ['पुणे लाइव स्ट्रीमिंग', 'महाराष्ट्र इवेंट प्रसारण', 'पुणे प्रोफेशनल स्ट्रीमिंग']
    },
    mr: {
      title: 'लाइव्ह स्ट्रीमिंग',
      description: 'पुण्यात व्यावसायिक लाइव्ह स्ट्रीमिंग सेवा. कार्यक्रम आणि व्यवसायांसाठी उच्च दर्जाचे प्रक्षेपण.',
      keywords: ['पुणे लाइव्ह स्ट्रीमिंग', 'महाराष्ट्र इव्हेंट प्रक्षेपण', 'पुणे प्रोफेशनल स्ट्रीमिंग']
    }
  },
  finance: {
    en: {
      title: 'Financial Technology',
      description: 'Innovative fintech solutions in Pune. Secure and efficient financial technology services.',
      keywords: ['fintech pune', 'financial technology maharashtra', 'digital finance pune']
    },
    hi: {
      title: 'वित्तीय तकनीक',
      description: 'पुणे में नवीन फिनटेक समाधान। सुरक्षित और कुशल वित्तीय तकनीक सेवाएं।',
      keywords: ['पुणे फिनटेक', 'महाराष्ट्र वित्तीय तकनीक', 'पुणे डिजिटल फाइनेंस']
    },
    mr: {
      title: 'फायनान्शियल टेक्नॉलॉजी',
      description: 'पुण्यात नवीन फिनटेक सोल्यूशन्स. सुरक्षित आणि कार्यक्षम फायनान्शियल टेक्नॉलॉजी सेवा.',
      keywords: ['पुणे फिनटेक', 'महाराष्ट्र फायनान्शियल टेक्नॉलॉजी', 'पुणे डिजिटल फायनान्स']
    }
  }
}

export function generateMetadata(
  path: string = '/',
  lang: SupportedLanguage = 'en'
): Metadata {
  const metadata = baseMetadata[lang]
  const baseUrl = 'https://3rdshade.com'

  // Generate section-specific metadata
  let title = metadata.title
  let description = metadata.description
  let keywords = [...metadata.keywords]

  const sections = path.split('/').filter(Boolean)
  if (sections.length > 0) {
    const section = sections[0] as CoreSection
    if (CORE_SECTIONS[section]) {
      const sectionMeta = CORE_SECTIONS[section][lang]
      title = `${baseMetadata[lang].title} | ${sectionMeta.title}`
      description = sectionMeta.description
      keywords = [...sectionMeta.keywords, ...keywords]
    }
  }

  return {
    title,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        'en': `${baseUrl}${path}`,
        'hi': `${baseUrl}/hi${path}`,
        'mr': `${baseUrl}/mr${path}`
      }
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: '3rdshade',
      locale: lang,
      alternateLocale: lang === 'en' ? ['hi', 'mr'] : ['en'],
      type: 'website',
      images: [{
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: '3rdshade - Digital Innovation in Pune'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.jpg`]
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    },
    other: {
      'geo.region': 'IN-MH',
      'geo.placename': 'Pune',
      'geo.position': '18.5204;73.8567',
      'ICBM': '18.5204, 73.8567'
    }
  }
}
