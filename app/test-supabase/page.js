'use client'
import { useEffect, useState } from 'react'
import { blogAPI, productsAPI } from '@/lib/api-client'

export default function TestAPI() {
  const [status, setStatus] = useState('Testing API connection...')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Blog posts
        const postsResult = await blogAPI.getRecentPosts(1)

        if (postsResult.error) throw new Error(postsResult.error.message)

        // Test 2: Products
        const productsResult = await productsAPI.getAll({ limit: 3 })

        if (productsResult.error) throw new Error(productsResult.error.message)

        setStatus('Connection successful!')
        setData({
          posts: postsResult.data?.posts || postsResult.data || [],
          products: (productsResult.data?.products || productsResult.data || []).slice(0, 3)
        })
      } catch (err) {
        setStatus('Connection failed')
        setError(err.message)
        console.error('API test error:', err)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">MySQL API Connection Test</h1>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Status:</h2>
        <p className="text-lg">{status}</p>
      </div>

      {error && (
        <div className="bg-red-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Error:</h2>
          <pre className="text-red-600">{error}</pre>
        </div>
      )}

      {data && (
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Data Retrieved:</h2>
          <pre className="text-green-800">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-2">Connection Details:</h3>
        <p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'Using default'}</p>
      </div>
    </div>
  )
}