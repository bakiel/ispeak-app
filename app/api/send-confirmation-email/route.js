import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, orderNumber, customerName, total, items = [] } = body

    // Validate required fields
    if (!email || !orderNumber || !customerName || !total) {
      return NextResponse.json(
        { error: 'Missing required fields for email confirmation' },
        { status: 400 }
      )
    }

    // Simulate email sending (in production, you'd use a service like SendGrid, Mailgun, etc.)
    console.log('=== CONFIRMATION EMAIL SIMULATION ===')
    console.log('To:', email)
    console.log('Subject: Order Confirmation - iSPEAK Language Learning')
    console.log('---')
    console.log(`Dear ${customerName},`)
    console.log('')
    console.log('Thank you for your order from iSPEAK Language Learning Program!')
    console.log('')
    console.log('ORDER DETAILS:')
    console.log(`Order Number: ${orderNumber}`)
    console.log(`Total Amount: $${total.toFixed(2)}`)
    console.log(`Order Date: ${new Date().toLocaleDateString()}`)
    console.log('')
    
    if (items.length > 0) {
      console.log('ITEMS ORDERED:')
      items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - Qty: ${item.quantity} - $${((item.salePrice || item.price) * item.quantity).toFixed(2)}`)
        if (item.size) console.log(`   Size: ${item.size}`)
        if (item.color) console.log(`   Color: ${item.color}`)
      })
      console.log('')
    }
    
    console.log('SHIPPING & DELIVERY:')
    console.log('Your order will be processed within 1-2 business days.')
    console.log('You will receive a shipping confirmation email with tracking information once your order ships.')
    console.log('')
    console.log('WHAT\'S NEXT:')
    console.log('• Your payment has been processed successfully')
    console.log('• Our team will prepare your order for shipment')
    console.log('• You\'ll receive shipping updates via email')
    console.log('• Continue your language learning journey!')
    console.log('')
    console.log('SUPPORT:')
    console.log('If you have any questions about your order, please contact us:')
    console.log('Email: info@ispeaklanguages.com')
    console.log('Phone: +1 (478) 390-4040')
    console.log('')
    console.log('Thank you for supporting African language education!')
    console.log('')
    console.log('Best regards,')
    console.log('The iSPEAK Team')
    console.log('=== END EMAIL SIMULATION ===')

    // In a real application, you would integrate with an email service:
    /*
    Example with SendGrid:
    
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
      to: email,
      from: 'orders@ispeaklanguages.com',
      subject: `Order Confirmation - ${orderNumber}`,
      html: generateEmailHtml(orderNumber, customerName, total, items)
    }
    
    await sgMail.send(msg)
    */

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent successfully',
      orderNumber,
      recipient: email
    })

  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return NextResponse.json(
      { error: 'Failed to send confirmation email, but your order was processed successfully.' },
      { status: 500 }
    )
  }
}

// Helper function to generate email HTML (for production use)
function generateEmailHtml(orderNumber, customerName, total, items) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - iSPEAK</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; text-align: center; color: white; }
        .content { padding: 20px; background: #fff; }
        .order-details { background: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .footer { background: #374151; color: white; padding: 20px; text-align: center; }
        .btn { display: inline-block; padding: 12px 24px; background: #fbbf24; color: #1f2937; text-decoration: none; border-radius: 5px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmation</h1>
          <p>Thank you for your purchase!</p>
        </div>
        
        <div class="content">
          <h2>Hello ${customerName}!</h2>
          <p>Your order has been confirmed and is being processed.</p>
          
          <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>You will receive shipping confirmation once your order is on the way.</p>
          
          <p style="text-align: center;">
            <a href="#" class="btn">Track Your Order</a>
          </p>
          
          <p>Thank you for supporting African language education!</p>
        </div>
        
        <div class="footer">
          <p>iSPEAK Language Learning Program</p>
          <p>info@ispeaklanguages.com | +1 (478) 390-4040</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}