// Test script to upload images using the API endpoint
// Run with: node scripts/test-upload.js

const fs = require('fs');
const path = require('path');

async function testUpload() {
  const imagePath = path.join(__dirname, '../ISPEAK_PRODUCT_IMAGES/web-optimized/alphabet-flashcards-REAL.jpg');
  
  if (!fs.existsSync(imagePath)) {
    console.error('Test image not found:', imagePath);
    return;
  }

  console.log('Testing upload to local API endpoint...');
  
  // Create FormData
  const FormData = require('form-data');
  const form = new FormData();
  
  // Read file
  const fileStream = fs.createReadStream(imagePath);
  form.append('file', fileStream, 'alphabet-flashcards-REAL.jpg');
  form.append('path', 'products/alphabet-flashcards-REAL.jpg');

  try {
    // Test local endpoint
    const response = await fetch('http://localhost:3000/api/upload-image', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload successful!');
      console.log('Image URL:', result.url);
    } else {
      const error = await response.json();
      console.error('❌ Upload failed:', error);
    }
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    console.log('\nMake sure your Next.js dev server is running:');
    console.log('npm run dev');
  }
}

// Run test
testUpload();