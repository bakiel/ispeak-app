// Script to generate remaining images for iSPEAK website
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Remaining images to generate
const images = [
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
        type: 'icon',
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

// Main function to generate remaining images
async function generateRemainingImages() {
  console.log('Generating remaining mission page icons...\n');
  
  const results = [];
  
  // Generate images one by one to avoid rate limits
  for (const imageConfig of images) {
    const result = await generateImage(imageConfig);
    if (result) {
      results.push(result);
    }
    
    // Wait 2 seconds between requests to avoid rate limits
    if (images.indexOf(imageConfig) < images.length - 1) {
      console.log('Waiting 2 seconds before next request...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n=== Remaining Images Generation Complete ===');
  console.log(`Generated ${results.length}/${images.length} images`);
  
  // Update manifest
  const baseDir = path.resolve(__dirname, '..');
  const manifestPath = path.join(baseDir, 'public', 'images', 'generated', 'manifest.json');
  
  let existingManifest = [];
  if (fs.existsSync(manifestPath)) {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    existingManifest = JSON.parse(manifestContent);
  }
  
  const updatedManifest = [...existingManifest, ...results];
  fs.writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2));
  
  console.log(`Updated manifest with ${results.length} new images`);
}

// Run the generation
generateRemainingImages().catch(console.error);