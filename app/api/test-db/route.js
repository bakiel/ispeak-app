import { productsAPI } from '@/lib/api-client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test MySQL backend API connection
    const { data, error } = await productsAPI.getAll({ limit: 5 })

    if (error) {
      return NextResponse.json({
        error: 'MySQL API query failed',
        details: error.message,
        api_url: process.env.NEXT_PUBLIC_API_URL ? 'SET' : 'NOT SET'
      }, { status: 500 })
    }

    const products = data?.products || data || []

    return NextResponse.json({
      success: true,
      products: products.map(p => ({ name: p.name, stock_quantity: p.stock_quantity, in_stock: p.in_stock })),
      count: products.length,
      environment: {
        api_url: process.env.NEXT_PUBLIC_API_URL ? 'CONFIGURED' : 'MISSING'
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Server error',
      message: error.message
    }, { status: 500 })
  }
}