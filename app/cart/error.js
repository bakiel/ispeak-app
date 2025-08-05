'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[400px] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <img
          src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png"
          alt="Paji looking concerned"
          className="w-32 h-32 mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Cart Error
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an error while loading your cart. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}