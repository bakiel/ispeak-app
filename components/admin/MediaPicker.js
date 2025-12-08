'use client'

import { useState, useEffect, useCallback } from 'react'

// Use local API proxy for browser requests, direct URL for image display
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function MediaPicker({ isOpen, onClose, onSelect, multiple = false }) {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
      setSelected([])
    }
  }, [isOpen])

  const fetchMedia = async (search = '') => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      params.append('limit', '50')

      // Use local API proxy to avoid mixed content issues
      const response = await fetch(`/api/media?${params}`)
      const data = await response.json()

      if (data.media) {
        setMedia(data.media)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    }
    setLoading(false)
  }

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }, [])

  const handleFileUpload = async (files) => {
    setUploading(true)

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        // Use local API proxy for upload
        const response = await fetch(`/api/media/upload`, {
          method: 'POST',
          body: formData
        })

        const data = await response.json()

        if (data.media) {
          setMedia(prev => [data.media, ...prev])
          // Auto-select newly uploaded image
          if (!multiple) {
            setSelected([data.media])
          } else {
            setSelected(prev => [...prev, data.media])
          }
        }
      } catch (error) {
        console.error('Upload error:', error)
      }
    }

    setUploading(false)
  }

  const toggleSelect = (item) => {
    if (multiple) {
      setSelected(prev => {
        const exists = prev.find(s => s.id === item.id)
        if (exists) {
          return prev.filter(s => s.id !== item.id)
        } else {
          return [...prev, item]
        }
      })
    } else {
      setSelected([item])
    }
  }

  const handleConfirm = () => {
    if (multiple) {
      onSelect(selected.map(s => getImageUrl(s)))
    } else {
      onSelect(selected[0] ? getImageUrl(selected[0]) : null)
    }
    onClose()
  }

  const getImageUrl = (item) => {
    if (item.url?.startsWith('http')) return item.url
    return `${API_BASE}${item.url}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Select Media</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 border-b bg-gray-50 flex items-center space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                fetchMedia(e.target.value)
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Upload Button */}
          <label className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </label>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto p-6"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* Drop Zone Overlay */}
          {dragActive && (
            <div className="absolute inset-0 bg-purple-100 bg-opacity-90 flex items-center justify-center z-10 m-6 rounded-lg border-2 border-dashed border-purple-500">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-lg font-medium text-purple-700">Drop files here</p>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          )}

          {/* Uploading */}
          {uploading && (
            <div className="text-center py-4 text-purple-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto mb-2"></div>
              <span className="text-sm">Uploading...</span>
            </div>
          )}

          {/* Media Grid */}
          {!loading && (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {media.map((item) => {
                const isSelected = selected.find(s => s.id === item.id)
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleSelect(item)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden aspect-square group ${
                      isSelected ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <img
                      src={getImageUrl(item)}
                      alt={item.alt_text || item.title}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                  </div>
                )
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && media.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
              <p className="text-gray-500">Upload images to get started</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {selected.length > 0 ? `${selected.length} item${selected.length > 1 ? 's' : ''} selected` : 'No selection'}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selected.length === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
