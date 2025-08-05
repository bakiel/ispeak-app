// Script to update blog post images via API
const blogImageUpdates = [
  {
    slug: 'learning-african-languages-connects-roots',
    imageUrl: 'https://wsrv.nl/?url=https%3A%2F%2Freplicate.delivery%2Fyhqm%2F7fMq2VCuoFx4RSI0MIzJsT29e0p9ify2KNUPE6Mr10cldedUB%2Fout-0.png&w=1200&q=85&output=jpg'
  },
  {
    slug: 'fun-games-practice-kiswahili-home',
    imageUrl: 'https://wsrv.nl/?url=https%3A%2F%2Freplicate.delivery%2Fyhqm%2FF97N6uJxnv7PHZ1dOF8ksngYpuPLaOQxOz0Qpx3TTMytz3RF%2Fout-0.png&w=1200&q=85&output=jpg'
  },
  {
    slug: 'meet-mama-adwoa-teaching-twi',
    imageUrl: 'https://wsrv.nl/?url=https%3A%2F%2Freplicate.delivery%2Fyhqm%2FuXfkHKL9haX7IqZB0TwwvFOnRWmXuKAGlrf1WgWsvHa8OfOqA%2Fout-0.png&w=1200&q=85&output=jpg'
  },
  {
    slug: 'black-history-month-african-languages',
    imageUrl: 'https://wsrv.nl/?url=https%3A%2F%2Freplicate.delivery%2Fyhqm%2F12hxnofBBNyQbyIpLPBVdHFfLavlXS1OapWamW48uenFe8dUB%2Fout-0.png&w=1200&q=85&output=jpg'
  },
  {
    slug: 'making-amharic-fun-young-learners',
    imageUrl: 'https://wsrv.nl/?url=https%3A%2F%2Freplicate.delivery%2Fyhqm%2FCMUuFC04kLZhF9Vh5f9onLQ0dRxKvOeJiWK8Hku0TKOIPfOqA%2Fout-0.png&w=1200&q=85&output=jpg'
  }
]

async function updateBlogPostImages() {
  console.log('Updating blog post images...')
  
  // First, get all blog posts to find their IDs
  const postsResponse = await fetch('http://localhost:3001/api/blog')
  const postsData = await postsResponse.json()
  
  if (!postsData.success) {
    console.error('Failed to fetch blog posts')
    return
  }
  
  for (const update of blogImageUpdates) {
    const post = postsData.data.find(p => p.slug === update.slug)
    
    if (!post) {
      console.error(`Post not found: ${update.slug}`)
      continue
    }
    
    console.log(`Updating image for: ${post.title}`)
    
    const response = await fetch(`http://localhost:3001/api/blog/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        featured_image: update.imageUrl,
        og_image: update.imageUrl
      })
    })
    
    const result = await response.json()
    
    if (result.success) {
      console.log(`✅ Successfully updated: ${post.title}`)
    } else {
      console.error(`❌ Failed to update: ${post.title}`, result.error)
    }
  }
  
  console.log('\nImage updates complete!')
}

// Run the script
updateBlogPostImages().catch(console.error)