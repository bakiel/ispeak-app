const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Your deployed API endpoint
const API_BASE = 'https://ispeak-language-app.vercel.app';
const IMAGES_DIR = '/Users/mac/Downloads/iSPEAK/ISPEAK_PRODUCT_IMAGES/web-optimized';

async function uploadImage(imagePath) {
  try {
    const fileName = path.basename(imagePath);
    console.log(`Uploading ${fileName}...`);
    
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));
    
    const response = await fetch(`${API_BASE}/api/upload-image`, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Uploaded: ${fileName} -> ${result.url}`);
      return result;
    } else {
      const error = await response.text();
      console.log(`❌ Failed: ${fileName} - ${error}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Error uploading ${path.basename(imagePath)}: ${error.message}`);
    return null;
  }
}

async function uploadAllImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log(`❌ Images directory not found: ${IMAGES_DIR}`);
    return;
  }
  
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => path.join(IMAGES_DIR, file));
  
  console.log(`Found ${files.length} images to upload`);
  
  const results = [];
  for (const file of files) {
    const result = await uploadImage(file);
    if (result) {
      results.push(result);
    }
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n✅ Upload complete! ${results.length}/${files.length} images uploaded`);
  
  // Save results for reference
  fs.writeFileSync(
    '/Users/mac/Downloads/iSPEAK/upload-results.json',
    JSON.stringify(results, null, 2)
  );
  console.log('📄 Results saved to upload-results.json');
}

uploadAllImages().catch(console.error);
