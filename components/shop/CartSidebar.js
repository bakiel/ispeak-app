'use client'
import { useCart } from '@/lib/cartContext'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function CartSidebar() {
  const {
    sidebarOpen,
    closeSidebar,
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    discount,
    appliedPromo,
    freeShippingRemaining,
    freeShippingProgress,
    updateQuantity,
    removeItem,
    applyPromo,
    removePromo
  } = useCart()

  const [promoCode, setPromoCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeSidebar()
    }
  }

  // Handle promo code application
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

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true)
    closeSidebar()
    // Redirect to cart page
    window.location.href = '/cart'
  }

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen])

  if (!sidebarOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
        onClick={handleBackdropClick}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-out translate-x-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold flex items-center">
              <i className="fas fa-shopping-cart mr-2 text-secondary"></i>
              Shopping Cart ({itemCount})
            </h2>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <i className="fas fa-times text-gray-600"></i>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={closeSidebar}
                  className="text-secondary hover:text-secondary/80 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-tight mb-1 truncate">
                        {item.name}
                      </h3>
                      
                      {/* Variants */}
                      <div className="text-xs text-gray-600 mb-2">
                        {item.size && <span className="mr-2">Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-2">
                        {item.salePrice ? (
                          <>
                            <span className="font-semibold text-red-600 text-sm">
                              ${item.salePrice}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              ${item.originalPrice}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold text-sm">${item.price}</span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item, item.quantity - 1)}
                            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-sm"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item, item.quantity + 1)}
                            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 text-sm"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item)}
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-semibold text-sm">
                        ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Free Shipping Progress */}
                {freeShippingRemaining > 0 && (
                  <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-secondary">
                        Free Shipping Progress
                      </span>
                      <span className="text-sm text-secondary/80">
                        ${freeShippingRemaining.toFixed(2)} away
                      </span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${freeShippingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Promo Code */}
                <div className="border-t pt-4 mt-4">
                  <label className="block text-sm font-medium mb-2">Promo Code</label>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-2">
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
                        className="text-red-600 hover:text-red-700 text-xs"
                      >
                        <i className="fas fa-times"></i>
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
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300 text-sm font-medium"
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
              </div>
            )}
          </div>

          {/* Footer - Order Summary & Checkout */}
          {items.length > 0 && (
            <div className="border-t bg-gray-50 p-4">
              {/* Order Summary */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
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
                
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    isCheckingOut 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-accent text-primary hover:bg-accent/90'
                  }`}
                >
                  {isCheckingOut ? 'Loading...' : 'View Cart & Checkout'}
                </button>
                
                <button
                  onClick={closeSidebar}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Security Notice */}
              <div className="text-center mt-3">
                <p className="text-xs text-gray-500">
                  <i className="fas fa-lock mr-1"></i>
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}