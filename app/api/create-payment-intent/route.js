import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with test secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51234567890abcdef', {
  apiVersion: '2023-10-16',
})

export async function POST(request) {
  try {
    const body = await request.json()
    const { amount, currency = 'usd', items, customerInfo, shippingAddress, billingAddress } = body

    // Validate required fields
    if (!amount || amount < 50) { // Stripe minimum is $0.50
      return NextResponse.json(
        { error: 'Invalid amount. Minimum charge is $0.50' },
        { status: 400 }
      )
    }

    if (!customerInfo?.email) {
      return NextResponse.json(
        { error: 'Customer email is required' },
        { status: 400 }
      )
    }

    // Create or retrieve customer
    let customer
    try {
      // Try to find existing customer by email
      const existingCustomers = await stripe.customers.list({
        email: customerInfo.email,
        limit: 1
      })

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: customerInfo.email,
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          phone: customerInfo.phone,
          address: {
            line1: shippingAddress.address,
            line2: shippingAddress.address2,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postal_code: shippingAddress.zipCode,
            country: shippingAddress.country
          },
          metadata: {
            source: 'iSPEAK checkout'
          }
        })
      }
    } catch (customerError) {
      console.error('Error with customer:', customerError)
      // Continue without customer if there's an error
      customer = null
    }

    // Prepare order items for metadata
    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.salePrice || item.price,
      size: item.size,
      color: item.color
    }))

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: currency.toLowerCase(),
      customer: customer?.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never' // Prevents redirect-based payment methods
      },
      shipping: {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        phone: customerInfo.phone,
        address: {
          line1: shippingAddress.address,
          line2: shippingAddress.address2,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.zipCode,
          country: shippingAddress.country
        }
      },
      metadata: {
        order_source: 'iSPEAK website',
        customer_email: customerInfo.email,
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        item_count: items.length.toString(),
        order_items: JSON.stringify(orderItems).substring(0, 500), // Stripe metadata has 500 char limit
        shipping_city: shippingAddress.city,
        shipping_state: shippingAddress.state
      },
      description: `iSPEAK Order - ${items.length} item${items.length > 1 ? 's' : ''} for ${customerInfo.firstName} ${customerInfo.lastName}`
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      customerId: customer?.id
    })

  } catch (error) {
    console.error('Error creating payment intent:', error)
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid request. Please check your payment information.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle GET requests (not allowed)
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

// Handle other methods
export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}