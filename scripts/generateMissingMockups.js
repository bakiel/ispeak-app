// Generate unique product mockups for iSPEAK store using fal.ai GPT Image Editor

const FAL_API_KEY = 'a8bdfce8-d1ee-41ba-982e-bec7fea67426:657277e8221047b4325dbc1457b5cbf4'
const API_ENDPOINT = 'https://fal.run/fal-ai/gpt-image-1/edit-image'

// Base images - we'll use the existing mascot and logo images
const baseImages = {
  mascot: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png',
  logo: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/ispeak-logo-with-text.png',
  textLogo: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/ispeak-text-dark.png'
}

// Products that need unique images
const productsToGenerate = [
  {
    slug: 'paji-plush-toy',
    prompt: 'Create a product mockup of a cute plush toy bird based on the Paji mascot. The plush should be soft, cuddly, 12 inches tall, with vibrant yellow and orange colors. Show it sitting on a white surface with soft shadows. Make it look like a high-quality children\'s toy product photo.',
    baseImage: baseImages.mascot
  },
  {
    slug: 'yoruba-alphabet-flashcards',
    prompt: 'Create a product mockup of educational flashcards spread out showing Yoruba alphabet letters with colorful illustrations. Include the iSPEAK branding. Show multiple cards fanned out on a wooden table. Make it look professional and educational for children.',
    baseImage: baseImages.logo
  },
  {
    slug: 'kiswahili-phrase-book',
    prompt: 'Create a product mockup of a colorful children\'s phrase book for learning Kiswahili. Show the book cover with African patterns, the iSPEAK logo, and title "Kiswahili Phrases for Kids". Include some pages slightly visible. Professional product photography style.',
    baseImage: baseImages.textLogo
  },
  {
    slug: 'african-patterns-notebook',
    prompt: 'Create a product mockup of a beautiful notebook with traditional African patterns (Kente, Mudcloth, Adinkra symbols) on the cover. Include the iSPEAK logo subtly. Show it at an angle with a pen beside it on a clean desk.',
    baseImage: baseImages.logo
  },
  {
    slug: 'cultural-storybook',
    prompt: 'Create a product mockup of a hardcover children\'s storybook collection about African folktales. Show colorful illustrated cover with African animals and the Paji mascot. Title: "African Tales with Paji". Stack of 3-4 books visible.',
    baseImage: baseImages.mascot
  },
  {
    slug: 'language-poster-set',
    prompt: 'Create a product mockup of educational wall posters for learning African languages. Show 3-4 colorful posters partially rolled/unrolled featuring alphabets, numbers, and common phrases with the iSPEAK branding. Bright, engaging design for kids.',
    baseImage: baseImages.logo
  },
  {
    slug: 'teacher-coffee-mug',
    prompt: 'Create a product mockup of a white ceramic coffee mug with African proverb "It takes a village to raise a child" and small Paji mascot icon. Show it filled with coffee on a teacher\'s desk with books in background.',
    baseImage: baseImages.mascot
  },
  {
    slug: 'twi-counting-poster',
    prompt: 'Create a product mockup of a colorful educational poster teaching numbers 1-20 in Twi language. Include playful illustrations for each number, iSPEAK branding, and make it vibrant and engaging for children. Show it hanging on a classroom wall.',
    baseImage: baseImages.logo
  },
  {
    slug: 'amharic-writing-workbook',
    prompt: 'Create a product mockup of a spiral-bound workbook for practicing Amharic script. Show the cover with Ethiopian patterns, Amharic characters, and iSPEAK logo. Include some open pages showing practice lines. Professional educational material look.',
    baseImage: baseImages.textLogo
  },
  {
    slug: 'ispeak-water-bottle',
    prompt: 'Create a product mockup of a kids water bottle (20oz) with the Paji mascot and iSPEAK branding. Stainless steel with colorful African pattern wrap design. Show it on a school desk with healthy snacks.',
    baseImage: baseImages.mascot
  },
  {
    slug: 'language-learning-cards',
    prompt: 'Create a product mockup of a comprehensive flashcard set in a nice box. Show the box open with colorful cards visible featuring words in Yoruba, Kiswahili, Twi, and Amharic. Include illustrations and the iSPEAK logo. Premium educational product feel.',
    baseImage: baseImages.logo
  },
  {
    slug: 'ispeak-cap',
    prompt: 'Create a product mockup of a baseball cap with embroidered iSPEAK logo and small Paji mascot on the side. Show it in navy blue color at multiple angles. Professional apparel product photography.',
    baseImage: baseImages.logo
  }
]

async function generateMockup(product) {
  console.log(`\n🎨 Generating mockup for: ${product.slug}`)
  
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
        num_inference_steps: 50,
        guidance_scale: 7.5,
        strength: 0.85,
        seed: Math.floor(Math.random() * 1000000)
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ API Error for ${product.slug}:`, errorText)
      throw new Error(`API returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log(`✅ Generated successfully!`)
    
    if (data.images && data.images[0]) {
      return {
        slug: product.slug,
        url: data.images[0].url,
        prompt: product.prompt
      }
    } else {
      throw new Error('No image URL in response')
    }
  } catch (error) {
    console.error(`❌ Error generating ${product.slug}:`, error.message)
    return null
  }
}

async function generateAllMockups() {
  console.log('🚀 Starting unique mockup generation for iSPEAK products...')
  console.log(`📦 Generating ${productsToGenerate.length} unique product images`)
  
  const results = []
  
  // Generate in smaller batches to avoid rate limits
  for (let i = 0; i < productsToGenerate.length; i += 3) {
    const batch = productsToGenerate.slice(i, i + 3)
    console.log(`\n📦 Processing batch ${Math.floor(i/3) + 1}/${Math.ceil(productsToGenerate.length/3)}`)
    
    const batchResults = await Promise.all(
      batch.map(product => generateMockup(product))
    )
    
    results.push(...batchResults.filter(r => r !== null))
    
    // Wait between batches to avoid rate limits
    if (i + 3 < productsToGenerate.length) {
      console.log('⏳ Waiting 5 seconds before next batch...')
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }
  
  console.log('\n✨ Generation complete!')
  console.log(`✅ Successfully generated ${results.length} mockups`)
  
  // Output the mapping for productImages.js
  console.log('\n📋 Add these to your productImages.js:\n')
  results.forEach(result => {
    console.log(`  '${result.slug}': '${result.url}',`)
  })
}

// Run the generation
generateAllMockups().catch(console.error)