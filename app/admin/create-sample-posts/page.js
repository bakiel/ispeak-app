'use client'
import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
// Inline blog posts data since scripts are excluded from build
const blogPosts = [
  {
    title: "Connecting Children to Their African Heritage Through Language",
    slug: "connecting-children-african-heritage-language",
    excerpt: "Language is more than communication—it's a bridge to cultural identity and ancestral wisdom.",
    content: "In our increasingly globalized world, many African American children are growing up disconnected from their rich linguistic heritage...",
    category: "Cultural Insights",
    imagePrompt: "African children learning traditional language with colorful cultural elements",
    meta_description: "Discover how language learning connects African American children to their cultural heritage",
    meta_keywords: "African heritage, language learning, cultural identity, children education"
  },
  {
    title: "The Science Behind Learning African Languages in Childhood",
    slug: "science-learning-african-languages-childhood",
    excerpt: "Research shows that learning African languages enhances cognitive development and cultural awareness in young minds.",
    content: "Recent studies in neurolinguistics reveal fascinating insights about how children's brains process tonal languages...",
    category: "Language Learning",
    imagePrompt: "Children's brain development illustration with African language symbols",
    meta_description: "Explore the cognitive benefits of learning African languages during childhood development",
    meta_keywords: "child development, African languages, cognitive benefits, neurolinguistics"
  },
  {
    title: "From Shy to Confident: Maya's Yoruba Journey",
    slug: "maya-yoruba-journey-confidence",
    excerpt: "8-year-old Maya transformed from a hesitant speaker to a confident young communicator through her Yoruba lessons.",
    content: "When Maya first joined our iSPEAK program, she barely whispered 'Hello' in English, let alone Yoruba...",
    category: "Success Stories",
    imagePrompt: "Happy African American girl speaking confidently with Yoruba text bubbles",
    meta_description: "Read Maya's inspiring journey learning Yoruba and building confidence",
    meta_keywords: "success story, Yoruba learning, child confidence, language success"
  },
  {
    title: "Preserving Kiswahili: More Than Just Words",
    slug: "preserving-kiswahili-more-than-words",
    excerpt: "Kiswahili carries centuries of wisdom, storytelling traditions, and cultural values that enrich young minds.",
    content: "Kiswahili, spoken by over 100 million people across East Africa, is more than a language—it's a cultural treasure...",
    category: "Cultural Insights",
    imagePrompt: "East African cultural symbols and Kiswahili text in artistic design",
    meta_description: "Learn about the cultural significance of Kiswahili language preservation",
    meta_keywords: "Kiswahili, cultural preservation, East Africa, language heritage"
  },
  {
    title: "Interactive Games That Make Learning Twi Fun",
    slug: "interactive-games-learning-twi-fun",
    excerpt: "Discover the engaging games and activities that make learning Twi an adventure rather than a chore.",
    content: "Learning Twi doesn't have to be boring! Our innovative approach combines traditional teaching methods...",
    category: "Language Learning",
    imagePrompt: "Children playing educational games with Twi language elements",
    meta_description: "Explore fun and interactive ways to learn Twi language through games",
    meta_keywords: "Twi language, educational games, interactive learning, children activities"
  }
]

export default function CreateSamplePostsPage() {
  const [creating, setCreating] = useState(false)
  const [results, setResults] = useState([])
  
  const createPosts = async () => {
    setCreating(true)
    setResults([])
    
    for (const post of blogPosts) {
      try {
        // Generate image
        const imageResponse = await fetch('/api/generate-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: post.imagePrompt,
            type: 'illustration'
          })
        })
        
        const imageData = await imageResponse.json()
        
        if (!imageData.success) {
          setResults(prev => [...prev, { title: post.title, status: 'failed', error: 'Image generation failed' }])
          continue
        }
        
        // Create blog post
        const blogResponse = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            featured_image: imageData.imageUrl,
            category_id: getCategoryId(post.category),
            author_name: 'iSPEAK Team',
            author_bio: 'Dedicated to connecting African American children with their linguistic heritage.',
            is_published: true,
            meta_title: post.title,
            meta_description: post.meta_description,
            meta_keywords: post.meta_keywords,
            og_title: post.title,
            og_description: post.excerpt,
            og_image: imageData.imageUrl
          })
        })
        
        const blogData = await blogResponse.json()
        
        if (blogData.success) {
          setResults(prev => [...prev, { title: post.title, status: 'success', imageUrl: imageData.imageUrl }])
        } else {
          setResults(prev => [...prev, { title: post.title, status: 'failed', error: blogData.error }])
        }
        
        // Wait between posts
        await new Promise(resolve => setTimeout(resolve, 2000))
        
      } catch (error) {
        setResults(prev => [...prev, { title: post.title, status: 'failed', error: error.message }])
      }
    }
    
    setCreating(false)
  }
  
  function getCategoryId(categoryName) {
    const categoryMap = {
      'Cultural Insights': 1,
      'Language Learning': 2,
      'Success Stories': 3
    }
    return categoryMap[categoryName] || 1
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Sample Blog Posts</h2>
          <p className="mt-1 text-sm text-gray-600">
            Generate 5 culturally relevant blog posts with AI-generated images
          </p>
        </div>
        
        {/* Blog Posts Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Posts to Create:</h3>
          <div className="space-y-4">
            {blogPosts.map((post, index) => (
              <div key={index} className="border-l-4 border-teal-500 pl-4">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
                <p className="text-xs text-gray-500 mt-1">Category: {post.category}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Create Button */}
        {!creating && results.length === 0 && (
          <div className="flex justify-center">
            <button
              onClick={createPosts}
              className="px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              <i className="fas fa-magic mr-2"></i>
              Create All Blog Posts
            </button>
          </div>
        )}
        
        {/* Progress */}
        {creating && (
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-blue-500 mb-4"></i>
            <p className="text-blue-700">Creating blog posts with AI-generated images...</p>
            <p className="text-sm text-blue-600 mt-2">This may take a few minutes</p>
          </div>
        )}
        
        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Results:</h3>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className={`p-3 rounded-md ${
                  result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {result.status === 'success' ? (
                        <><i className="fas fa-check-circle text-green-600 mr-2"></i>{result.title}</>
                      ) : (
                        <><i className="fas fa-times-circle text-red-600 mr-2"></i>{result.title}</>
                      )}
                    </span>
                    {result.error && (
                      <span className="text-sm text-red-600">{result.error}</span>
                    )}
                  </div>
                  {result.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={result.imageUrl} 
                        alt={result.title}
                        className="h-20 w-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {!creating && (
              <div className="mt-6 flex justify-center">
                <a
                  href="/admin/blog"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  View All Blog Posts
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}