// Script to generate images for iSPEAK website using DALL-E
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image generation configuration
const images = [
  {
    name: 'children-counting-swahili',
    prompt: 'Cartoon illustration of 5 diverse African children ages 5-10 sitting in a semi-circle on colorful cushions, counting on their fingers with excited expressions. Speech bubbles show Swahili numbers: "moja" (1), "mbili" (2), "tatu" (3), "nne" (4), "tano" (5). A friendly yellow cartoon bird mascot (simple, round design) is perched on a small blackboard showing the numbers. Background is a soft teal (#6EC5B8) gradient with yellow (#FFD93D) stars and geometric African patterns. Warm, educational, child-friendly illustration style with bright colors and happy atmosphere. Wide banner format 16:9 aspect ratio.',
    size: '1792x1024',
    priority: 1
  },
  {
    name: 'about-hero-educators',
    prompt: 'Warm cartoon illustration of an African female educator in the center teaching 3 children (different ethnicities) via laptop screens arranged around her. Each screen shows a different African language lesson: Yoruba greeting "E kaaro", Kiswahili animal "Simba", and Twi colors "Kɔkɔɔ" (red). The educator has natural African hair, warm smile, wearing professional but colorful African print blouse. Background is soft teal (#6EC5B8) with floating language symbols. Yellow (#FFD93D) accents on screens, coral (#FF8C61) details in clothing. Friendly, professional educational style.',
    size: '1024x1024',
    priority: 2
  },
  {
    name: 'ispeak-method-pillars',
    prompt: 'Educational infographic showing three classical pillars in navy blue (#2B2D42) standing on clouds. First pillar labeled "LISTENING" with golden ear icon, second "SPEAKING" with speech bubble icon, third "READING" with open book icon. A cute yellow cartoon bird mascot flies between the pillars leaving a golden trail. Light blue (#E0F7FA) sky background with soft clouds. Clean, modern educational illustration style with subtle shadows and highlights. Professional but child-friendly design.',
    size: '1024x1024', 
    priority: 3
  },
  {
    name: 'yoruba-culture-card',
    prompt: 'Vibrant cartoon illustration of Yoruba cultural elements arranged artistically: a decorated talking drum (dundun) in the center, colorful Gele headwrap with geometric patterns, Adire indigo textile with traditional symbols flowing in the background. Dominated by bright yellow (#FFD93D) and coral (#FF8C61) colors with navy accents. Small yellow bird mascot wearing tiny Gele. Child-friendly cartoon style with bold outlines and cheerful atmosphere.',
    size: '1024x1024',
    priority: 4
  },
  {
    name: 'kiswahili-culture-card', 
    prompt: 'Coastal East African scene in cartoon style: traditional dhow boat with triangular sail on turquoise ocean (#6EC5B8), Mount Kilimanjaro silhouette in background, Maasai shield and spear crossed decoratively, East African geometric patterns border. Bright yellow (#FFD93D) sun in sky, coral (#FF8C61) details on boat. Small yellow bird mascot on boat mast. Vibrant, educational illustration style.',
    size: '1024x1024',
    priority: 4
  },
  {
    name: 'twi-culture-card',
    prompt: 'Ghana cultural illustration in bright cartoon style: Large Adinkra symbol "Gye Nyame" in center, surrounded by colorful Kente cloth patterns in traditional colors, cocoa pods and leaves decoratively arranged. Navy blue (#2B2D42) and yellow (#FFD93D) dominate with coral accents. Yellow bird mascot wearing tiny Kente strip. Bold, educational cartoon style with cultural authenticity.',
    size: '1024x1024', 
    priority: 4
  },
  {
    name: 'amharic-culture-card',
    prompt: 'Ethiopian cultural cartoon illustration: Traditional coffee ceremony with jebena (coffee pot) and small cups on woven basket, Ge\'ez script characters floating decoratively, injera bread on traditional basket, Ethiopian cross symbol. Warm coral (#FF8C61) and teal (#6EC5B8) color scheme with golden accents. Yellow bird mascot holding tiny coffee cup. Respectful, educational cartoon style.',
    size: '1024x1024',
    priority: 4
  },
  {
    name: 'cultural-preservation-icon',
    prompt: 'Symbolic illustration of two caring hands gently holding a glowing outline of the African continent. Various African language symbols and letters float around like golden fireflies. The continent glows with warm yellow (#FFD93D) light against a deep navy (#2B2D42) circular background. Soft, ethereal style with magical feeling. Icon-style composition, centered and balanced.',
    size: '512x512',
    priority: 5
  },
  {
    name: 'global-connection-icon',
    prompt: 'Cartoon children (5 different ethnicities) standing on different continents of a stylized globe, connected by flowing ribbon paths in teal (#6EC5B8) and coral (#FF8C61). The ribbons have language symbols flowing along them. Light blue (#E0F7FA) background. Joyful, unifying illustration style. Icon format with circular composition.',
    size: '512x512',
    priority: 5
  },
  {
    name: 'education-excellence-icon', 
    prompt: 'Graduation cap with African geometric patterns transforming into 5 yellow (#FFD93D) birds flying upward in formation. The cap is navy (#2B2D42) with colorful African pattern band. Light blue (#E0F7FA) sky background with subtle clouds. Uplifting, aspirational style. Icon format, vertical composition.',
    size: '512x512',
    priority: 5
  }
];

