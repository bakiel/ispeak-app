import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Remove /api suffix if present to avoid double /api/api
const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'
  return base.replace(/\/api\/?$/, '')
}

// Admin secret key for media operations
const ADMIN_SECRET_KEY = 'ispeak-admin-2024'

export async function POST(request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value ||
                  request.headers.get('Authorization')?.replace('Bearer ', '')

    const body = await request.json()
    const API_BASE = getApiBase()

    // Build headers - use token if available, otherwise use secret key
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      headers['X-API-Key'] = ADMIN_SECRET_KEY
    }

    const response = await fetch(`${API_BASE}/api/media/upload-url`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'URL import failed' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('URL Import Error:', error)
    return NextResponse.json(
      { error: 'Failed to import from URL' },
      { status: 500 }
    )
  }
}
