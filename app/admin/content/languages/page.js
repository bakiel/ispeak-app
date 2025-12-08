'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function LanguagesPage() {
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingLanguage, setEditingLanguage] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    native_name: '',
    slug: '',
    description: '',
    region: '',
    flag_icon: '',
    is_active: true,
    display_order: 0
  })

  useEffect(() => {
    fetchLanguages()
  }, [])

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`/api/content/languages?active_only=false`)
      if (!response.ok) throw new Error('Failed to fetch languages')
      const data = await response.json()
      setLanguages(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')

    try {
      const url = editingLanguage
        ? `${API_BASE}/api/content/languages/${editingLanguage.id}`
        : `${API_BASE}/api/content/languages`

      const response = await fetch(url, {
        method: editingLanguage ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save language')

      await fetchLanguages()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this language?')) return

    const token = localStorage.getItem('adminToken')

    try {
      const response = await fetch(`${API_BASE}/api/content/languages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) throw new Error('Failed to delete language')

      await fetchLanguages()
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (language) => {
    setEditingLanguage(language)
    setFormData({
      name: language.name || '',
      native_name: language.native_name || '',
      slug: language.slug || '',
      description: language.description || '',
      region: language.region || '',
      flag_icon: language.flag_icon || '',
      is_active: language.is_active,
      display_order: language.display_order || 0
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setEditingLanguage(null)
    setShowAddForm(false)
    setFormData({
      name: '',
      native_name: '',
      slug: '',
      description: '',
      region: '',
      flag_icon: '',
      is_active: true,
      display_order: 0
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
            <h1 className="text-3xl font-bold text-gray-900">Languages</h1>
            <p className="text-gray-600 mt-1">Manage available languages for learning programs</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            <i className="fas fa-plus mr-2"></i> Add Language
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
              {editingLanguage ? 'Edit Language' : 'Add New Language'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., Yoruba"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Native Name</label>
                <input
                  type="text"
                  value={formData.native_name}
                  onChange={(e) => setFormData({...formData, native_name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., Yoruba"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., yoruba"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., West Africa"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  rows="3"
                  placeholder="Brief description of the language..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flag Icon URL</label>
                <input
                  type="text"
                  value={formData.flag_icon}
                  onChange={(e) => setFormData({...formData, flag_icon: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="URL to flag image"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex items-center">
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
              <div className="md:col-span-2 flex justify-end gap-3">
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
                  {editingLanguage ? 'Update' : 'Create'} Language
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Languages List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Native Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {languages.map((language) => (
                <tr key={language.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {language.display_order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {language.flag_icon && (
                        <img src={language.flag_icon} alt="" className="w-8 h-6 mr-3 object-cover rounded" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{language.name}</div>
                        <div className="text-sm text-gray-500">{language.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {language.native_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {language.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      language.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {language.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => startEdit(language)}
                      className="text-primary hover:text-primary-dark mr-3"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(language.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {languages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-globe-africa text-4xl mb-4"></i>
              <p>No languages found. Add your first language!</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
