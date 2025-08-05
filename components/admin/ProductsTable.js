'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ProductsTable() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCollection, setFilterCollection] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterStock, setFilterStock] = useState('')
  const [collections, setCollections] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [bulkAction, setBulkAction] = useState('')

  useEffect(() => {
    fetchProducts()
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    const { data } = await supabase
      .from('product_collections')
      .select('*')
      .order('name')
    
    if (data) setCollections(data)
  }

  const fetchProducts = async () => {
    setLoading(true)
    
    // Filter to only get iSPEAK products
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or('slug.like.ispeak-%,slug.like.paji-%,slug.like.african-%,slug.like.teacher-%,slug.like.yoruba-%,slug.like.kiswahili-%,slug.like.twi-%')
      .order('created_at', { ascending: false })

    if (data) {
      setProducts(data)
    }
    if (error) {
      console.error('Error fetching products:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)

    if (!error) {
      fetchProducts()
    }
  }

  const handleBulkAction = async () => {
    if (!bulkAction || selectedProducts.length === 0) return

    switch (bulkAction) {
      case 'activate':
        await supabase
          .from('products')
          .update({ status: 'active' })
          .in('id', selectedProducts)
        break
      case 'deactivate':
        await supabase
          .from('products')
          .update({ status: 'inactive' })
          .in('id', selectedProducts)
        break
      case 'delete':
        if (confirm(`Delete ${selectedProducts.length} products?`)) {
          await supabase
            .from('products')
            .delete()
            .in('id', selectedProducts)
        }
        break
    }

    setSelectedProducts([])
    setBulkAction('')
    fetchProducts()
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.slug.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Collection filter
    if (filterCollection && product.collection_id !== filterCollection) {
      return false
    }

    // Status filter
    if (filterStatus && product.status !== filterStatus) {
      return false
    }

    // Stock filter
    if (filterStock) {
      const stock = product.stock_quantity || 0
      const threshold = product.low_stock_threshold || 10
      
      switch (filterStock) {
        case 'in-stock':
          if (stock <= threshold) return false
          break
        case 'low-stock':
          if (stock === 0 || stock > threshold) return false
          break
        case 'out-of-stock':
          if (stock > 0) return false
          break
      }
    }

    return true
  })

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  // Calculate stats from fetched products
  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => {
      const stock = p.stock_quantity || 0
      const threshold = p.low_stock_threshold || 10
      return stock > 0 && stock <= threshold
    }).length,
    outOfStock: products.filter(p => (p.stock_quantity || 0) === 0).length
  }

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <i className="fas fa-box text-3xl text-gray-400"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <i className="fas fa-check-circle text-3xl text-green-400"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <i className="fas fa-exclamation-triangle text-3xl text-yellow-400"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <i className="fas fa-times-circle text-3xl text-red-400"></i>
          </div>
        </div>
      </div>
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <select 
            value={filterCollection}
            onChange={(e) => setFilterCollection(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Collections</option>
            {collections.map(col => (
              <option key={col.id} value={col.id}>{col.name}</option>
            ))}
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>
          <select 
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Stock</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-white border border-primary rounded-lg px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {selectedProducts.length} products selected
            </span>
            <div className="flex items-center space-x-2">
              <select 
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1"
              >
                <option value="">Bulk actions</option>
                <option value="activate">Set to Active</option>
                <option value="deactivate">Set to Inactive</option>
                <option value="delete">Delete Selected</option>
              </select>
              <button 
                onClick={handleBulkAction}
                className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary-dark"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    {searchTerm || filterCollection || filterStatus || filterStock
                      ? 'No products match your filters'
                      : 'No products found'}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const stockLevel = product.stock_quantity || 0
                  const lowStockThreshold = product.low_stock_threshold || 10
                  const isLowStock = stockLevel <= lowStockThreshold && stockLevel > 0
                  const isOutOfStock = stockLevel === 0

                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProducts([...selectedProducts, product.id])
                            } else {
                              setSelectedProducts(selectedProducts.filter(id => id !== product.id))
                            }
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-12 w-12 rounded object-cover"
                            src={product.images?.[0] || '/placeholder-product.jpg'}
                            alt={product.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${product.price?.toFixed(2)}
                          {product.sale_price && (
                            <span className="text-xs text-red-600 ml-2">
                              Sale: ${product.sale_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {product.collection?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            isOutOfStock ? 'text-red-600' : 
                            isLowStock ? 'text-yellow-600' : 
                            'text-gray-900'
                          }`}>
                            {stockLevel}
                          </span>
                          {isLowStock && (
                            <i className="fas fa-exclamation-triangle text-yellow-500 ml-2" title="Low stock"></i>
                          )}
                          {isOutOfStock && (
                            <i className="fas fa-times-circle text-red-500 ml-2" title="Out of stock"></i>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : product.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <Link 
                            href={`/admin/store/products/${product.id}/edit`} 
                            className="text-primary hover:text-primary-dark"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <a 
                            href={`/shop/products/${product.slug}`} 
                            target="_blank"
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        {filteredProducts.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 text-sm text-gray-700">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        )}
      </div>
    </div>
  )
}