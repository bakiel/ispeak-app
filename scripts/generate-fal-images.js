import fal from '@fal-ai/client';

// Configure fal.ai (you'll need to add your API key)
fal.config({
  credentials: process.env.FAL_KEY || 'YOUR_FAL_API_KEY_HERE'
});

// Product image prompts
const productPrompts = [
  {
    slug: 'paji-plushie-soft-mascot',
    prompt: 'Product photography of a cute plush toy bird mascot. The plush is soft, cuddly, 12 inches tall, with vibrant yellow body and orange accents. Professional toy product photo on white background with soft shadows. High quality, detailed stitching visible.',
    filename: 'paji-plushie.png'
  },
  {
    slug: 'paji-squishy-stress-toy',
    prompt: 'Product photo of a small squishy stress relief toy in the shape of a cute yellow bird with orange accents. 4 inch foam toy, slow-rising material, shown being gently squeezed. White background, professional lighting.',
    filename: 'paji-squishy.png'
  },
  {
    slug: 'ispeak-teacher-coffee-mug-special',
    prompt: 'Professional product photo of a white ceramic coffee mug with "Teaching African Languages" text and colorful bird mascot design. 11oz mug on wooden desk with coffee, books in background. Warm lighting.',
    filename: 'teacher-mug.png'
  },
  {
    slug: 'african-languages-wall-posters',
    prompt: 'Product mockup of 4 colorful educational wall posters for learning African languages. Show posters partially rolled/unrolled featuring Yoruba, Kiswahili, Twi, and Amharic alphabets with vibrant African patterns. Professional studio lighting.',
    filename: 'wall-posters.png'
  },
  {
    slug: 'african-tales-storybook-collection',
    prompt: 'Product photo of hardcover children\'s storybook collection about African folktales. Show 3-4 colorful books stacked, featuring illustrated African animals and patterns on covers. Title visible: "African Tales". Professional lighting.',
    filename: 'storybooks.png'
  },
  {
    slug: 'african-heritage-pattern-notebook',
    prompt: 'Product mockup of a premium notebook with traditional African patterns (Kente, Mudcloth, Adinkra symbols) on the cover. A5 size, spiral binding, shown at angle with pen beside it on clean desk. Professional product photography.',
    filename: 'pattern-notebook.png'
  },
  {
    slug: 'yoruba-language-flashcards',
    prompt: 'Product photography of educational flashcards spread out showing Yoruba alphabet letters with colorful illustrations. Multiple cards fanned out on wooden table, professional lighting, cards show letters and cultural imagery.',
    filename: 'yoruba-flashcards.png'
  }
];

async function generateImage(productData) {
  try {
    console.log(`Generating image for: ${productData.slug}`);
    
    const result = await fal.subscribe('fal-ai/flux/dev', {
      input: {
        prompt: productData.prompt,
        image_size: 'square',
        num_inference_steps: 28,
        guidance_scale: 7.5,
        num_images: 1,
        enable_safety_checker: true
      }
    });

    if (result.images && result.images.length > 0) {
      console.log(`✓ Generated: ${productData.filename} - ${result.images[0].url}`);
      return {
        slug: productData.slug,
        url: result.images[0].url,
        filename: productData.filename
      };
    }
  } catch (error) {
    console.error(`✗ Failed to generate ${productData.filename}:`, error.message);
    return null;
  }
}

async function generateAllImages() {
  console.log('Starting fal.ai image generation...\n');
  console.log('Note: You need to set FAL_KEY environment variable or update the API key in this script.\n');
  
  const results = [];
  
  for (const prompt of productPrompts) {
    const result = await generateImage(prompt);
    if (result) {
      results.push(result);
    }
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n\nGeneration complete! Here are the image URLs:\n');
  results.forEach(r => {
    console.log(`${r.slug}:`);
    console.log(`  ${r.url}\n`);
  });
  
  return results;
}

// Run the generation
generateAllImages().catch(console.error);