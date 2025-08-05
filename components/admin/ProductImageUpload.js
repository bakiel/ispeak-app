'use client'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProductImageUpload({ 
  productSlug, 
  onImageUploaded, 
  maxSizeKB = 200,
  existingImages = [] 
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload only JPEG, PNG, or WebP images'
    }

    // Check file size (convert KB to bytes)
    const maxSizeBytes = maxSizeKB * 1024
    if (file.size > maxSizeBytes) {
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(2)
      return `File size (${fileSizeMB}MB) exceeds maximum allowed size of ${maxSizeKB}KB. Please compress your image.`
    }

    return null
  }

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Calculate new dimensions (max width 1200px)
          let width = img.width
          let height = img.height
          const maxWidth = 1200
          
          if (width > maxWidth) {
            height = (maxWidth / width) * height
            width = maxWidth
          }
          
          canvas.width = width
          canvas.height = height
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height)
          
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            }))
          }, 'image/jpeg', 0.85)
        }
      }
    })
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadError('')
    
    // Validate file
    const validationError = validateFile(file)
    if (validationError) {
      setUploadError(validationError)
      return
    }

    setUploading(true)
    setUploadProgress(20)

    try {
      let fileToUpload = file

      // If file is too large, try to compress it
      if (file.size > maxSizeKB * 1024 && file.type !== 'image/webp') {
        setUploadProgress(40)
        fileToUpload = await compressImage(file)
        
        // Check if compressed file is still too large
        if (fileToUpload.size > maxSizeKB * 1024) {
          throw new Error(`Unable to compress image below ${maxSizeKB}KB. Please use a smaller image.`)
        }
      }

      setUploadProgress(60)

      // Generate unique filename
      const fileExt = fileToUpload.name.split('.').pop()
      const fileName = `products/${productSlug}-${Date.now()}.${fileExt}`

      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from('ispeak-products')
        .upload(fileName, fileToUpload, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      setUploadProgress(80)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('ispeak-products')
        .getPublicUrl(fileName)

      setUploadProgress(100)

      // Call parent callback
      if (onImageUploaded) {
        onImageUploaded(publicUrl)
      }

      // Reset
      setTimeout(() => {
        setUploadProgress(0)
        setUploading(false)
      }, 500)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(error.message || 'Failed to upload image')
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDragDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect({ target: { files: [file] } })
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div
        onDrop={handleDragDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          uploading ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="space-y-3">
            <i className="fas fa-spinner fa-spin text-3xl text-primary"></i>
            <p className="text-gray-600">Uploading image...</p>
            <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
            <p className="text-gray-600 mb-2">
              Drop image here or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:text-primary-dark font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500">
              JPEG, PNG, WebP • Max {maxSizeKB}KB • Optimized for web
            </p>
          </>
        )}
      </div>

      {/* Error message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
          <i className="fas fa-exclamation-circle text-red-400 mt-0.5 mr-2"></i>
          <div className="flex-1">
            <p className="text-sm text-red-800">{uploadError}</p>
            {uploadError.includes('compress') && (
              <p className="text-xs text-red-600 mt-1">
                Tip: Use an image editor or online tool to reduce file size before uploading.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Image optimization tips */}
      <details className="text-sm">
        <summary className="cursor-pointer text-gray-600 hover:text-gray-800 font-medium">
          Image optimization tips
        </summary>
        <div className="mt-2 p-3 bg-gray-50 rounded-md space-y-2 text-gray-600">
          <p>• Use JPEG for photos, PNG for graphics with transparency</p>
          <p>• Resize images to max 1200px width before uploading</p>
          <p>• Use tools like TinyPNG, Squoosh, or ImageOptim to compress</p>
          <p>• Aim for 100-150KB for best loading speed</p>
        </div>
      </details>

      {/* Existing images */}
      {existingImages && existingImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images</h4>
          <div className="grid grid-cols-3 gap-2">
            {existingImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover rounded border border-gray-200"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}