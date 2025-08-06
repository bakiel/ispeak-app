import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test Supabase connection and fetch products
    const { data, error } = await supabase
      .from('products')
      .select('name, stock_quantity, in_stock')
      .eq('project_name', 'ispeak')
      .limit(5)

    if (error) {
      return NextResponse.json({ 
        error: 'Supabase query failed', 
        details: error.message,
        supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
        supabase_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      products: data,
      count: data?.length || 0,
      environment: {
        supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'CONFIGURED' : 'MISSING',
        supabase_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'CONFIGURED' : 'MISSING'
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error', 
      message: error.message 
    }, { status: 500 })
  }
}