import { NextResponse } from 'next/server'
import { ecommerceQueries } from '@/lib/supabase'

// Fallback mock database for when Supabase is not configured
let orders = []
let nextOrderNumber = 1000

function generateOrderNumber() {
  return `ISP-${nextOrderNumber++}`
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      customerInfo, 
      shippingAddress, 
      billingAddress, 
      total, 
      paymentIntentId, 
      status = 'pending',
      items = []
    } = body

    // Validate required fields
    if (!customerInfo?.email || !customerInfo?.firstName || !customerInfo?.lastName) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      )
    }

    if (!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.state) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      )
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Valid order total is required' },
        { status: 400 }
      )
    }

    // Create new order data
    const orderData = {
      orderNumber: generateOrderNumber(),
      customerInfo,
      shippingAddress,
      billingAddress,
      items,
      total,
      paymentIntentId,
      status
    }

    // Try to save to Supabase, fallback to local storage
    const { data: order, error } = await ecommerceQueries.createOrder(orderData)

    if (error) {
      console.error('Error saving order:', error)
      // Fallback to local storage
      const fallbackOrder = {
        id: Date.now().toString(),
        ...orderData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      orders.push(fallbackOrder)
      
      return NextResponse.json({
        id: fallbackOrder.id,
        orderNumber: fallbackOrder.orderNumber,
        status: fallbackOrder.status,
        total: fallbackOrder.total,
        createdAt: fallbackOrder.createdAt
      })
    }

    console.log('Order created:', {
      orderNumber: order.order_number || order.orderNumber,
      customer: customerInfo.email,
      total: total,
      status: status
    })

    return NextResponse.json({
      id: order.id,
      orderNumber: order.order_number || order.orderNumber,
      status: order.status,
      total: order.total_amount || order.total,
      createdAt: order.created_at || order.createdAt
    })

  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'An error occurred while creating your order. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const orderNumber = searchParams.get('orderNumber')

    let filteredOrders = orders

    // Filter by email if provided
    if (email) {
      filteredOrders = filteredOrders.filter(order => 
        order.customerInfo.email.toLowerCase() === email.toLowerCase()
      )
    }

    // Filter by order number if provided
    if (orderNumber) {
      filteredOrders = filteredOrders.filter(order => 
        order.orderNumber === orderNumber
      )
    }

    // Return orders (without sensitive payment info)
    const publicOrders = filteredOrders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerInfo: {
        firstName: order.customerInfo.firstName,
        lastName: order.customerInfo.lastName,
        email: order.customerInfo.email
      },
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      itemCount: order.items?.length || 0
    }))

    return NextResponse.json({ orders: publicOrders })

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching orders.' },
      { status: 500 }
    )
  }
}