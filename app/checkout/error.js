'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function CheckoutError({ error, reset }) {
  useEffect(() => {
    console.error('Checkout error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <img
            src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png"
            alt="Paji mascot"
            className="w-32 h-32 mx-auto mb-4"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Checkout Error
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We encountered an issue during checkout. Your payment has not been processed. Please try again.
        </p>
        
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
          >
            Try again
          </button>
          
          <Link
            href="/cart"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Back to cart
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            If the problem persists, please contact support at{' '}
            <a href="mailto:info@ispeaklanguages.com" className="text-yellow-600 hover:text-yellow-700">
              info@ispeaklanguages.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}