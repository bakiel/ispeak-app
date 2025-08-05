'use client'

import { useState, useRef, useEffect } from 'react'

export default function ProductImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const imageRef = useRef(null)
  const containerRef = useRef(null)

  // African pattern overlay component
  const AfricanPattern = () => (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <svg width="100%" height="100%" className="w-full h-full">
        <defs>
          <pattern id="african-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="#FACC15" />
            <path d="M10 10 L30 30 M30 10 L10 30" stroke="#FACC15" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#african-pattern)" />
      </svg>
    </div>
  )

  // Handle mouse move for zoom
  const handleMouseMove = (e) => {
    if (!isZoomed || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && selectedImage > 0) {
        setSelectedImage(selectedImage - 1)
      }
      if (e.key === 'ArrowRight' && selectedImage < images.length - 1) {
        setSelectedImage(selectedImage + 1)
      }
      if (e.key === 'Escape') {
        setIsZoomed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, images.length])

  return (
    <div className="relative">
      {/* Main Image Container */}
      <div 
        ref={containerRef}
        className="aspect-square bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg overflow-hidden mb-6 relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AfricanPattern />
        
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-gray-500 text-lg font-medium">Image not available</span>
            <span className="text-gray-400 text-sm mt-1">Please try again later</span>
          </div>
        ) : (
          <>
            <img
              ref={imageRef}
              src={images[selectedImage] || "/images/placeholder-product.png"}
              alt={productName}
              className={`w-full h-full object-contain p-8 transition-all duration-500 ${
                isZoomed 
                  ? 'scale-150 cursor-zoom-out' 
                  : 'scale-100 group-hover:scale-105 cursor-zoom-in'
              }`}
              style={isZoomed ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : {}}
              onError={() => setImageError(true)}
              draggable={false}
            />
            
            {/* Paji mascot corner badge */}
            <div className="absolute top-4 left-4 w-16 h-16 rounded-full flex items-center justify-center filter drop-shadow-lg animate-bounce">
              <img 
                src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png"
                alt="Paji mascot"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Image navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (selectedImage > 0) setSelectedImage(selectedImage - 1)
                  }}
                  disabled={selectedImage === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:translate-x-0 -translate-x-2"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (selectedImage < images.length - 1) setSelectedImage(selectedImage + 1)
                  }}
                  disabled={selectedImage === images.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:translate-x-0 translate-x-2"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Zoom indicator */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isZoomed ? 'Click to zoom out' : 'Hover to zoom'}
            </div>
            
            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === index 
                  ? 'border-yellow-400 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-yellow-300 hover:scale-102'
              }`}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-contain p-2 bg-white transition-transform duration-300 hover:scale-110"
              />
              
              {/* Active indicator */}
              {selectedImage === index && (
                <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
      
      {/* Mobile swipe indicators */}
      <div className="md:hidden flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              selectedImage === index ? 'bg-yellow-400 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}