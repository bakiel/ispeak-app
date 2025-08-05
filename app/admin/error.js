'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error('Admin error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Admin Panel Error
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          An error occurred in the admin panel. This might be a permissions issue or a temporary problem.
        </p>
        
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
          >
            Try again
          </button>
          
          <Link
            href="/admin"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Back to admin
          </Link>
        </div>
      </div>
    </div>
  )
}