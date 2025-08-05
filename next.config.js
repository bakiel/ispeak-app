/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output to bypass build trace collection
  output: 'standalone',
  
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
  
  // Webpack configuration to prevent issues
  webpack: (config, { dev, isServer }) => {
    // Disable problematic optimizations
    config.optimization.usedExports = false;
    config.optimization.sideEffects = false;
    
    // Simple fallbacks
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      crypto: false,
    }
    
    return config
  },
  
  // Simple build ID
  generateBuildId: () => 'build-' + Date.now()
}

module.exports = nextConfig