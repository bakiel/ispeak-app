import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ArticlesPage() {
  const articles = [
    {
      title: "Why African Languages Matter for Your Child's Identity",
      excerpt: "Discover how learning heritage languages strengthens cultural identity and builds confidence in multicultural children.",
      author: "Dr. Amara Johnson",
      readTime: "5 min read",
      category: "Cultural Identity",
      date: "July 15, 2024",
      featured: true
    },
    {
      title: "The Science of Early Language Learning",
      excerpt: "Research shows children who learn multiple languages have enhanced cognitive flexibility and problem-solving skills.",
      author: "Prof. Michael Chen",
      readTime: "7 min read",
      category: "Child Development",
      date: "July 10, 2024",
      featured: true
    },
    {
      title: "Creating a Language-Rich Home Environment",
      excerpt: "Practical tips for incorporating African languages into daily family routines and making learning natural.",
      author: "Fatima Al-Rashid",
      readTime: "6 min read",
      category: "Parenting Tips",
      date: "July 5, 2024",
      featured: false
    },
    {
      title: "Yoruba Tones: A Parent's Guide to Understanding",
      excerpt: "Breaking down the tonal system of Yoruba and how to help your child master this essential aspect of the language.",
      author: "Adunni Oduya",
      readTime: "8 min read",
      category: "Language Learning",
      date: "June 28, 2024",
      featured: false
    },
    {
      title: "The Role of Music in African Language Learning",
      excerpt: "How traditional songs and rhythms accelerate language acquisition and cultural understanding.",
      author: "Kwame Asante",
      readTime: "4 min read",
      category: "Teaching Methods",
      date: "June 20, 2024",
      featured: false
    },
    {
      title: "Building Bridges: Connecting Diaspora Children to Their Roots",
      excerpt: "Stories from families who've successfully maintained cultural connections through language learning.",
      author: "Zara Okonkwo",
      readTime: "6 min read",
      category: "Family Stories",
      date: "June 15, 2024",
      featured: false
    },
    {
      title: "Kiswahili: The Gateway to East Africa",
      excerpt: "Understanding why Kiswahili is considered Africa's most important lingua franca and its global significance.",
      author: "Dr. Amina Hassan",
      readTime: "5 min read",
      category: "Language Spotlight",
      date: "June 10, 2024",
      featured: false
    },
    {
      title: "Overcoming Language Learning Challenges",
      excerpt: "Common obstacles in heritage language learning and proven strategies to keep children motivated.",
      author: "Sarah Mensah",
      readTime: "7 min read",
      category: "Challenges & Solutions",
      date: "June 5, 2024",
      featured: false
    },
    {
      title: "The Digital Age: Technology and African Languages",
      excerpt: "How modern technology is preserving and promoting African languages for future generations.",
      author: "Dr. Chinwe Okoro",
      readTime: "6 min read",
      category: "Technology",
      date: "May 30, 2024",
      featured: false
    }
  ]

  const categories = [
    "All Articles",
    "Cultural Identity",
    "Child Development",
    "Parenting Tips",
    "Language Learning",
    "Teaching Methods",
    "Family Stories",
    "Language Spotlight",
    "Challenges & Solutions",
    "Technology"
  ]

  const featuredArticles = articles.filter(article => article.featured)
  const regularArticles = articles.filter(article => !article.featured)

  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Articles & Insights</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Expert advice, research insights, and practical tips for supporting your 
              child's African language learning journey.
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    index === 0 
                      ? 'bg-teal-500 text-white border-teal-500' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500 hover:text-teal-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-10">Featured Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {featuredArticles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-teal-400 to-teal-500"></div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        FEATURED
                      </span>
                      <span className="text-teal-600 text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 hover:text-teal-600 transition-colors">
                      <Link href="#">{article.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{article.author}</span>
                        <span>{article.date}</span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Regular Articles */}
            <h2 className="text-3xl font-bold mb-10">Recent Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-teal-600 text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-bold mb-2 hover:text-teal-600 transition-colors">
                      <Link href="#">{article.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-teal-500 text-white px-8 py-3 rounded-md font-bold hover:bg-teal-600 transition duration-300">
                Load More Articles
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the latest articles, tips, and insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="px-4 py-3 rounded-md border border-gray-300 flex-grow"
              />
              <button className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition font-bold">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              While articles provide great insights, nothing beats personalized learning 
              with a native speaker. Book your free trial today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/free-trial" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
              >
                Book Free Trial
              </Link>
              <Link 
                href="/plans" 
                className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-3 rounded-md font-bold hover:bg-gray-50 transition duration-300"
              >
                View Programs
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}