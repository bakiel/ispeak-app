'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ShopPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    // TODO: Implement email subscription
    setSubscribed(true)
  }

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Paji Shop</h1>
          <p className="text-lg text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            Enhance your child's learning experience with carefully curated cultural materials from the Paji Shop.
          </p>

          {/* Coming Soon Notice */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center max-w-2xl mx-auto mb-10">
            <div className="text-6xl mb-4">🏗️</div>
            <h2 className="text-2xl font-bold mb-4">Shop Coming Soon!</h2>
            <p className="text-gray-700 mb-6">
              We're working hard to bring you an amazing collection of educational materials, 
              cultural artifacts, and learning resources to support your child's language journey.
            </p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <p className="mb-4 font-medium">Be the first to know when we launch!</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg max-w-md mx-auto">
                <p className="font-medium">Thank you for subscribing!</p>
                <p>We'll notify you as soon as the shop is ready.</p>
              </div>
            )}
          </div>

          {/* What to Expect */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-book text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Children's Books</h3>
                <p className="text-gray-600">
                  Bilingual storybooks and culturally relevant reading materials for all age groups.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-puzzle-piece text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Educational Toys</h3>
                <p className="text-gray-600">
                  Language learning games, puzzles, and interactive toys that make learning fun.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-globe-africa text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Cultural Items</h3>
                <p className="text-gray-600">
                  Authentic cultural artifacts, traditional clothing, and decorative items.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-music text-3xl text-red-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Music & Audio</h3>
                <p className="text-gray-600">
                  Traditional songs, language learning audio materials, and cultural music.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-certificate text-3xl text-yellow-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Learning Kits</h3>
                <p className="text-gray-600">
                  Complete learning packages with flashcards, workbooks, and activity guides.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="https://i.ibb.co/HpXdBJrQ/i-SPEAK-Favicon.png" alt="Paji" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-2">Paji Merchandise</h3>
                <p className="text-gray-600">
                  Exclusive Paji-themed items including plush toys, stickers, and apparel.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Why Shop with Paji?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <i className="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h3 className="font-bold mb-1">Educator Approved</h3>
                  <p className="text-gray-600">All materials are reviewed by our language educators</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h3 className="font-bold mb-1">Age Appropriate</h3>
                  <p className="text-gray-600">Products carefully selected for ages 3-14</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h3 className="font-bold mb-1">Cultural Authenticity</h3>
                  <p className="text-gray-600">Genuine materials from African cultures</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-check-circle text-green-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h3 className="font-bold mb-1">Supports Learning</h3>
                  <p className="text-gray-600">Reinforces lessons and encourages practice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}