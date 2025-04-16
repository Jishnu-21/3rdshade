/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  i18n: {
    locales: ['en', 'hi', 'mr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  async redirects() {
    return [
      // Redirect root to language-specific home based on accept-language
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: '(?<lang>.*)',
          },
        ],
        destination: '/:lang',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Handle language-specific routes
        {
          source: '/hi/:path*',
          destination: '/:path*?lang=hi',
        },
        {
          source: '/mr/:path*',
          destination: '/:path*?lang=mr',
        },
      ],
    }
  },
  // Configure headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
