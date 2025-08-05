import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    const isConfigured = supabaseUrl && supabaseKey && 
      supabaseUrl !== 'your_supabase_url_here' && 
      supabaseKey !== 'your_supabase_anon_key_here'
    
    // Query products
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('project_name', 'ispeak')
      .eq('status', 'active')
      .order('name')
    
    if (error) {
      return NextResponse.json({ 
        error: error.message,
        isConfigured,
        supabaseUrl: supabaseUrl ? 'Set' : 'Not set',
        query: "from('products').select('*').eq('project_name', 'ispeak').eq('status', 'active')"
      }, { status: 500 })
    }
    
    return NextResponse.json({
      isConfigured,
      count: data?.length || 0,
      products: data || [],
      supabaseUrl: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'Not set',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: error.message,
      type: 'catch block error'
    }, { status: 500 })
  }
}