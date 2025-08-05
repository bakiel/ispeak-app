/** @type {import('next').NextConfig} */
const nextConfig = {
  // Simplified configuration to minimize micromatch triggers
  
  // Disable experimental features that trigger micromatch
  experimental: {
    esmExternals: false,
  },
  
  // Image optimization configuration
  images: {
    unoptimized: true,
    domains: [
      'v3.fal.media',
      'i.ibb.co',
      'imgbb.com',
      'ik.imagekit.io'
    ]
  },
  
  // Minimal webpack configuration
  webpack: (config) => {
    // Simple fallbacks only
    config.resolve.fallback = {
      fs: false,
      path: false,
    }
    
    return config
  },
  
  // Simple build ID
  generateBuildId: () => 'build-' + Date.now()
}

module.exports = nextConfig