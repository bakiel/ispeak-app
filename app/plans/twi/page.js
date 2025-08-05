import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function TwiPlansPage() {
  const plans = [
    {
      name: "Trial Lesson",
      price: "FREE",
      duration: "30 minutes",
      features: [
        "One-on-one with native speaker",
        "Assessment of child's level",
        "Introduction to iSPEAK method",
        "No commitment required",
        "Parent consultation included"
      ],
      popular: false,
      cta: "Book Free Trial"
    },
    {
      name: "Single Lesson",
      price: "$25",
      duration: "per lesson",
      features: [
        "Flexible scheduling",
        "Perfect for trying out",
        "Age-appropriate content",
        "Digital materials included",
        "Progress tracking"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Basic Monthly",
      price: "$75",
      duration: "4 lessons/month",
      features: [
        "Once weekly lessons",
        "Consistent learning routine",
        "Monthly progress reports",
        "Home practice materials",
        "Save $25 vs single lessons"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Premium Monthly",
      price: "$90",
      duration: "6 lessons/month",
      features: [
        "1-2 lessons per week",
        "Accelerated progress",
        "Priority scheduling",
        "Bonus cultural content",
        "Save $60 vs single lessons"
      ],
      popular: false,
      cta: "Best Value"
    },
    {
      name: "3-Month Immersion",
      price: "$350",
      duration: "24 lessons",
      features: [
        "2 lessons per week",
        "Comprehensive curriculum",
        "Dedicated educator",
        "Certificate of completion",
        "Save $250 vs monthly"
      ],
      popular: false,
      cta: "Maximum Progress"
    }
  ]

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Twi Language Programs</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Connect your child with Ghana's vibrant culture through engaging Twi lessons 
              with native speakers who bring the warmth and wisdom of Akan traditions.
            </p>
          </div>
        </section>

        {/* Language Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Learn Twi?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <div>
                      <strong>Gateway to Ghana:</strong> Twi is the most widely spoken language in Ghana, 
                      used by over 9 million people in daily life, media, and culture.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <div>
                      <strong>Adinkra Wisdom:</strong> Learn the language behind Ghana's famous Adinkra 
                      symbols and access centuries of Akan philosophical teachings.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <div>
                      <strong>Heritage Connection:</strong> Essential for diaspora families tracing roots 
                      to Ghana and wanting to connect with relatives and culture.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <div>
                      <strong>Musical Language:</strong> Twi's tonal nature makes it perfect for songs, 
                      storytelling, and the rich oral traditions of the Akan people.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">What Your Child Will Learn</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold">Beginner (Months 1-3)</h4>
                    <p className="text-gray-600">Greetings, numbers, family terms, basic phrases</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Intermediate (Months 4-8)</h4>
                    <p className="text-gray-600">Daily conversations, cultural expressions, simple stories</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Advanced (Months 9+)</h4>
                    <p className="text-gray-600">Complex conversations, reading, writing, proverbs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Choose Your Learning Plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                    plan.popular ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-yellow-400 text-gray-900 text-center py-1 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 text-sm block">{plan.duration}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="fas fa-check text-green-500 mr-2 mt-1 text-sm"></i>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href="/register" 
                      className={`block text-center py-2 rounded-md font-bold transition duration-300 ${
                        plan.popular 
                          ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Group Rates */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Looking for Group Classes?</h3>
              <p className="text-gray-600 mb-6">
                Save up to 40% with our small group classes (2-4 students). Perfect for siblings, 
                friends, or homeschool groups!
              </p>
              <Link 
                href="/group-rates" 
                className="inline-block bg-teal-500 text-white px-6 py-3 rounded-md font-bold hover:bg-teal-600 transition duration-300"
              >
                View Group Rates
              </Link>
            </div>
          </div>
        </section>

        {/* Meet the Educators */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Learn from Native Speakers</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our Twi educators are carefully selected native speakers from Ghana who bring 
              authentic pronunciation, deep cultural knowledge of Akan traditions, and a 
              passion for sharing their heritage with young learners.
            </p>
            <div className="bg-gray-100 rounded-lg p-8">
              <p className="text-gray-700 italic mb-4">
                "When I teach Twi, I'm not just teaching words—I'm sharing the heartbeat 
                of Ghana. Every proverb, every greeting carries the wisdom of our ancestors 
                and the joy of our people."
              </p>
              <p className="font-semibold">— Kofi A., iSPEAK Twi Educator</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Twi Journey?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Give your child the gift of their heritage language. Start with a free trial 
              lesson and see the iSPEAK difference!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/free-trial" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
              >
                Book Free Trial
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-3 rounded-md font-bold hover:bg-gray-50 transition duration-300"
              >
                Have Questions?
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}