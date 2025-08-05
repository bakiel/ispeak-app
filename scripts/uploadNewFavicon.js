const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadFavicon() {
  try {
    console.log('Uploading new favicon to Supabase...')
    
    const filePath = path.join(__dirname, '..', 'public', 'images', 'new-favicon.png')
    const fileBuffer = fs.readFileSync(filePath)
    
    // Upload to logos bucket
    const fileName = 'ispeak-favicon.png'
    const { data, error } = await supabase.storage
      .from('logos')
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      })
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('logos')
      .getPublicUrl(fileName)
    
    console.log('✓ Favicon uploaded successfully!')
    console.log('Public URL:', publicUrl)
    
    return publicUrl
  } catch (error) {
    console.error('Error uploading favicon:', error)
    process.exit(1)
  }
}

uploadFavicon()