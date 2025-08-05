import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://gfbedvoexpulmmfitxje.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3OTUzMDAsImV4cCI6MjAzODM3MTMwMH0.r8lp0GGrOFnHgdH3q7S2yNzN5LNGqKalnIsvL1pdM1E';

const supabase = createClient(supabaseUrl, supabaseKey);

// Product image mappings - using existing images as placeholders
const productImages = [
  {
    slug: 'paji-plushie-soft-mascot',
    sourcePath: path.join(__dirname, '../public/images/logos/paji-mascot-full.png'),
    targetName: 'paji-plushie.png',
    bucket: 'products'
  },
  {
    slug: 'paji-squishy-stress-toy',
    sourcePath: path.join(__dirname, '../public/images/logos/paji-mascot-front.png'),
    targetName: 'paji-squishy-toy.png',
    bucket: 'products'
  },
  {
    slug: 'ispeak-teacher-coffee-mug-special',
    sourcePath: path.join(__dirname, '../public/images/logos/ispeak-logo-with-text.png'),
    targetName: 'teacher-coffee-mug.png',
    bucket: 'products'
  },
  {
    slug: 'african-languages-wall-posters',
    sourcePath: path.join(__dirname, '../public/images/logos/ispeak-text-logo.png'),
    targetName: 'wall-posters.png',
    bucket: 'products'
  },
  {
    slug: 'african-tales-storybook-collection',
    sourcePath: path.join(__dirname, '../public/images/logos/paji-mascot-full.png'),
    targetName: 'african-tales-books.png',
    bucket: 'products'
  },
  {
    slug: 'african-heritage-pattern-notebook',
    sourcePath: path.join(__dirname, '../public/images/logos/ispeak-logo-with-text.png'),
    targetName: 'african-pattern-notebook.png',
    bucket: 'products'
  },
  {
    slug: 'yoruba-language-flashcards',
    sourcePath: path.join(__dirname, '../public/images/logos/ispeak-text-logo.png'),
    targetName: 'yoruba-flashcards.png',
    bucket: 'products'
  }
];

async function uploadImage(imageData) {
  try {
    // Check if source file exists
    if (!fs.existsSync(imageData.sourcePath)) {
      console.log(`Source file not found: ${imageData.sourcePath}`);
      return null;
    }

    // Read the file
    const fileBuffer = fs.readFileSync(imageData.sourcePath);
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from(imageData.bucket)
      .upload(imageData.targetName, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${imageData.targetName}:`, error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(imageData.bucket)
      .getPublicUrl(imageData.targetName);

    console.log(`✓ Uploaded: ${imageData.targetName}`);
    return {
      slug: imageData.slug,
      url: urlData.publicUrl
    };
  } catch (error) {
    console.error(`Failed to upload ${imageData.targetName}:`, error);
    return null;
  }
}

async function updateProductImages() {
  console.log('Starting upload to Supabase...\n');
  
  const uploadedImages = [];
  
  for (const image of productImages) {
    const result = await uploadImage(image);
    if (result) {
      uploadedImages.push(result);
    }
  }
  
  console.log('\nUpload completed!');
  console.log('\nUpdating product records...');
  
  // Update products with new URLs
  for (const img of uploadedImages) {
    const { error } = await supabase
      .from('products')
      .update({ images: [img.url] })
      .eq('slug', img.slug);
      
    if (error) {
      console.error(`Failed to update product ${img.slug}:`, error);
    } else {
      console.log(`✓ Updated product: ${img.slug}`);
    }
  }
  
  console.log('\nAll done!');
}

updateProductImages();