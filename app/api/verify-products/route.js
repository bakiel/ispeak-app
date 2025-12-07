import { productsAPI } from '@/lib/api-client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if API is configured
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const isConfigured = !!apiUrl

    // Query products from MySQL backend
    const { data, error } = await productsAPI.getAll({ status: 'active' })

    if (error) {
      return NextResponse.json({
        error: error.message,
        isConfigured,
        apiUrl: apiUrl ? 'Set' : 'Not set'
      }, { status: 500 })
    }

    const products = data?.products || data || []

    return NextResponse.json({
      isConfigured,
      count: products.length,
      products: products,
      apiUrl: apiUrl ? apiUrl.substring(0, 30) + '...' : 'Not set',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      type: 'catch block error'
    }, { status: 500 })
  }
}