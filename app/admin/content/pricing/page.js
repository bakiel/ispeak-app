'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function PricingPlansPage() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingPlan, setEditingPlan] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    currency: 'USD',
    billing_period: 'monthly',
    features: [],
    is_popular: false,
    is_active: true,
    display_order: 0
  })
  const [newFeature, setNewFeature] = useState('')

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch(`/api/content/pricing-plans?active_only=false`)
      if (!response.ok) throw new Error('Failed to fetch pricing plans')
      const data = await response.json()
      setPlans(data)
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
      const url = editingPlan
        ? `${API_BASE}/api/content/pricing-plans/${editingPlan.id}`
        : `${API_BASE}/api/content/pricing-plans`

      const response = await fetch(url, {
        method: editingPlan ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      })

      if (!response.ok) throw new Error('Failed to save pricing plan')

      await fetchPlans()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return

    const token = localStorage.getItem('adminToken')

    try {
      const response = await fetch(`${API_BASE}/api/content/pricing-plans/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) throw new Error('Failed to delete pricing plan')

      await fetchPlans()
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (plan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name || '',
      slug: plan.slug || '',
      description: plan.description || '',
      price: plan.price || '',
      currency: plan.currency || 'USD',
      billing_period: plan.billing_period || 'monthly',
      features: plan.features || [],
      is_popular: plan.is_popular,
      is_active: plan.is_active,
      display_order: plan.display_order || 0
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setEditingPlan(null)
    setShowAddForm(false)
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      currency: 'USD',
      billing_period: 'monthly',
      features: [],
      is_popular: false,
      is_active: true,
      display_order: 0
    })
    setNewFeature('')
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({...formData, features: [...formData.features, newFeature.trim()]})
      setNewFeature('')
    }
  }

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
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
            <h1 className="text-3xl font-bold text-gray-900">Pricing Plans</h1>
            <p className="text-gray-600 mt-1">Manage subscription and pricing plans</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            <i className="fas fa-plus mr-2"></i> Add Plan
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
              {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., Explorer"
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
                    placeholder="e.g., explorer"
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  rows="2"
                  placeholder="Brief description of the plan..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="49.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Period</label>
                  <select
                    value={formData.billing_period}
                    onChange={(e) => setFormData({...formData, billing_period: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                    <option value="one-time">One-time</option>
                  </select>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 border rounded-lg px-3 py-2"
                    placeholder="Add a feature..."
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <ul className="space-y-1">
                  {formData.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded">
                      <i className="fas fa-check text-green-500"></i>
                      <span className="flex-1">{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_popular}
                    onChange={(e) => setFormData({...formData, is_popular: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Popular (highlighted)</span>
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
                  {editingPlan ? 'Update' : 'Create'} Plan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                plan.is_popular ? 'ring-2 ring-primary' : ''
              } ${!plan.is_active ? 'opacity-60' : ''}`}
            >
              {plan.is_popular && (
                <div className="bg-primary text-white text-center text-sm py-1">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.slug}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    plan.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {plan.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">${parseFloat(plan.price).toFixed(2)}</span>
                  <span className="text-gray-500">/{plan.billing_period}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                <ul className="space-y-2 mb-6">
                  {plan.features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <i className="fas fa-check text-green-500 mt-0.5"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(plan)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <i className="fas fa-edit mr-2"></i> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
            <i className="fas fa-dollar-sign text-4xl mb-4"></i>
            <p>No pricing plans found. Add your first plan!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
