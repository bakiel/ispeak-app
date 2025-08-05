'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchStatistics()
  }, [])

  async function fetchStatistics() {
    try {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .order('display_order')
      
      if (error) throw error
      setStatistics(data || [])
    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (stat) => {
    setEditingId(stat.id)
    setFormData(stat)
  }

  const handleCancel = () => {
    setEditingId(null)
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
        .from('statistics')
        .update({
          title: formData.title,
          value: formData.value,
          icon: formData.icon,
          icon_color: formData.icon_color,
          display_order: parseInt(formData.display_order) || 0,
          is_active: formData.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingId)
      
      if (error) throw error
      
      await fetchStatistics()
      setEditingId(null)
      setFormData({})
      alert('Statistic updated successfully!')
    } catch (error) {
      console.error('Error updating statistic:', error)
      alert('Error updating statistic')
    } finally {
      setSaving(false)
    }
  }

  const iconOptions = [
    { value: 'fas fa-globe', label: 'Globe' },
    { value: 'fas fa-user-graduate', label: 'Graduate' },
    { value: 'fas fa-clock', label: 'Clock' },
    { value: 'fas fa-star', label: 'Star' },
    { value: 'fas fa-chart-line', label: 'Chart' },
    { value: 'fas fa-award', label: 'Award' },
    { value: 'fas fa-trophy', label: 'Trophy' },
    { value: 'fas fa-certificate', label: 'Certificate' }
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
            <p className="text-gray-600 mt-2">
              Manage homepage statistics and metrics
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat) => (
              <div key={stat.id} className="bg-white rounded-lg shadow-md p-6">
                {editingId === stat.id ? (
                  <div className="space-y-4">
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
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={formData.value || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon
                      </label>
                      <select
                        name="icon"
                        value={formData.icon || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {iconOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        name="display_order"
                        value={formData.display_order || 0}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
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
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <button
                        onClick={handleCancel}
                        className="btn-secondary px-3 py-1 rounded text-sm"
                        disabled={saving}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="btn-primary px-3 py-1 rounded text-sm"
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <i className={`${stat.icon} text-4xl ${stat.icon_color || 'text-yellow-300'}`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 text-center mb-4">
                      {stat.title}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        stat.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {stat.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleEdit(stat)}
                        className="text-primary hover:text-primary-dark"
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && statistics.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <i className="fas fa-chart-bar text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">No statistics found. Add some from the database.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}