'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  CreditCard,
  Lock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  ChevronLeft,
  AlertCircle,
  Check,
  Globe,
  Building,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface CheckoutForm {
  // Billing Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Billing Address
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Payment Method
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  
  // Additional
  saveCard: boolean
  agreeToTerms: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cartTotal, setCartTotal] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')
  
  const [form, setForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: true,
    agreeToTerms: false
  })

  useEffect(() => {
    // Get cart total from localStorage
    const total = localStorage.getItem('cartTotal')
    if (total) {
      setCartTotal(parseFloat(total))
    } else {
      // If no cart data, redirect to cart
      router.push('/cart')
    }
  }, [router])

  const updateForm = (field: keyof CheckoutForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s+/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(' ') : cleaned
  }

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  const validateForm = (): boolean => {
    setError('')
    
    // Check required fields
    const requiredFields: (keyof CheckoutForm)[] = [
      'firstName', 'lastName', 'email', 'phone',
      'address', 'city', 'state', 'zipCode'
    ]
    
    for (const field of requiredFields) {
      if (!form[field]) {
        setError('Please fill in all required fields')
        return false
      }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address')
      return false
    }
    
    // Validate payment info if using card
    if (paymentMethod === 'card') {
      if (!form.cardNumber || !form.cardName || !form.expiryDate || !form.cvv) {
        setError('Please complete all payment information')
        return false
      }
      
      // Basic card number validation
      const cardNum = form.cardNumber.replace(/\s/g, '')
      if (cardNum.length < 13 || cardNum.length > 19) {
        setError('Please enter a valid card number')
        return false
      }
      
      // CVV validation
      if (form.cvv.length < 3 || form.cvv.length > 4) {
        setError('Please enter a valid CVV')
        return false
      }
    }
    
    // Check terms agreement
    if (!form.agreeToTerms) {
      setError('Please agree to the terms and conditions')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Clear cart
      localStorage.removeItem('cartItems')
      localStorage.removeItem('cartTotal')
      
      // Generate order ID
      const orderId = 'ORD-' + Date.now()
      localStorage.setItem('lastOrderId', orderId)
      
      // Redirect to success page
      router.push('/order-success')
    } catch (err) {
      setError('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/cart"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Checkout</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center text-green-600">
                <Shield className="w-4 h-4 mr-1" />
                Secure Checkout
              </div>
              <div className="flex items-center text-gray-600">
                <Lock className="w-4 h-4 mr-1" />
                SSL Encrypted
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Information</span>
              </div>
              <div className="flex-1 mx-4">
                <ProgressBar value={50} className="h-1" />
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => updateForm('firstName', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => updateForm('lastName', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateForm('phone', e.target.value)}
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => updateForm('address', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apartment, Suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        value={form.apartment}
                        onChange={(e) => updateForm('apartment', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={(e) => updateForm('city', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          value={form.state}
                          onChange={(e) => updateForm('state', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={form.zipCode}
                          onChange={(e) => updateForm('zipCode', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <div className="relative">
                          <select
                            value={form.country}
                            onChange={(e) => updateForm('country', e.target.value)}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none"
                            required
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Payment Options */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === 'card'
                            ? 'border-secondary bg-secondary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                        <p className="text-sm font-medium">Credit/Debit Card</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-secondary bg-secondary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-6 h-6 mx-auto mb-2">
                          <svg viewBox="0 0 24 24" className="w-full h-full">
                            <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.766.766 0 0 1 .76-.653h7.535c2.59 0 4.71 1.558 4.71 4.12 0 3.135-2.633 5.631-6.316 5.631H9.17l-.881 5.365a.641.641 0 0 1-.633.535h-3.58v-.001z"/>
                            <path fill="#009cde" d="M17.306 3.067h3.72c2.59 0 3.79 1.558 3.79 3.644 0 3.135-2.633 5.365-6.316 5.365h-2.463l-.663 4.12a.64.64 0 0 1-.633.534h-3.239l2.804-13.663z"/>
                          </svg>
                        </div>
                        <p className="text-sm font-medium">PayPal</p>
                      </button>
                    </div>

                    {paymentMethod === 'card' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={form.cardNumber}
                              onChange={(e) => updateForm('cardNumber', formatCardNumber(e.target.value))}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                              required
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            value={form.cardName}
                            onChange={(e) => updateForm('cardName', e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={form.expiryDate}
                                onChange={(e) => updateForm('expiryDate', formatExpiryDate(e.target.value))}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                                required
                              />
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={form.cvv}
                                onChange={(e) => updateForm('cvv', e.target.value.replace(/\D/g, ''))}
                                placeholder="123"
                                maxLength={4}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                                required
                              />
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.saveCard}
                            onChange={(e) => updateForm('saveCard', e.target.checked)}
                            className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Save card for future purchases
                          </span>
                        </label>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">
                          You will be redirected to PayPal to complete your purchase securely.
                        </p>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full">
                          <Shield className="w-10 h-10 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Terms Agreement */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreeToTerms}
                      onChange={(e) => updateForm('agreeToTerms', e.target.checked)}
                      className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary mt-0.5"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I agree to the{' '}
                      <Link href="/terms" className="text-secondary hover:underline">
                        Terms of Service
                      </Link>
                      ,{' '}
                      <Link href="/privacy" className="text-secondary hover:underline">
                        Privacy Policy
                      </Link>
                      , and{' '}
                      <Link href="/refund-policy" className="text-secondary hover:underline">
                        Refund Policy
                      </Link>
                    </span>
                  </label>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock Order Items */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Yoruba Course (3 months)</span>
                          <span className="font-medium">$149.99</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Board Book × 2</span>
                          <span className="font-medium">$39.98</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Activity Box</span>
                          <span className="font-medium">$39.99</span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Subtotal</span>
                          <span>$229.96</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Shipping</span>
                          <span>$9.99</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2 text-green-600">
                          <span>Promo Discount</span>
                          <span>-$20.00</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-2xl font-bold text-primary">
                              ${cartTotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="secondary"
                        fullWidth
                        size="lg"
                        disabled={loading}
                        className="mt-6"
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Processing Payment...
                          </div>
                        ) : (
                          <>
                            <Lock className="w-5 h-5 mr-2" />
                            Complete Order
                          </>
                        )}
                      </Button>

                      {/* Security Badge */}
                      <div className="text-center pt-4">
                        <div className="inline-flex items-center text-sm text-gray-600">
                          <Shield className="w-4 h-4 mr-1 text-green-600" />
                          Your payment information is secure
                        </div>
                      </div>

                      {/* Accepted Cards */}
                      <div className="pt-4 border-t">
                        <p className="text-xs text-gray-500 mb-2">We accept:</p>
                        <div className="flex gap-2">
                          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                            VISA
                          </div>
                          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                            MC
                          </div>
                          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                            AMEX
                          </div>
                          <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">
                            <svg viewBox="0 0 24 24" className="w-full h-full p-1">
                              <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.766.766 0 0 1 .76-.653h7.535c2.59 0 4.71 1.558 4.71 4.12 0 3.135-2.633 5.631-6.316 5.631H9.17l-.881 5.365a.641.641 0 0 1-.633.535h-3.58v-.001z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Help */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Need help?{' '}
                    <Link href="/contact" className="text-secondary hover:underline">
                      Contact Support
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}