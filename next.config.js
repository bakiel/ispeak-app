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
        destination: 'https://api.srv1145603.hstgr.cloud/uploads/:path*'
      }
    ]
  }
}

module.exports = nextConfig