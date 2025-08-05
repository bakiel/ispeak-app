import { NextResponse } from 'next/server'

// Mock database - in production, this would use Supabase
let orders = []

export async function GET(request, { params }) {
  try {
    const { id } = params
    
    const order = orders.find(o => o.id === id)
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Return order without sensitive payment info
    const publicOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      customerInfo: order.customerInfo,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      items: order.items,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }

    return NextResponse.json({ order: publicOrder })

  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching the order.' },
      { status: 500 }
    )
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    
    const orderIndex = orders.findIndex(o => o.id === id)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Update order
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    console.log('Order updated:', {
      orderNumber: orders[orderIndex].orderNumber,
      newStatus: orders[orderIndex].status
    })

    return NextResponse.json({
      id: orders[orderIndex].id,
      orderNumber: orders[orderIndex].orderNumber,
      status: orders[orderIndex].status,
      updatedAt: orders[orderIndex].updatedAt
    })

  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'An error occurred while updating the order.' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    const orderIndex = orders.findIndex(o => o.id === id)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Remove order
    const deletedOrder = orders.splice(orderIndex, 1)[0]

    console.log('Order deleted:', {
      orderNumber: deletedOrder.orderNumber
    })

    return NextResponse.json({
      message: 'Order deleted successfully',
      orderNumber: deletedOrder.orderNumber
    })

  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'An error occurred while deleting the order.' },
      { status: 500 }
    )
  }
}