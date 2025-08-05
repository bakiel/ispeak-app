const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

// Fal.ai API configuration
const FAL_API_KEY = 'a8bdfce8-d1ee-41ba-982e-bec7fea67426:657277e8221047b4325dbc1457b5cbf4'
const API_ENDPOINT = 'https://fal.run/fal-ai/gpt-image-1/edit-image'

// Logo URLs from Supabase
const logoUrls = {
  main: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/ispeak-logo-with-text.png',
  mascot: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png',
  text: 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/ispeak-text-dark.png'
}

// E-commerce mockup prompts
const mockupPrompts = [
  {
    name: 'tshirt-white-kid',
    prompt: 'Edit this image to place the logo on the center of a white children\'s t-shirt being worn by a smiling 6-year-old African American girl. Keep the logo colors vibrant and clear, professional product photography style.',
    logoType: 'main'
  },
  {
    name: 'tshirt-folded',
    prompt: 'Edit to add this logo to the front of neatly folded t-shirts in colors yellow, turquoise, and purple, arranged for product display. Maintain logo quality and make it prominent.',
    logoType: 'main'
  },
  {
    name: 'hoodie-boy',
    prompt: 'Edit to put this logo on the chest area of a navy blue hoodie worn by an 8-year-old African American boy who is reading a book. Keep logo proportions realistic.',
    logoType: 'main'
  },
  {
    name: 'backpack-kids',
    prompt: 'Edit to apply this mascot design prominently on the front pocket of a colorful children\'s backpack. Make it large, vibrant and appealing to kids.',
    logoType: 'mascot'
  },
  {
    name: 'notebook-school',
    prompt: 'Edit to place this text logo on the cover of spiral notebooks with school supplies around them, flat lay style. Make it look professional and educational.',
    logoType: 'text'
  },
  {
    name: 'water-bottle',
    prompt: 'Edit to wrap this mascot design around a kids water bottle. Make it colorful, playful and eye-catching.',
    logoType: 'mascot'
  },
  {
    name: 'sticker-sheet',
    prompt: 'Edit to create a sticker sheet with this mascot in multiple poses - jumping, reading, waving, smiling. Die-cut style with white borders.',
    logoType: 'mascot'
  },
  {
    name: 'tote-bag',
    prompt: 'Edit to add this logo to a canvas tote bag being carried by a parent in a natural lifestyle setting. Make it look organic and stylish.',
    logoType: 'main'
  },
  {
    name: 'classroom-poster',
    prompt: 'Edit to place this logo on an educational poster showing African language alphabets in a classroom setting. Make it educational and inspiring.',
    logoType: 'main'
  },
  {
    name: 'coffee-mug',
    prompt: 'Edit to apply this text logo to a white coffee mug on a teacher\'s desk. Professional and clean design.',
    logoType: 'text'
  }
]

async function generateMockupWithFalAI(prompt, logoUrl, outputName) {
  try {
    console.log(`\n🎨 Generating mockup: ${outputName}`)
    console.log(`📷 Using logo: ${logoUrl}`)
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_urls: [logoUrl],
        prompt: prompt,
        guidance_scale: 7.5,
        num_inference_steps: 50,
        strength: 0.8,
        image_size: '1024x1024',
        sync_mode: true
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error (${response.status}): ${errorText}`)
    }

    const result = await response.json()
    
    // Extract the image URL from the response
    const imageUrl = result.images?.[0]?.url || result.image_url || result.url
    
    if (!imageUrl) {
      throw new Error('No image URL in response: ' + JSON.stringify(result))
    }
    
    console.log(`✅ Generated successfully: ${imageUrl}`)
    return imageUrl
    
  } catch (error) {
    console.error(`❌ Error generating mockup ${outputName}:`, error.message)
    throw error
  }
}

async function saveMockupUrls(results) {
  try {
    const outputDir = path.join(__dirname, '..', 'public', 'images', 'mockups')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    const urlsFile = path.join(outputDir, 'falai-mockup-urls.json')
    const urls = {}
    
    results.forEach(result => {
      if (result.success) {
        const mockup = mockupPrompts.find(m => m.name === result.name)
        urls[result.name] = {
          url: result.url,
          prompt: mockup.prompt,
          logoType: logoUrls[mockup.logoType],
          model: 'fal-ai/gpt-image-1',
          generatedAt: new Date().toISOString()
        }
      }
    })
    
    fs.writeFileSync(urlsFile, JSON.stringify(urls, null, 2))
    console.log('\n📁 Saved URLs to:', urlsFile)
  } catch (error) {
    console.error('❌ Error saving mockup URLs:', error.message)
  }
}

async function generateAllMockupsConcurrently() {
  console.log('🚀 Starting concurrent e-commerce mockup generation with fal.ai GPT Image Editor...\n')
  console.log('This model will:')
  console.log('- Edit images to place logos on products naturally')
  console.log('- Maintain logo quality and colors')
  console.log('- Create professional product photography')
  console.log('- Generate all mockups concurrently for speed\n')
  
  // Generate all mockups concurrently
  const promises = mockupPrompts.map(mockup => {
    const logoUrl = logoUrls[mockup.logoType]
    return generateMockupWithFalAI(mockup.prompt, logoUrl, mockup.name)
      .then(url => ({ name: mockup.name, success: true, url }))
      .catch(error => ({ name: mockup.name, success: false, error: error.message }))
  })
  
  console.log(`🎯 Launching ${promises.length} concurrent generations...\n`)
  
  const results = await Promise.all(promises)
  
  // Save the results
  await saveMockupUrls(results)
  
  // Generate summary
  console.log('\n\n=== MOCKUP GENERATION SUMMARY ===')
  console.log(`Total mockups: ${results.length}`)
  console.log(`✅ Successful: ${results.filter(r => r.success).length}`)
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}`)
  
  // List successful mockups
  console.log('\n✅ Generated Mockups:')
  results.filter(r => r.success).forEach(r => {
    console.log(`  ✓ ${r.name}: ${r.url}`)
  })
  
  // List failed mockups
  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed Mockups:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`  ✗ ${r.name}: ${r.error}`)
    })
  }
  
  console.log('\n🎉 Mockup generation complete!')
  console.log('📂 Check public/images/mockups/falai-mockup-urls.json for all URLs')
}

// Run the script
generateAllMockupsConcurrently().catch(console.error)