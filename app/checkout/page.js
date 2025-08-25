'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CheckoutForm from '@/components/shop/CheckoutForm'
import PaymentForm from '@/components/shop/PaymentForm'
import { useCart } from '@/lib/cartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Load Stripe with test publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef')

export default function CheckoutPage() {
  const router = useRouter()
  const { items: cartItems, total, itemCount, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })
  const [billingAddress, setBillingAddress] = useState({
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })
  const [billingMatchesShipping, setBillingMatchesShipping] = useState(true)
  const [guestCheckout, setGuestCheckout] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [communityContribution, setCommunityContribution] = useState(false)
  const communityContributionAmount = 5.00

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/cart')
    }
  }, [cartItems.length, router])

  // Create payment intent when moving to payment step
  useEffect(() => {
    if (currentStep === 3 && !clientSecret) {
      createPaymentIntent()
    }
  }, [currentStep, clientSecret])

  const createPaymentIntent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round((total + (communityContribution ? communityContributionAmount : 0)) * 100), // Convert to cents
          currency: 'usd',
          items: cartItems,
          customerInfo,
          shippingAddress,
          billingAddress: billingMatchesShipping ? shippingAddress : billingAddress,
          communityContribution: communityContribution ? communityContributionAmount : 0
        }),
      })

      const data = await response.json()
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
      } else {
        throw new Error('Failed to create payment intent')
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      alert('Error initializing payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Information', description: 'Contact & Shipping' },
    { number: 2, title: 'Review', description: 'Verify Order' },
    { number: 3, title: 'Payment', description: 'Complete Purchase' }
  ]

  const handleStepValidation = (step) => {
    switch (step) {
      case 1:
        return (
          customerInfo.email &&
          customerInfo.firstName &&
          customerInfo.lastName &&
          shippingAddress.address &&
          shippingAddress.city &&
          shippingAddress.state &&
          shippingAddress.zipCode
        )
      case 2:
        return true // Review step is always valid if reached
      default:
        return false
    }
  }

  const nextStep = () => {
    if (handleStepValidation(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    } else {
      alert('Please fill in all required fields')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handlePaymentSuccess = (paymentIntent) => {
    // Clear cart and redirect to success page
    clearCart()
    router.push(`/checkout/success?payment_intent=${paymentIntent.id}`)
  }

  if (cartItems.length === 0) {
    return null // Will redirect via useEffect
  }

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
                <p className="text-gray-600 mt-1">
                  {itemCount} items • ${(total + (communityContribution ? communityContributionAmount : 0)).toFixed(2)}
                </p>
              </div>
              <Link 
                href="/cart"
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.number
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="text-center mt-2">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-yellow-400' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  {currentStep === 1 && (
                    <CheckoutForm
                      customerInfo={customerInfo}
                      setCustomerInfo={setCustomerInfo}
                      shippingAddress={shippingAddress}
                      setShippingAddress={setShippingAddress}
                      billingAddress={billingAddress}
                      setBillingAddress={setBillingAddress}
                      billingMatchesShipping={billingMatchesShipping}
                      setBillingMatchesShipping={setBillingMatchesShipping}
                      guestCheckout={guestCheckout}
                      setGuestCheckout={setGuestCheckout}
                    />
                  )}

                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                      
                      {/* Customer Info Review */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <p>{customerInfo.email}</p>
                        <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                        {customerInfo.phone && <p>{customerInfo.phone}</p>}
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-yellow-600 hover:text-yellow-700 text-sm mt-2"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Shipping Address Review */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Shipping Address</h3>
                        <p>{shippingAddress.address}</p>
                        {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
                        <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                        <p>{shippingAddress.country}</p>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-yellow-600 hover:text-yellow-700 text-sm mt-2"
                        >
                          Edit
                        </button>
                      </div>

                      {/* Order Items Review */}
                      <div className="mb-6">
                        <h3 className="font-semibold mb-4">Order Items</h3>
                        <div className="space-y-4">
                          {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <div className="text-sm text-gray-600">
                                  {item.size && <span>Size: {item.size} </span>}
                                  {item.color && <span>Color: {item.color}</span>}
                                </div>
                                <p className="text-sm">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <PaymentForm
                        clientSecret={clientSecret}
                        customerInfo={customerInfo}
                        shippingAddress={shippingAddress}
                        billingAddress={billingMatchesShipping ? shippingAddress : billingAddress}
                        onSuccess={handlePaymentSuccess}
                        total={total + (communityContribution ? communityContributionAmount : 0)}
                      />
                    </Elements>
                  )}

                  {currentStep === 3 && !clientSecret && loading && (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                      <p className="mt-2 text-gray-600">Preparing payment...</p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`px-6 py-2 rounded-md font-medium ${
                        currentStep === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Previous
                    </button>
                    
                    {currentStep < 3 && (
                      <button
                        onClick={nextStep}
                        className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-md font-medium hover:bg-yellow-300"
                      >
                        {currentStep === 2 ? 'Continue to Payment' : 'Continue'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                  
                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-semibold">
                          ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Community Contribution Option */}
                  <div className="border-t pt-4 mb-4" role="group" aria-labelledby="community-contribution-heading">
                    <h3 id="community-contribution-heading" className="sr-only">
                      Community Contribution Option
                    </h3>
                    <div className="bg-gradient-to-r from-teal-50 to-yellow-50 rounded-lg p-4 border border-teal-200">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={communityContribution}
                          onChange={(e) => setCommunityContribution(e.target.checked)}
                          className="mt-1 mr-3 h-4 w-4 text-teal-600 rounded focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                          aria-describedby="contribution-description"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900">
                              🌍 Support Language Preservation
                            </span>
                            <span className="font-bold text-teal-600" aria-label="Five dollars">
                              $5.00
                            </span>
                          </div>
                          <p id="contribution-description" className="text-sm text-gray-700 mt-1">
                            Help fund indigenous language councils, provide scholarships for learners, 
                            and support partner schools across Africa
                          </p>
                          <p className="text-xs text-teal-700 mt-2 font-medium">
                            ✓ 100% goes to education initiatives
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Order Totals */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${(total - 7.99 - (total * 0.08)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>$7.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                    {communityContribution && (
                      <div className="flex justify-between text-sm text-teal-600">
                        <span>Community Contribution</span>
                        <span>$5.00</span>
                      </div>
                    )}
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(total + (communityContribution ? communityContributionAmount : 0)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-6 text-center text-sm text-gray-600">
                    <div className="flex justify-center items-center space-x-4 mb-2">
                      <span>🔒 Secure Checkout</span>
                      <span>💳 SSL Protected</span>
                    </div>
                    <p className="text-xs">256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}