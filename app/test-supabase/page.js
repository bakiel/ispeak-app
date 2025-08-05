'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabase() {
  const [status, setStatus] = useState('Testing connection...')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Basic connection
        const { data: posts, error: postsError } = await supabase
          .from('blog_posts')
          .select('id, title')
          .limit(1)

        if (postsError) throw postsError

        // Test 2: Categories
        const { data: categories, error: catError } = await supabase
          .from('blog_categories')
          .select('id, name')

        if (catError) throw catError

        setStatus('✅ Connection successful!')
        setData({
          posts: posts || [],
          categories: categories || []
        })
      } catch (err) {
        setStatus('❌ Connection failed')
        setError(err.message)
        console.error('Supabase test error:', err)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
      
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
        <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
      </div>
    </div>
  )
}