import { NextResponse } from 'next/server'

const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'
  return base.replace(/\/api\/?$/, '')
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const API_BASE = getApiBase()

    const response = await fetch(`${API_BASE}/api/content/testimonials?${searchParams}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}
