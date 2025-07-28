import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PlansPage() {
  const languages = [
    {
      name: "Yoruba",
      flag: "🇳🇬",
      region: "West Africa",
      speakers: "40M+",
      countries: "Nigeria, Benin, Togo",
      description: "One of West Africa's most influential languages, Yoruba carries a rich cultural heritage of art, music, and spirituality that has spread across the globe.",
      features: [
        "Tonal language with musical qualities",
        "Rich proverb tradition",
        "Growing digital content",
        "Strong diaspora presence"
      ],
      link: "/plans/yoruba",
      color: "yellow"
    },
    {
      name: "Kiswahili",
      flag: "🇰🇪",
      region: "East Africa",
      speakers: "100M+",
      countries: "Kenya, Tanzania, Uganda, DRC",
      description: "The most widely spoken African language, Kiswahili serves as a lingua franca across East Africa and is an official language of the African Union.",
      features: [
        "Gateway to East Africa",
        "Extensive literature",
        "Business language",
        "UNESCO recognized"
      ],
      link: "/plans/kiswahili",
      color: "teal"
    },
    {
      name: "Twi",
      flag: "🇬🇭",
      region: "Ghana",
      speakers: "9M+",
      countries: "Ghana",
      description: "The heartbeat of Ghana, Twi connects learners to the Akan people's wisdom, including the famous Adinkra symbols and rich oral traditions.",
      features: [
        "Adinkra symbol meanings",
        "Vibrant cultural practices",
        "Growing media presence",
        "Heritage tourism language"
      ],
      link: "/plans/twi",
      color: "blue"
    },
    {
      name: "Amharic",
      flag: "🇪🇹",
      region: "Ethiopia",
      speakers: "25M+",
      countries: "Ethiopia",
      description: "Ethiopia's official language with its unique script, Amharic opens doors to one of Africa's most ancient and continuous civilizations.",
      features: [
        "Unique Ge'ez script",
        "Ancient literary tradition",
        "Official UN language",
        "Rich historical texts"
      ],
      link: "#",
      color: "purple",
      comingSoon: true
    }
  ]

  const pricingTiers = [
    {
      name: "Trial Lesson",
      price: "FREE",
      duration: "30 minutes",
      description: "Perfect introduction to iSPEAK",
      features: [
        "One-on-one with native speaker",
        "Level assessment",
        "Method introduction",
        "No commitment"
      ]
    },
    {
      name: "Single Lesson",
      price: "$25",
      duration: "Per lesson",
      description: "Flexible pay-as-you-go",
      features: [
        "Schedule anytime",
        "Age-appropriate content",
        "Progress tracking",
        "Digital materials"
      ]
    },
    {
      name: "Basic Monthly",
      price: "$75",
      duration: "4 lessons/month",
      description: "Build consistent habits",
      features: [
        "Weekly lessons",
        "Save $25/month",
        "Progress reports",
        "Home practice materials"
      ],
      popular: true
    },
    {
      name: "Premium Monthly",
      price: "$90",
      duration: "6 lessons/month",
      description: "Accelerate progress",
      features: [
        "2x weekly options",
        "Save $60/month",
        "Priority scheduling",
        "Bonus content"
      ]
    }
  ]

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Language Journey</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Select from our carefully designed programs taught by native speakers who bring 
              authentic pronunciation, cultural knowledge, and a passion for teaching.
            </p>
          </div>
        </section>

        {/* Language Cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Available Languages</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {languages.map((lang, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 hover:shadow-xl transition-shadow">
                  <div className={`bg-${lang.color}-${lang.color === 'yellow' ? '400' : '500'} text-${lang.color === 'yellow' ? 'gray-900' : 'white'} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{lang.name}</h3>
                      <span className="text-4xl">{lang.flag}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{lang.region}</span>
                      <span>•</span>
                      <span>{lang.speakers} speakers</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{lang.description}</p>
                    
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Countries:</strong> {lang.countries}
                      </p>
                      <ul className="space-y-1">
                        {lang.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <i className="fas fa-check text-green-500 mr-2 mt-1 text-sm"></i>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {lang.comingSoon ? (
                      <button className="w-full bg-gray-300 text-gray-600 py-3 rounded-md font-bold cursor-not-allowed">
                        Coming Soon
                      </button>
                    ) : (
                      <Link 
                        href={lang.link} 
                        className={`block text-center bg-${lang.color}-${lang.color === 'yellow' ? '400' : '500'} text-${lang.color === 'yellow' ? 'gray-900' : 'white'} py-3 rounded-md font-bold hover:opacity-90 transition duration-300`}
                      >
                        View {lang.name} Programs →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
              All languages share the same pricing structure. Choose the plan that fits your 
              family's schedule and budget.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-lg shadow-md p-6 ${tier.popular ? 'ring-2 ring-teal-500' : ''}`}
                >
                  {tier.popular && (
                    <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="text-xl font-bold mt-4 mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-gray-600 text-sm block">{tier.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-1 text-sm"></i>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/group-rates" 
                className="text-teal-600 font-medium hover:underline"
              >
                Looking for group classes? Save up to 40% →
              </Link>
            </div>
          </div>
        </section>

        {/* Why iSPEAK */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Why Families Choose iSPEAK</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chalkboard-teacher text-3xl text-yellow-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Native Speakers Only</h3>
                <p className="text-gray-600">
                  Learn from educators who grew up speaking the language and understanding 
                  its cultural nuances.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-child text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Child-Centered Method</h3>
                <p className="text-gray-600">
                  Age-appropriate lessons that keep children engaged through games, songs, 
                  and cultural activities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-globe-africa text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Cultural Connection</h3>
                <p className="text-gray-600">
                  More than language—your child learns traditions, values, and stories that 
                  strengthen their identity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start with a free trial lesson and see why families worldwide trust iSPEAK 
              for heritage language learning.
            </p>
            <Link 
              href="/free-trial" 
              className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-yellow-300 transition duration-300"
            >
              Book Your Free Trial
            </Link>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}