'use client'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'

export default function DonatePage() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [donationType, setDonationType] = useState('one-time')
  const [amount, setAmount] = useState(0)
  const [isAnonymous, setIsAnonymous] = useState(false)

  const categories = [
    {
      id: 'fws',
      name: 'Family World School Cooperative Learners (FWS)',
      description: 'Supports individual learners in the Family World School Cooperative through tuition support, technology fees, books, and educational events and activities.'
    },
    {
      id: 'partner-schools',
      name: 'FWS Partner Schools',
      description: 'Supports infrastructure, technology, and other costs to build and maintain quality learning environments across FWS partner schools on the African continent.'
    },
    {
      id: 'language-councils',
      name: 'Language Councils',
      description: 'Supports the creation and maintenance of language councils and initiatives for indigenous African languages.'
    }
  ]

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const handleAmountChange = (value) => {
    if (donationType === 'one-time') {
      // Ensure it's in increments of $5
      const roundedValue = Math.round(value / 5) * 5
      setAmount(roundedValue)
    } else {
      // Monthly donations: minimum $5
      setAmount(Math.max(5, value))
    }
  }

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-yellow-400 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-pulse">
              <span className="text-4xl md:text-5xl">🌍</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Together We Preserve Heritage
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/95 max-w-3xl mx-auto">
              Your generosity fuels our mission to keep African languages alive for future generations
            </p>
            
            {/* Impact Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mt-12 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                <div className="text-sm md:text-base text-white/90">Children Learning</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">12</div>
                <div className="text-sm md:text-base text-white/90">Partner Schools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">4</div>
                <div className="text-sm md:text-base text-white/90">Languages Preserved</div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="mt-12 animate-bounce">
              <i className="fas fa-chevron-down text-2xl text-white/60"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">

          {/* Quick Links */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Track Your Impact</h3>
                  <p className="text-sm text-gray-600">See how donations are making a difference</p>
                </div>
                <Link 
                  href="/donate/progress"
                  className="w-full sm:w-auto text-center bg-teal-100 text-teal-700 px-6 py-2 rounded-md font-medium hover:bg-teal-200 transition-colors"
                >
                  View Progress →
                </Link>
              </div>
            </div>
          </div>

          {/* Donation Categories */}
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Select Donation Categories</h2>
            <p className="text-gray-600 mb-6">Choose one or more categories to support:</p>
            
            <div className="space-y-4">
              {categories.map(category => (
                <div 
                  key={category.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCategories.includes(category.id) 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => {}}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Type and Amount */}
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Choose Donation Type</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                className={`px-4 md:px-6 py-3 rounded-md font-semibold transition-all ${
                  donationType === 'one-time' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setDonationType('one-time')}
              >
                One-Time Donation
              </button>
              <button
                className={`px-4 md:px-6 py-3 rounded-md font-semibold transition-all ${
                  donationType === 'monthly' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setDonationType('monthly')}
              >
                Monthly Recurring
              </button>
            </div>

            {/* Amount Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {donationType === 'one-time' 
                  ? 'Select Amount (increments of $5)' 
                  : 'Enter Monthly Amount (minimum $5)'}
              </h3>
              
              {donationType === 'one-time' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {[5, 10, 15, 25, 50, 100].map(value => (
                    <button
                      key={value}
                      className={`py-3 px-2 rounded-md font-semibold transition-all text-sm md:text-base ${
                        amount === value 
                          ? 'bg-teal-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setAmount(value)}
                    >
                      ${value}
                    </button>
                  ))}
                </div>
              ) : null}
              
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(parseInt(e.target.value) || 0)}
                  min={donationType === 'monthly' ? 5 : 0}
                  step={donationType === 'one-time' ? 5 : 1}
                  className="px-4 py-3 border-2 border-gray-300 rounded-md text-lg w-32 focus:border-teal-500 focus:outline-none"
                />
                <span className="text-gray-600">
                  {donationType === 'monthly' ? 'per month' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Donate Button */}
          <div className="max-w-4xl mx-auto text-center">
            <button 
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedCategories.length === 0 || amount === 0}
            >
              Donate ${amount} {donationType === 'monthly' ? 'Monthly' : ''}
            </button>
            
            {selectedCategories.length === 0 && (
              <p className="text-red-600 mt-3">Please select at least one donation category</p>
            )}
          </div>

          {/* Anonymous Option */}
          <div className="max-w-4xl mx-auto mt-6 text-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="mr-2 h-4 w-4 text-teal-600 rounded focus:ring-teal-500" 
              />
              <span>Make this donation anonymous</span>
            </label>
          </div>

          {/* Trust Badges */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <i className="fas fa-shield-alt text-3xl text-green-600 mb-3"></i>
                  <h4 className="font-semibold mb-1">Secure Donation</h4>
                  <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                </div>
                <div>
                  <i className="fas fa-hand-holding-heart text-3xl text-purple-600 mb-3"></i>
                  <h4 className="font-semibold mb-1">100% Goes to Mission</h4>
                  <p className="text-sm text-gray-600">Every dollar makes an impact</p>
                </div>
                <div>
                  <i className="fas fa-file-invoice text-3xl text-blue-600 mb-3"></i>
                  <h4 className="font-semibold mb-1">Tax Deductible</h4>
                  <p className="text-sm text-gray-600">501(c)(3) nonprofit organization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}