import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'

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
  
  const bgColor = category.color ? `bg-[${category.color}]` : 'bg-teal-500'
  
  return (
    <span 
      className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${bgColor}`}
      style={{ backgroundColor: category.color || '#6EC5B8' }}
    >
      {category.name}
    </span>
  )
}

export default function BlogCard({ post, featured = false }) {
  const cardClasses = featured 
    ? 'col-span-full md:col-span-2' 
    : 'col-span-full md:col-span-1'

  return (
    <Card 
      hover 
      padding={false}
      className={`overflow-hidden ${cardClasses}`}
    >
      <Link href={`/blog/${post.slug}`} className="group">
        {/* Featured Image */}
        <div className="relative overflow-hidden">
          <div className={`relative ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
            {post.featured_image ? (
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <div className="text-center text-teal-600">
                  <svg 
                    className="w-16 h-16 mx-auto mb-4" 
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
                  <p className="text-sm font-medium">{post.title}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Category Badge Overlay */}
          {post.category && (
            <div className="absolute top-4 left-4">
              <CategoryBadge category={post.category} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors ${
            featured ? 'text-xl md:text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              {post.author_image ? (
                <Image
                  src={post.author_image}
                  alt={post.author_name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-xs text-teal-600 font-semibold">
                    {post.author_name?.charAt(0) || 'i'}
                  </span>
                </div>
              )}
              <span>{post.author_name}</span>
            </div>
            <time dateTime={post.published_at}>
              {formatDate(post.published_at)}
            </time>
          </div>

          {/* Read More Link */}
          <div className="mt-4">
            <span className="inline-flex items-center text-teal-500 font-semibold group-hover:text-teal-600 transition-colors">
              Read More
              <svg 
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </Card>
  )
}