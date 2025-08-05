#!/usr/bin/env node

/**
 * Script to unify product image management
 * Ensures all products use consistent image URL format
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Mapping of product slugs to their proper image URLs
const PRODUCT_IMAGE_MAP = {
  // iSPEAK Products with fal.ai mockups
  'ispeak-tote-bag': 'https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png',
  'ispeak-canvas-tote-bag': 'https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png',
  'paji-plush-toy': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'paji-plushie-soft-mascot': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'language-learning-cards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'ispeak-t-shirt': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'ispeak-kids-tshirt': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'paji-t-shirt-kids': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'african-patterns-notebook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'african-heritage-pattern-notebook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'paji-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'african-heritage-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'cultural-storybook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'african-tales-storybook-collection': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-backpack': 'https://v3.fal.media/files/panda/1YHrzV2QKmUgR2jEc12Uy_c90e90cd1af945de91039535f429e821.png',
  'paji-mascot-backpack': 'https://v3.fal.media/files/panda/1YHrzV2QKmUgR2jEc12Uy_c90e90cd1af945de91039535f429e821.png',
  'language-poster-set': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'african-languages-wall-posters': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'african-languages-educational-poster': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'ispeak-cap': 'https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png',
  'ispeak-learning-journal': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-learning-notebook-set': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'yoruba-alphabet-flashcards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'yoruba-language-flashcards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'kiswahili-phrase-book': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'kiswahili-phrases-kids-book': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'teacher-coffee-mug': 'https://v3.fal.media/files/monkey/CQvtXWVgxeSCGkYMaFtvk_1e1945b7a5264855bb03802b01212f8c.png',
  'ispeak-teacher-coffee-mug': 'https://v3.fal.media/files/monkey/CQvtXWVgxeSCGkYMaFtvk_1e1945b7a5264855bb03802b01212f8c.png',
  'ispeak-hoodie': 'https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png',
  'ispeak-navy-hoodie': 'https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png',
  'ispeak-logo-tshirt-set': 'https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png',
  'twi-counting-poster': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'amharic-writing-workbook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'paji-sticker-sheet': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'paji-squishy-stress-toy': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
};

// Default fallback image
const FALLBACK_IMAGE = 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png';

async function unifyProductImages() {
  console.log('🔧 Starting product image unification...\n');

  try {
    // Fetch all iSPEAK products
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, slug, images')
      .eq('project_name', 'ispeak')
      .or('slug.like.ispeak-%,slug.like.paji-%,slug.like.african-%,slug.like.%yoruba%,slug.like.%kiswahili%,slug.like.%teacher%,slug.like.%twi%,slug.like.%amharic%');

    if (error) {
      console.error('❌ Error fetching products:', error);
      return;
    }

    console.log(`📦 Found ${products.length} iSPEAK products\n`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const product of products) {
      const currentImage = product.images?.[0];
      const mappedImage = PRODUCT_IMAGE_MAP[product.slug];
      
      // Determine the best image to use
      let newImage;
      
      if (mappedImage) {
        // Use our mapped image
        newImage = mappedImage;
      } else if (currentImage && currentImage.startsWith('https://')) {
        // Keep existing valid URL
        newImage = currentImage;
        console.log(`✓ ${product.name} - keeping existing URL`);
        skippedCount++;
        continue;
      } else {
        // Use fallback
        newImage = FALLBACK_IMAGE;
        console.log(`⚠️  ${product.name} - using fallback image`);
      }

      // Update the product
      const { error: updateError } = await supabase
        .from('products')
        .update({ images: [newImage] })
        .eq('id', product.id);

      if (updateError) {
        console.error(`❌ Failed to update ${product.name}:`, updateError);
      } else {
        console.log(`✅ Updated ${product.name}`);
        updatedCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   - Updated: ${updatedCount} products`);
    console.log(`   - Skipped: ${skippedCount} products (already have valid URLs)`);
    console.log(`   - Total: ${products.length} products`);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Check if all required image domains are in next.config.js
function checkImageDomains() {
  const requiredDomains = [
    'v3.fal.media',
    'gfbedvoexpulmmfitxje.supabase.co'
  ];

  console.log('\n📋 Required image domains for next.config.js:');
  requiredDomains.forEach(domain => {
    console.log(`   - ${domain}`);
  });
}

// Run the script
if (require.main === module) {
  unifyProductImages().then(() => {
    checkImageDomains();
  });
}

module.exports = { PRODUCT_IMAGE_MAP, FALLBACK_IMAGE };