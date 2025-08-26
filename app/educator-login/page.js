'use client'

import { useState } from 'react'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function EducatorLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Implement actual educator login logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Redirect to educator dashboard after successful login
    } catch (err) {
      setError('Invalid educator credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chalkboard-teacher text-3xl text-teal-600"></i>
              </div>
              <h1 className="text-3xl font-bold">Educator Portal</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, educator! Login to access your dashboard.
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Educator Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="educator@ispeaklanguage.org"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-teal-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-white py-3 rounded-md font-bold hover:bg-teal-600 transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In to Educator Portal'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Not an educator yet?
                </p>
                <Link 
                  href="/educator-apply" 
                  className="text-teal-600 font-medium hover:underline"
                >
                  Apply to become an iSPEAK educator
                </Link>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Are you a parent/student?{' '}
                  <Link href="/login" className="text-teal-600 hover:underline">
                    Go to student login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Educator Resources */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800">
              <i className="fas fa-info-circle mr-2"></i>
              Need help? Contact educator support at{' '}
              <a href="mailto:educators@ispeaklanguage.org" className="font-medium underline">
                educators@ispeaklanguage.org
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}