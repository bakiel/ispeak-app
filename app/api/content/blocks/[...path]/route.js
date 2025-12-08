import { NextResponse } from 'next/server'

const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'
  return base.replace(/\/api\/?$/, '')
}

export async function GET(request, { params }) {
  try {
    const pathSegments = await params.path
    const blocksPath = pathSegments.join('/')
    const { searchParams } = new URL(request.url)
    const API_BASE = getApiBase()

    const response = await fetch(`${API_BASE}/api/content/blocks/${blocksPath}?${searchParams}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Content blocks fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch content blocks' }, { status: 500 })
  }
}
