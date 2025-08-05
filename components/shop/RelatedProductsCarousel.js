'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'

export default function RelatedProductsCarousel({ products, currentProductId }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const carouselRef = useRef(null)

  // Filter out current product and get related products
  const relatedProducts = products.filter(product => product.id !== currentProductId)

  // Items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4 // xl
      if (window.innerWidth >= 1024) return 3 // lg
      if (window.innerWidth >= 768) return 2  // md
      return 1 // sm
    }
    return 4
  }

  // Initialize with a safe default value that works on both server and client
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    // Set initial value on mount
    setItemsPerView(getItemsPerView())
    
    const handleResize = () => {
      setItemsPerView(getItemsPerView())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    updateScrollButtons()
  }, [currentIndex, itemsPerView])

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const maxIndex = Math.max(0, relatedProducts.length - itemsPerView)
      setCanScrollLeft(currentIndex > 0)
      setCanScrollRight(currentIndex < maxIndex)
    }
  }

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(Math.max(0, currentIndex - 1))
    }
  }

  const scrollRight = () => {
    const maxIndex = Math.max(0, relatedProducts.length - itemsPerView)
    if (canScrollRight) {
      setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
    }
  }

  const scrollToIndex = (index) => {
    setCurrentIndex(index)
  }

  // Auto-scroll functionality
  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (canScrollRight) {
        scrollRight()
      } else {
        setCurrentIndex(0)
      }
    }, 5000) // Auto-scroll every 5 seconds

    return () => clearInterval(autoScroll)
  }, [canScrollRight, currentIndex])

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">You Might Also Like</h2>
          <p className="text-gray-600">Discover more products from our collection</p>
        </div>
        
        {/* Navigation Controls */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:scale-105'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:scale-105'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {relatedProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="group">
                  {/* Enhanced Product Card with hover effects */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-yellow-50 to-orange-50 relative overflow-hidden">
                      <img
                        src={product.images?.[0] || "/images/placeholder-product.png"}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Sale Badge */}
                      {product.sale_price && product.sale_price < product.price && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Save ${(product.price - product.sale_price).toFixed(0)}
                        </div>
                      )}
                      
                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-col space-y-2">
                          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-50 transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-50 transition-colors">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Paji mascot for iSPEAK products */}
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full flex items-center justify-center filter drop-shadow-md opacity-90">
                        <img 
                          src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png"
                          alt="Paji mascot"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      {/* Collection Badge */}
                      {product.collection && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                          {product.collection.name}
                        </span>
                      )}
                      
                      {/* Product Name */}
                      <h3 className="font-bold text-lg mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                        <Link href={`/shop/products/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      
                      {/* Reviews */}
                      {product.reviews && (
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.reviews.average) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            ({product.reviews.count})
                          </span>
                        </div>
                      )}
                      
                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {product.sale_price && product.sale_price < product.price ? (
                            <>
                              <span className="text-xl font-bold text-red-600">
                                ${product.sale_price.toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-gray-900">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <Link
                        href={`/shop/products/${product.slug}`}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 py-3 px-4 rounded-xl font-semibold text-center hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:scale-105 block"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(relatedProducts.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-yellow-400 scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* View All Link */}
      <div className="text-center mt-12">
        <Link
          href="/shop"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl font-semibold text-gray-800 transition-all duration-300 transform hover:scale-105"
        >
          <span>View All Products</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}