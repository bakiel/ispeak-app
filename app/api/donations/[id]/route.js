import { NextResponse } from 'next/server'

// Note: Individual donation operations should use the MySQL backend API directly
// These routes are kept for backward compatibility but functionality is limited

// GET /api/donations/[id] - Get a specific donation
export async function GET(request, { params }) {
  try {
    const { id } = params

    // For now, return a placeholder - full implementation requires admin API
    return NextResponse.json({
      message: 'Use the MySQL backend API directly for donation details',
      id
    })
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

    // For now, return success - full implementation requires admin API
    return NextResponse.json({
      success: true,
      id,
      status: body.status
    })
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

    // For now, return success - full implementation requires admin API
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error in DELETE /api/donations/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}