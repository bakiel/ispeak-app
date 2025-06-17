'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  CheckCircle, 
  Package, 
  Mail, 
  Download, 
  Calendar,
  Printer,
  ArrowRight,
  BookOpen,
  Users,
  Gift,
  Star,
  Clock,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface OrderDetails {
  orderId: string
  email: string
  total: number
  items: Array<{
    name: string
    type: 'course' | 'product'
    quantity: number
    price: number
  }>
  estimatedDelivery?: string
  pointsEarned: number
}

export default function OrderSuccessPage() {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from API
    const orderId = localStorage.getItem('lastOrderId') || 'ORD-' + Date.now()
    
    // Mock order details
    const mockOrder: OrderDetails = {
      orderId: orderId,
      email: 'parent@example.com',
      total: 219.96,
      items: [
        {
          name: 'Yoruba Language Course - 3 Months',
          type: 'course',
          quantity: 1,
          price: 149.99
        },
        {
          name: 'My First Yoruba Words Board Book',
          type: 'product',
          quantity: 2,
          price: 19.99
        },
        {
          name: 'Cultural Activity Box - Monthly',
          type: 'product',
          quantity: 1,
          price: 39.99
        }
      ],
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      pointsEarned: 2200
    }

    setOrderDetails(mockOrder)
    setLoading(false)

    // Clear the order ID from localStorage
    localStorage.removeItem('lastOrderId')
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    )
  }

  if (!orderDetails) {
    router.push('/')
    return null
  }

  const hasCourses = orderDetails.items.some(item => item.type === 'course')
  const hasProducts = orderDetails.items.some(item => item.type === 'product')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 text-lg">
              Thank you for your purchase. We've sent a confirmation email to{' '}
              <span className="font-medium text-primary">{orderDetails.email}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Order ID: <span className="font-mono">{orderDetails.orderId}</span>
            </p>
          </div>

          {/* Order Summary Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Summary</span>
                <button
                  onClick={handlePrint}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Printer className="w-5 h-5" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Items */}
              <div className="space-y-4 pb-6 border-b">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.type === 'course' ? (
                          <span className="flex items-center mt-1">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Online Course
                          </span>
                        ) : (
                          <span className="flex items-center mt-1">
                            <Package className="w-4 h-4 mr-1" />
                            Physical Product
                          </span>
                        )}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="pt-6 space-y-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span className="text-primary">${orderDetails.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-secondary">
                  <span>Loyalty Points Earned</span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-secondary" />
                    {orderDetails.pointsEarned.toLocaleString()} points
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {hasCourses && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-heading font-bold text-lg mb-2">Course Access</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        Your course access has been activated. Check your email for login instructions.
                      </p>
                      <Button href="/student/dashboard" variant="secondary" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Go to Dashboard
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasProducts && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-coral" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-heading font-bold text-lg mb-2">Shipping Info</h3>
                      <p className="text-gray-600 text-sm mb-1">
                        Estimated delivery:
                      </p>
                      <p className="font-medium text-gray-900 text-sm mb-3">
                        {orderDetails.estimatedDelivery}
                      </p>
                      <p className="text-xs text-gray-500">
                        You'll receive tracking info via email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Check Your Email</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      We've sent your order confirmation and receipt to {orderDetails.email}
                    </p>
                  </div>
                </div>

                {hasCourses && (
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">Schedule Your First Lesson</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Log into your dashboard to book your first language lesson with our educators
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Join Our Community</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Connect with other families learning African languages
                    </p>
                  </div>
                </div>

                {hasProducts && (
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">Track Your Shipment</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        You'll receive shipping updates via email as your order is processed
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="bg-secondary/10 rounded-lg p-6 mb-8">
            <h3 className="font-heading font-bold text-lg mb-4">While You Wait...</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/resources/free"
                className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <Download className="w-8 h-8 text-secondary mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Free Resources</h4>
                  <p className="text-sm text-gray-600">Download worksheets</p>
                </div>
              </Link>
              
              <Link
                href="/resources/culture"
                className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <Globe className="w-8 h-8 text-coral mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Cultural Info</h4>
                  <p className="text-sm text-gray-600">Learn about cultures</p>
                </div>
              </Link>
              
              <Link
                href="/loyalty"
                className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <Gift className="w-8 h-8 text-accent mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Loyalty Program</h4>
                  <p className="text-sm text-gray-600">View your rewards</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" variant="outline" size="lg">
              Continue Shopping
            </Button>
            {hasCourses && (
              <Button href="/student/dashboard" variant="secondary" size="lg">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>

          {/* Support */}
          <div className="mt-12 text-center text-sm text-gray-600">
            <p>
              Have questions about your order?{' '}
              <Link href="/contact" className="text-secondary hover:underline">
                Contact our support team
              </Link>
            </p>
            <p className="mt-2">
              Order ID: <span className="font-mono text-gray-900">{orderDetails.orderId}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .container * {
            visibility: visible;
          }
          .container {
            position: absolute;
            left: 0;
            top: 0;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

// Add missing import
import { Check } from 'lucide-react'