import { NextResponse } from 'next/server'

// Remove /api suffix if present to avoid double /api/api
const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'
  return base.replace(/\/api\/?$/, '')
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const limit = searchParams.get('limit') || '50'
    const offset = searchParams.get('offset') || '0'

    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (type) params.append('type', type)
    params.append('limit', limit)
    params.append('offset', offset)

    const API_BASE = getApiBase()
    const response = await fetch(`${API_BASE}/api/media?${params}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Media API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}
