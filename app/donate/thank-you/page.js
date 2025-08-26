'use client'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DonationThankYouPage() {
  const router = useRouter()
  const [donationSuccess, setDonationSuccess] = useState(null)

  useEffect(() => {
    // Retrieve success details from session storage
    const successData = sessionStorage.getItem('donationSuccess')
    if (successData) {
      setDonationSuccess(JSON.parse(successData))
      // Clear the success data
      sessionStorage.removeItem('donationSuccess')
    } else {
      // Redirect to donation page if no success data
      router.push('/donate')
    }
  }, [router])

  if (!donationSuccess) {
    return null // Will redirect
  }

  return (
    <>
      <Navigation />
      
      {/* Hero Section with Celebration */}
      <section className="relative bg-gradient-to-br from-green-500 via-teal-500 to-yellow-400 text-white py-16 md:py-24 overflow-hidden">
        {/* African Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="hero-pattern h-full"></div>
        </div>
        
        {/* Confetti Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            >
              <span className="text-2xl">🎉</span>
            </div>
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6 animate-pulse">
            <i className="fas fa-heart text-5xl"></i>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto">
            Your generous donation of <span className="font-bold text-yellow-300">${donationSuccess.amount}</span> is 
            making a real difference in preserving African languages and supporting education.
          </p>
        </div>
      </section>

      {/* Success Details */}
      <section className="py-12 bg-gray-50 relative">
        {/* African Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="hero-pattern h-full"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Confirmation Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Donation Confirmation</h2>
                <span className="text-green-600 text-3xl">
                  <i className="fas fa-check-circle"></i>
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confirmation Number</p>
                  <p className="font-mono font-bold text-lg">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="font-bold">{new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount</p>
                  <p className="font-bold text-xl text-teal-600">
                    ${donationSuccess.amount}
                    {donationSuccess.donationType === 'monthly' && <span className="text-sm"> /month</span>}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-bold">
                    {donationSuccess.paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}
                  </p>
                </div>
              </div>
              
              {/* Categories Supported */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Supporting These Programs:</h3>
                <div className="space-y-2">
                  {donationSuccess.categories.map((category, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                      <i className="fas fa-heart text-red-500"></i>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Receipt Notice */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm">
                  <i className="fas fa-envelope text-yellow-600 mr-2"></i>
                  A receipt has been sent to <span className="font-semibold">{donationSuccess.email}</span>
                </p>
              </div>
            </div>

            {/* Impact Message */}
            <div className="bg-gradient-to-r from-teal-50 to-yellow-50 rounded-lg p-8 mb-8 border-2 border-teal-200">
              <h3 className="text-2xl font-bold mb-4 text-center">Your Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-2">👦👧</div>
                  <p className="font-semibold">Children Supported</p>
                  <p className="text-sm text-gray-600">
                    Your donation helps provide language education to children ages 3-14
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🏫</div>
                  <p className="font-semibold">Schools Equipped</p>
                  <p className="text-sm text-gray-600">
                    Supporting technology and resources for partner schools
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-2">🌍</div>
                  <p className="font-semibold">Heritage Preserved</p>
                  <p className="text-sm text-gray-600">
                    Keeping African languages alive for future generations
                  </p>
                </div>
              </div>
            </div>

            {/* Share Your Support */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Share Your Support</h3>
              <p className="text-center text-gray-600 mb-6">
                Help us spread the word about preserving African languages
              </p>
              <div className="flex justify-center gap-3">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                  <i className="fab fa-facebook-f mr-2"></i>Share on Facebook
                </button>
                <button className="bg-sky-500 text-white px-6 py-3 rounded-md hover:bg-sky-600 transition-colors">
                  <i className="fab fa-twitter mr-2"></i>Tweet
                </button>
                <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors">
                  <i className="fab fa-whatsapp mr-2"></i>WhatsApp
                </button>
              </div>
            </div>

            {/* Next Steps */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">What's Next?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/donate/progress"
                  className="bg-teal-500 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-600 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-chart-line"></i>
                  Track Our Progress
                </Link>
                <Link 
                  href="/"
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <i className="fas fa-home"></i>
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
      
      <Footer />
    </>
  )
}