import { Suspense } from 'react'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Section, { SectionTitle, SectionSubtitle } from '@/components/ui/Section'
import BlogList from '@/components/blog/BlogList'
import { blogQueries } from '@/lib/api-client'
import { blogPosts as fallbackPosts, blogCategories as fallbackCategories } from '@/lib/blogData'

// Force dynamic rendering to avoid stale data
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Generate metadata for SEO
export const metadata = {
  title: 'Blog | iSPEAK Language Learning',
  description: 'Discover insights about African language learning, cultural immersion, and educational resources for children ages 3-14. Learn about Yoruba, Kiswahili, Twi, and Amharic languages.',
  keywords: 'African languages, language learning, children education, Yoruba, Kiswahili, Twi, Amharic, cultural immersion',
  openGraph: {
    title: 'Blog | iSPEAK Language Learning',
    description: 'Discover insights about African language learning, cultural immersion, and educational resources for children ages 3-14.',
    type: 'website',
    url: 'https://ispeaklanguages.com/blog',
    images: [
      {
        url: '/images/blog-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'iSPEAK Blog - African Language Learning Insights'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | iSPEAK Language Learning',
    description: 'Discover insights about African language learning, cultural immersion, and educational resources for children ages 3-14.',
    images: ['/images/blog-hero.jpg']
  }
}

// Loading component for Suspense
function BlogLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Server component to fetch data
async function BlogContent() {
  let posts = []
  let categories = []

  try {
    // Try to fetch from API
    const [postsResult, categoriesResult] = await Promise.all([
      blogQueries.getAllPosts(),
      blogQueries.getCategories()
    ])

    if (postsResult.data && postsResult.data.length > 0) {
      posts = postsResult.data
      console.log('Blog: Using API data:', posts.length, 'posts')
    }

    if (categoriesResult.data && categoriesResult.data.length > 0) {
      categories = categoriesResult.data
    }
  } catch (error) {
    console.log('Blog API error, using fallback data:', error.message)
  }

  // Use fallback data if API returned empty
  if (posts.length === 0) {
    console.log('Blog: Using fallback data')
    posts = fallbackPosts
    categories = fallbackCategories
  }

  return (
    <BlogList
      initialPosts={posts}
      categories={categories}
    />
  )
}

export default function BlogPage() {
  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen">
        {/* Hero Section */}
      <Section variant="gradient" className="text-center">
        <SectionTitle className="text-white">
          iSPEAK Blog
        </SectionTitle>
        <SectionSubtitle className="text-teal-100 max-w-3xl mx-auto">
          Discover insights about African language learning, cultural heritage, and educational resources 
          to help your children connect with their roots and embrace multilingual communication.
        </SectionSubtitle>
      </Section>

      {/* Blog Content */}
      <Section variant="white">
        <Suspense fallback={<BlogLoading />}>
          <BlogContent />
        </Suspense>
      </Section>

      {/* CTA Section */}
      <Section variant="teal" className="text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your Child's Language Learning Journey
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Ready to connect your child with their African heritage through language? 
            Join thousands of families already learning with iSPEAK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/free-trial"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-md font-bold hover:bg-yellow-300 transition duration-300 inline-flex items-center justify-center"
            >
              Start Free Trial
            </a>
            <a 
              href="/plans"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-bold hover:bg-white hover:text-teal-600 transition duration-300 inline-flex items-center justify-center"
            >
              View Learning Plans
            </a>
          </div>
        </div>
      </Section>
    </div>
    <Footer />
    </>
  )
}