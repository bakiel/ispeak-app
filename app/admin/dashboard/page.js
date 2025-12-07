'use client'

import { useState, useEffect } from 'react'
import { storeQueries, adminAPI } from '@/lib/api-client'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import ImageManager from '../products/image-manager'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showImageManager, setShowImageManager] = useState(null)
  const [formData, setFormData] = useState({})
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await storeQueries.getAllProducts()

    if (data) {
      setProducts(data)
      calculateStats(data)
    }
    setLoading(false)
  }

  const calculateStats = (products) => {
    const stats = {
      totalProducts: products.length,
      lowStock: 0,
      outOfStock: 0,
      totalValue: 0
    }

    products.forEach(product => {
      const stock = product.stock_quantity || 0
      const threshold = product.low_stock_threshold || 10
      
      if (stock === 0) {
        stats.outOfStock++
      } else if (stock <= threshold) {
        stats.lowStock++
      }
      
      stats.totalValue += (product.price * stock)
    })

    setStats(stats)
  }

  const handleEdit = (product) => {
    setEditingProduct(product.id)
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      sale_price: product.sale_price,
      description: product.description,
      featured: product.featured,
      in_stock: product.in_stock,
      stock_quantity: product.stock_quantity || 0,
      low_stock_threshold: product.low_stock_threshold || 10,
      status: product.status,
      images: product.images || [],
      metadata: product.metadata || {},
      category: product.metadata?.collection?.slug || 'other'
    })
  }

  const handleSave = async (productId) => {
    // Define available categories
    const categories = {
      'apparel': { id: 1, name: 'Apparel', slug: 'apparel' },
      'educational': { id: 2, name: 'Educational Materials', slug: 'educational' },
      'accessories': { id: 3, name: 'Accessories', slug: 'accessories' },
      'stationery': { id: 4, name: 'Stationery', slug: 'stationery' },
      'toys': { id: 5, name: 'Toys & Games', slug: 'toys' },
      'other': { id: 6, name: 'Other', slug: 'other' }
    }

    // Update metadata with new category
    const updatedMetadata = {
      ...formData.metadata,
      collection: categories[formData.category] || categories.other,
      category: categories[formData.category]?.name || 'Other'
    }

    // Auto-update in_stock based on stock_quantity
    const updatedData = {
      ...formData,
      in_stock: formData.stock_quantity > 0,
      metadata: updatedMetadata
    }
    
    // Remove the category field as it's not a database column
    delete updatedData.category

    const { error } = await adminAPI.updateProduct(productId, updatedData)

    if (!error) {
      setEditingProduct(null)
      fetchProducts()
    } else {
      alert('Error saving product: ' + (error.message || 'Unknown error'))
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setFormData({})
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateStock = async (productId, change) => {
    const product = products.find(p => p.id === productId)
    const currentStock = product.stock_quantity || 0
    const newStock = Math.max(0, currentStock + change)

    const { error } = await adminAPI.updateProduct(productId, {
      stock_quantity: newStock,
      in_stock: newStock > 0
    })

    if (!error) fetchProducts()
  }

  const getStockStatus = (product) => {
    const stock = product.stock_quantity || 0
    const threshold = product.low_stock_threshold || 10
    
    if (stock === 0) {
      return { text: 'Out of Stock', color: 'text-red-600 bg-red-100' }
    } else if (stock <= threshold) {
      return { text: `Low Stock (${stock})`, color: 'text-yellow-600 bg-yellow-100' }
    } else {
      return { text: `In Stock (${stock})`, color: 'text-green-600 bg-green-100' }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your iSPEAK products and content</p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/admin/blog"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Manage Blog
            </Link>
            <button
              onClick={() => window.location.href = '/admin/products/new'}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Low Stock</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.lowStock}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Out of Stock</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.outOfStock}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm">Inventory Value</p>
                <p className="text-2xl font-semibold text-gray-900">${stats.totalValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Product Inventory</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quick Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => {
                    const stockStatus = getStockStatus(product)
                    const isEditing = editingProduct === product.id
                    
                    return (
                      <tr key={product.id} className={isEditing ? 'bg-blue-50' : ''}>
                        {isEditing ? (
                          <>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                              />
                              <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="w-full border rounded px-2 py-1 mt-2"
                                rows="2"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                value={formData.sku}
                                onChange={(e) => handleInputChange('sku', e.target.value)}
                                className="w-full border rounded px-2 py-1"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <label className="text-xs text-gray-500">Regular</label>
                              <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                                className="w-20 border rounded px-2 py-1 mb-1"
                                step="0.01"
                              />
                              <label className="text-xs text-gray-500">Sale</label>
                              <input
                                type="number"
                                value={formData.sale_price || ''}
                                onChange={(e) => handleInputChange('sale_price', e.target.value ? parseFloat(e.target.value) : null)}
                                className="w-20 border rounded px-2 py-1"
                                step="0.01"
                                placeholder="Optional"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <label className="text-xs text-gray-500">Quantity</label>
                              <input
                                type="number"
                                value={formData.stock_quantity}
                                onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value))}
                                className="w-20 border rounded px-2 py-1 mb-1"
                                min="0"
                              />
                              <label className="text-xs text-gray-500">Low Alert</label>
                              <input
                                type="number"
                                value={formData.low_stock_threshold}
                                onChange={(e) => handleInputChange('low_stock_threshold', parseInt(e.target.value))}
                                className="w-20 border rounded px-2 py-1"
                                min="0"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <label className="text-xs text-gray-500">Category</label>
                              <select
                                value={formData.category || 'other'}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="w-full border rounded px-2 py-1 mb-2"
                              >
                                <option value="apparel">Apparel</option>
                                <option value="educational">Educational Materials</option>
                                <option value="accessories">Accessories</option>
                                <option value="stationery">Stationery</option>
                                <option value="toys">Toys & Games</option>
                                <option value="other">Other</option>
                              </select>
                              <label className="text-xs text-gray-500">Status</label>
                              <select
                                value={formData.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                                className="w-full border rounded px-2 py-1 mb-2"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.featured}
                                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                                  className="h-4 w-4 text-purple-600 rounded"
                                />
                                <span className="ml-2 text-sm">Featured</span>
                              </label>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => setShowImageManager(product.id)}
                                className="text-blue-600 hover:text-blue-900 text-sm"
                              >
                                Manage Images
                              </button>
                            </td>
                            <td className="px-6 py-4 space-x-2">
                              <button
                                onClick={() => handleSave(product.id)}
                                className="text-green-600 hover:text-green-900 font-semibold"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {product.images && product.images[0] && (
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="h-12 w-12 rounded-lg object-cover mr-3"
                                  />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {product.metadata?.category || 'Uncategorized'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {product.sku}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {product.sale_price ? (
                                <div>
                                  <span className="line-through text-gray-500">${product.price}</span>
                                  <span className="ml-2 text-red-600 font-semibold">${product.sale_price}</span>
                                </div>
                              ) : (
                                <span>${product.price}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}>
                                {stockStatus.text}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  product.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {product.status}
                                </span>
                                {product.featured && (
                                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateStock(product.id, -1)}
                                  className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                  title="Decrease stock"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="text-sm font-medium w-10 text-center">
                                  {product.stock_quantity || 0}
                                </span>
                                <button
                                  onClick={() => updateStock(product.id, 1)}
                                  className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                  title="Increase stock"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium space-x-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Quick Edit
                              </button>
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="text-purple-600 hover:text-purple-900"
                              >
                                Full Edit
                              </Link>
                              <Link
                                href={`/shop/products/${product.slug}`}
                                className="text-gray-600 hover:text-gray-900"
                                target="_blank"
                              >
                                View
                              </Link>
                            </td>
                          </>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Image Manager Modal */}
        {showImageManager && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Manage Product Images</h3>
                <button
                  onClick={() => setShowImageManager(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ImageManager
                productId={showImageManager}
                currentImages={products.find(p => p.id === showImageManager)?.images || []}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}