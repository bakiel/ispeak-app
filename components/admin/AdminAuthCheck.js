'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminAuthCheck({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const authData = localStorage.getItem('adminAuth')
      
      if (authData) {
        const auth = JSON.parse(authData)
        // Check if session is less than 24 hours old
        const isValid = (Date.now() - auth.timestamp) < 24 * 60 * 60 * 1000
        
        if (isValid) {
          setIsAuthenticated(true)
        } else {
          // Session expired
          localStorage.removeItem('adminAuth')
          router.push('/admin/login')
        }
      } else {
        // No auth data
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return <>{children}</>
}