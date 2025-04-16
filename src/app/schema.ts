export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization", "ProfessionalService"],
  "@id": "https://3rdshade.com",
  "name": "3rdShade Marketing Agency",
  "alternateName": ["3rdShade Digital", "3rdShade Global Marketing"],
  "image": "https://3rdshade.com/logo.png",
  "description": "Leading global marketing agency headquartered in Pune, India. Specializing in international brand strategy, digital marketing, and creative solutions for businesses worldwide. Local expertise with global reach.",
  "url": "https://3rdshade.com",
  "telephone": "+91-8600181189",
  "email": "contact@3rdshade.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Third Floor, WEIKFIELD IT CITI INFO PARK, Platinum Square, 317, Nagar Rd, near Hyatt Regency, Sakore Nagar, Viman Nagar",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "postalCode": "411014",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "18.561203317034142",
    "longitude": "73.91220864651184"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Pune",
      "sameAs": "https://www.wikidata.org/wiki/Q1538"
    },
    {
      "@type": "Country",
      "name": "India",
      "sameAs": "https://www.wikidata.org/wiki/Q668"
    },
    {
      "@type": "Continent",
      "name": "Asia",
      "sameAs": "https://www.wikidata.org/wiki/Q48"
    },
    {
      "@type": "Place",
      "name": "Global"
    }
  ],
  "priceRange": "₹₹₹",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "10:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.linkedin.com/company/3rdshade",
    "https://www.instagram.com/3rdshade.in",
    "https://www.facebook.com/profile.php?id=100095235566896"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "50"
  },
  "hasMap": "https://www.google.com/maps?q=18.561203317034142,73.91220864651184",
  "additionalType": [
    "https://schema.org/MarketingAgency",
    "https://schema.org/AdvertisingAgency",
    "https://schema.org/ProfessionalService",
    "https://schema.org/InternationalBusiness"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "18.561203317034142",
      "longitude": "73.91220864651184"
    },
    "geoRadius": "50000"
  },
  "knowsLanguage": [
    "en",
    "hi",
    "mr"
  ],
  "availableLanguage": [
    "en",
    "hi",
    "mr"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Local SEO Services",
        "areaServed": "Pune Metropolitan Region"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "National Digital Marketing",
        "areaServed": "India"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Global Brand Strategy",
        "areaServed": "Worldwide"
      }
    }
  ]
}
