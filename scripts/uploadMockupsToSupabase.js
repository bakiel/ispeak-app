import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Supabase configuration - using service role key for uploads
const supabaseUrl = 'https://gfbedvoexpulmmfitxje.supabase.co'
// Note: In production, use environment variables for sensitive keys
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmVkdm9leHB1bG1tZml0eGplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjgzODc2MywiZXhwIjoyMDQ4NDE0NzYzfQ.kpKoLJ2T6LOEL7v5dIvMp5Zpis4OKG6Q6-qRR1PuJbw'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Load mockup URLs
const mockupData = JSON.parse(
  await fs.readFile(path.join(__dirname, '../public/images/mockups/falai-mockup-urls.json'), 'utf-8')
)

// Product-to-mockup mapping
const productMockupMapping = {
  'ispeak-tote-bag': 'tote-bag',
  'paji-plush-toy': 'sticker-sheet', // Using sticker sheet for plush toy
  'language-learning-cards': 'sticker-sheet',
  'ispeak-t-shirt': 'tshirt-white-kid',
  'african-patterns-notebook': 'notebook-school',
  'ispeak-water-bottle': 'water-bottle',
  'african-heritage-water-bottle': 'water-bottle',
  'cultural-storybook': 'notebook-school',
  'ispeak-backpack': 'backpack-kids',
  'language-poster-set': 'classroom-poster',
  'ispeak-cap': 'tshirt-folded',
  'paji-t-shirt-kids': 'tshirt-white-kid',
  'ispeak-learning-journal': 'notebook-school',
  'yoruba-alphabet-flashcards': 'sticker-sheet',
  'kiswahili-phrase-book': 'notebook-school',
  'teacher-coffee-mug': 'coffee-mug',
  'ispeak-hoodie': 'hoodie-boy',
  'twi-counting-poster': 'classroom-poster',
  'amharic-writing-workbook': 'notebook-school'
}

async function downloadImage(url) {
  console.log(`  Downloading from: ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`)
  }
  const buffer = await response.arrayBuffer()
  return Buffer.from(buffer)
}

async function uploadToSupabase(buffer, filename) {
  console.log(`  Uploading to Supabase: mockups/${filename}`)
  
  // First, check if the bucket exists
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
  
  if (bucketsError) {
    console.error('Error listing buckets:', bucketsError)
    return null
  }
  
  const mockupsBucket = buckets.find(b => b.name === 'mockups')
  
  if (!mockupsBucket) {
    console.log('  Creating mockups bucket...')
    const { data: newBucket, error: createError } = await supabase.storage.createBucket('mockups', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    })
    
    if (createError) {
      console.error('Error creating bucket:', createError)
      return null
    }
  }
  
  // Upload the file
  const { data, error } = await supabase.storage
    .from('mockups')
    .upload(filename, buffer, {
      contentType: 'image/png',
      upsert: true
    })

  if (error) {
    console.error('Error uploading to Supabase:', error)
    return null
  }

  // Get the public URL
  const { data: publicUrl } = supabase.storage
    .from('mockups')
    .getPublicUrl(filename)

  return publicUrl.publicUrl
}

async function main() {
  console.log('Starting mockup upload to Supabase...\n')

  const uploadedMockups = {}
  const failedUploads = []

  for (const [mockupName, mockupInfo] of Object.entries(mockupData)) {
    console.log(`\nProcessing ${mockupName}...`)
    
    try {
      // Download image
      const imageBuffer = await downloadImage(mockupInfo.url)
      console.log(`  ✓ Downloaded image (${(imageBuffer.length / 1024).toFixed(2)} KB)`)

      // Upload to Supabase
      const supabaseUrl = await uploadToSupabase(imageBuffer, `${mockupName}.png`)
      
      if (supabaseUrl) {
        console.log(`  ✓ Uploaded successfully`)
        console.log(`  URL: ${supabaseUrl}`)
        uploadedMockups[mockupName] = {
          ...mockupInfo,
          supabaseUrl: supabaseUrl,
          originalUrl: mockupInfo.url
        }
      } else {
        console.log(`  ✗ Failed to upload to Supabase`)
        failedUploads.push(mockupName)
      }
    } catch (error) {
      console.error(`  ✗ Error processing ${mockupName}:`, error.message)
      failedUploads.push(mockupName)
    }
  }

  // Save the updated mockup data with Supabase URLs
  await fs.writeFile(
    path.join(__dirname, '../public/images/mockups/supabase-mockup-urls.json'),
    JSON.stringify(uploadedMockups, null, 2)
  )

  // Create product image mapping
  const productImageMapping = {}
  
  for (const [productSlug, mockupName] of Object.entries(productMockupMapping)) {
    if (uploadedMockups[mockupName]) {
      productImageMapping[productSlug] = uploadedMockups[mockupName].supabaseUrl
    }
  }

  // Update the productImages.js file with actual mockup URLs
  await fs.writeFile(
    path.join(__dirname, '../lib/productImages.js'),
    `// Auto-generated product image mapping from Supabase-hosted mockups
export const productImages = ${JSON.stringify(productImageMapping, null, 2)}

// Helper function to get product image with fallback
export function getProductImage(slug) {
  return productImages[slug] || 'https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png'
}

// Get multiple images for a product (for gallery view)
export function getProductImages(slug) {
  const mainImage = getProductImage(slug)
  
  // For now, return the same image 3 times for gallery
  // In production, you'd have multiple angles/views
  return [mainImage, mainImage, mainImage]
}

// Mock data for the mockups page
export const mockupGallery = ${JSON.stringify(uploadedMockups, null, 2)}
`
  )

  console.log('\n' + '='.repeat(50))
  console.log('Upload Summary:')
  console.log(`✓ Successfully uploaded: ${Object.keys(uploadedMockups).length} mockups`)
  if (failedUploads.length > 0) {
    console.log(`✗ Failed uploads: ${failedUploads.join(', ')}`)
  }
  console.log('\nCreated files:')
  console.log('- /public/images/mockups/supabase-mockup-urls.json')
  console.log('- /lib/productImages.js')
  console.log('='.repeat(50))
}

main().catch(console.error)