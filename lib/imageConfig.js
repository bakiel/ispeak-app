// Central configuration for all external image domains
// This ensures we never miss adding a domain to next.config.js

const IMAGE_DOMAINS = [
  'v3.fal.media',              // Fal.ai generated mockups
  'i.ibb.co',                  // ImgBB hosting
  'imgbb.com',                 // ImgBB domain variant
  'ik.imagekit.io',           // ImageKit CDN
  'gfbedvoexpulmmfitxje.supabase.co',  // Supabase storage
  'ispeak-app-prod.vercel.app',        // Vercel deployment
  'images.unsplash.com'                // Unsplash images
];

// Helper function to check if an image URL is from an allowed domain
function isImageDomainAllowed(url) {
  try {
    const imageUrl = new URL(url);
    return IMAGE_DOMAINS.some(domain => imageUrl.hostname === domain || imageUrl.hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

// Helper function to get domain from URL
function getImageDomain(url) {
  try {
    const imageUrl = new URL(url);
    return imageUrl.hostname;
  } catch {
    return null;
  }
}

// Export configuration for next.config.js
const nextImageConfig = {
  domains: IMAGE_DOMAINS
};

module.exports = {
  IMAGE_DOMAINS,
  isImageDomainAllowed,
  getImageDomain,
  nextImageConfig
};