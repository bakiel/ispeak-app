const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')
require('dotenv').config({ path: '.env.local' })

const execAsync = promisify(exec)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Create temporary directory for downloads
const tempDir = path.join(process.cwd(), 'temp-blog-images')
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true })
}

// Function to download image using curl
async function downloadImage(url, filename) {
  const filePath = path.join(tempDir, filename)
  
  try {
    // Use curl to download the image
    const command = `curl -L -o "${filePath}" "${url}"`
    await execAsync(command)
    
    // Check if file was downloaded successfully
    const stats = fs.statSync(filePath)
    if (stats.size > 1000) { // Should be at least 1KB
      console.log(`✓ Downloaded: ${filename} (${Math.round(stats.size / 1024)}KB)`)
      return filePath
    } else {
      throw new Error(`File too small: ${stats.size} bytes`)
    }
  } catch (error) {
    // Clean up failed download
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    throw error
  }
}

// Function to upload image to Supabase storage
async function uploadToSupabase(filePath, fileName) {
  try {
    const fileContent = fs.readFileSync(filePath)
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, fileContent, {
        contentType: 'image/jpeg',
        upsert: true
      })
    
    if (error) {
      throw error
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName)
    
    console.log(`✓ Uploaded to Supabase: ${publicUrl}`)
    return publicUrl
  } catch (error) {
    console.error(`✗ Upload failed for ${fileName}:`, error.message)
    throw error
  }
}

async function uploadBlogImagesToSupabase() {
  try {
    console.log('Starting blog image upload to Supabase...\n')
    
    // Fetch all blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, featured_image')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    console.log(`Found ${posts.length} blog posts to process\n`)
    
    // Process each post
    for (const post of posts) {
      if (post.featured_image && post.featured_image.includes('replicate.delivery')) {
        console.log(`\nProcessing: ${post.title}`)
        console.log(`Current URL: ${post.featured_image}`)
        
        try {
          // Generate filename
          const filename = `${post.slug}.jpg`
          
          // Download image
          const localPath = await downloadImage(post.featured_image, filename)
          
          // Upload to Supabase
          const supabaseUrl = await uploadToSupabase(localPath, filename)
          
          // Update database with Supabase storage URL
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update({
              featured_image: supabaseUrl,
              og_image: supabaseUrl,
              updated_at: new Date().toISOString()
            })
            .eq('id', post.id)
          
          if (updateError) {
            console.error(`✗ Failed to update database:`, updateError)
          } else {
            console.log(`✓ Updated database with Supabase URL`)
          }
          
          // Clean up local file
          fs.unlinkSync(localPath)
          
        } catch (err) {
          console.error(`✗ Error processing ${post.slug}:`, err.message)
        }
      }
    }
    
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir, { recursive: true })
    }
    
    console.log('\n✅ Blog image upload to Supabase complete!')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

// Run the script
uploadBlogImagesToSupabase()