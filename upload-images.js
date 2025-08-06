const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client with service role key
const supabase = createClient(
  'https://gfbedvoexpulmmfitxje.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzU3MTYzMiwiZXhwIjoyMDYzMTQ3NjMyfQ.CvYLjYB7l6E-AMXf2eeMpEU-WRT87zi0kuhZHJ7fqi4'
);

const imageDir = '/Users/mac/Downloads/iSPEAK/ISPEAK_PRODUCT_IMAGES/web-optimized/';

async function uploadImages() {
  try {
    const files = fs.readdirSync(imageDir);
    console.log(`Found ${files.length} files to upload`);

    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const filePath = path.join(imageDir, file);
        const fileBuffer = fs.readFileSync(filePath);
        
        console.log(`Uploading ${file}...`);
        
        const { data, error } = await supabase.storage
          .from('ispeak-products')
          .upload(`products/${file}`, fileBuffer, {
            contentType: `image/${path.extname(file).slice(1).toLowerCase()}`,
            upsert: true
          });

        if (error) {
          console.error(`Error uploading ${file}:`, error);
        } else {
          console.log(`✅ Successfully uploaded: ${file}`);
        }
      }
    }

    console.log('\n🎉 Upload process completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

uploadImages();
