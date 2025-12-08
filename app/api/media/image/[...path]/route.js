import { NextResponse } from 'next/server'

// Remove /api suffix if present
const getApiBase = () => {
  const base = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'
  return base.replace(/\/api\/?$/, '')
}

export async function GET(request, { params }) {
  try {
    const pathSegments = await params.path
    const imagePath = pathSegments.join('/')

    const API_BASE = getApiBase()
    const imageUrl = `${API_BASE}/${imagePath}`

    const response = await fetch(imageUrl)

    if (!response.ok) {
      return new NextResponse('Image not found', { status: 404 })
    }

    const contentType = response.headers.get('content-type') || 'image/png'
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch (error) {
    console.error('Image proxy error:', error)
    return new NextResponse('Failed to fetch image', { status: 500 })
  }
}
