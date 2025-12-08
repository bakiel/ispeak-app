'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function ParentChildren() {
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingChild, setEditingChild] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    languageId: ''
  })
  const [languages, setLanguages] = useState([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchChildren()
    fetchLanguages()
  }, [])

  const fetchChildren = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/parent/children`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch children')

      const data = await response.json()
      setChildren(data.children || [])
    } catch (err) {
      console.error('Error fetching children:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/content/languages`)
      if (response.ok) {
        const data = await response.json()
        setLanguages(data)
      }
    } catch (err) {
      console.error('Error fetching languages:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    const token = localStorage.getItem('token')

    try {
      const url = editingChild
        ? `${API_BASE}/api/portal/parent/children/${editingChild.id}`
        : `${API_BASE}/api/portal/parent/children`

      const response = await fetch(url, {
        method: editingChild ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to save child')

      setMessage({ type: 'success', text: editingChild ? 'Child updated!' : 'Child added!' })
      fetchChildren()
      resetForm()
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this child?')) return

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`${API_BASE}/api/portal/parent/children/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to remove child')

      fetchChildren()
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    }
  }

  const startEdit = (child) => {
    setEditingChild(child)
    setFormData({
      firstName: child.first_name || '',
      lastName: child.last_name || '',
      dateOfBirth: child.date_of_birth || '',
      languageId: child.language_id || ''
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setEditingChild(null)
    setShowAddForm(false)
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      languageId: ''
    })
  }

  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  if (loading) {
    return (
      <PortalLayout portalType="parent">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout portalType="parent">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Children</h1>
          <p className="text-gray-600">Manage your children's profiles and enrollments</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <i className="fas fa-plus mr-2"></i> Add Child
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
          {message.text}
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {editingChild ? 'Edit Child' : 'Add New Child'}
            </h2>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Child's first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Child's last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language to Learn</label>
                <select
                  value={formData.languageId}
                  onChange={(e) => setFormData({ ...formData, languageId: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a language</option>
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingChild ? 'Update' : 'Add Child'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Children List */}
      {children.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <div key={child.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    {child.avatar_url ? (
                      <img src={child.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold">
                        {child.first_name?.charAt(0)?.toUpperCase() || 'C'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{child.first_name} {child.last_name}</h3>
                    <p className="text-purple-100">Age {calculateAge(child.date_of_birth)}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Language</span>
                    <span className="font-medium text-gray-800">{child.language_name || 'Not enrolled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Level</span>
                    <span className="font-medium text-gray-800">{child.current_level || 'Beginner'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lessons Completed</span>
                    <span className="font-medium text-gray-800">{child.lessons_completed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Practice Hours</span>
                    <span className="font-medium text-gray-800">{child.practice_hours || 0}h</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Overall Progress</span>
                    <span className="font-medium text-gray-800">{child.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 rounded-full h-2"
                      style={{ width: `${child.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(child)}
                    className="flex-1 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 text-sm"
                  >
                    <i className="fas fa-edit mr-1"></i> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(child.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <i className="fas fa-child text-gray-300 text-6xl mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No children added yet</h3>
          <p className="text-gray-600 mb-6">Add your children to start managing their language learning journey</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            <i className="fas fa-plus mr-2"></i> Add Your First Child
          </button>
        </div>
      )}
    </PortalLayout>
  )
}
