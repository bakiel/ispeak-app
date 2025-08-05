const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Image prompts for each blog post
const imagePrompts = {
  'learning-african-languages-connects-roots': {
    prompt: 'Professional stock photo of African American mother and daughter practicing African language together at home, warm lighting, authentic family moment, educational materials visible, high quality commercial photography',
    type: 'illustration'
  },
  'fun-games-practice-kiswahili-home': {
    prompt: 'Professional stock photo of diverse African American children playing educational board game with Kiswahili words, bright colorful setting, genuine smiles and engagement, modern home environment, commercial quality',
    type: 'illustration'
  },
  'meet-mama-adwoa-teaching-twi': {
    prompt: 'Professional portrait of a warm, smiling African female teacher in her 40s teaching online, traditional African fabric clothing, modern home office setup with cultural decorations, professional educator, stock photography style',
    type: 'illustration'
  },
  'black-history-month-african-languages': {
    prompt: 'Professional stock photo of African American family celebrating Black History Month, traditional African decorations, children holding African language books, warm indoor lighting, cultural pride, commercial photography',
    type: 'illustration'
  },
  'teaching-yoruba-through-songs-stories': {
    prompt: 'Professional stock photo of African American children and teacher in a circle singing Yoruba songs, colorful African fabrics, traditional drums visible, joyful expressions, warm classroom setting, cultural decorations, high quality educational photography',
    type: 'illustration'
  }
}

async function generateImage(prompt, type = 'illustration') {
  try {
    console.log(`Generating image with prompt: ${prompt.substring(0, 50)}...`)
    
    const response = await fetch('http://localhost:3000/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, type })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.details || error.error || 'Image generation failed')
    }

    const result = await response.json()
    console.log(`✓ Generated image: ${result.imageUrl}`)
    return result.imageUrl
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

async function updateBlogPostImages() {
  try {
    console.log('Starting blog post image regeneration with Google Imagen 4 Ultra (highest quality)...\n')

    // Fetch all blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    console.log(`Found ${posts.length} blog posts to update\n`)

    // Update each post
    for (const post of posts) {
      if (imagePrompts[post.slug]) {
        console.log(`\nProcessing: ${post.title}`)
        console.log(`Slug: ${post.slug}`)
        
        try {
          // Generate new image
          const imageUrl = await generateImage(
            imagePrompts[post.slug].prompt,
            imagePrompts[post.slug].type
          )

          // Update post with new image
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update({
              featured_image: imageUrl,
              og_image: imageUrl,
              updated_at: new Date().toISOString()
            })
            .eq('id', post.id)

          if (updateError) {
            console.error(`✗ Failed to update post:`, updateError)
          } else {
            console.log(`✓ Updated post with new Google Imagen 4 Ultra image`)
          }

          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (err) {
          console.error(`✗ Error processing ${post.slug}:`, err.message)
        }
      } else {
        console.log(`\n⚠ No image prompt defined for slug: ${post.slug}`)
      }
    }

    console.log('\n✅ Blog post image regeneration complete!')
  } catch (error) {
    console.error('Error updating blog post images:', error)
    process.exit(1)
  }
}

// Run the script
updateBlogPostImages()