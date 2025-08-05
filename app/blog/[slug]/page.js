import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Section from '@/components/ui/Section'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { blogQueries } from '@/lib/supabase'

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params
  const result = await blogQueries.getPostBySlug(slug)
  
  if (result.error || !result.data) {
    return {
      title: 'Blog Post Not Found | iSPEAK Language Learning'
    }
  }

  const post = result.data
  
  return {
    title: post.meta_title || `${post.title} | iSPEAK Blog`,
    description: post.meta_description || post.excerpt || 'Discover insights about African language learning and cultural immersion.',
    keywords: `African languages, language learning, ${post.category?.name || 'education'}, children education, Yoruba, Kiswahili, Twi, Amharic`,
    authors: [{ name: post.author_name || 'iSPEAK Team' }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.meta_description,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name || 'iSPEAK Team'],
      url: `https://ispeaklanguages.com/blog/${post.slug}`,
      images: post.featured_image ? [
        {
          url: post.featured_image,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ] : [
        {
          url: '/images/blog-default.jpg',
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.meta_description,
      images: post.featured_image ? [post.featured_image] : ['/images/blog-default.jpg']
    },
    alternates: {
      canonical: `https://ispeaklanguages.com/blog/${post.slug}`
    }
  }
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  try {
    const result = await blogQueries.getAllPosts()
    
    if (result.error || !result.data) {
      return []
    }

    return result.data.map((post) => ({
      slug: post.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = params
  
  if (!slug) {
    notFound()
  }

  const result = await blogQueries.getPostBySlug(slug)
  
  if (result.error) {
    console.error('Error fetching blog post:', result.error)
    
    // Check if it's a 404 error
    if (result.error.status === 404) {
      notFound()
    }
    
    // For other errors, show an error page
    return (
      <>
        <Navigation />
        <Section variant="white" className="min-h-screen">
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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Post</h3>
            <p className="text-red-600 mb-4">
              {result.error.error || 'An error occurred while loading this blog post. Please try again later.'}
            </p>
            <a 
              href="/blog"
              className="bg-teal-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-teal-600 transition duration-300 inline-block"
            >
              Back to Blog
            </a>
          </div>
        </div>
      </Section>
      <Footer />
      </>
    )
  }

  if (!result.data) {
    notFound()
  }

  const post = result.data

  // Add structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.meta_description,
    "image": post.featured_image || "/images/blog-default.jpg",
    "author": {
      "@type": "Person",
      "name": post.author_name || "iSPEAK Team",
      "description": post.author_bio
    },
    "publisher": {
      "@type": "Organization",
      "name": "iSPEAK Language Learning",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ispeaklanguages.com/images/logo.png"
      }
    },
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ispeaklanguages.com/blog/${post.slug}`
    }
  }

  return (
    <>
      <Navigation />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Blog Post Content */}
      <Section variant="white" className="min-h-screen">
        <BlogPostContent post={post} />
      </Section>
      <Footer />
    </>
  )
}