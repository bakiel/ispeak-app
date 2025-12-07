import { NextResponse } from 'next/server'
import { donationsAPI } from '@/lib/api-client'

// GET /api/donations - Get donations list or stats
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'stats') {
      // Get donation statistics
      const { data, error } = await donationsAPI.getStats()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json(data)
    } else if (type === 'progress') {
      // Get donation progress
      const { data, error } = await donationsAPI.getProgress()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json(data)
    } else {
      // Get recent donations
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 10
      const { data, error } = await donationsAPI.getRecent(limit)

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
    if (!body.amount || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create donation via API
    const { data, error } = await donationsAPI.create({
      amount: body.amount,
      frequency: body.donationType || 'one-time',
      donor_email: body.email,
      donor_first_name: body.firstName,
      donor_last_name: body.lastName,
      donor_phone: body.phone,
      is_anonymous: body.isAnonymous || false,
      category: body.categories?.[0] || 'general',
      payment_method: body.paymentMethod || 'card'
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