import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'

function formatDate(dateString) {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function CategoryBadge({ category }) {
  if (!category) return null
  
  return (
    <span 
      className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full"
      style={{ backgroundColor: category.color || '#6EC5B8' }}
    >
      {category.name}
    </span>
  )
}

export default function BlogPostContent({ post }) {
  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Post not found</h2>
        <p className="text-gray-500 mb-6">The blog post you're looking for doesn't exist.</p>
        <Button href="/blog" variant="primary">
          Back to Blog
        </Button>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Button 
          href="/blog" 
          variant="ghost" 
          className="text-teal-600 hover:text-teal-700"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Blog
        </Button>
      </div>

      {/* Category Badge */}
      {post.category && (
        <div className="mb-4">
          <CategoryBadge category={post.category} />
        </div>
      )}

      {/* Title */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center space-x-2">
            {post.author_image ? (
              <Image
                src={post.author_image}
                alt={post.author_name}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-sm text-teal-600 font-semibold">
                  {post.author_name?.charAt(0) || 'i'}
                </span>
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">{post.author_name}</p>
              {post.author_bio && (
                <p className="text-sm text-gray-500">{post.author_bio}</p>
              )}
            </div>
          </div>
          <div className="hidden md:block text-gray-400">•</div>
          <time dateTime={post.published_at} className="text-sm">
            {formatDate(post.published_at)}
          </time>
        </div>
      </header>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Excerpt */}
      {post.excerpt && (
        <div className="mb-8 p-6 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
          <p className="text-lg text-gray-700 font-medium italic">
            {post.excerpt}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <p className="text-sm text-gray-500 mb-2">Published on</p>
            <time dateTime={post.published_at} className="text-gray-700 font-medium">
              {formatDate(post.published_at)}
            </time>
            {post.updated_at && post.updated_at !== post.published_at && (
              <p className="text-sm text-gray-500 mt-1">
                Updated {formatDate(post.updated_at)}
              </p>
            )}
          </div>
          
          {/* Share Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 font-medium">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Learning African Languages?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of children already learning Yoruba, Kiswahili, Twi, and Amharic with our native speaker educators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/free-trial" variant="primary" size="lg">
              Start Free Trial
            </Button>
            <Button href="/plans" variant="outline" size="lg">
              View Plans
            </Button>
          </div>
        </div>
      </footer>
    </article>
  )
}