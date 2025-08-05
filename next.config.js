/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize build for Vercel deployment
  experimental: {
    // Disable build trace collection that can cause micromatch recursion
    esmExternals: 'loose',
  },
  // Configure for hybrid deployment (not full static export due to API routes)
  trailingSlash: true,
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
  // Webpack configuration to prevent circular dependencies
  webpack: (config, { dev, isServer }) => {
    // Prevent micromatch recursion by limiting file system operations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    }
    
    // Optimize bundle splitting to prevent large chunks
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    
    return config
  },
  // Static generation configuration
  generateBuildId: async () => {
    // Use a consistent build ID to avoid cache issues
    return 'ispeak-production-build'
  }
}

module.exports = nextConfig