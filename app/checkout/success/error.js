'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[400px] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Processing Error
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an error while processing your payment confirmation. Your order may still have been processed successfully.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/shop"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}