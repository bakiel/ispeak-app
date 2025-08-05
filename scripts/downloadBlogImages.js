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

// Create directory for blog images
const blogImagesDir = path.join(process.cwd(), 'public', 'images', 'blog')
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true })
}

// Function to download image using curl
async function downloadImage(url, filename) {
  const filePath = path.join(blogImagesDir, filename)
  
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

// Function to extract Replicate URL from wsrv.nl URL
function extractReplicateUrl(wsrvUrl) {
  try {
    const urlObj = new URL(wsrvUrl)
    const encodedUrl = urlObj.searchParams.get('url')
    if (encodedUrl) {
      return decodeURIComponent(encodedUrl)
    }
    return wsrvUrl
  } catch (error) {
    return wsrvUrl
  }
}

async function downloadAndUpdateBlogImages() {
  try {
    console.log('Fetching blog posts...\n')
    
    // First, let's check what URLs we have in the database
    const { data: checkPosts, checkError } = await supabase
      .from('blog_posts')
      .select('slug, featured_image')
      .order('created_at', { ascending: false })
    
    if (checkError) {
      throw checkError
    }
    
    console.log('Current image URLs in database:')
    checkPosts.forEach(post => {
      console.log(`${post.slug}: ${post.featured_image}`)
    })
    console.log('\n')
    
    // Now fetch posts that need image downloads
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('id, slug, featured_image')
      .or('featured_image.like.%replicate.delivery%,featured_image.like.%wsrv.nl%')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    console.log(`Found ${posts.length} blog posts with external images to download\n`)
    
    // Download and update each post
    for (const post of posts) {
      if (post.featured_image) {
        console.log(`\nProcessing: ${post.slug}`)
        
        try {
          // Extract direct Replicate URL
          const replicateUrl = extractReplicateUrl(post.featured_image)
          console.log(`Source URL: ${replicateUrl}`)
          
          // Generate filename
          const filename = `${post.slug}.jpg`
          
          // Download image
          await downloadImage(replicateUrl, filename)
          
          // Update database with local path
          const localPath = `/images/blog/${filename}`
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update({
              featured_image: localPath,
              og_image: localPath,
              updated_at: new Date().toISOString()
            })
            .eq('id', post.id)
          
          if (updateError) {
            console.error(`✗ Failed to update database:`, updateError)
          } else {
            console.log(`✓ Updated database with local path: ${localPath}`)
          }
          
        } catch (err) {
          console.error(`✗ Error processing ${post.slug}:`, err.message)
        }
      }
    }
    
    // Verify final state
    console.log('\n\nVerifying final database state:')
    const { data: finalPosts, finalError } = await supabase
      .from('blog_posts')
      .select('slug, featured_image')
      .order('created_at', { ascending: false })
    
    if (!finalError) {
      finalPosts.forEach(post => {
        console.log(`${post.slug}: ${post.featured_image}`)
      })
    }
    
    console.log('\n✅ Blog image download complete!')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

// Run the script
downloadAndUpdateBlogImages()