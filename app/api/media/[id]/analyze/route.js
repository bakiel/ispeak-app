import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Remove /api suffix if present to avoid double /api/api
const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'
  return base.replace(/\/api\/?$/, '')
}

export async function POST(request, { params }) {
  try {
    const { id } = await params

    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value ||
                  request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const API_BASE = getApiBase()

    const response = await fetch(`${API_BASE}/api/media/${id}/analyze`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Analysis failed' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Media Analysis Error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze media' },
      { status: 500 }
    )
  }
}
