import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FreeResourcesPage() {
  const resources = [
    {
      category: "Yoruba Resources",
      icon: "fas fa-book",
      color: "yellow",
      items: [
        {
          title: "Basic Yoruba Greetings PDF",
          description: "Essential greetings and responses for everyday conversations",
          type: "PDF Download",
          link: "#"
        },
        {
          title: "Yoruba Numbers 1-100",
          description: "Learn to count in Yoruba with pronunciation guide",
          type: "Interactive Guide",
          link: "#"
        },
        {
          title: "Common Yoruba Phrases",
          description: "50 essential phrases for beginners with audio",
          type: "Audio Guide",
          link: "#"
        },
        {
          title: "Yoruba Alphabet Chart",
          description: "Complete alphabet with tone marks and examples",
          type: "Printable Chart",
          link: "#"
        }
      ]
    },
    {
      category: "Kiswahili Resources",
      icon: "fas fa-globe-africa",
      color: "teal",
      items: [
        {
          title: "Kiswahili Starter Pack",
          description: "Everything you need to begin learning Kiswahili",
          type: "Resource Bundle",
          link: "#"
        },
        {
          title: "Safari Animals in Kiswahili",
          description: "Fun vocabulary cards featuring African wildlife",
          type: "Flashcards",
          link: "#"
        },
        {
          title: "Kiswahili Songs for Kids",
          description: "Traditional and modern songs with lyrics",
          type: "Audio Collection",
          link: "#"
        },
        {
          title: "Daily Kiswahili Phrases",
          description: "Common expressions for everyday use",
          type: "PDF Guide",
          link: "#"
        }
      ]
    },
    {
      category: "Twi Resources",
      icon: "fas fa-language",
      color: "blue",
      items: [
        {
          title: "Adinkra Symbols Guide",
          description: "Learn the meanings behind Ghana's wisdom symbols",
          type: "Cultural Guide",
          link: "#"
        },
        {
          title: "Twi Pronunciation Guide",
          description: "Master the sounds of Twi with audio examples",
          type: "Audio Tutorial",
          link: "#"
        },
        {
          title: "Twi Family Terms",
          description: "Learn how to address family members in Twi",
          type: "Vocabulary List",
          link: "#"
        },
        {
          title: "Akan Names & Meanings",
          description: "Traditional day names and their significance",
          type: "Cultural Resource",
          link: "#"
        }
      ]
    },
    {
      category: "Cultural Activities",
      icon: "fas fa-paint-brush",
      color: "purple",
      items: [
        {
          title: "African Coloring Pages",
          description: "Beautiful designs featuring African patterns and symbols",
          type: "Printable Activities",
          link: "#"
        },
        {
          title: "Heritage Month Activities",
          description: "Celebrate African languages with fun family activities",
          type: "Activity Pack",
          link: "#"
        },
        {
          title: "Traditional Games Guide",
          description: "Learn popular games from across Africa",
          type: "Instructions PDF",
          link: "#"
        },
        {
          title: "Story Time Collection",
          description: "African folktales in English with discussion guides",
          type: "Story Bundle",
          link: "#"
        }
      ]
    }
  ]

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Learning Resources</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Start your African language journey today with our collection of free 
              downloadable resources, activities, and learning materials.
            </p>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-8 bg-yellow-100">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-2">🎁 Get More Free Resources!</h3>
            <p className="text-gray-700 mb-4">
              Join our newsletter for weekly tips, activities, and exclusive free content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 rounded-md border border-gray-300 flex-grow"
              />
              <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {resources.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-${category.color}-100 rounded-full flex items-center justify-center mr-4`}>
                    <i className={`${category.icon} text-${category.color}-600 text-xl`}></i>
                  </div>
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                            {item.type}
                          </span>
                          <a 
                            href={item.link} 
                            className={`text-${category.color}-600 hover:text-${category.color}-700 font-medium text-sm`}
                          >
                            Download →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">How to Use These Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-600">1</span>
                </div>
                <h3 className="font-bold mb-2">Browse & Download</h3>
                <p className="text-gray-600">
                  Explore our categories and download resources that match your 
                  child's age and learning level.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-600">2</span>
                </div>
                <h3 className="font-bold mb-2">Practice Together</h3>
                <p className="text-gray-600">
                  Use resources during family time to make language learning 
                  fun and interactive.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-600">3</span>
                </div>
                <h3 className="font-bold mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Celebrate small wins and consider formal lessons when your 
                  child shows interest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Personalized Learning?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              While these resources are great for getting started, nothing beats learning 
              with a native speaker who can guide your child's unique journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/free-trial" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
              >
                Book Free Trial Lesson
              </Link>
              <Link 
                href="/plans" 
                className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-3 rounded-md font-bold hover:bg-gray-50 transition duration-300"
              >
                View Our Programs
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}