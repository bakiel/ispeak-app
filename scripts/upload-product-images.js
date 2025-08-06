const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://gfbedvoexpulmmfitxje.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMTQxNzgsImV4cCI6MjA0Mzc5MDE3OH0.OEo-6jCLYNeBGazF-XnBa1awMd-bxtQfyEamVtIcQGI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product image mapping
const productImages = [
  { file: 'language-posters-REAL.jpg', path: 'language-posters-REAL.jpg' },
  { file: 'alphabet-flashcards-REAL.jpg', path: 'alphabet-flashcards-REAL.jpg' },
  { file: 'african-tales-storybook-REAL.jpg', path: 'african-tales-storybook-REAL.jpg' },
  { file: 'kiswahili-phrases-book-REAL.jpg', path: 'kiswahili-phrases-book-REAL.jpg' },
  { file: 'ispeak-tshirt-adult.jpg', path: 'ispeak-tshirt-adult.jpg' },
  { file: 'paji-tshirt-kids.jpg', path: 'paji-tshirt-kids.jpg' },
  { file: 'ispeak-kids-tshirt.jpg', path: 'ispeak-kids-tshirt.jpg' },
  { file: 'ispeak-hoodie.jpg', path: 'ispeak-hoodie.jpg' },
  { file: 'ispeak-cap.jpg', path: 'ispeak-cap.jpg' },
  { file: 'teacher-coffee-mug-REAL.jpg', path: 'teacher-coffee-mug-REAL.jpg' },
  { file: 'ispeak-tote-bag.jpg', path: 'ispeak-tote-bag.jpg' },
  { file: 'ispeak-backpack.jpg', path: 'ispeak-backpack.jpg' },
  { file: 'water-bottle.jpg', path: 'water-bottle.jpg' },
  { file: 'african-patterns-notebook-REAL.jpg', path: 'african-patterns-notebook-REAL.jpg' },
  { file: 'paji-sticker-sheet.jpg', path: 'paji-sticker-sheet.jpg' },
  { file: 'paji-plush-toy-REAL.jpg', path: 'paji-plush-toy-REAL.jpg' },
  { file: 'paji-squishy-toy.jpg', path: 'paji-squishy-toy.jpg' }
];

async function uploadImage(localPath, storagePath) {
  try {
    const fileData = fs.readFileSync(localPath);
    
    // Upload to storage
    const { data, error } = await supabase.storage
      .from('ispeak-products')
      .upload(storagePath, fileData, {
        contentType: 'image/jpeg',
        upsert: true
      });
    
    if (error) {
      console.error(`Error uploading ${storagePath}:`, error.message);
      return null;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('ispeak-products')
      .getPublicUrl(storagePath);
    
    console.log(`✓ Uploaded ${storagePath}`);
    return publicUrl;
  } catch (err) {
    console.error(`Failed to upload ${storagePath}:`, err.message);
    return null;
  }
}

async function main() {
  const baseDir = '/Users/mac/Downloads/iSPEAK/ISPEAK_PRODUCT_IMAGES/web-optimized';
  
  console.log('Starting image upload to Supabase storage...\n');
  
  for (const img of productImages) {
    const localPath = path.join(baseDir, img.file);
    
    // Check if file exists
    if (!fs.existsSync(localPath)) {
      // Try without -REAL suffix
      const altFile = img.file.replace('-REAL', '');
      const altPath = path.join(baseDir, altFile);
      
      if (fs.existsSync(altPath)) {
        await uploadImage(altPath, img.path);
      } else {
        console.log(`✗ File not found: ${img.file}`);
      }
    } else {
      await uploadImage(localPath, img.path);
    }
  }
  
  console.log('\n✅ Upload complete!');
  console.log('Images are now available at:');
  console.log('https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/ispeak-products/[filename]');
}

main().catch(console.error);