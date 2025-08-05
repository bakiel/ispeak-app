const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const https = require('https')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

// Read the mockup URLs
const mockupData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'images', 'mockups', 'kontext-max-urls.json'), 'utf8'))

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const chunks = []
    https.get(url, (response) => {
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    })
  })
}

async function uploadMockupsToSupabase() {
  console.log('Starting mockup upload to Supabase...\n')
  
  const results = []
  
  for (const [name, mockup] of Object.entries(mockupData)) {
    try {
      console.log(`Downloading ${name}...`)
      const imageBuffer = await downloadImage(mockup.url)
      
      console.log(`Uploading ${name} to Supabase...`)
      const fileName = `mockups/${name}.png`
      
      const { data, error } = await supabase.storage
        .from('logos')
        .upload(fileName, imageBuffer, {
          contentType: 'image/png',
          upsert: true
        })
      
      if (error) throw error
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName)
      
      results.push({
        name,
        originalUrl: mockup.url,
        supabaseUrl: publicUrl,
        success: true
      })
      
      console.log(`✓ ${name} uploaded successfully!`)
      
    } catch (error) {
      console.error(`✗ Error with ${name}:`, error.message)
      results.push({
        name,
        success: false,
        error: error.message
      })
    }
  }
  
  // Save the Supabase URLs
  const supabaseUrls = {}
  results.filter(r => r.success).forEach(r => {
    const original = mockupData[r.name]
    supabaseUrls[r.name] = {
      ...original,
      url: r.supabaseUrl,
      originalUrl: r.originalUrl,
      uploadedAt: new Date().toISOString()
    }
  })
  
  fs.writeFileSync(
    path.join(__dirname, '..', 'public', 'images', 'mockups', 'supabase-mockup-urls.json'),
    JSON.stringify(supabaseUrls, null, 2)
  )
  
  console.log('\n=== UPLOAD SUMMARY ===')
  console.log(`Total mockups: ${results.length}`)
  console.log(`Successful: ${results.filter(r => r.success).length}`)
  console.log(`Failed: ${results.filter(r => !r.success).length}`)
  
  console.log('\n✅ Mockup upload complete!')
  console.log('Check public/images/mockups/supabase-mockup-urls.json for permanent URLs')
}

uploadMockupsToSupabase().catch(console.error)