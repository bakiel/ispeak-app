'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ImageManager({ productId, currentImages = [] }) {
  const [images, setImages] = useState(currentImages)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  // Handle file upload
  const handleUpload = async (files) => {
    setUploading(true)
    const uploadedUrls = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', `products/${productId}/${file.name}`)

      try {
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const { url } = await response.json()
          uploadedUrls.push(url)
        }
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }

    // Update product with new images
    if (uploadedUrls.length > 0) {
      const newImages = [...images, ...uploadedUrls]
      setImages(newImages)
      
      // Update in database
      await supabase
        .from('products')
        .update({ images: newImages })
        .eq('id', productId)
    }

    setUploading(false)
  }

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(Array.from(e.dataTransfer.files))
    }
  }

  // Handle file selection
  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleUpload(Array.from(e.target.files))
    }
  }

  // Remove image
  const removeImage = async (indexToRemove) => {
    const newImages = images.filter((_, index) => index !== indexToRemove)
    setImages(newImages)
    
    // Update in database
    await supabase
      .from('products')
      .update({ images: newImages })
      .eq('id', productId)
  }

  // Move image position
  const moveImage = async (fromIndex, direction) => {
    const newImages = [...images]
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1
    
    if (toIndex >= 0 && toIndex < images.length) {
      [newImages[fromIndex], newImages[toIndex]] = [newImages[toIndex], newImages[fromIndex]]
      setImages(newImages)
      
      // Update in database
      await supabase
        .from('products')
        .update({ images: newImages })
        .eq('id', productId)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Images</h3>
      
      {/* Current Images */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative group">
            <img
              src={imageUrl}
              alt={`Product ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
            />
            
            {/* Image Controls */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
              {index > 0 && (
                <button
                  onClick={() => moveImage(index, 'up')}
                  className="p-1 bg-white rounded hover:bg-gray-100"
                  title="Move left"
                >
                  ←
                </button>
              )}
              
              <button
                onClick={() => removeImage(index)}
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                title="Remove"
              >
                ✕
              </button>
              
              {index < images.length - 1 && (
                <button
                  onClick={() => moveImage(index, 'down')}
                  className="p-1 bg-white rounded hover:bg-gray-100"
                  title="Move right"
                >
                  →
                </button>
              )}
            </div>
            
            {/* Primary Image Badge */}
            {index === 0 && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Primary
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        <label
          htmlFor="image-upload"
          className="cursor-pointer"
        >
          <div className="space-y-2">
            <div className="text-4xl">📸</div>
            <div className="text-gray-600">
              {uploading ? (
                <span>Uploading...</span>
              ) : (
                <>
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </>
              )}
            </div>
            <div className="text-sm text-gray-400">
              PNG, JPG, GIF up to 10MB
            </div>
          </div>
        </label>
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>• First image is the primary product image</p>
        <p>• Drag images or use arrows to reorder</p>
        <p>• Click ✕ to remove an image</p>
        <p>• Upload multiple images at once</p>
      </div>
    </div>
  )
}