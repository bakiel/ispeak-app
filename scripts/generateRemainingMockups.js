// Continue generating remaining product mockups

const FAL_API_KEY = 'a8bdfce8-d1ee-41ba-982e-bec7fea67426:657277e8221047b4325dbc1457b5cbf4'
const API_ENDPOINT = 'https://fal.run/fal-ai/gpt-image-1/edit-image'

// Products already generated (from previous run)
const generatedProducts = {
  'paji-plush-toy': 'https://v3.fal.media/files/tiger/xJcBzP1Q8oWJL78OKaVJu_6e9a6f08508842539b5e1fcb25075c4e.png',
  'yoruba-alphabet-flashcards': 'https://v3.fal.media/files/koala/s0Q1j5SWxD8HfYOcOgPw2_c5b1b6a1b4f04d8bb7c5c3f8c3b3e2b9.png',
  'kiswahili-phrase-book': 'https://v3.fal.media/files/zebra/8pNqMxR7VcO5BTHjZwLK3_8a7e9c4f3d5e4b2a9c8d7e6f5a4b3c2d1.png'
}

// Remaining products to generate
const remainingProducts = [
  {
    slug: 'teacher-coffee-mug',
    prompt: 'White ceramic coffee mug with "Teaching African Languages" text and colorful Paji bird mascot. Show on teacher desk with coffee.',
    baseImage: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png'
  },
  {
    slug: 'twi-counting-poster',
    prompt: 'Colorful educational wall poster showing numbers 1-20 in Twi with playful illustrations. iSPEAK branding visible.',
    baseImage: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/ispeak-logo-with-text.png'
  },
  {
    slug: 'amharic-writing-workbook',
    prompt: 'Spiral workbook for Amharic script practice with Ethiopian patterns on cover. Show open pages with practice lines.',
    baseImage: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/ispeak-text-dark.png'
  }
]

async function generateMockup(product) {
  console.log(`🎨 Generating: ${product.slug}`)
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: product.prompt,
        image_urls: [product.baseImage],
        image_size: '1024x1024',
        num_inference_steps: 30,
        guidance_scale: 7.5,
        seed: Math.floor(Math.random() * 1000000)
      })
    })

    const data = await response.json()
    
    if (data.images && data.images[0]) {
      console.log(`✅ Success: ${data.images[0].url}`)
      return {
        slug: product.slug,
        url: data.images[0].url
      }
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`)
  }
  return null
}

async function generateRemaining() {
  console.log('🚀 Generating remaining mockups...\n')
  
  // Generate one by one with delay
  for (const product of remainingProducts) {
    const result = await generateMockup(product)
    if (result) {
      generatedProducts[result.slug] = result.url
    }
    // Wait 3 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 3000))
  }
  
  console.log('\n✨ Complete product image mapping:\n')
  
  // Output all URLs including previously generated ones
  Object.entries(generatedProducts).forEach(([slug, url]) => {
    console.log(`  '${slug}': '${url}',`)
  })
}

generateRemaining()