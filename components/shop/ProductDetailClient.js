'use client'

import { useState } from 'react'
import ProductImageGallery from './ProductImageGallery'
import ProductInfo from './ProductInfo'
import ProductTabs from './ProductTabs'
import RelatedProductsCarousel from './RelatedProductsCarousel'
import MobileStickyCart from './MobileStickyCart'

export default function ProductDetailClient({ product, relatedProducts }) {
  // Use default values that are consistent between server and client
  const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : null
  
  const [selectedSize, setSelectedSize] = useState(defaultSize)
  const [selectedColor, setSelectedColor] = useState(defaultColor)
  const [quantity, setQuantity] = useState(1)

  return (
    <>
      {/* Main Product Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="relative">
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* Related Products - Enhanced with iSPEAK branding */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-light-blue via-cream to-light-blue border-t relative overflow-hidden">
          {/* African pattern background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="w-full h-full">
              <defs>
                <pattern id="related-products-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="#FFD93D" />
                  <circle cx="15" cy="15" r="1.5" fill="#FF8C61" />
                  <circle cx="45" cy="45" r="1.5" fill="#FF8C61" />
                  <circle cx="45" cy="15" r="1" fill="#FFD93D" />
                  <circle cx="15" cy="45" r="1" fill="#FFD93D" />
                  <path d="M10 10 L20 20 M40 40 L50 50 M50 10 L40 20 M20 40 L10 50" stroke="#FFD93D" strokeWidth="0.5" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#related-products-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-coral rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                You May Also Like
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover more items from our collection that complement your child's language learning journey
              </p>
            </div>
            
            <RelatedProductsCarousel 
              products={relatedProducts} 
              currentProductId={product.id} 
            />
          </div>
        </section>
      )}

      {/* iSPEAK Mission Banner - Enhanced */}
      <section className="py-12 bg-gradient-to-r from-accent via-accent to-coral text-primary relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <pattern id="mission-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="#2B2D42" />
                <path d="M10 10 L30 30 M30 10 L10 30" stroke="#2B2D42" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mission-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Supporting African Language Education</h3>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              15% of every purchase helps fund free language lessons for underserved communities worldwide
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold">1,500+</div>
                <div className="text-sm opacity-80">Students Supported</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm opacity-80">Languages Preserved</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold">15%</div>
                <div className="text-sm opacity-80">of Proceeds Donated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Cart */}
      <MobileStickyCart
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        quantity={quantity}
      />
    </>
  )
}