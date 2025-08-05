'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function HeroSectionsPage() {
  const [heroSections, setHeroSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingSection, setEditingSection] = useState(null)
  const [formData, setFormData] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchHeroSections()
  }, [])

  async function fetchHeroSections() {
    try {
      const { data, error } = await supabase
        .from('hero_sections')
        .select('*')
        .order('page_slug')
      
      if (error) throw error
      setHeroSections(data || [])
    } catch (error) {
      console.error('Error fetching hero sections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (section) => {
    setEditingSection(section.id)
    setFormData(section)
  }

  const handleCancel = () => {
    setEditingSection(null)
    setFormData({})
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('hero_sections')
        .update({
          subtitle: formData.subtitle,
          title: formData.title,
          description: formData.description,
          primary_cta_text: formData.primary_cta_text,
          primary_cta_link: formData.primary_cta_link,
          secondary_cta_text: formData.secondary_cta_text,
          secondary_cta_link: formData.secondary_cta_link,
          image_url: formData.image_url,
          image_alt: formData.image_alt,
          mascot_visible: formData.mascot_visible,
          is_active: formData.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingSection)
      
      if (error) throw error
      
      // Refresh data
      await fetchHeroSections()
      setEditingSection(null)
      setFormData({})
      alert('Hero section updated successfully!')
    } catch (error) {
      console.error('Error updating hero section:', error)
      alert('Error updating hero section')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hero Sections</h1>
            <p className="text-gray-600 mt-2">
              Manage hero banners for different pages
            </p>
          </div>
          <Link
            href="/admin/content"
            className="btn-secondary px-4 py-2 rounded-md"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Content
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <i className="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {heroSections.map((section) => (
                  <tr key={section.id}>
                    {editingSection === section.id ? (
                      <td colSpan="4" className="px-6 py-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subtitle
                              </label>
                              <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                              </label>
                              <input
                                type="text"
                                name="title"
                                value={formData.title || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              name="description"
                              value={formData.description || ''}
                              onChange={handleChange}
                              rows="3"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Primary CTA Text
                              </label>
                              <input
                                type="text"
                                name="primary_cta_text"
                                value={formData.primary_cta_text || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Primary CTA Link
                              </label>
                              <input
                                type="text"
                                name="primary_cta_link"
                                value={formData.primary_cta_link || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                              </label>
                              <input
                                type="text"
                                name="image_url"
                                value={formData.image_url || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image Alt Text
                              </label>
                              <input
                                type="text"
                                name="image_alt"
                                value={formData.image_alt || ''}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="mascot_visible"
                                checked={formData.mascot_visible || false}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700">Show Mascot</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active || false}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              <span className="text-sm text-gray-700">Active</span>
                            </label>
                          </div>
                          
                          <div className="flex justify-end space-x-3 pt-4 border-t">
                            <button
                              onClick={handleCancel}
                              className="btn-secondary px-4 py-2 rounded-md"
                              disabled={saving}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSave}
                              className="btn-primary px-4 py-2 rounded-md"
                              disabled={saving}
                            >
                              {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {section.page_slug}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{section.title}</div>
                          <div className="text-sm text-gray-500">{section.subtitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            section.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {section.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(section)}
                            className="text-primary hover:text-primary-dark mr-3"
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}