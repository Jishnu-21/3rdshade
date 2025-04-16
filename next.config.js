/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'images.unsplash.com',
      'files.remapp.ae',
      'www.newprojecthub.site',
      'res.cloudinary.com',
    ],
  },
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.yourdomain.com',
          },
        ],
        destination: 'https://yourdomain.com/:path*',
        permanent: true,
      },
      // Redirect .html pages to clean URLs
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
      // Redirect .php pages to clean URLs
      {
        source: '/:path*.php',
        destination: '/:path*',
        permanent: true,
      },
      // Redirect /index to /
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
