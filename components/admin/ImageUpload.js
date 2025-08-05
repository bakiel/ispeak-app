'use client'
import { useState, useRef } from 'react'

export default function ImageUpload({ value, onChange, label = "Upload Image", aspectRatio = "aspect-video" }) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)
  
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
      handleFile(e.dataTransfer.files[0])
    }
  }
  
  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }
  
  const handleFile = async (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }
    
    setUploading(true)
    
    try {
      // For now, we'll use a placeholder URL
      // In production, this would upload to Supabase Storage
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result)
        setUploading(false)
      }
      reader.readAsDataURL(file)
      
      // Production code would look like:
      // const formData = new FormData()
      // formData.append('file', file)
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // })
      // const data = await response.json()
      // onChange(data.url)
      
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload image')
      setUploading(false)
    }
  }
  
  const handleRemove = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* Preview */}
      {value && (
        <div className="relative group">
          <div className={`${aspectRatio} rounded-lg overflow-hidden bg-gray-100`}>
            <img
              src={value}
              alt="Preview"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg'
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
      
      {/* Upload Area */}
      {!value && (
        <div
          className={`${dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-gray-50'} 
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            aria-label={label}
          />
          
          {uploading ? (
            <div className="space-y-2">
              <i className="fas fa-spinner fa-spin text-3xl text-gray-400"></i>
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <i className="fas fa-cloud-upload-alt text-3xl text-gray-400"></i>
              <p className="text-sm text-gray-600">
                Drag and drop an image here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* URL Input Alternative */}
      <div className="relative">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or enter image URL"
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm"
        />
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      
      {/* Accessibility Note */}
      <p className="text-xs text-gray-500">
        <i className="fas fa-info-circle mr-1"></i>
        Remember to add descriptive alt text for accessibility
      </p>
    </div>
  )
}