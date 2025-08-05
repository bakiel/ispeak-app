'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { getInventoryStatus } from '@/lib/productData'

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false)
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const primaryImage = product.images?.[0] || '/images/placeholder-product.png'
  const hasDiscount = product.sale_price && product.sale_price < product.price
  const inventoryStatus = getInventoryStatus(product.inventory_quantity)
  
  // Render star rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="#FCD34D"/>
              <stop offset="50%" stopColor="#E5E7EB"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      )
    }
    
    return stars
  }

  return (
    <Link href={`/shop/products/${product.slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100">
          {product.featured && (
            <span className="absolute top-2 left-2 bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold z-10">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
              Sale
            </span>
          )}
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-lg">No image</span>
            </div>
          ) : (
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-secondary transition-colors">
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-red-600">
                  {formatPrice(product.sale_price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews.count > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {renderStars(product.reviews.average)}
              </div>
              <span className="text-sm text-gray-600">
                {product.reviews.average} ({product.reviews.count})
              </span>
            </div>
          )}

          {/* Collection Badge */}
          {product.collection && (
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mb-2">
              {product.collection.name}
            </span>
          )}

          {/* Enhanced Stock Status */}
          <div className="mt-3">
            <span className={`text-sm flex items-center ${
              inventoryStatus.status === 'out-of-stock' ? 'text-red-600' :
              inventoryStatus.status === 'low-stock' ? 'text-orange-600' :
              'text-green-600'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                inventoryStatus.status === 'out-of-stock' ? 'bg-red-600' :
                inventoryStatus.status === 'low-stock' ? 'bg-orange-600' :
                'bg-green-600'
              }`}></span>
              {inventoryStatus.label}
              {inventoryStatus.status === 'low-stock' && ` (${product.inventory_quantity} left)`}
            </span>
          </div>

          {/* Quick View Button */}
          <button 
            className={`mt-4 w-full py-2 rounded-md font-medium transition-colors ${
              inventoryStatus.status === 'out-of-stock' 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-accent text-primary hover:bg-accent/90'
            }`}
            disabled={inventoryStatus.status === 'out-of-stock'}
          >
            {inventoryStatus.status === 'out-of-stock' ? 'Out of Stock' : 'View Details'}
          </button>
        </div>
      </div>
    </Link>
  )
}