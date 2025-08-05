import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const optimizedImagesDir = path.join(__dirname, '../public/images/products/optimized');

// Map of product slugs to their optimized image files
const imageUpdates = [
  { slug: 'ispeak-kids-tshirt', file: 'ispeak-kids-tshirt.jpg' },
  { slug: 'ispeak-logo-tshirt-set', file: 'ispeak-logo-tshirt-set.jpg' },
  { slug: 'ispeak-navy-hoodie', file: 'ispeak-navy-hoodie.jpg' },
  { slug: 'paji-mascot-backpack', file: 'paji-mascot-backpack.jpg' },
  { slug: 'ispeak-learning-notebook-set', file: 'ispeak-learning-notebook-set.jpg' },
  { slug: 'paji-water-bottle', file: 'paji-water-bottle.jpg' },
  { slug: 'paji-sticker-sheet', file: 'paji-sticker-sheet.jpg' },
  { slug: 'ispeak-canvas-tote-bag', file: 'ispeak-canvas-tote-bag.jpg' },
  { slug: 'african-languages-educational-poster', file: 'african-languages-educational-poster.jpg' }
];

async function uploadAndUpdateImages() {
  console.log('Starting image upload and database update...\n');

  for (const { slug, file } of imageUpdates) {
    const filePath = path.join(optimizedImagesDir, file);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    try {
      // Read the file
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = `products/${slug}.jpg`;

      console.log(`Uploading ${file}...`);

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ispeak-products')
        .upload(fileName, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: true
        });

      if (uploadError) {
        console.error(`Upload error for ${file}:`, uploadError.message);
        continue;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('ispeak-products')
        .getPublicUrl(fileName);

      console.log(`  Uploaded to: ${publicUrl}`);

      // Update the product record with the new image URL
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          images: [publicUrl],
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug);

      if (updateError) {
        console.error(`Database update error for ${slug}:`, updateError.message);
      } else {
        console.log(`  ✅ Updated product: ${slug}\n`);
      }

    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  console.log('\nImage optimization and upload complete!');
}

// Run the upload script
uploadAndUpdateImages();