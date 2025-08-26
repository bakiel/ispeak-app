import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function CulturalInformationPage() {
  const culturalSections = [
    {
      title: "Yoruba Culture (Nigeria)",
      flag: "🇳🇬",
      color: "yellow",
      content: {
        overview: "The Yoruba people are one of the largest ethnic groups in West Africa, known for their rich traditions, vibrant festivals, and profound spiritual practices.",
        traditions: [
          "Ifa divination system and Orisha worship",
          "Talking drums and traditional music",
          "Adire textile art and indigo dyeing",
          "Elaborate festivals like Osun and Egungun",
          "Proverbs and oral literature tradition"
        ],
        values: [
          "Respect for elders (àgbà)",
          "Community cooperation (ìfọ̀wọ́sowọ́pọ̃)",
          "Hospitality and generosity",
          "Spiritual connection to ancestors",
          "Artistic expression and creativity"
        ],
        funFacts: [
          "Yoruba art influenced Cuban Santería and Brazilian Candomblé",
          "The talking drum can mimic the tonal patterns of Yoruba speech",
          "Lagos, Nigeria's largest city, was originally a Yoruba settlement",
          "Yoruba bronze casting dates back over 1,000 years"
        ]
      }
    },
    {
      title: "Kiswahili Culture (East Africa)",
      flag: "🇰🇪",
      color: "teal",
      content: {
        overview: "Kiswahili culture represents a beautiful blend of African, Arab, Persian, and Indian influences along the East African coast.",
        traditions: [
          "Dhow sailing and coastal trade heritage",
          "Swahili poetry (mashairi) and literature",
          "Coastal cuisine with spices and coconut",
          "Traditional dances like Chakacha and Goma",
          "Stone Town architecture in Zanzibar"
        ],
        values: [
          "Ubuntu philosophy (umuntu)",
          "Respect and courtesy (heshima)",
          "Community harmony (umoja)",
          "Hospitality to strangers (ukarimu)",
          "Peaceful coexistence"
        ],
        funFacts: [
          "Kiswahili means 'of the coast' in Arabic",
          "It's the official language of the African Union",
          "Swahili culture spans 8 countries along the Indian Ocean",
          "Traditional Swahili houses have courtyards for family gatherings"
        ]
      }
    },
    {
      title: "Twi/Akan Culture (Ghana)",
      flag: "🇬🇭",
      color: "blue",
      content: {
        overview: "The Akan people of Ghana are renowned for their sophisticated political systems, golden heritage, and symbolic Adinkra wisdom.",
        traditions: [
          "Adinkra symbols representing life philosophy",
          "Kente cloth weaving with symbolic patterns",
          "Traditional drumming and Kagan dancing",
          "Royal golden stools and chieftaincy system",
          "Naming ceremony traditions (outdooring)"
        ],
        values: [
          "Wisdom and knowledge (nyansa)",
          "Unity and togetherness (biako)",
          "Strength and courage (akoben)",
          "Humility and service (ɔbrɛmpɔn)",
          "Ancestral reverence"
        ],
        funFacts: [
          "The Golden Stool is considered the soul of the Ashanti nation",
          "Each Adinkra symbol tells a story or conveys wisdom",
          "Kente patterns have specific meanings and occasions",
          "The Akan calendar has 42-day cycles based on the market system"
        ]
      }
    },
    {
      title: "Amharic Culture (Ethiopia)",
      flag: "🇪🇹",
      color: "purple",
      content: {
        overview: "Ethiopian culture, centered around Amharic language, boasts one of the world's oldest civilizations with unique traditions.",
        traditions: [
          "Orthodox Christian festivals and ceremonies",
          "Coffee ceremony (buna) as social ritual",
          "Traditional injera bread and communal dining",
          "Ancient rock-hewn churches of Lalibela",
          "Timkat (Epiphany) water blessing celebrations"
        ],
        values: [
          "Respect for age and wisdom",
          "Spiritual devotion and faith",
          "Community sharing and support",
          "Cultural pride and independence",
          "Hospitality and warmth"
        ],
        funFacts: [
          "Ethiopia has its own calendar with 13 months",
          "It's the birthplace of coffee",
          "The Ark of the Covenant is believed to be in Axum",
          "Ethiopia was never fully colonized by Europeans"
        ]
      }
    }
  ]

  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cultural Information Hub</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore the rich traditions, values, and heritage behind the African 
              languages your child is learning with iSPEAK.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Language is Culture</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              When your child learns an African language, they're not just learning words and grammar—
              they're connecting with centuries of wisdom, traditions, and cultural values. 
              Understanding the culture behind the language enriches the learning experience and 
              helps children develop a deeper appreciation for their heritage.
            </p>
          </div>
        </section>

        {/* Cultural Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {culturalSections.map((section, index) => (
              <div key={index} className="mb-16">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className={`bg-${section.color}-${section.color === 'yellow' ? '400' : '500'} text-${section.color === 'yellow' ? 'gray-900' : 'white'} p-6`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl md:text-3xl font-bold">{section.title}</h3>
                      <span className="text-4xl">{section.flag}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    {/* Overview */}
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      {section.content.overview}
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Traditions */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-xl font-bold mb-4 flex items-center">
                          <i className="fas fa-drum text-xl mr-3"></i>
                          Key Traditions
                        </h4>
                        <ul className="space-y-2">
                          {section.content.traditions.map((tradition, idx) => (
                            <li key={idx} className="flex items-start">
                              <i className="fas fa-star text-sm mt-1 mr-2 text-yellow-500"></i>
                              <span className="text-gray-700">{tradition}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Values */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-xl font-bold mb-4 flex items-center">
                          <i className="fas fa-heart text-xl mr-3"></i>
                          Core Values
                        </h4>
                        <ul className="space-y-2">
                          {section.content.values.map((value, idx) => (
                            <li key={idx} className="flex items-start">
                              <i className="fas fa-check text-sm mt-1 mr-2 text-green-500"></i>
                              <span className="text-gray-700">{value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Fun Facts */}
                    <div className="mt-8 bg-blue-50 rounded-lg p-6">
                      <h4 className="text-xl font-bold mb-4 flex items-center">
                        <i className="fas fa-lightbulb text-xl mr-3 text-blue-600"></i>
                        Did You Know?
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.content.funFacts.map((fact, idx) => (
                          <div key={idx} className="flex items-start">
                            <i className="fas fa-info-circle text-sm mt-1 mr-2 text-blue-500"></i>
                            <span className="text-gray-700">{fact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Elements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Explore More Culture</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-map text-3xl text-yellow-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Cultural Maps</h3>
                <p className="text-gray-600 mb-4">
                  Interactive maps showing where each language is spoken and 
                  cultural highlights of different regions.
                </p>
                <Link href="#" className="text-yellow-600 font-medium hover:underline">
                  Explore Maps →
                </Link>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-music text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Traditional Music</h3>
                <p className="text-gray-600 mb-4">
                  Listen to traditional songs and learn about the instruments 
                  and rhythms of each culture.
                </p>
                <Link href="#" className="text-teal-600 font-medium hover:underline">
                  Listen Now →
                </Link>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-utensils text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Traditional Recipes</h3>
                <p className="text-gray-600 mb-4">
                  Cook traditional dishes with your family while practicing 
                  language and learning about food culture.
                </p>
                <Link href="#" className="text-blue-600 font-medium hover:underline">
                  Get Recipes →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Bring Culture into Learning</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Our native speaker educators don't just teach language—they share the 
              stories, traditions, and cultural wisdom that make each language come alive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/free-trial" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
              >
                Experience Cultural Learning
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