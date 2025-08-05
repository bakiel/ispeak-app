const { nextImageConfig } = require('./lib/imageConfig');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for Vercel
  images: nextImageConfig,
}

module.exports = nextConfig