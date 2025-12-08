'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    location: '',
    content: '',
    rating: 5,
    avatar_url: '',
    language_id: '',
    is_featured: false,
    is_active: true
  })

  useEffect(() => {
    fetchTestimonials()
    fetchLanguages()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`/api/content/testimonials?active_only=false`)
      if (!response.ok) throw new Error('Failed to fetch testimonials')
      const data = await response.json()
      setTestimonials(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`/api/content/languages`)
      if (!response.ok) throw new Error('Failed to fetch languages')
      const data = await response.json()
      setLanguages(data)
    } catch (err) {
      console.error('Failed to fetch languages:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')

    try {
      const url = editingTestimonial
        ? `${API_BASE}/api/content/testimonials/${editingTestimonial.id}`
        : `${API_BASE}/api/content/testimonials`

      const response = await fetch(url, {
        method: editingTestimonial ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          language_id: formData.language_id || null
        })
      })

      if (!response.ok) throw new Error('Failed to save testimonial')

      await fetchTestimonials()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    const token = localStorage.getItem('adminToken')

    try {
      const response = await fetch(`${API_BASE}/api/content/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) throw new Error('Failed to delete testimonial')

      await fetchTestimonials()
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name || '',
      role: testimonial.role || '',
      location: testimonial.location || '',
      content: testimonial.content || '',
      rating: testimonial.rating || 5,
      avatar_url: testimonial.avatar_url || '',
      language_id: testimonial.language_id || '',
      is_featured: testimonial.is_featured,
      is_active: testimonial.is_active
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setEditingTestimonial(null)
    setShowAddForm(false)
    setFormData({
      name: '',
      role: '',
      location: '',
      content: '',
      rating: 5,
      avatar_url: '',
      language_id: '',
      is_featured: false,
      is_active: true
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link href="/admin/content" className="text-sm text-gray-500 hover:text-primary mb-2 inline-block">
              <i className="fas fa-arrow-left mr-2"></i> Back to Content
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
            <p className="text-gray-600 mt-1">Manage parent and student testimonials</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            <i className="fas fa-plus mr-2"></i> Add Testimonial
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button onClick={() => setError(null)} className="float-right">&times;</button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., Parent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., Atlanta, GA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial *</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  rows="4"
                  placeholder="Their testimonial..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {[5, 4, 3, 2, 1].map(r => (
                      <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Related Language</label>
                  <select
                    value={formData.language_id}
                    onChange={(e) => setFormData({...formData, language_id: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">None</option>
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                  <input
                    type="text"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="URL to photo"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured (show on homepage)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  {editingTestimonial ? 'Update' : 'Create'} Testimonial
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                !testimonial.is_active ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}{testimonial.location ? `, ${testimonial.location}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {testimonial.is_featured && (
                    <span className="text-yellow-500" title="Featured">
                      <i className="fas fa-star"></i>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star text-sm ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  ></i>
                ))}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                "{testimonial.content}"
              </p>

              {testimonial.language_name && (
                <p className="text-xs text-gray-500 mb-4">
                  Learning: {testimonial.language_name}
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  testimonial.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {testimonial.is_active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(testimonial)}
                    className="text-primary hover:text-primary-dark"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
            <i className="fas fa-comment-dots text-4xl mb-4"></i>
            <p>No testimonials found. Add your first testimonial!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
