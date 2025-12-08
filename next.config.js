const { nextImageConfig } = require('./lib/imageConfig');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for Vercel
  images: nextImageConfig,

  // Proxy backend uploads to avoid mixed content (HTTPS -> HTTP)
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://72.61.201.237:3001/uploads/:path*'
      }
    ]
  }
}

module.exports = nextConfig