'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)

  // Define all searchable content
  const searchableContent = [
    // Programs
    {
      title: 'Yoruba Language Program',
      description: 'Learn Yoruba with native speakers. Comprehensive program for children ages 3-14.',
      url: '/plans/yoruba',
      category: 'Programs',
      keywords: ['yoruba', 'language', 'program', 'west africa', 'nigeria', 'lessons']
    },
    {
      title: 'Kiswahili Language Program',
      description: 'Master Kiswahili, the lingua franca of East Africa. Interactive online lessons.',
      url: '/plans/kiswahili',
      category: 'Programs',
      keywords: ['kiswahili', 'swahili', 'language', 'program', 'east africa', 'kenya', 'tanzania']
    },
    {
      title: 'Twi Language Program',
      description: 'Explore Twi, the most widely spoken language in Ghana. Cultural immersion included.',
      url: '/plans/twi',
      category: 'Programs',
      keywords: ['twi', 'language', 'program', 'ghana', 'akan', 'west africa']
    },
    {
      title: 'All Programs & Pricing',
      description: 'View all language programs and pricing options. Flexible plans from $25.',
      url: '/plans',
      category: 'Programs',
      keywords: ['pricing', 'plans', 'programs', 'cost', 'tuition', 'packages']
    },
    {
      title: 'Group Rates',
      description: 'Special discounts for families and groups. Save on multiple enrollments.',
      url: '/group-rates',
      category: 'Programs',
      keywords: ['group', 'rates', 'discount', 'family', 'bulk', 'savings']
    },
    {
      title: 'Free Trial Lesson',
      description: 'Book a free trial lesson. No commitment required.',
      url: '/free-trial',
      category: 'Programs',
      keywords: ['free', 'trial', 'lesson', 'demo', 'sample', 'test']
    },
    
    // About
    {
      title: 'About iSPEAK',
      description: 'Learn about our mission to preserve African languages through education.',
      url: '/about',
      category: 'About',
      keywords: ['about', 'mission', 'vision', 'company', 'ispeak', 'history']
    },
    {
      title: 'The iSPEAK Method',
      description: 'Our three-pillar approach: Listening, Speaking, and Reading skills.',
      url: '/method',
      category: 'About',
      keywords: ['method', 'approach', 'pedagogy', 'teaching', 'three pillars', 'curriculum']
    },
    {
      title: 'Educational Philosophy',
      description: 'Our commitment to culturally authentic, age-appropriate language learning.',
      url: '/philosophy',
      category: 'About',
      keywords: ['philosophy', 'education', 'values', 'principles', 'beliefs']
    },
    
    // Shop & Games
    {
      title: 'Paji Shop',
      description: 'Educational materials, books, and resources for language learning.',
      url: '/shop',
      category: 'Shop',
      keywords: ['shop', 'store', 'paji', 'books', 'materials', 'resources', 'products']
    },
    {
      title: 'Language Games',
      description: 'Fun, interactive games to practice vocabulary and pronunciation.',
      url: '/games',
      category: 'Games',
      keywords: ['games', 'fun', 'interactive', 'play', 'vocabulary', 'practice']
    },
    
    // Resources
    {
      title: 'Blog',
      description: 'Articles, tips, and insights about African language learning.',
      url: '/blog',
      category: 'Resources',
      keywords: ['blog', 'articles', 'news', 'tips', 'insights', 'updates']
    },
    {
      title: 'Free Resources',
      description: 'Download free worksheets, audio files, and learning materials.',
      url: '/resources/free',
      category: 'Resources',
      keywords: ['free', 'resources', 'downloads', 'worksheets', 'materials', 'pdf']
    },
    {
      title: 'Cultural Information',
      description: 'Learn about African cultures, traditions, and customs.',
      url: '/resources/culture',
      category: 'Resources',
      keywords: ['culture', 'traditions', 'customs', 'heritage', 'africa', 'history']
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions about our programs and services.',
      url: '/faq',
      category: 'Resources',
      keywords: ['faq', 'questions', 'help', 'answers', 'support', 'information']
    },
    
    // Support
    {
      title: 'Contact Us',
      description: 'Get in touch with our team. Phone: (478) 390-4040',
      url: '/contact',
      category: 'Support',
      keywords: ['contact', 'phone', 'email', 'support', 'help', 'reach']
    },
    {
      title: 'Donate',
      description: 'Support our mission to preserve African languages.',
      url: '/donate',
      category: 'Support',
      keywords: ['donate', 'donation', 'support', 'contribute', 'give', 'charity']
    },
    {
      title: 'Loyalty Program',
      description: 'Earn rewards and discounts through our loyalty program.',
      url: '/loyalty',
      category: 'Support',
      keywords: ['loyalty', 'rewards', 'points', 'benefits', 'program', 'perks']
    },
    
    // Account
    {
      title: 'Login',
      description: 'Sign in to your iSPEAK account.',
      url: '/login',
      category: 'Account',
      keywords: ['login', 'signin', 'account', 'access', 'portal']
    },
    {
      title: 'Register',
      description: 'Create a new account to start learning.',
      url: '/register',
      category: 'Account',
      keywords: ['register', 'signup', 'create', 'account', 'join', 'enroll']
    },
    {
      title: 'Apply as Educator',
      description: 'Join our team of native-speaking educators.',
      url: '/educator-apply',
      category: 'Account',
      keywords: ['educator', 'teacher', 'apply', 'job', 'career', 'work']
    }
  ]

  useEffect(() => {
    if (query) {
      performSearch(query)
    } else {
      setSearchResults([])
      setLoading(false)
    }
  }, [query])

  const performSearch = (searchQuery) => {
    setLoading(true)
    const lowerQuery = searchQuery.toLowerCase().trim()
    
    // Search through all content
    const results = searchableContent.filter(item => {
      // Check title
      if (item.title.toLowerCase().includes(lowerQuery)) return true
      // Check description
      if (item.description.toLowerCase().includes(lowerQuery)) return true
      // Check keywords
      if (item.keywords.some(keyword => keyword.includes(lowerQuery))) return true
      return false
    })

    // Sort results by relevance (title matches first)
    results.sort((a, b) => {
      const aInTitle = a.title.toLowerCase().includes(lowerQuery)
      const bInTitle = b.title.toLowerCase().includes(lowerQuery)
      if (aInTitle && !bInTitle) return -1
      if (!aInTitle && bInTitle) return 1
      return 0
    })

    setSearchResults(results)
    setLoading(false)
  }

  return (
    <>
      <ModernNavigation />
      
      <section className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Search Results</h1>
              {query && (
                <p className="text-gray-600">
                  {loading ? 'Searching for' : `${searchResults.length} results found for`}: 
                  <span className="font-semibold ml-1">"{query}"</span>
                </p>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
              </div>
            )}

            {/* No Query State */}
            {!query && !loading && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-xl font-semibold mb-2">Enter a search term</h2>
                <p className="text-gray-600">Use the search bar above to find programs, resources, and more.</p>
              </div>
            )}

            {/* Search Results */}
            {!loading && query && searchResults.length > 0 && (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <Link 
                    key={index}
                    href={result.url}
                    className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                            {result.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-teal-600 transition-colors">
                          {result.title}
                        </h2>
                        <p className="text-gray-600">{result.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && query && searchResults.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold mb-2">No results found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find anything matching "{query}". Try searching with different keywords.
                </p>
                
                {/* Suggestions */}
                <div className="border-t pt-6">
                  <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Link href="/search?q=yoruba" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                      Yoruba
                    </Link>
                    <Link href="/search?q=kiswahili" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                      Kiswahili
                    </Link>
                    <Link href="/search?q=free trial" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                      Free Trial
                    </Link>
                    <Link href="/search?q=pricing" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                      Pricing
                    </Link>
                    <Link href="/search?q=games" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                      Games
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}