// Function to download image from URL
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Function to generate image using the API
async function generateImage(imageConfig) {
  try {
    console.log(`Generating image: ${imageConfig.name}`);
    
    // Call the local API endpoint
    const response = await fetch('http://localhost:3000/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: imageConfig.prompt,
        type: imageConfig.size === '1792x1024' ? 'banner' : 'illustration',
        uploadToStorage: true
      })
    });

    const data = await response.json();
    
    if (data.success && data.imageUrl) {
      console.log(`✓ Generated: ${imageConfig.name}`);
      console.log(`  URL: ${data.imageUrl}`);
      
      // Create images directory if it doesn't exist
      const baseDir = path.resolve(__dirname, '..');
      const imagesDir = path.join(baseDir, 'public', 'images', 'generated');
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }
      
      // Download the image
      const filepath = path.join(imagesDir, `${imageConfig.name}.jpg`);
      await downloadImage(data.imageUrl, filepath);
      console.log(`✓ Downloaded to: ${filepath}`);
      
      return {
        name: imageConfig.name,
        url: data.imageUrl,
        localPath: `/images/generated/${imageConfig.name}.jpg`,
        storageUrl: data.storageUrl
      };
    } else {
      throw new Error(data.error || 'Failed to generate image');
    }
  } catch (error) {
    console.error(`✗ Failed to generate ${imageConfig.name}:`, error.message);
    return null;
  }
}

// Main function to generate all images
async function generateAllImages() {
  console.log('Starting image generation for iSPEAK website...\n');
  
  // Sort by priority
  const sortedImages = images.sort((a, b) => a.priority - b.priority);
  
  const results = [];
  
  // Generate images one by one to avoid rate limits
  for (const imageConfig of sortedImages) {
    const result = await generateImage(imageConfig);
    if (result) {
      results.push(result);
    }
    
    // Wait 2 seconds between requests to avoid rate limits
    if (sortedImages.indexOf(imageConfig) < sortedImages.length - 1) {
      console.log('Waiting 2 seconds before next request...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Save results to a JSON file
  const baseDir = path.resolve(__dirname, '..');
  const resultsPath = path.join(baseDir, 'public', 'images', 'generated', 'manifest.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n=== Image Generation Complete ===');
  console.log(`Generated ${results.length}/${images.length} images`);
  console.log(`Manifest saved to: ${resultsPath}`);
  
  // Create implementation guide
  const implementationGuide = `
# Image Implementation Guide

Generated ${results.length} images for iSPEAK website.

## Images Generated:

${results.map(r => `### ${r.name}
- Local Path: ${r.localPath}
- Storage URL: ${r.storageUrl}
`).join('\n')}

## Implementation Instructions:

1. **Homepage Second Video Replacement** (children-counting-swahili.jpg)
   - File: /app/page.js
   - Replace lines 218-227 (second video iframe)
   - Use: <img src="/images/generated/children-counting-swahili.jpg" alt="Children counting in Swahili" className="w-full h-full object-cover" />

2. **About Page Hero Image** (about-hero-educators.jpg)
   - File: /app/about/page.js  
   - Replace lines 39-43 (gray placeholder)
   - Use: <img src="/images/generated/about-hero-educators.jpg" alt="Educators teaching African languages" className="w-full h-full object-cover" />

3. **iSPEAK Method Illustration** (ispeak-method-pillars.jpg)
   - File: /app/page.js
   - Replace line 169 (Paji mascot placeholder)
   - Use: <img src="/images/generated/ispeak-method-pillars.jpg" alt="iSPEAK Three Pillars Method" className="w-full h-full object-contain" />

4. **Language Cards** 
   - Update language cards in /app/page.js with cultural images
   - Yoruba: yoruba-culture-card.jpg
   - Kiswahili: kiswahili-culture-card.jpg  
   - Twi: twi-culture-card.jpg
   - Amharic: amharic-culture-card.jpg

5. **Mission Page Icons**
   - Add to /app/mission/page.js core values section
   - Cultural Preservation: cultural-preservation-icon.jpg
   - Global Connection: global-connection-icon.jpg
   - Excellence in Education: education-excellence-icon.jpg
`;

  const guidePath = path.join(baseDir, 'IMPLEMENTATION_GUIDE.md');
  fs.writeFileSync(guidePath, implementationGuide);
  console.log(`Implementation guide saved to: ${guidePath}`);
}

// Run the generation
generateAllImages().catch(console.error);