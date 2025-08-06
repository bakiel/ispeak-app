const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Product to image mapping
const productImageMap = {
  'language-learning-poster-set': 'language-posters-REAL.jpg',
  'ispeak-alphabet-flashcards': 'alphabet-flashcards-REAL.jpg',
  'african-tales-paji-storybook': 'african-tales-storybook-REAL.jpg',
  'kiswahili-phrases-kids': 'kiswahili-phrases-book-REAL.jpg',
  'ispeak-tshirt-adult': 'ispeak-tshirt-adult.jpg',
  'ispeak-navy-hoodie': 'ispeak-hoodie.jpg',
  'ispeak-cap': 'ispeak-cap.jpg',
  'teacher-coffee-mug': 'teacher-coffee-mug-REAL.jpg',
  'ispeak-tote-bag': 'ispeak-tote-bag.jpg',
  'paji-mascot-backpack': 'ispeak-backpack.jpg',
  'paji-water-bottle': 'water-bottle.jpg',
  'african-heritage-notebook': 'african-patterns-notebook-REAL.jpg',
  'paji-plush-toy': 'paji-plush-toy-REAL.jpg',
  'paji-squishy-toy': 'paji-squishy-toy.jpg'
};

async function uploadImage(filename, targetPath) {
  const imagePath = path.join(__dirname, '../ISPEAK_PRODUCT_IMAGES/web-optimized', filename);
  
  // Check if file exists, if not try without -REAL
  let actualPath = imagePath;
  if (!fs.existsSync(actualPath)) {
    const altFilename = filename.replace('-REAL', '');
    actualPath = path.join(__dirname, '../ISPEAK_PRODUCT_IMAGES/web-optimized', altFilename);
    if (!fs.existsSync(actualPath)) {
      console.log(`❌ File not found: ${filename}`);
      return null;
    }
  }

  const form = new FormData();
  const fileStream = fs.createReadStream(actualPath);
  form.append('file', fileStream, filename);
  form.append('path', targetPath);

  try {
    const response = await fetch('http://localhost:3001/api/upload-image', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Uploaded ${filename} → ${targetPath}`);
      return result.url;
    } else {
      const error = await response.json();
      console.error(`❌ Failed to upload ${filename}:`, error.error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('Starting batch upload of product images...\n');
  
  const uploadedImages = {};
  
  for (const [slug, filename] of Object.entries(productImageMap)) {
    const targetPath = `products/${filename}`;
    const url = await uploadImage(filename, targetPath);
    if (url) {
      uploadedImages[slug] = url;
    }
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✅ Upload complete!');
  console.log('Uploaded images:', Object.keys(uploadedImages).length);
  
  // Save URLs to file
  fs.writeFileSync(
    path.join(__dirname, '../ISPEAK_PRODUCT_IMAGES/uploaded-urls.json'),
    JSON.stringify(uploadedImages, null, 2)
  );
  
  console.log('URLs saved to ISPEAK_PRODUCT_IMAGES/uploaded-urls.json');
  
  return uploadedImages;
}

// Run the upload
uploadAllImages().then(urls => {
  console.log('\nYou can now update your products with these URLs!');
  process.exit(0);
}).catch(error => {
  console.error('Upload failed:', error);
  process.exit(1);
});