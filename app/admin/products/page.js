'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('project_name', 'ispeak')
      .order('created_at', { ascending: false })

    if (data) setProducts(data)
    setLoading(false)
  }

  const handleEdit = (product) => {
    setEditingProduct(product.id)
    setFormData({
      name: product.name,
      price: product.price,
      sale_price: product.sale_price,
      description: product.description,
      featured: product.featured,
      in_stock: product.in_stock,
      stock_quantity: product.stock_quantity || 0,
      low_stock_threshold: product.low_stock_threshold || 10,
      status: product.status,
      images: product.images || [],
      sku: product.sku,
      metadata: product.metadata || {}
    })
  }

  const handleSave = async (productId) => {
    const { error } = await supabase
      .from('products')
      .update(formData)
      .eq('id', productId)

    if (!error) {
      setEditingProduct(null)
      fetchProducts()
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setFormData({})
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    const { error } = await supabase
      .from('products')
      .update({ status: newStatus })
      .eq('id', productId)

    if (!error) fetchProducts()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="mt-2 text-gray-600">Manage your iSPEAK products</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      In Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      {editingProduct === product.id ? (
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
                              type="number"
                              value={formData.price}
                              onChange={(e) => handleInputChange('price', e.target.value)}
                              className="w-20 border rounded px-2 py-1"
                              step="0.01"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={formData.status}
                              onChange={(e) => handleInputChange('status', e.target.value)}
                              className="border rounded px-2 py-1"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={formData.featured}
                              onChange={(e) => handleInputChange('featured', e.target.checked)}
                              className="h-4 w-4 text-purple-600 rounded"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={formData.in_stock}
                              onChange={(e) => handleInputChange('in_stock', e.target.checked)}
                              className="h-4 w-4 text-purple-600 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 space-x-2">
                            <button
                              onClick={() => handleSave(product.id)}
                              className="text-green-600 hover:text-green-900"
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
                                  className="h-10 w-10 rounded-lg object-cover mr-3"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.sku}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {product.featured ? '⭐' : '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {product.in_stock ? '✓' : '✗'}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => toggleStatus(product.id, product.status)}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              {product.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}