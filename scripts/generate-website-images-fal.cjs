const fs = require('fs')
const path = require('path')
const https = require('https')

// Fal.ai API configuration with GPT-Image-1
const FAL_API_KEY = 'a8bdfce8-d1ee-41ba-982e-bec7fea67426:657277e8221047b4325dbc1457b5cbf4'
const API_ENDPOINT = 'https://fal.run/fal-ai/gpt-image-1/edit-image'

// Website images to generate
const websiteImages = [
  {
    name: 'children-counting-swahili',
    prompt: 'High quality illustration of 5 diverse African children ages 5-10 sitting in a colorful classroom setting, counting on their fingers with joyful expressions. Speech bubbles show Swahili numbers: "moja" (1), "mbili" (2), "tatu" (3), "nne" (4), "tano" (5). A friendly yellow cartoon bird mascot (round, simple design) is teaching at a small blackboard. Bright teal (#6EC5B8) and yellow (#FFD93D) color scheme. Warm, educational, child-friendly style. Photorealistic quality, wide banner format.',
    aspect_ratio: '16:9',
    priority: 1
  },
  {
    name: 'about-hero-educators',
    prompt: 'Professional photograph of an African female educator teaching 3 children via laptop screens in a modern home office. Each screen shows different African language lessons with Yoruba, Kiswahili, and Twi text clearly visible. Educator has natural African hair, warm smile, wearing colorful African print. Soft teal (#6EC5B8) background wall, yellow (#FFD93D) accents in decor. Photorealistic, warm lighting, educational atmosphere.',
    aspect_ratio: '1:1',
    priority: 2
  },
  {
    name: 'ispeak-method-pillars',
    prompt: 'Modern educational infographic with three elegant marble pillars on clouds. First pillar "LISTENING" with golden ear icon, second "SPEAKING" with speech bubble, third "READING" with open book. Navy blue (#2B2D42) pillars, light blue (#E0F7FA) sky. A cute yellow cartoon bird flies between pillars leaving golden trail. Clean, professional design with soft shadows. High quality render.',
    aspect_ratio: '1:1',
    priority: 3
  },
  {
    name: 'yoruba-culture-card',
    prompt: 'Vibrant photorealistic composition of authentic Yoruba cultural items: ornate talking drum (dundun) with leather straps, colorful Gele headwrap with intricate patterns, traditional Adire indigo fabric with authentic symbols. Bright yellow (#FFD93D) and coral (#FF8C61) lighting. Small yellow bird mascot wearing miniature Gele. Professional product photography style.',
    aspect_ratio: '1:1',
    priority: 4
  },
  {
    name: 'kiswahili-culture-card',
    prompt: 'Beautiful coastal East African scene: traditional wooden dhow boat with white sail on crystal turquoise ocean (#6EC5B8), Mount Kilimanjaro in misty background, authentic Maasai beadwork and patterns in foreground. Golden sunset light, coral (#FF8C61) sky reflections. Small yellow bird on boat. National Geographic photography quality.',
    aspect_ratio: '1:1',
    priority: 4
  },
  {
    name: 'twi-culture-card',
    prompt: 'Rich composition of Ghana cultural elements: large Adinkra symbol "Gye Nyame" carved in gold, authentic Kente cloth with traditional geometric patterns, fresh cocoa pods with leaves. Deep navy (#2B2D42) background, golden yellow (#FFD93D) lighting. Small bird wearing Kente strip. Museum quality photography.',
    aspect_ratio: '1:1',
    priority: 4
  },
  {
    name: 'amharic-culture-card',
    prompt: 'Elegant Ethiopian cultural scene: traditional coffee ceremony with ornate jebena pot and small cups on woven mat, ancient Ge\'ez script on parchment, fresh injera bread on traditional basket, Ethiopian Orthodox cross. Warm coral (#FF8C61) and teal (#6EC5B8) lighting. Bird with tiny coffee cup. Professional cultural photography.',
    aspect_ratio: '1:1',
    priority: 4
  },
  {
    name: 'cultural-preservation-icon',
    prompt: 'Artistic photo of elegant hands gently cradling a glowing glass sculpture of Africa continent. Golden light (#FFD93D) emanates from within, African language symbols float like golden particles. Deep navy (#2B2D42) background. Ethereal, magical atmosphere. High-end photography style.',
    aspect_ratio: '1:1',
    priority: 5
  },
  {
    name: 'global-connection-icon',
    prompt: 'Miniature world globe with 5 diverse children figurines standing on different continents, connected by glowing fiber optic ribbons in teal (#6EC5B8) and coral (#FF8C61). Language symbols flow along ribbons. Soft blue (#E0F7FA) studio background. Macro photography, tilt-shift effect.',
    aspect_ratio: '1:1',
    priority: 5
  },
  {
    name: 'education-excellence-icon',
    prompt: 'Artistic photo of graduation cap with African patterns launching 5 origami birds in bright yellow (#FFD93D). Cap is navy (#2B2D42) with authentic African textile band. Birds caught mid-flight against cloudy blue (#E0F7FA) sky. High-speed photography, dramatic lighting.',
    aspect_ratio: '1:1',
    priority: 5
  }
]

