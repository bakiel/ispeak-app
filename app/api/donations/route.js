import { NextResponse } from 'next/server'
import { createDonation, getDonations, getDonationStats } from '@/lib/supabase-donations'

// GET /api/donations - Get donations list or stats
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    if (type === 'stats') {
      // Get donation statistics
      const { data, error } = await getDonationStats()
      
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      
      return NextResponse.json(data)
    } else {
      // Get donations list with filters
      const filters = {
        status: searchParams.get('status'),
        email: searchParams.get('email'),
        startDate: searchParams.get('startDate'),
        endDate: searchParams.get('endDate'),
        limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null
      }
      
      const { data, error } = await getDonations(filters)
      
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }
      
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error('Error in GET /api/donations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/donations - Create a new donation
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.amount || !body.email || !body.categories || body.categories.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create donation in database
    const { data, error } = await createDonation({
      amount: body.amount,
      donationType: body.donationType || 'one-time',
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      isAnonymous: body.isAnonymous || false,
      categories: body.categories,
      paymentMethod: body.paymentMethod || 'card'
    })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in POST /api/donations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}