'use client'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DonationProgressPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Mock data - in production, this would come from your database
  const progressData = {
    fws: {
      name: 'FWS Learners',
      goal: 50000,
      raised: 32500,
      donors: 156,
      lastUpdate: '2 days ago',
      color: 'teal',
      icon: '🎓',
      impact: '65 scholarships provided'
    },
    'partner-schools': {
      name: 'Partner Schools',
      goal: 75000,
      raised: 45000,
      donors: 89,
      lastUpdate: '1 day ago',
      color: 'blue',
      icon: '🏫',
      impact: '3 schools equipped with technology'
    },
    'language-councils': {
      name: 'Language Councils',
      goal: 30000,
      raised: 18000,
      donors: 234,
      lastUpdate: '3 hours ago',
      color: 'purple',
      icon: '🗣️',
      impact: '2 new councils established'
    }
  }

  const totalRaised = Object.values(progressData).reduce((sum, cat) => sum + cat.raised, 0)
  const totalGoal = Object.values(progressData).reduce((sum, cat) => sum + cat.goal, 0)
  const totalDonors = Object.values(progressData).reduce((sum, cat) => sum + cat.donors, 0)

  // Recent donations mock data
  const recentDonations = [
    { name: 'Anonymous', amount: 100, category: 'FWS Learners', time: '2 hours ago' },
    { name: 'Sarah M.', amount: 25, category: 'Language Councils', time: '5 hours ago' },
    { name: 'James K.', amount: 50, category: 'Partner Schools', time: '1 day ago' },
    { name: 'Anonymous', amount: 15, category: 'FWS Learners', time: '1 day ago' },
    { name: 'Maria L.', amount: 200, category: 'Partner Schools', time: '2 days ago' },
  ]

  const milestones = [
    { amount: 10000, title: 'First Milestone', description: 'Launched 2 pilot programs', achieved: true },
    { amount: 25000, title: 'Expansion Phase', description: 'Added 3 new partner schools', achieved: true },
    { amount: 50000, title: 'Technology Upgrade', description: 'Provided tablets to 100 students', achieved: true },
    { amount: 75000, title: 'Community Center', description: 'Open first language learning center', achieved: false },
    { amount: 100000, title: 'Full Program', description: 'Support 500+ students annually', achieved: false },
  ]

  return (
    <>
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-teal-600 text-white py-12 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src="/images/generated/about-hero-educators.jpg"
            alt="Educators making impact"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-teal-600/90"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Your Impact in Action
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Track how donations are preserving African languages and transforming lives
            </p>
            
            {/* Overall Progress */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-3xl md:text-4xl font-bold">${totalRaised.toLocaleString()}</div>
                  <div className="text-sm text-white/80">Total Raised</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">{totalDonors}</div>
                  <div className="text-sm text-white/80">Total Donors</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">
                    {Math.round((totalRaised / totalGoal) * 100)}%
                  </div>
                  <div className="text-sm text-white/80">Of Goal</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-1000 ease-out"
                  style={{ width: `${(totalRaised / totalGoal) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-white/80">
                ${totalRaised.toLocaleString()} of ${totalGoal.toLocaleString()} goal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-teal-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Categories
            </button>
            {Object.entries(progressData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-teal-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {data.icon} {data.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Category Progress */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold mb-4">Progress by Category</h2>
              
              {Object.entries(progressData)
                .filter(([key]) => selectedCategory === 'all' || selectedCategory === key)
                .map(([key, data]) => (
                  <div key={key} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-3xl mr-3">{data.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold">{data.name}</h3>
                          <p className="text-sm text-gray-600">Updated {data.lastUpdate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-600">
                          ${data.raised.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          of ${data.goal.toLocaleString()} goal
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full bg-${data.color}-500 transition-all duration-1000 ease-out`}
                          style={{ width: `${(data.raised / data.goal) * 100}%` }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-sm">
                        <span className="text-gray-600">{data.donors} donors</span>
                        <span className="font-semibold">{Math.round((data.raised / data.goal) * 100)}%</span>
                      </div>
                    </div>
                    
                    {/* Impact */}
                    <div className="bg-gray-50 rounded-md p-3">
                      <p className="text-sm">
                        <span className="font-semibold">Impact:</span> {data.impact}
                      </p>
                    </div>
                  </div>
                ))}
              
              {/* Milestones */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">🎯 Milestones</h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`flex items-start ${milestone.achieved ? '' : 'opacity-60'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 ${
                        milestone.achieved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {milestone.achieved ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{milestone.title}</h4>
                          <span className="text-sm font-medium text-gray-600">
                            ${milestone.amount.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Recent Activity */}
            <div className="space-y-6">
              {/* Recent Donations */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">💝 Recent Donations</h3>
                <div className="space-y-3">
                  {recentDonations.map((donation, index) => (
                    <div key={index} className="pb-3 border-b last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{donation.name}</p>
                          <p className="text-xs text-gray-600">{donation.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-teal-600">${donation.amount}</p>
                          <p className="text-xs text-gray-500">{donation.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-lg p-6 border border-teal-200">
                <h3 className="text-xl font-bold mb-3">Join Our Mission</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Every contribution helps preserve African languages and support learners worldwide.
                </p>
                <Link 
                  href="/donate"
                  className="block text-center bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition-colors"
                >
                  Make a Donation
                </Link>
              </div>
              
              {/* Share */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-3">Share Our Progress</h3>
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="flex-1 bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition-colors">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                    <i className="fab fa-whatsapp"></i>
                  </button>
                  <button className="flex-1 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                    <i className="fas fa-link"></i>
                  </button>
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