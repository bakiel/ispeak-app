// Product image mapping using fal.ai-generated mockups
const productImages = {
  'ispeak-tote-bag': 'https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png',
  'paji-plush-toy': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'language-learning-cards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'ispeak-t-shirt': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'african-patterns-notebook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'african-heritage-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'cultural-storybook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-backpack': 'https://v3.fal.media/files/panda/1YHrzV2QKmUgR2jEc12Uy_c90e90cd1af945de91039535f429e821.png',
  'language-poster-set': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'ispeak-cap': 'https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png',
  'paji-t-shirt-kids': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'ispeak-learning-journal': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'yoruba-alphabet-flashcards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'kiswahili-phrase-book': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'teacher-coffee-mug': 'https://v3.fal.media/files/monkey/CQvtXWVgxeSCGkYMaFtvk_1e1945b7a5264855bb03802b01212f8c.png',
  'ispeak-hoodie': 'https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png',
  'twi-counting-poster': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'amharic-writing-workbook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png'
}

// Helper function to get product image with fallback
function getProductImage(slug) {
  return productImages[slug] || 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png'
}

// Get multiple images for a product (for gallery view)
function getProductImages(slug) {
  const mainImage = getProductImage(slug)
  
  // For t-shirts and hoodies, show different views
  if (slug.includes('t-shirt') || slug.includes('hoodie')) {
    return [
      mainImage,
      'https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png', // folded shirts
      'https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png' // hoodie
    ]
  }
  
  // For other products, return variations
  return [mainImage, mainImage, mainImage]
}

// Mock data for the mockups page with all generated mockups
const mockupGallery = {
  "tshirt-white-kid": {
    "url": "https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png",
    "prompt": "White children's t-shirt with iSPEAK logo",
    "product": "Kids T-Shirt"
  },
  "tshirt-folded": {
    "url": "https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png",
    "prompt": "Folded t-shirts in multiple colors",
    "product": "T-Shirt Collection"
  },
  "hoodie-boy": {
    "url": "https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png",
    "prompt": "Navy blue hoodie with iSPEAK logo",
    "product": "Kids Hoodie"
  },
  "backpack-kids": {
    "url": "https://v3.fal.media/files/panda/1YHrzV2QKmUgR2jEc12Uy_c90e90cd1af945de91039535f429e821.png",
    "prompt": "Colorful backpack with Paji mascot",
    "product": "School Backpack"
  },
  "notebook-school": {
    "url": "https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png",
    "prompt": "Spiral notebooks with iSPEAK branding",
    "product": "Learning Journal"
  },
  "water-bottle": {
    "url": "https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png",
    "prompt": "Kids water bottle with Paji design",
    "product": "Water Bottle"
  },
  "sticker-sheet": {
    "url": "https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png",
    "prompt": "Sticker sheet with Paji in various poses",
    "product": "Sticker Pack"
  },
  "tote-bag": {
    "url": "https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png",
    "prompt": "Canvas tote bag with iSPEAK logo",
    "product": "Tote Bag"
  },
  "classroom-poster": {
    "url": "https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png",
    "prompt": "Educational poster for classroom",
    "product": "Language Poster"
  },
  "coffee-mug": {
    "url": "https://v3.fal.media/files/monkey/CQvtXWVgxeSCGkYMaFtvk_1e1945b7a5264855bb03802b01212f8c.png",
    "prompt": "Coffee mug for teachers",
    "product": "Teacher Mug"
  }
}

// Export all functions and objects
export { productImages, getProductImage, getProductImages, mockupGallery }