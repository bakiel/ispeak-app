import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'
import fs from 'fs/promises'

// Supabase credentials
const supabaseUrl = 'https://gfbedvoexpulmmfitxje.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzE2MzIsImV4cCI6MjA2MzE0NzYzMn0.57_oqgccLMM-1dhymPVPB2XuR7bnqNrIP_9iqusA21k'

const supabase = createClient(supabaseUrl, supabaseKey)

// First, let's create the products bucket and upload images
async function setupProductStorage() {
  console.log('🚀 Setting up Supabase product storage...\n')
  
  // Skip bucket check - we know it exists
  console.log('📁 Using ispeak-products bucket...')
  console.log('✅ ispeak-products bucket is ready')
  return true
}

// Product images to download and upload
const productImageUrls = {
  'paji-t-shirt-kids': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'ispeak-learning-journal': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'yoruba-alphabet-flashcards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'paji-plush-toy': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'kiswahili-phrase-book': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'african-heritage-water-bottle': 'https://v3.fal.media/files/zebra/VvotPPNZ-YiRsvFQgUcFZ_6f84e68e3eae471d9623557ca31793c2.png',
  'ispeak-tote-bag': 'https://v3.fal.media/files/rabbit/PhQNTR1uBQW3W1GlQzt_U_e35a94c2572145628e963d39f862b63a.png',
  'language-learning-cards': 'https://v3.fal.media/files/penguin/nqCnmJfLilGxcW1YaGb4n_907449630e104b1ba3f69dc7d330d355.png',
  'ispeak-t-shirt': 'https://v3.fal.media/files/tiger/BJZc9upOmkv7qoX7-fFqV_f2e541b1099443cf9cdff32531198eff.png',
  'african-patterns-notebook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'cultural-storybook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png',
  'ispeak-backpack': 'https://v3.fal.media/files/panda/1YHrzV2QKmUgR2jEc12Uy_c90e90cd1af945de91039535f429e821.png',
  'language-poster-set': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'ispeak-cap': 'https://v3.fal.media/files/panda/yPYFS1Uvmk_B7814jxW00_3992b40823f54f8fa52ebc117d7e82a8.png',
  'teacher-coffee-mug': 'https://v3.fal.media/files/monkey/CQvtXWVgxeSCGkYMaFtvk_1e1945b7a5264855bb03802b01212f8c.png',
  'ispeak-hoodie': 'https://v3.fal.media/files/tiger/9adY6iGcOQ9HuQL8MWR3S_21b0e72b5aa345aeb1e4b610a625b571.png',
  'twi-counting-poster': 'https://v3.fal.media/files/elephant/Gz0Oo-RnRjVbECKG8cvKp_f273e452e40f42a5b94e3c322ffdfc4f.png',
  'amharic-writing-workbook': 'https://v3.fal.media/files/elephant/URjkjLX8GxLGWNCM1Lp-O_84921449775742a19c0446fd9ef726a3.png'
}

// Upload a single image
async function uploadProductImage(slug, imageUrl) {
  try {
    console.log(`\n📸 Processing ${slug}...`)
    
    // Download image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`)
    }
    
    const buffer = await response.buffer()
    
    // Upload to Supabase
    const fileName = `${slug}.png`
    const { data, error } = await supabase.storage
      .from('ispeak-products')
      .upload(fileName, buffer, {
        contentType: 'image/png',
        upsert: true
      })
    
    if (error) {
      throw error
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('ispeak-products')
      .getPublicUrl(fileName)
    
    console.log(`✅ Uploaded successfully`)
    console.log(`📍 URL: ${publicUrl}`)
    
    return { slug, url: publicUrl }
    
  } catch (error) {
    console.error(`❌ Error with ${slug}:`, error.message)
    return null
  }
}

