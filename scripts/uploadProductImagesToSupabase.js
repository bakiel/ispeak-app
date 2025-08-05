import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'

// Supabase credentials
const supabaseUrl = 'https://gfbedvoexpulmmfitxje.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzE2MzIsImV4cCI6MjA2MzE0NzYzMn0.57_oqgccLMM-1dhymPVPB2XuR7bnqNrIP_9iqusA21k'

const supabase = createClient(supabaseUrl, supabaseKey)

// Product images from fal.ai CDN
const productImages = {
  'ispeak-tote-bag': 'https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png',
  'paji-plush-toy': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'language-learning-cards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'ispeak-t-shirt': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'african-patterns-notebook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'african-heritage-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'cultural-storybook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-backpack': 'https://v3.fal.media/files/panda/1YHrzV2QKmUgR2jEc12Uy_c90e90cd1af945de91039535f429e821.png',
  'language-poster-set': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'ispeak-cap': 'https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png',
  'paji-t-shirt-kids': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'ispeak-learning-journal': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'yoruba-alphabet-flashcards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'kiswahili-phrase-book': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'teacher-coffee-mug': 'https://v3.fal.media/files/monkey/CQvtXWVgxeSCGkYMaFtvk_1e1945b7a5264855bb03802b01212f8c.png',
  'ispeak-hoodie': 'https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png',
  'twi-counting-poster': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'amharic-writing-workbook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png'
}

async function uploadImageToSupabase(slug, imageUrl) {
  try {
    console.log(`📥 Downloading image for ${slug}...`)
    
    // Download image from CDN
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`)
    }
    
    const buffer = await response.buffer()
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
    
    // Upload to Supabase storage
    const fileName = `products/${slug}.png`
    console.log(`📤 Uploading to Supabase: ${fileName}`)
    
    const { data, error } = await supabase.storage
      .from('products')
      .upload(fileName, arrayBuffer, {
        contentType: 'image/png',
        upsert: true
      })
    
    if (error) {
      console.error(`❌ Error uploading ${slug}:`, error)
      return null
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(fileName)
    
    console.log(`✅ Uploaded ${slug}: ${urlData.publicUrl}`)
    return urlData.publicUrl
    
  } catch (error) {
    console.error(`❌ Error processing ${slug}:`, error.message)
    return null
  }
}

async function uploadAllImages() {
  console.log('🚀 Starting product image upload to Supabase...\n')
  
  // First, create the products bucket if it doesn't exist
  console.log('🗂️ Creating products storage bucket...')
  
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError)
    } else {
      const productsBucket = buckets.find(b => b.name === 'products')
      
      if (!productsBucket) {
        const { data, error } = await supabase.storage.createBucket('products', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
        })
        
        if (error) {
          console.error('❌ Error creating bucket:', error)
          return
        }
        console.log('✅ Created products bucket')
      } else {
        console.log('✅ Products bucket already exists')
      }
    }
  } catch (error) {
    console.error('❌ Bucket setup error:', error)
  }
  
  const uploadedImages = {}
  
  // Upload images one by one
  for (const [slug, url] of Object.entries(productImages)) {
    const supabaseUrl = await uploadImageToSupabase(slug, url)
    if (supabaseUrl) {
      uploadedImages[slug] = supabaseUrl
    }
    // Wait between uploads to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('\n✨ Upload complete!')
  console.log(`✅ Successfully uploaded ${Object.keys(uploadedImages).length} images`)
  
  // Output the new mapping
  console.log('\n📋 New Supabase URLs for productImages.js:\n')
  Object.entries(uploadedImages).forEach(([slug, url]) => {
    console.log(`  '${slug}': '${url}',`)
  })
  
  // Save to a file for easy copying
  const output = `// Product images hosted in Supabase storage
export const productImages = {
${Object.entries(uploadedImages).map(([slug, url]) => `  '${slug}': '${url}'`).join(',\n')}
}

// Helper function to get product image with fallback
export function getProductImage(slug) {
  return productImages[slug] || 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png'
}

// Get multiple images for a product (for gallery view)
export function getProductImages(slug) {
  const mainImage = getProductImage(slug)
  
  // For t-shirts and hoodies, show different views
  if (slug.includes('t-shirt') || slug.includes('hoodie')) {
    return [
      mainImage,
      productImages['ispeak-t-shirt'] || mainImage,
      productImages['ispeak-hoodie'] || mainImage
    ]
  }
  
  // For other products, return variations
  return [mainImage, mainImage, mainImage]
}
`
  
  // Write to file
  await require('fs').promises.writeFile('./supabaseProductImages.js', output)
  console.log('\n📄 Saved to supabaseProductImages.js')
}

// Run the upload
uploadAllImages().catch(console.error)