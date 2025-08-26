'use client'

import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cartContext'

export default function CartPage() {
  const {
    items: cartItems,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    discount,
    appliedPromo,
    freeShippingRemaining,
    updateQuantity,
    removeItem,
    applyPromo,
    removePromo,
    clearCart
  } = useCart()

  const [promoCode, setPromoCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return
    
    const success = applyPromo(promoCode)
    if (success) {
      setPromoMessage('Promo code applied successfully!')
      setPromoCode('')
      setTimeout(() => setPromoMessage(''), 3000)
    } else {
      setPromoMessage('Invalid promo code')
      setTimeout(() => setPromoMessage(''), 3000)
    }
  }

  const handleCheckout = () => {
    // Redirect to new checkout flow
    window.location.href = '/checkout'
  }

  if (cartItems.length === 0) {
    return (
      <>
        <ModernNavigation />
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              href="/shop"
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
            >
              Continue Shopping
            </Link>
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
        {/* Header */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className={`p-6 ${index > 0 ? 'border-t' : ''}`}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                          
                          {/* Variants */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-4">
                            {item.salePrice ? (
                              <>
                                <span className="font-bold text-red-600">${item.salePrice}</span>
                                <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                              </>
                            ) : (
                              <span className="font-bold">${item.price}</span>
                            )}
                          </div>

                          {/* Quantity and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item, item.quantity - 1)}
                                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item, item.quantity + 1)}
                                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link 
                    href="/shop"
                    className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Promo Code</label>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3">
                        <div>
                          <span className="text-sm font-medium text-green-800">
                            {appliedPromo.code}
                          </span>
                          <p className="text-xs text-green-600">
                            {appliedPromo.description}
                          </p>
                        </div>
                        <button
                          onClick={removePromo}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter code"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                          />
                          <button 
                            onClick={handleApplyPromo}
                            className="px-4 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300 text-sm font-medium"
                          >
                            Apply
                          </button>
                        </div>
                        {promoMessage && (
                          <p className={`text-xs mt-1 ${promoMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                            {promoMessage}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Order Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedPromo.code})</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {freeShippingRemaining > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-6">
                      <p className="text-sm text-yellow-800">
                        Add ${freeShippingRemaining.toFixed(2)} more to get <strong>free shipping!</strong>
                      </p>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 rounded-md font-medium transition-colors bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Security Icons */}
                  <div className="mt-6 text-center">
                    <div className="flex justify-center items-center space-x-4 text-gray-400 text-sm">
                      <span>🔒 Secure Checkout</span>
                      <span>💳 SSL Protected</span>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="mt-6 text-center text-sm text-gray-600">
                    <p className="mb-2">✓ 30-day return policy</p>
                    <p className="mb-2">✓ Customer support available</p>
                    <p>✓ Supporting African language education</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Impact Banner */}
        <section className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-2">Thank You for Supporting Education</h2>
            <p className="text-green-100">
              Your purchase helps fund free language lessons for underserved communities
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}