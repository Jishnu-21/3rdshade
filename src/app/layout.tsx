import { Inter } from 'next/font/google'
import { defaultMetadata } from './seo-metadata'
import "./globals.css";
import { ThemeProvider } from './context/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://3rdshade.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MarketingAgency",
              "name": "3rdShade",
              "description": "Premier marketing agency specializing in brand strategy, digital marketing, and creative solutions.",
              "url": "https://3rdshade.com",
              "logo": "https://3rdshade.com/images/logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/3rdshade",
                "https://twitter.com/3rdshade",
                "https://www.instagram.com/3rdshade"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Your City",
                "addressRegion": "Your Region",
                "postalCode": "Your Postal Code",
                "addressCountry": "Your Country"
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "YOUR_LATITUDE",
                  "longitude": "YOUR_LONGITUDE"
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Marketing Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Brand Strategy",
                      "description": "Comprehensive brand strategy development and implementation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Marketing",
                      "description": "Full-service digital marketing solutions"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Creative Design",
                      "description": "Professional creative design services"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
