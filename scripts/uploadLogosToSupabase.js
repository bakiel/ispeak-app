const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Create logos bucket if it doesn't exist
async function createLogosBucket() {
  try {
    const { data, error } = await supabase.storage.createBucket('logos', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    })
    
    if (error && !error.message.includes('already exists')) {
      throw error
    }
    
    console.log('✓ Logos bucket ready')
  } catch (error) {
    console.error('Error creating bucket:', error)
    // Continue anyway, bucket might already exist
  }
}

// Logo files to upload
const logos = [
  { file: 'ispeak-logo-with-text.png', name: 'Main logo with text' },
  { file: 'paji-mascot-front.png', name: 'Paji mascot (front-facing)' },
  { file: 'paji-bird-icon.png', name: 'Paji bird icon' },
  { file: 'ispeak-text-dark.png', name: 'iSPEAK text (dark)' },
  { file: 'ispeak-text-white.png', name: 'iSPEAK text (white)' }
]

async function uploadLogos() {
  try {
    console.log('Starting logo upload to Supabase...\n')
    
    // Create bucket first
    await createLogosBucket()
    
    const results = []
    
    for (const logo of logos) {
      const filePath = path.join(__dirname, '..', 'public', 'images', 'logos', logo.file)
      
      if (!fs.existsSync(filePath)) {
        console.error(`✗ File not found: ${logo.file}`)
        continue
      }
      
      try {
        // Read file
        const fileContent = fs.readFileSync(filePath)
        
        // Upload to Supabase
        const { data, error } = await supabase.storage
          .from('logos')
          .upload(logo.file, fileContent, {
            contentType: 'image/png',
            upsert: true
          })
        
        if (error) throw error
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('logos')
          .getPublicUrl(logo.file)
        
        console.log(`✓ Uploaded ${logo.name}: ${publicUrl}`)
        
        results.push({
          name: logo.name,
          file: logo.file,
          url: publicUrl
        })
        
      } catch (err) {
        console.error(`✗ Error uploading ${logo.file}:`, err.message)
      }
    }
    
    // Save URLs to a config file for easy reference
    const logoConfig = {
      mainLogo: results.find(r => r.file === 'ispeak-logo-with-text.png')?.url,
      pajiMascot: results.find(r => r.file === 'paji-mascot-front.png')?.url,
      pajiBirdIcon: results.find(r => r.file === 'paji-bird-icon.png')?.url,
      textLogoDark: results.find(r => r.file === 'ispeak-text-dark.png')?.url,
      textLogoWhite: results.find(r => r.file === 'ispeak-text-white.png')?.url,
    }
    
    // Create a config file
    const configPath = path.join(__dirname, '..', 'lib', 'logoConfig.js')
    const configContent = `// Logo URLs from Supabase storage
export const logoUrls = ${JSON.stringify(logoConfig, null, 2)}

export default logoUrls
`
    
    fs.writeFileSync(configPath, configContent)
    console.log('\n✓ Logo configuration saved to lib/logoConfig.js')
    
    console.log('\n✅ Logo upload complete!')
    
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

// Run the script
uploadLogos()