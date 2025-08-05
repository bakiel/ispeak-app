'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center px-4">
          <div className="mb-8">
            <img
              src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png"
              alt="Paji looking confused"
              className="w-40 h-40 mx-auto mb-4"
            />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Paji couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="space-x-4">
            <Link
              href="/"
              className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
            >
              Go Home
            </Link>
            
            <Link
              href="/shop"
              className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              Visit Shop
            </Link>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:info@ispeaklanguages.com" className="text-yellow-600 hover:text-yellow-700">
                info@ispeaklanguages.com
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}