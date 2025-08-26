import { NextResponse } from 'next/server'
import { updateDonationStatus } from '@/lib/supabase-donations'
import { supabaseAdmin } from '@/lib/supabase-donations'

// GET /api/donations/[id] - Get a specific donation
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    const { data, error } = await supabaseAdmin
      .from('donations')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/donations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/donations/[id] - Update donation status
export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    
    if (!body.status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }
    
    const { data, error } = await updateDonationStatus(
      id,
      body.status,
      body.transactionId
    )
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PATCH /api/donations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/donations/[id] - Delete a donation (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    // In production, add authentication check here
    // if (!isAdmin(request)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }
    
    const { error } = await supabaseAdmin
      .from('donations')
      .delete()
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/donations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}