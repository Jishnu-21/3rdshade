import { Inter } from 'next/font/google'
import { defaultMetadata } from './seo-metadata'
import { localBusinessSchema } from './schema'
import "./globals.css";
import { ThemeProvider } from './context/ThemeContext';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from './components/GoogleAnalytics';
import dynamic from 'next/dynamic';
import { Toaster } from 'sonner';
import SocialLinks from './components/SocialMedia/SocialLinks'
import { PostHogProvider } from './Posthog'

const inter = Inter({ subsets: ['latin'] })

const RealitiesBubble = dynamic(() => import('./components/Homepage/RealitiesBubble'), { ssr: false });

export const metadata = {
  ...defaultMetadata,
  verification: {
    google: 'nuZ1viImnGDfxhdnmBPCDzl8kSCjVab9NaRd4SO0viI',
  },
  alternates: {
    canonical: 'https://3rdshade.com'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="description" content={defaultMetadata.description} />
        <meta name="keywords" content={defaultMetadata.keywords.join(', ')} />
        <meta property="og:title" content={defaultMetadata.openGraph.title} />
        <meta property="og:description" content={defaultMetadata.openGraph.description} />
        <meta property="og:url" content={defaultMetadata.openGraph.url} />
        <meta property="og:image" content={defaultMetadata.openGraph.images[0].url} />
        <meta property="og:type" content={defaultMetadata.openGraph.type} />
        <link rel="canonical" href="https://3rdshade.com" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <PostHogProvider>
          <ThemeProvider>
            {children}
            <RealitiesBubble />
            <SocialLinks />
            <Analytics />
            <SpeedInsights />
            <GoogleAnalytics />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
          </PostHogProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
