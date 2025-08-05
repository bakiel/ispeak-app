'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ProductError({ error, reset }) {
  useEffect(() => {
    console.error('Product error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <img
            src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png"
            alt="Paji mascot"
            className="w-32 h-32 mx-auto mb-4 opacity-75"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Product Not Available
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't load this product. It might be out of stock or temporarily unavailable.
        </p>
        
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
          >
            Try again
          </button>
          
          <Link
            href="/shop"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  )
}