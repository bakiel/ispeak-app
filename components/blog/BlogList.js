'use client'

import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import Button from '@/components/ui/Button'

export default function BlogList({ initialPosts = [], categories = [] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Filter posts by category
  const handleCategoryFilter = async (categorySlug) => {
    setLoading(true)
    setError(null)
    setSelectedCategory(categorySlug)

    try {
      const url = categorySlug === 'all' 
        ? '/api/blog'
        : `/api/blog?category=${categorySlug}`
      
      const response = await fetch(url)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch posts')
      }

      setPosts(result.data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error filtering posts:', err)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg 
            className="w-12 h-12 text-red-500 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Posts</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => handleCategoryFilter(selectedCategory)}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategoryFilter('all')}
              disabled={loading}
            >
              All Posts
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleCategoryFilter(category.slug)}
                disabled={loading}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center space-x-2 text-teal-600">
            <svg 
              className="animate-spin w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            <span className="font-medium">Loading posts...</span>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              featured={index === 0 && selectedCategory === 'all'}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <svg 
            className="w-16 h-16 text-gray-400 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" 
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-6">
            {selectedCategory === 'all' 
              ? 'There are no blog posts available yet.'
              : `No posts found in the selected category.`
            }
          </p>
          {selectedCategory !== 'all' && (
            <Button variant="outline" onClick={() => handleCategoryFilter('all')}>
              View All Posts
            </Button>
          )}
        </div>
      )}
    </div>
  )
}