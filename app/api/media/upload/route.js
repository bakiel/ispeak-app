import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Remove /api suffix if present to avoid double /api/api
const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'
  return base.replace(/\/api\/?$/, '')
}

// Admin secret key for media operations
const ADMIN_SECRET_KEY = 'ispeak-admin-2024'

export async function POST(request) {
  try {
    // Get the auth token from cookies or headers (optional now)
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value ||
                  request.headers.get('Authorization')?.replace('Bearer ', '')

    // Forward the multipart form data to the backend
    const formData = await request.formData()

    const API_BASE = getApiBase()

    // Build headers - use token if available, otherwise use secret key
    const headers = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      headers['X-API-Key'] = ADMIN_SECRET_KEY
    }

    const response = await fetch(`${API_BASE}/api/media/upload`, {
      method: 'POST',
      headers,
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Upload failed' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Media Upload Error:', error)
    return NextResponse.json(
      { error: 'Failed to upload media' },
      { status: 500 }
    )
  }
}
