'use client'

import { useState, useEffect, useCallback } from 'react'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

// Use local image proxy to avoid mixed content issues (HTTPS -> HTTP)
// Images are served via /api/media/image/uploads/filename.png

export default function MediaLibrary() {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [searchTerm, setSearchTerm] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [folders, setFolders] = useState([])
  const [selectedFolder, setSelectedFolder] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [urlToImport, setUrlToImport] = useState('')

  useEffect(() => {
    fetchMedia()
    fetchFolders()
  }, [])

  const fetchMedia = async (search = '') => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (selectedFolder !== 'all') params.append('folder', selectedFolder)

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

  const fetchFolders = async () => {
    try {
      // Folders endpoint - use local API proxy
      const response = await fetch(`/api/media/folders`)
      const data = await response.json()
      setFolders(data || [])
    } catch (error) {
      console.error('Error fetching folders:', error)
    }
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
    setUploadProgress(0)

    const totalFiles = files.length
    let uploaded = 0

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', selectedFolder !== 'all' ? selectedFolder : 'uploads')

      try {
        // Use local API proxy for upload
        const response = await fetch(`/api/media/upload`, {
          method: 'POST',
          body: formData
        })

        const data = await response.json()

        if (data.media) {
          setMedia(prev => [data.media, ...prev])
        }

        uploaded++
        setUploadProgress(Math.round((uploaded / totalFiles) * 100))
      } catch (error) {
        console.error('Upload error:', error)
      }
    }

    setUploading(false)
    setUploadProgress(0)
    setShowUploadModal(false)
  }

  const handleUrlImport = async () => {
    if (!urlToImport) return

    setUploading(true)

    try {
      // Use local API proxy for URL import
      const response = await fetch(`/api/media/upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: urlToImport,
          folder: selectedFolder !== 'all' ? selectedFolder : 'uploads'
        })
      })

      const data = await response.json()

      if (data.media) {
        setMedia(prev => [data.media, ...prev])
        setUrlToImport('')
        setShowUploadModal(false)
      }
    } catch (error) {
      console.error('URL import error:', error)
    }

    setUploading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this media?')) return

    try {
      // Use local API proxy for delete
      await fetch(`/api/media/${id}`, { method: 'DELETE' })
      setMedia(prev => prev.filter(m => m.id !== id))
      setSelectedMedia(null)
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const handleUpdateMedia = async (id, updates) => {
    try {
      // Use local API proxy for update
      const response = await fetch(`/api/media/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      const data = await response.json()

      if (data.media) {
        setMedia(prev => prev.map(m => m.id === id ? data.media : m))
        setSelectedMedia(data.media)
      }
    } catch (error) {
      console.error('Update error:', error)
    }
  }

  const handleReanalyze = async (id) => {
    try {
      // Use local API proxy for AI analysis
      const response = await fetch(`/api/media/${id}/analyze`, {
        method: 'POST'
      })

      const data = await response.json()

      if (data.media) {
        setMedia(prev => prev.map(m => m.id === id ? data.media : m))
        setSelectedMedia(data.media)
        alert('AI analysis complete!')
      }
    } catch (error) {
      console.error('Analysis error:', error)
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getImageUrl = (item) => {
    // If it's already an absolute URL, use it
    if (item.url?.startsWith('http')) return item.url
    // Use direct /uploads/ path - Next.js rewrites proxy to backend
    return item.url
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
            <p className="mt-1 text-gray-600">Manage your images and files with AI-powered organization</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    fetchMedia(e.target.value)
                  }}
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Folder Filter */}
              <select
                value={selectedFolder}
                onChange={(e) => {
                  setSelectedFolder(e.target.value)
                  fetchMedia(searchTerm)
                }}
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All Folders</option>
                {folders.map(f => (
                  <option key={f.folder} value={f.folder}>{f.folder} ({f.count})</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Media Grid/List */}
          <div className={`flex-1 ${selectedMedia ? 'w-2/3' : 'w-full'}`}>
            {/* Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
              }`}
            >
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600">Drag and drop files here, or</p>
              <label className="mt-2 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </label>
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              </div>
            )}

            {/* Uploading Progress */}
            {uploading && (
              <div className="mb-6 bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-gray-500">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Grid View */}
            {!loading && viewMode === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {media.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow ${
                      selectedMedia?.id === item.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <div className="aspect-square">
                      <img
                        src={getImageUrl(item)}
                        alt={item.alt_text || item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all">
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs truncate">{item.title || item.filename}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {!loading && viewMode === 'list' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {media.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedMedia(item)}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          selectedMedia?.id === item.id ? 'bg-purple-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <img
                            src={getImageUrl(item)}
                            alt={item.alt_text}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.filename}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatFileSize(item.file_size)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Empty State */}
            {!loading && media.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
                <p className="text-gray-500 mb-4">Upload your first image to get started</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Upload Image
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Media Details */}
          {selectedMedia && (
            <div className="w-80 bg-white rounded-lg shadow p-6 h-fit sticky top-24">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900">Media Details</h3>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Preview */}
              <img
                src={getImageUrl(selectedMedia)}
                alt={selectedMedia.alt_text}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Editable Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={selectedMedia.title || ''}
                    onChange={(e) => setSelectedMedia({...selectedMedia, title: e.target.value})}
                    onBlur={() => handleUpdateMedia(selectedMedia.id, { title: selectedMedia.title })}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={selectedMedia.alt_text || ''}
                    onChange={(e) => setSelectedMedia({...selectedMedia, alt_text: e.target.value})}
                    onBlur={() => handleUpdateMedia(selectedMedia.id, { alt_text: selectedMedia.alt_text })}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={selectedMedia.description || ''}
                    onChange={(e) => setSelectedMedia({...selectedMedia, description: e.target.value})}
                    onBlur={() => handleUpdateMedia(selectedMedia.id, { description: selectedMedia.description })}
                    className="w-full border rounded px-3 py-2 text-sm"
                    rows={3}
                  />
                </div>

                {/* URL Copy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={getImageUrl(selectedMedia)}
                      readOnly
                      className="flex-1 border rounded-l px-3 py-2 text-sm bg-gray-50"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(getImageUrl(selectedMedia))
                        alert('URL copied!')
                      }}
                      className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r hover:bg-gray-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="text-sm text-gray-500 space-y-1 pt-2 border-t">
                  <p>Size: {formatFileSize(selectedMedia.file_size)}</p>
                  <p>Type: {selectedMedia.mime_type}</p>
                  <p>Uploaded: {new Date(selectedMedia.created_at).toLocaleDateString()}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t">
                  <button
                    onClick={() => handleReanalyze(selectedMedia.id)}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                  >
                    Re-analyze with AI
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMedia.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Upload Media</h3>

            <div className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload from Computer</label>
                <label className="block w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50">
                  <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="text-sm text-gray-600">Click to select files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* URL Import */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Import from URL</label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={urlToImport}
                    onChange={(e) => setUrlToImport(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2"
                  />
                  <button
                    onClick={handleUrlImport}
                    disabled={!urlToImport || uploading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
