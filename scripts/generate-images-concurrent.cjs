const fs = require('fs');
const path = require('path');
const https = require('https');

// Fal.ai API configuration
const FAL_API_KEY = 'a8bdfce8-d1ee-41ba-982e-bec7fea67426:657277e8221047b4325dbc1457b5cbf4';
const API_ENDPOINT = 'https://fal.run/fal-ai/gpt-image-1/edit-image';
const BASE_IMAGE_URL = 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png';

// Only generate missing images
const missingImages = [
  {
    name: 'ispeak-method-pillars',
    prompt: 'Modern educational infographic with three elegant marble pillars on clouds. First pillar "LISTENING" with golden ear icon, second "SPEAKING" with speech bubble, third "READING" with open book. Navy blue (#2B2D42) pillars, light blue (#E0F7FA) sky. A cute yellow cartoon bird flies between pillars leaving golden trail. Clean, professional design with soft shadows. High quality render.',
    aspect_ratio: '1:1'
  },
  {
    name: 'yoruba-culture-card',
    prompt: 'Vibrant photorealistic composition of authentic Yoruba cultural items: ornate talking drum (dundun) with leather straps, colorful Gele headwrap with intricate patterns, traditional Adire indigo fabric with authentic symbols. Bright yellow (#FFD93D) and coral (#FF8C61) lighting. Small yellow bird mascot wearing miniature Gele. Professional product photography style.',
    aspect_ratio: '1:1'
  },
  {
    name: 'kiswahili-culture-card',
    prompt: 'Beautiful coastal East African scene: traditional wooden dhow boat with white sail on crystal turquoise ocean (#6EC5B8), Mount Kilimanjaro in misty background, authentic Maasai beadwork and patterns in foreground. Golden sunset light, coral (#FF8C61) sky reflections. Small yellow bird on boat. National Geographic photography quality.',
    aspect_ratio: '1:1'
  },
  {
    name: 'twi-culture-card',
    prompt: 'Rich composition of Ghana cultural elements: large Adinkra symbol "Gye Nyame" carved in gold, authentic Kente cloth with traditional geometric patterns, fresh cocoa pods with leaves. Deep navy (#2B2D42) background, golden yellow (#FFD93D) lighting. Small bird wearing Kente strip. Museum quality photography.',
    aspect_ratio: '1:1'
  },
  {
    name: 'amharic-culture-card',
    prompt: 'Elegant Ethiopian cultural scene: traditional coffee ceremony with ornate jebena pot and small cups on woven mat, ancient Ge\'ez script on parchment, fresh injera bread on traditional basket, Ethiopian Orthodox cross. Warm coral (#FF8C61) and teal (#6EC5B8) lighting. Bird with tiny coffee cup. Professional cultural photography.',
    aspect_ratio: '1:1'
  },
  {
    name: 'cultural-preservation-icon',
    prompt: 'Artistic photo of elegant hands gently cradling a glowing glass sculpture of Africa continent. Golden light (#FFD93D) emanates from within, African language symbols float like golden particles. Deep navy (#2B2D42) background. Ethereal, magical atmosphere. High-end photography style.',
    aspect_ratio: '1:1'
  },
  {
    name: 'global-connection-icon',
    prompt: 'Miniature world globe with 5 diverse children figurines standing on different continents, connected by glowing fiber optic ribbons in teal (#6EC5B8) and coral (#FF8C61). Language symbols flow along ribbons. Soft blue (#E0F7FA) studio background. Macro photography, tilt-shift effect.',
    aspect_ratio: '1:1'
  },
  {
    name: 'education-excellence-icon',
    prompt: 'Artistic photo of graduation cap with African patterns launching 5 origami birds in bright yellow (#FFD93D). Cap is navy (#2B2D42) with authentic African textile band. Birds caught mid-flight against cloudy blue (#E0F7FA) sky. High-speed photography, dramatic lighting.',
    aspect_ratio: '1:1'
  }
];

// Download function
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Generate single image
async function generateImage(imageConfig) {
  try {
    console.log(`🎨 Starting: ${imageConfig.name}`);
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: imageConfig.prompt,
        image_urls: [BASE_IMAGE_URL],
        image_size: '1024x1024',
        num_inference_steps: 50,
        guidance_scale: 7.5,
        strength: 0.95,
        seed: Math.floor(Math.random() * 1000000)
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    
    if (!result.images || !result.images[0] || !result.images[0].url) {
      throw new Error('No image URL in response');
    }
    
    const imageUrl = result.images[0].url;
    console.log(`✅ Generated: ${imageConfig.name}`);
    
    // Download the image
    const outputDir = path.join(__dirname, '..', 'public', 'images', 'generated');
    const filepath = path.join(outputDir, `${imageConfig.name}.jpg`);
    await downloadImage(imageUrl, filepath);
    
    return {
      name: imageConfig.name,
      success: true,
      size: fs.statSync(filepath).size
    };
    
  } catch (error) {
    console.error(`❌ Failed: ${imageConfig.name} - ${error.message}`);
    return {
      name: imageConfig.name,
      success: false,
      error: error.message
    };
  }
}

// Main function - run all in parallel
async function generateAllConcurrently() {
  console.log('🚀 Starting concurrent image generation...\n');
  console.log(`📋 Generating ${missingImages.length} images in parallel\n`);
  
  const startTime = Date.now();
  
  // Generate all images concurrently
  const results = await Promise.allSettled(
    missingImages.map(img => generateImage(img))
  );
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);
  
  // Process results
  const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
  const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)).length;
  
  console.log('\n' + '='.repeat(50));
  console.log('✨ GENERATION COMPLETE!');
  console.log('='.repeat(50));
  console.log(`⏱️  Total time: ${duration}s`);
  console.log(`✅ Successful: ${successful}/${missingImages.length}`);
  console.log(`❌ Failed: ${failed}`);
  
  // Show details
  console.log('\n📊 Results:');
  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      const sizeKB = (result.value.size / 1024).toFixed(1);
      console.log(`✅ ${result.value.name} - ${sizeKB}KB`);
    } else {
      const error = result.reason || result.value?.error || 'Unknown error';
      console.log(`❌ ${missingImages[index].name} - ${error}`);
    }
  });
  
  // Optimize images if needed
  if (successful > 0) {
    console.log('\n🔧 Running optimization...');
    const { exec } = require('child_process');
    exec('node scripts/optimize-images.cjs', (error, stdout) => {
      if (!error) {
        console.log(stdout);
      }
    });
  }
}

// Run the generation
generateAllConcurrently().catch(console.error);