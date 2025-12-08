import { NextResponse } from 'next/server'

// Remove /api suffix if present to avoid double /api/api
const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'
  return base.replace(/\/api\/?$/, '')
}

export async function GET() {
  try {
    const API_BASE = getApiBase()
    const response = await fetch(`${API_BASE}/api/media/folders/list`, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Folders Fetch Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch folders' },
      { status: 500 }
    )
  }
}
