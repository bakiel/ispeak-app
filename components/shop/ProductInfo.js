'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cartContext'

export default function ProductInfo({ product }) {
  const { addItem, openSidebar } = useCart()
  // Use default values that are consistent between server and client
  const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : null
  
  const [selectedSize, setSelectedSize] = useState(defaultSize)
  const [selectedColor, setSelectedColor] = useState(defaultColor)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const hasDiscount = product.sale_price && product.sale_price < product.price
  const currentPrice = product.sale_price || product.price

  const handleAddToCart = async () => {
    setAddedToCart(false)
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      originalPrice: product.price,
      salePrice: product.sale_price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: product.images[0]
    }
    
    addItem(cartItem)
    setAddedToCart(true)
    openSidebar()
    
    // Reset success message after 3 seconds
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Price */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          {hasDiscount ? (
            <>
              <span className="text-3xl font-bold text-red-600">
                ${product.sale_price.toFixed(2)}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                Save ${(product.price - product.sale_price).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 1 && (
        <div>
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border-2 rounded-md transition-all ${
                  selectedSize === size
                    ? 'border-accent bg-accent/10 text-primary'
                    : 'border-gray-300 hover:border-accent/60'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 1 && (
        <div>
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border-2 rounded-md transition-all ${
                  selectedColor === color
                    ? 'border-accent bg-accent/10 text-primary'
                    : 'border-gray-300 hover:border-accent/60'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="font-semibold mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={product.inventory_quantity === 0}
          className={`w-full py-4 rounded-md font-bold text-lg transition-all transform hover:scale-105 ${
            product.inventory_quantity === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-accent hover:bg-accent/90 text-primary'
          }`}
        >
          {product.inventory_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        
        {addedToCart && (
          <div className="text-center text-secondary font-medium">
            ✓ Added to cart successfully!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">30-day return policy</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">15% supports language education</span>
        </div>
      </div>

      {/* Stock Status */}
      {product.inventory_quantity > 0 && product.inventory_quantity < 10 && (
        <div className="bg-coral/10 text-coral px-4 py-2 rounded-md text-sm">
          Only {product.inventory_quantity} left in stock!
        </div>
      )}
    </div>
  )
}