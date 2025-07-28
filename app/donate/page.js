'use client'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function DonatePage() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [donationType, setDonationType] = useState('one-time')
  const [amount, setAmount] = useState(0)

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
      
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Support Our Mission</h1>
          <p className="text-lg text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Your donation helps us preserve African languages and cultures while supporting communities worldwide.
          </p>

          {/* Donation Categories */}
          <div className="max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Select Donation Categories</h2>
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
            
            <div className="flex gap-4 mb-6">
              <button
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  donationType === 'one-time' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setDonationType('one-time')}
              >
                One-Time Donation
              </button>
              <button
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
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
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {[5, 10, 15, 25, 50, 100].map(value => (
                    <button
                      key={value}
                      className={`py-3 rounded-md font-semibold transition-all ${
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
            <label className="inline-flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Make this donation anonymous</span>
            </label>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}