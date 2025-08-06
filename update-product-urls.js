const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = 'https://gfbedvoexpulmfitxje.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzU3MTYzMiwiZXhwIjoyMDYzMTQ3NjMyfQ.CvYLjYB7l6E-AMXf2eeMpEU-WRT87zi0kuhZHJ7fqi4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping of product names to image files
const productImageMapping = {
  'Yoruba Language Poster': 'yoruba-language-poster.jpg',
  'Igbo Language Poster': 'igbo-language-poster.jpg',
  'Hausa Language Poster': 'hausa-language-poster.jpg',
  'Swahili Language Poster': 'swahili-language-poster.jpg',
  'Zulu Language Poster': 'zulu-language-poster.jpg',
  'Akan Language Poster': 'akan-language-poster.jpg',
  'Amharic Language Poster': 'amharic-language-poster.jpg',
  'Oromo Language Poster': 'oromo-language-poster.jpg',
  'African Languages Bundle (Set of 8)': 'language-posters-REAL.jpg'
};

async function updateProductUrls() {
  try {
    // Load upload results
    const uploadResults = JSON.parse(
      fs.readFileSync('/Users/mac/Downloads/iSPEAK/upload-results.json', 'utf8')
    );
    
    console.log(`Found ${uploadResults.length} uploaded images`);
    
    // Get all products
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('*');
    
    if (fetchError) {
      console.error('Error fetching products:', fetchError);
      return;
    }
    
    console.log(`Found ${products.length} products in database`);
    
    // Update each product with correct image URL
    for (const product of products) {
      const expectedImageFile = productImageMapping[product.name];
      if (!expectedImageFile) {
        console.log(`⚠️  No image mapping found for: ${product.name}`);
        continue;
      }
      
      // Find the uploaded image URL
      const uploadedImage = uploadResults.find(result => 
        result.fileName.toLowerCase() === expectedImageFile.toLowerCase()
      );
      
      if (uploadedImage) {
        const { error: updateError } = await supabase
          .from('products')
          .update({ 
            image_url: uploadedImage.url,
            updated_at: new Date().toISOString()
          })
          .eq('sku', product.sku);
        
        if (updateError) {
          console.error(`❌ Error updating ${product.name}:`, updateError);
        } else {
          console.log(`✅ Updated ${product.name} with image: ${uploadedImage.fileName}`);
        }
      } else {
        console.log(`❌ No uploaded image found for: ${product.name} (expected: ${expectedImageFile})`);
      }
    }
    
    console.log('\n🎉 Product image URLs update complete!');
    
  } catch (error) {
    console.error('Error updating product URLs:', error);
  }
}

updateProductUrls().catch(console.error);