// Function to download image
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve(filepath)
      })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {})
      reject(err)
    })
  })
}

// Generate image using fal.ai GPT-Image-1
async function generateImage(imageConfig) {
  try {
    console.log(`\n🎨 Generating: ${imageConfig.name}`)
    console.log(`📝 Aspect ratio: ${imageConfig.aspect_ratio}`)
    
    // Use a base image for GPT-Image-1 edit endpoint
    const baseImageUrl = 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png'
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: imageConfig.prompt,
        image_urls: [baseImageUrl],
        image_size: imageConfig.aspect_ratio === '16:9' ? '1536x1024' : '1024x1024',
        num_inference_steps: 50,
        guidance_scale: 7.5,
        strength: 0.95,
        seed: Math.floor(Math.random() * 1000000)
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error (${response.status}): ${errorText}`)
    }

    const result = await response.json()
    
    // Handle the response - GPT-Image-1 returns images array
    if (!result.images || !result.images[0] || !result.images[0].url) {
      console.log('Response:', JSON.stringify(result, null, 2))
      throw new Error('No image URL in response')
    }
    
    const imageUrl = result.images[0].url

    console.log(`✅ Generated successfully!`)
    console.log(`🔗 URL: ${imageUrl}`)
    
    // Create directory if needed
    const outputDir = path.join(__dirname, '..', 'public', 'images', 'generated')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Download the image
    const filepath = path.join(outputDir, `${imageConfig.name}.jpg`)
    await downloadImage(imageUrl, filepath)
    console.log(`💾 Saved to: ${filepath}`)
    
    return {
      name: imageConfig.name,
      url: imageUrl,
      localPath: `/images/generated/${imageConfig.name}.jpg`,
      aspect_ratio: imageConfig.aspect_ratio
    }
    
  } catch (error) {
    console.error(`❌ Failed to generate ${imageConfig.name}:`, error.message)
    return null
  }
}

// Main function
async function generateAllImages() {
  console.log('🚀 Starting website image generation with fal.ai GPT-Image-1...\n')
  console.log('📋 Total images to generate:', websiteImages.length)
  
  // Sort by priority
  const sorted = websiteImages.sort((a, b) => a.priority - b.priority)
  
  const results = []
  const manifest = []
  
  for (const imageConfig of sorted) {
    const result = await generateImage(imageConfig)
    
    if (result) {
      results.push(result)
      manifest.push({
        name: result.name,
        path: result.localPath,
        aspectRatio: result.aspect_ratio,
        generated: new Date().toISOString()
      })
    }
    
    // Wait between requests to avoid rate limiting
    if (sorted.indexOf(imageConfig) < sorted.length - 1) {
      console.log('\n⏳ Waiting 3 seconds before next request...')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }
  
  // Save manifest
  const manifestPath = path.join(__dirname, '..', 'public', 'images', 'generated', 'manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ GENERATION COMPLETE!')
  console.log('='.repeat(50))
  console.log(`📊 Generated: ${results.length}/${websiteImages.length} images`)
  console.log(`📁 Location: /public/images/generated/`)
  console.log(`📄 Manifest: ${manifestPath}`)
  
  // Create implementation instructions
  const instructions = `
# Image Implementation Instructions

## Generated Images (${results.length})

${results.map(r => `- ${r.name}.jpg (${r.aspect_ratio})`).join('\n')}

## Quick Implementation:

1. Homepage - Replace second video:
   \`/app/page.js\` line ~219
   \`\`\`jsx
   <img src="/images/generated/children-counting-swahili.jpg" 
        alt="Children learning to count in Kiswahili" 
        className="w-full h-full object-cover" />
   \`\`\`

2. About page - Replace placeholder:
   \`/app/about/page.js\` line ~40
   \`\`\`jsx
   <img src="/images/generated/about-hero-educators.jpg" 
        alt="iSPEAK educators teaching online" 
        className="w-full h-full object-cover" />
   \`\`\`

3. Homepage - iSPEAK Method:
   \`/app/page.js\` line ~169
   \`\`\`jsx
   <img src="/images/generated/ispeak-method-pillars.jpg" 
        alt="iSPEAK Three Pillars Method" 
        className="w-full max-w-md h-auto rounded-lg shadow-lg" />
   \`\`\`

4. Language cards - Add cultural images to each card
`

  const instructionsPath = path.join(__dirname, '..', 'GPT_IMAGE_IMPLEMENTATION.md')
  fs.writeFileSync(instructionsPath, instructions)
  console.log(`\n📝 Implementation guide: ${instructionsPath}`)
}

// Run generation
generateAllImages().catch(console.error)