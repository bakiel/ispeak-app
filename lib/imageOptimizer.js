// Image optimization utility
export async function optimizeImage(imageUrl, quality = 85) {
  try {
    // Skip CDN optimization for now and return direct URLs
    // The wsrv.nl CDN is returning 404 errors
    return imageUrl
  } catch (error) {
    console.error('Image optimization error:', error)
    return imageUrl // Return original if optimization fails
  }
}

// Generate optimized image URLs for different sizes
export function generateResponsiveUrls(originalUrl) {
  // For now, return the original URL for all sizes
  // The wsrv.nl CDN is returning 404 errors
  const sizes = {
    thumbnail: originalUrl,
    small: originalUrl,
    medium: originalUrl,
    large: originalUrl
  }
  
  return sizes
}