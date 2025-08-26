'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const paymentIntentId = searchParams.get('payment_intent')
  const orderNumber = searchParams.get('order_number') || `ISP-${Date.now()}`

  useEffect(() => {
    // Simulate fetching order details
    const fetchOrderDetails = async () => {
      try {
        setLoading(true)
        
        // In a real app, you'd fetch the order details from your API
        // For now, we'll simulate the order data
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        
        const mockOrder = {
          orderNumber: orderNumber,
          paymentIntentId: paymentIntentId,
          customerInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
          },
          total: 89.97,
          status: 'confirmed',
          items: [
            {
              id: '1',
              name: 'iSPEAK Yoruba Learning Kit',
              quantity: 1,
              price: 49.99,
              image: '/images/mockups/yoruba-kit.jpg'
            },
            {
              id: '2',
              name: 'African Language Flashcards',
              quantity: 2,
              price: 19.99,
              image: '/images/mockups/flashcards.jpg'
            }
          ],
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
        }
        
        setOrderDetails(mockOrder)
      } catch (err) {
        console.error('Error fetching order details:', err)
        setError('Unable to load order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [paymentIntentId, orderNumber])

  if (loading) {
    return (
      <>
        <ModernNavigation />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            <p className="mt-4 text-gray-600">Loading your order details...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <ModernNavigation />
      
      <main className="min-h-screen bg-gray-50">
        {/* Success Header */}
        <section className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-green-100">
              Thank you for your purchase. Your order has been successfully processed.
            </p>
            {orderDetails && (
              <p className="text-lg mt-2">
                Order #{orderDetails.orderNumber}
              </p>
            )}
          </div>
        </section>

        {/* Order Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-bold text-red-800 mb-2">Unable to Load Order Details</h2>
                  <p className="text-red-600 mb-4">{error}</p>
                  <p className="text-sm text-red-500">
                    Don't worry - your payment was processed successfully. 
                    You should receive a confirmation email shortly.
                  </p>
                </div>
              ) : orderDetails && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Main Order Information */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Order Items */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-6">Order Items</h2>
                      <div className="space-y-4">
                        {orderDetails.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain p-2"
                                onError={(e) => {
                                  e.target.src = '/images/placeholder-product.jpg'
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What's Next */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-bold mb-4">What's Next?</h2>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-gray-900">1</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">Order Processing</h3>
                            <p className="text-gray-600 text-sm">We'll prepare your order within 1-2 business days</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-gray-600">2</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">Shipping Confirmation</h3>
                            <p className="text-gray-600 text-sm">You'll receive tracking information via email</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-gray-600">3</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">Delivery</h3>
                            <p className="text-gray-600 text-sm">
                              Estimated delivery: {orderDetails.estimatedDelivery}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Customer Support */}
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                      <p className="text-blue-700 text-sm mb-3">
                        If you have any questions about your order, we're here to help!
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="text-blue-600">
                          📧 Email: <a href="mailto:info@ispeaklanguages.com" className="hover:underline">info@ispeaklanguages.com</a>
                        </p>
                        <p className="text-blue-600">
                          📞 Phone: <a href="tel:+14783904040" className="hover:underline">+1 (478) 390-4040</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Order Number</span>
                          <span className="font-mono">{orderDetails.orderNumber}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Status</span>
                          <span className="capitalize text-green-600 font-semibold">
                            {orderDetails.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Payment Method</span>
                          <span>Card ending in ****</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Order Date</span>
                          <span>{new Date().toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between font-bold">
                          <span>Total Paid</span>
                          <span>${orderDetails.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Link 
                          href="/shop"
                          className="w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-yellow-300 transition-colors text-center block"
                        >
                          Continue Shopping
                        </Link>
                        <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors">
                          Print Receipt
                        </button>
                      </div>

                      {/* Payment Confirmation */}
                      {paymentIntentId && (
                        <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-green-800 text-xs">
                            ✓ Payment Confirmed
                          </p>
                          <p className="text-green-600 text-xs mt-1 font-mono">
                            ID: {paymentIntentId.substring(0, 20)}...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Educational Impact Section */}
        <section className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Thank You for Supporting Education!</h2>
            <p className="text-xl text-orange-100 mb-6">
              Your purchase helps fund free language lessons for underserved communities across Africa
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-orange-200">Students Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4</div>
                <div className="text-orange-200">Languages Taught</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-orange-200">Native Educators</div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Sharing */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold mb-4">Share Your Language Learning Journey</h3>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                Share on Facebook
              </button>
              <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 text-sm">
                Share on Twitter
              </button>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 text-sm">
                Share on Instagram
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}