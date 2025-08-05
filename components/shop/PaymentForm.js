'use client'

import { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement
} from '@stripe/react-stripe-js'

export default function PaymentForm({
  clientSecret,
  customerInfo,
  shippingAddress,
  billingAddress,
  onSuccess,
  total
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [saveCard, setSaveCard] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setMessage('Stripe is not loaded yet. Please try again.')
      return
    }

    setIsProcessing(true)
    setMessage('')

    try {
      // Create order in database before confirming payment
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          shippingAddress,
          billingAddress,
          total,
          paymentIntentId: clientSecret.split('_secret_')[0],
          status: 'pending'
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const order = await orderResponse.json()

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          payment_method_data: {
            billing_details: {
              name: `${customerInfo.firstName} ${customerInfo.lastName}`,
              email: customerInfo.email,
              phone: customerInfo.phone,
              address: {
                line1: billingAddress.address,
                line2: billingAddress.address2,
                city: billingAddress.city,
                state: billingAddress.state,
                postal_code: billingAddress.zipCode,
                country: billingAddress.country
              }
            }
          }
        },
        redirect: 'if_required'
      })

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message)
        } else {
          setMessage('An unexpected error occurred. Please try again.')
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Update order status to completed
        await fetch(`/api/orders/${order.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'completed',
            paymentIntentId: paymentIntent.id
          }),
        })

        // Send confirmation email (simulation)
        await fetch('/api/send-confirmation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: customerInfo.email,
            orderNumber: order.orderNumber,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            total
          }),
        })

        onSuccess(paymentIntent)
      }
    } catch (err) {
      console.error('Payment error:', err)
      setMessage('An error occurred while processing your payment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Payment Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Details
          </label>
          <div className="border border-gray-300 rounded-md p-4">
            <PaymentElement
              options={{
                layout: 'tabs',
                defaultValues: {
                  billingDetails: {
                    name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                    email: customerInfo.email,
                    phone: customerInfo.phone,
                    address: {
                      line1: billingAddress.address,
                      line2: billingAddress.address2,
                      city: billingAddress.city,
                      state: billingAddress.state,
                      postal_code: billingAddress.zipCode,
                      country: billingAddress.country
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Save Card Option */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="save-card"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            className="mr-3 text-yellow-400 focus:ring-yellow-400"
          />
          <label htmlFor="save-card" className="text-sm">
            Save payment method for future purchases
          </label>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(total - 7.99 - (total * 0.08)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$7.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 font-bold">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {message && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{message}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-3 px-4 rounded-md font-medium text-white ${
            !stripe || isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } transition-colors`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </div>
          ) : (
            `Complete Order • $${total.toFixed(2)}`
          )}
        </button>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-600">
          <div className="flex justify-center items-center space-x-4 mb-2">
            <span>🔒 Your payment is secure</span>
            <span>💳 Powered by Stripe</span>
          </div>
          <p className="text-xs">
            Your payment information is encrypted and processed securely. 
            We never store your card details on our servers.
          </p>
        </div>

        {/* Test Card Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <h4 className="font-semibold text-blue-800 mb-2">Test Mode</h4>
          <p className="text-blue-700 text-sm mb-2">
            This is a test environment. Use these test card numbers:
          </p>
          <div className="text-xs text-blue-600 space-y-1">
            <div>• 4242 4242 4242 4242 (Visa - Success)</div>
            <div>• 4000 0000 0000 0002 (Visa - Declined)</div>
            <div>• Use any future expiry date and any CVC</div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="text-xs text-gray-600 text-center">
          <p>
            By placing your order, you agree to our{' '}
            <button type="button" className="text-yellow-600 hover:underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-yellow-600 hover:underline">
              Privacy Policy
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}