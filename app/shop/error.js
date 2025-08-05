'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ShopError({ error, reset }) {
  useEffect(() => {
    console.error('Shop error:', error)
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
          Shop Error
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We're having trouble loading the shop. This might be a temporary issue.
        </p>
        
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
          >
            Try again
          </button>
          
          <Link
            href="/"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}