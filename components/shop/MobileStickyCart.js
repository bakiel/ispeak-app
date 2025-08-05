'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cartContext'

export default function MobileStickyCart({ product, selectedSize, selectedColor, quantity, onAddToCart }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const { addItem, openSidebar } = useCart()

  // Show/hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Show sticky cart when user scrolls past the main product info section
      // but hide it when they reach the bottom of the page
      const showThreshold = windowHeight * 0.8
      const hideThreshold = documentHeight - windowHeight - 200
      
      setIsVisible(scrollY > showThreshold && scrollY < hideThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStickyAddToCart = async () => {
    setIsAddedToCart(true)
    
    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.sale_price,
      originalPrice: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: product.images[0]
    }
    
    addItem(cartItem)
    
    // Brief success animation
    setTimeout(() => {
      openSidebar()
      setIsAddedToCart(false)
    }, 1000)
  }

  const currentPrice = product.sale_price || product.price
  const hasDiscount = product.sale_price && product.sale_price < product.price

  return (
    <>
      {/* Mobile Sticky Cart - Only visible on mobile */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white border-t border-gray-200 shadow-lg">
          {/* African pattern accent */}
          <div className="h-1 bg-gradient-to-r from-accent via-coral to-accent"></div>
          
          <div className="p-4">
            <div className="flex items-center justify-between gap-4">
              {/* Product Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-coral/10 rounded-lg flex-shrink-0 overflow-hidden">
                  <img
                    src={product.images[0] || "/images/placeholder-product.png"}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    {hasDiscount ? (
                      <>
                        <span className="text-lg font-bold text-red-600">
                          ${product.sale_price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {/* Selected options */}
                  <div className="text-xs text-gray-500">
                    {selectedSize && selectedSize !== 'One Size' && (
                      <span>Size: {selectedSize}</span>
                    )}
                    {selectedColor && selectedColor !== 'Multi-color' && selectedSize !== 'One Size' && (
                      <span> • </span>
                    )}
                    {selectedColor && selectedColor !== 'Multi-color' && (
                      <span>Color: {selectedColor}</span>
                    )}
                    {quantity > 1 && (
                      <span> • Qty: {quantity}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleStickyAddToCart}
                disabled={product.inventory_quantity === 0}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform ${
                  isAddedToCart
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-105'
                    : product.inventory_quantity === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-accent to-coral text-primary hover:from-accent/90 hover:to-coral/90 active:scale-95'
                } shadow-lg`}
              >
                {isAddedToCart ? (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                    Added!
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Quick Actions */}
      <div className={`md:hidden fixed bottom-20 right-4 z-40 transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-2">
          {/* Wishlist Button */}
          <button className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          {/* Share Button */}
          <button className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}