/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for Vercel
  images: {
    domains: [
      'v3.fal.media',
      'i.ibb.co',
      'imgbb.com',
      'ik.imagekit.io'
    ]
  },
}

module.exports = nextConfig