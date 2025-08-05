import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { storeQueries } from '@/lib/supabase'
import { getProductImage } from '@/lib/productImages'
import StockIndicator from '@/components/admin/store/StockIndicator'
import StatusBadge from '@/components/admin/store/StatusBadge'

export const metadata = {
  title: 'Inventory Management | iSPEAK Admin',
  description: 'Track stock levels and manage inventory for iSPEAK store'
}

// Inventory row component
function InventoryRow({ product }) {
  const stockLevel = product.inventory?.quantity || 0
  const lowStockThreshold = product.inventory?.low_stock_threshold || 10
  const isLowStock = stockLevel <= lowStockThreshold
  const isOutOfStock = stockLevel === 0

  return (
    <tr className={`hover:bg-gray-50 ${isOutOfStock ? 'bg-red-25' : isLowStock ? 'bg-yellow-25' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img 
            className="h-10 w-10 rounded object-cover"
            src={product.featured_image || getProductImage(product.slug)}
            alt={product.name}
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.slug}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          product.collection ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {product.collection?.name || 'Uncategorized'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StockIndicator quantity={stockLevel} lowStockThreshold={lowStockThreshold} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {lowStockThreshold}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={product.status} type="product" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${product.price?.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3">
          <button 
            className="text-primary hover:text-primary-dark"
            title="Adjust stock"
          >
            <i className="fas fa-edit"></i>
          </button>
          <Link 
            href={`/admin/store/products/${product.id}/edit`} 
            className="text-gray-600 hover:text-gray-900"
            title="Edit product"
          >
            <i className="fas fa-cog"></i>
          </Link>
        </div>
      </td>
    </tr>
  )
}

// Inventory summary component
function InventorySummary({ products }) {
  const totalProducts = products?.length || 0
  const inStockProducts = products?.filter(p => (p.inventory?.quantity || 0) > (p.inventory?.low_stock_threshold || 10)).length || 0
  const lowStockProducts = products?.filter(p => {
    const stock = p.inventory?.quantity || 0
    const threshold = p.inventory?.low_stock_threshold || 10
    return stock > 0 && stock <= threshold
  }).length || 0
  const outOfStockProducts = products?.filter(p => (p.inventory?.quantity || 0) === 0).length || 0
  const totalValue = products?.reduce((sum, p) => sum + ((p.inventory?.quantity || 0) * (p.price || 0)), 0) || 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
        <div className="text-sm text-gray-600">Total Products</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-green-600">{inStockProducts}</div>
        <div className="text-sm text-gray-600">In Stock</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-yellow-600">{lowStockProducts}</div>
        <div className="text-sm text-gray-600">Low Stock</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-red-600">{outOfStockProducts}</div>
        <div className="text-sm text-gray-600">Out of Stock</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-primary">${totalValue.toFixed(2)}</div>
        <div className="text-sm text-gray-600">Inventory Value</div>
      </div>
    </div>
  )
}

export default async function InventoryPage() {
  // Fetch products with inventory data
  const { data: products, error } = await storeQueries.getAllProducts()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
            <p className="mt-1 text-sm text-gray-600">
              Track stock levels and manage product inventory
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors inline-flex items-center">
              <i className="fas fa-download mr-2"></i>
              Export Report
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-flex items-center">
              <i className="fas fa-plus mr-2"></i>
              Bulk Update
            </button>
          </div>
        </div>

        {/* Inventory Summary */}
        <InventorySummary products={products} />

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">All Collections</option>
              <option value="bags-accessories">Bags & Accessories</option>
              <option value="educational-materials">Educational Materials</option>
              <option value="toys-games">Toys & Games</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">All Stock Levels</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Sort by Stock</option>
              <option value="stock-desc">Highest Stock</option>
              <option value="stock-asc">Lowest Stock</option>
              <option value="value-desc">Highest Value</option>
              <option value="name-asc">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Inventory table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Low Stock Alert
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {error ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-red-600">
                      Error loading inventory: {error.error}
                    </td>
                  </tr>
                ) : products && products.length > 0 ? (
                  products.map((product) => <InventoryRow key={product.id} product={product} />)
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <i className="fas fa-boxes text-4xl text-gray-300 mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-4">Add products to start tracking inventory.</p>
                        <Link
                          href="/admin/store/products/new"
                          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-flex items-center"
                        >
                          <i className="fas fa-plus mr-2"></i>
                          Add Product
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory alerts */}
        {products && products.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <i className="fas fa-exclamation-triangle text-yellow-500 text-xl mt-1 mr-4"></i>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Inventory Alerts</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {products.filter(p => (p.inventory?.quantity || 0) === 0).length > 0 && (
                    <p>• {products.filter(p => (p.inventory?.quantity || 0) === 0).length} products are out of stock</p>
                  )}
                  {products.filter(p => {
                    const stock = p.inventory?.quantity || 0
                    const threshold = p.inventory?.low_stock_threshold || 10
                    return stock > 0 && stock <= threshold
                  }).length > 0 && (
                    <p>• {products.filter(p => {
                      const stock = p.inventory?.quantity || 0
                      const threshold = p.inventory?.low_stock_threshold || 10
                      return stock > 0 && stock <= threshold
                    }).length} products have low stock levels</p>
                  )}
                  {products.filter(p => (p.inventory?.quantity || 0) === 0 || 
                    ((p.inventory?.quantity || 0) > 0 && (p.inventory?.quantity || 0) <= (p.inventory?.low_stock_threshold || 10))
                  ).length === 0 && (
                    <p>• All products are properly stocked!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}