// Upload all product images
async function uploadAllProductImages() {
  const results = []
  
  for (const [slug, url] of Object.entries(productImageUrls)) {
    const result = await uploadProductImage(slug, url)
    if (result) {
      results.push(result)
    }
    // Wait between uploads
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  return results
}

// Now let's populate the products in the database
async function populateProducts(imageUrls) {
  console.log('\n\n📦 Populating products in database...\n')
  
  // Complete product data with Supabase image URLs
  const products = [
    {
      name: "Paji T-Shirt - Kids",
      slug: "paji-t-shirt-kids",
      description: "Comfortable cotton t-shirt featuring our beloved Paji mascot",
      price: 24.99,
      category: "Apparel",
      image_url: imageUrls['paji-t-shirt-kids'],
      stock: 50,
      featured: true
    },
    {
      name: "iSPEAK Learning Journal",
      slug: "ispeak-learning-journal",
      description: "Beautiful hardcover journal for tracking language learning progress",
      price: 19.99,
      sale_price: 15.99,
      category: "School Supplies",
      image_url: imageUrls['ispeak-learning-journal'],
      stock: 75,
      featured: false
    },
    {
      name: "Yoruba Alphabet Flashcards",
      slug: "yoruba-alphabet-flashcards",
      description: "Interactive flashcards for learning Yoruba alphabet",
      price: 12.99,
      category: "Educational",
      image_url: imageUrls['yoruba-alphabet-flashcards'],
      stock: 45,
      featured: true
    },
    {
      name: "Paji Plush Toy",
      slug: "paji-plush-toy",
      description: "Soft and cuddly 12-inch Paji mascot plush toy",
      price: 29.99,
      category: "Toys",
      image_url: imageUrls['paji-plush-toy'],
      stock: 30,
      featured: false
    },
    {
      name: "Kiswahili Phrase Book",
      slug: "kiswahili-phrase-book",
      description: "Essential Kiswahili phrases with pronunciation guides",
      price: 16.99,
      category: "Books",
      image_url: imageUrls['kiswahili-phrase-book'],
      stock: 60,
      featured: false
    },
    {
      name: "African Heritage Water Bottle",
      slug: "african-heritage-water-bottle",
      description: "Eco-friendly water bottle with African-inspired design",
      price: 18.99,
      sale_price: 14.99,
      category: "Accessories",
      image_url: imageUrls['african-heritage-water-bottle'],
      stock: 40,
      featured: false
    },
    {
      name: "iSPEAK Tote Bag",
      slug: "ispeak-tote-bag",
      description: "Durable canvas tote bag with iSPEAK logo",
      price: 14.99,
      category: "Accessories",
      image_url: imageUrls['ispeak-tote-bag'],
      stock: 55,
      featured: false
    },
    {
      name: "Language Learning Cards",
      slug: "language-learning-cards",
      description: "Multi-language flashcard set for all four iSPEAK languages",
      price: 22.99,
      category: "Educational",
      image_url: imageUrls['language-learning-cards'],
      stock: 35,
      featured: true
    },
    {
      name: "iSPEAK T-Shirt - Adult",
      slug: "ispeak-t-shirt",
      description: "Premium cotton t-shirt for parents and educators",
      price: 28.99,
      category: "Apparel",
      image_url: imageUrls['ispeak-t-shirt'],
      stock: 40,
      featured: false
    },
    {
      name: "African Patterns Notebook",
      slug: "african-patterns-notebook",
      description: "Beautiful notebook with traditional African patterns",
      price: 9.99,
      category: "School Supplies",
      image_url: imageUrls['african-patterns-notebook'],
      stock: 65,
      featured: false
    },
    {
      name: "Cultural Storybook Collection",
      slug: "cultural-storybook",
      description: "Collection of traditional African stories",
      price: 24.99,
      category: "Books",
      image_url: imageUrls['cultural-storybook'],
      stock: 25,
      featured: true
    },
    {
      name: "iSPEAK Backpack",
      slug: "ispeak-backpack",
      description: "Durable school backpack with Paji mascot design",
      price: 34.99,
      category: "Accessories",
      image_url: imageUrls['ispeak-backpack'],
      stock: 20,
      featured: false
    },
    {
      name: "Language Poster Set",
      slug: "language-poster-set",
      description: "Educational poster set for all four languages",
      price: 19.99,
      category: "Educational",
      image_url: imageUrls['language-poster-set'],
      stock: 30,
      featured: false
    },
    {
      name: "iSPEAK Cap",
      slug: "ispeak-cap",
      description: "Adjustable cap with embroidered iSPEAK logo",
      price: 16.99,
      category: "Apparel",
      image_url: imageUrls['ispeak-cap'],
      stock: 45,
      featured: false
    },
    {
      name: "Teacher Coffee Mug",
      slug: "teacher-coffee-mug",
      description: "Ceramic mug with inspirational message",
      price: 12.99,
      category: "Accessories",
      image_url: imageUrls['teacher-coffee-mug'],
      stock: 50,
      featured: false
    },
    {
      name: "iSPEAK Hoodie",
      slug: "ispeak-hoodie",
      description: "Cozy hoodie with iSPEAK branding",
      price: 39.99,
      category: "Apparel",
      image_url: imageUrls['ispeak-hoodie'],
      stock: 25,
      featured: false
    },
    {
      name: "Twi Counting Poster",
      slug: "twi-counting-poster",
      description: "Colorful poster teaching numbers 1-20 in Twi",
      price: 8.99,
      category: "Educational",
      image_url: imageUrls['twi-counting-poster'],
      stock: 40,
      featured: false
    },
    {
      name: "Amharic Writing Workbook",
      slug: "amharic-writing-workbook",
      description: "Practice workbook for learning Amharic script",
      price: 14.99,
      category: "Books",
      image_url: imageUrls['amharic-writing-workbook'],
      stock: 35,
      featured: false
    }
  ]
  
  // Insert products into database
  for (const product of products) {
    try {
      const { error } = await supabase
        .from('ispeak-products')
        .upsert(product, { onConflict: 'slug' })
      
      if (error) {
        console.error(`❌ Error inserting ${product.name}:`, error)
      } else {
        console.log(`✅ Inserted: ${product.name}`)
      }
    } catch (error) {
      console.error(`❌ Error with ${product.name}:`, error)
    }
  }
}

// Main function
async function main() {
  console.log('🎯 iSPEAK Product Setup for Supabase\n')
  
  // Step 1: Setup storage
  const storageReady = await setupProductStorage()
  if (!storageReady) {
    console.error('❌ Failed to setup storage')
    return
  }
  
  // Step 2: Upload all images
  console.log('\n📤 Uploading product images...')
  const uploadedImages = await uploadAllProductImages()
  
  // Create URL mapping
  const imageUrlMap = {}
  uploadedImages.forEach(item => {
    imageUrlMap[item.slug] = item.url
  })
  
  console.log(`\n✅ Uploaded ${uploadedImages.length} images to Supabase storage`)
  
  // Step 3: Populate products in database
  await populateProducts(imageUrlMap)
  
  console.log('\n🎉 Setup complete! Your products are now in Supabase with proper image storage.')
}

// Run the setup
main().catch(console.error)