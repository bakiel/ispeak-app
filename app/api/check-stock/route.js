import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Direct database check without using supabase client
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return NextResponse.json({ 
        error: 'Environment variables not configured',
        SUPABASE_URL: SUPABASE_URL ? 'SET' : 'MISSING',
        SUPABASE_KEY: SUPABASE_KEY ? 'SET' : 'MISSING'
      })
    }

    // Make direct API call to Supabase
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?project_name=eq.ispeak&select=name,stock_quantity,in_stock&limit=5`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    return NextResponse.json({ 
      success: true,
      environment: {
        url_configured: !!SUPABASE_URL,
        key_configured: !!SUPABASE_KEY
      },
      products: data,
      raw_response_status: response.status
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch',
      message: error.message 
    }, { status: 500 })
  }
}