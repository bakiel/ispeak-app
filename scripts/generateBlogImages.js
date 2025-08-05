// Script to generate images for existing blog posts using Replicate API
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://icvpyecrxohqgsqymqkw.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljdnp5ZWNyeG9ocWdzcXltcWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNjA2MzIsImV4cCI6MjA1MTYzNjYzMn0.F3IPET3xYgz_bUMluqU_gKBjy73PnNXGk0Y-X4idyh8'

const supabase = createClient(supabaseUrl, supabaseKey)

// Blog post image prompts for each article
const blogImagePrompts = [
  {
    slug: 'learning-african-languages-connects-roots',
    prompt: 'African American children sitting in circle with elderly African storyteller, warm lighting, traditional African patterns on walls, books with African symbols, joyful learning atmosphere, digital illustration, child-friendly, colorful, educational, high quality'
  },
  {
    slug: 'fun-games-practice-kiswahili-home',
    prompt: 'Happy African American family playing educational board game with Kiswahili words, colorful cards with animals and numbers, children laughing, bright modern living room, African art on walls, digital illustration, child-friendly, colorful, educational, high quality'
  },
  {
    slug: 'meet-mama-adwoa-teaching-twi',
    prompt: 'Warm African woman teacher with traditional Ghanaian kente dress, teaching young African American children, classroom decorated with Adinkra symbols, children engaged and smiling, books and cultural artifacts, digital illustration, child-friendly, colorful, educational, high quality'
  },
  {
    slug: 'black-history-month-african-languages',
    prompt: 'Diverse group of African American children in classroom with Black History Month decorations, African continent map, cultural artifacts, teacher showing African language alphabet, inspiring historical figures on walls, digital illustration, child-friendly, colorful, educational, high quality'
  },
  {
    slug: 'making-amharic-fun-young-learners',
    prompt: 'Young African American girl practicing Amharic letters with colorful workbook, Ethiopian alphabet chart on wall, parent helping, traditional Ethiopian cross visible, bright study space with cultural elements, digital illustration, child-friendly, colorful, educational, high quality'
  }
]

async function generateImage(prompt) {
  try {
    const response = await fetch('http://localhost:3001/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        type: 'illustration'
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      return data.imageUrl
    } else {
      console.error('Failed to generate image:', data.error)
      return null
    }
  } catch (error) {
    console.error('Error generating image:', error)
    return null
  }
}

async function updateBlogPostImages() {
  console.log('Starting blog post image generation...')
  
  for (const item of blogImagePrompts) {
    console.log(`\nGenerating image for: ${item.slug}`)
    
    // Generate the image
    const imageUrl = await generateImage(item.prompt)
    
    if (imageUrl) {
      console.log(`Image generated successfully: ${imageUrl}`)
      
      // Update the blog post in the database
      const { data, error } = await supabase
        .from('blog_posts')
        .update({ 
          featured_image: imageUrl,
          og_image: imageUrl 
        })
        .eq('slug', item.slug)
      
      if (error) {
        console.error(`Failed to update blog post ${item.slug}:`, error)
      } else {
        console.log(`✅ Successfully updated blog post: ${item.slug}`)
      }
    } else {
      console.error(`❌ Failed to generate image for: ${item.slug}`)
    }
    
    // Wait between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 3000))
  }
  
  console.log('\nBlog post image generation complete!')
}

// Run the script
updateBlogPostImages().catch(console.error)