import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Remove /api suffix if present to avoid double /api/api
const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'
  return base.replace(/\/api\/?$/, '')
}

export async function POST(request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value ||
                  request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const API_BASE = getApiBase()

    const response = await fetch(`${API_BASE}/api/media/upload-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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
