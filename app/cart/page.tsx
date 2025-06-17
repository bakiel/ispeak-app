'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ShoppingCart, 
  X, 
  Minus, 
  Plus, 
  ArrowRight,
  Tag,
  CreditCard,
  Truck,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Gift,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

interface CartItem {
  id: number
  name: string
  type: 'course' | 'product'
  price: number
  quantity: number
  image: string
  description?: string
  duration?: string
  language?: string
  size?: string
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Yoruba Language Course - 3 Months',
      type: 'course',
      price: 149.99,
      quantity: 1,
      image: '/images/landscape/Children_learning_online_with_laptop.jpg',
      description: 'Live online lessons, 2x per week',
      duration: '3 months',
      language: 'Yoruba'
    },
    {
      id: 2,
      name: 'My First Yoruba Words Board Book',
      type: 'product',
      price: 19.99,
      quantity: 2,
      image: '/images/square/Child_happily_reading_book.png',
      description: 'Colorful board book with 50 essential words'
    },
    {
      id: 3,
      name: 'Cultural Activity Box - Monthly',
      type: 'product',
      price: 39.99,
      quantity: 1,
      image: '/images/square/Children_learning_languages_together.png',
      description: 'Monthly subscription box'
    }
  ])
  
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = cartItems.some(item => item.type === 'product') ? 9.99 : 0
  const discount = promoApplied ? subtotal * (promoDiscount / 100) : 0
  const total = subtotal + shipping - discount

  // Save points earned (10 points per dollar)
  const pointsEarned = Math.floor(total * 10)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    setError('')
    
    if (!promoCode) {
      setError('Please enter a promo code')
      return
    }

    // Mock promo code validation
    if (promoCode.toUpperCase() === 'WELCOME20') {
      setPromoApplied(true)
      setPromoDiscount(20)
      setPromoCode('')
    } else if (promoCode.toUpperCase() === 'LOYALTY10') {
      setPromoApplied(true)
      setPromoDiscount(10)
      setPromoCode('')
    } else {
      setError('Invalid promo code')
    }
  }

  const handleCheckout = () => {
    setLoading(true)
    // Save cart to localStorage for checkout page
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    localStorage.setItem('cartTotal', total.toString())
    router.push('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Start your language learning journey by exploring our courses and shop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/pricing" variant="secondary" size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Courses
              </Button>
              <Button href="/shop" variant="outline" size="lg">
                <Gift className="w-5 h-5 mr-2" />
                Visit Shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">Review your items and proceed to checkout</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48 sm:h-auto">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {item.type === 'course' && (
                          <div className="absolute top-2 left-2 bg-secondary text-white px-2 py-1 rounded text-xs font-medium">
                            Course
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-heading font-bold text-lg">{item.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                            {item.duration && (
                              <p className="text-sm text-gray-500 mt-1">Duration: {item.duration}</p>
                            )}
                            {item.language && (
                              <p className="text-sm text-gray-500">Language: {item.language}</p>
                            )}
                            {item.size && (
                              <p className="text-sm text-gray-500">Size: {item.size}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Continue Shopping */}
              <div className="pt-4">
                <Button href="/shop" variant="outline">
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-heading font-bold text-xl mb-6">Order Summary</h2>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-3 pb-6 border-b">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {shipping > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                    )}
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo Discount ({promoDiscount}%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="py-6 border-b">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                    <div className="mt-2 text-sm text-secondary">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Earn {pointsEarned} loyalty points
                    </div>
                  </div>

                  {/* Promo Code */}
                  {!promoApplied && (
                    <div className="py-6 border-b">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
                        />
                        <Button
                          onClick={applyPromoCode}
                          variant="outline"
                          size="sm"
                        >
                          Apply
                        </Button>
                      </div>
                      {error && (
                        <p className="text-red-600 text-sm mt-2">{error}</p>
                      )}
                    </div>
                  )}

                  {promoApplied && (
                    <div className="py-6 border-b">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center text-green-700">
                          <Tag className="w-5 h-5 mr-2" />
                          <span className="text-sm font-medium">Promo Applied!</span>
                        </div>
                        <button
                          onClick={() => {
                            setPromoApplied(false)
                            setPromoDiscount(0)
                          }}
                          className="text-green-700 hover:text-green-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <div className="pt-6">
                    <Button
                      onClick={handleCheckout}
                      variant="secondary"
                      fullWidth
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          Proceed to Checkout
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Security Features */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                      Secure checkout with SSL encryption
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                      Multiple payment options available
                    </div>
                    {shipping > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="w-4 h-4 mr-2 text-purple-600" />
                        Free shipping on orders over $75
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-sm text-blue-900 mb-2">Why Shop with iSPEAK?</h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>✓ 30-day money-back guarantee</li>
                  <li>✓ Secure payment processing</li>
                  <li>✓ Fast, reliable shipping</li>
                  <li>✓ Excellent customer support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}