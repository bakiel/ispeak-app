import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { storeQueries } from '@/lib/supabase'

export const metadata = {
  title: 'Store Dashboard | iSPEAK Admin',
  description: 'Manage your iSPEAK store products, orders, and inventory'
}

// Store metrics card component
function MetricCard({ title, value, icon, color, change, href }) {
  const CardContent = (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`fas fa-arrow-${change > 0 ? 'up' : 'down'} mr-1`}></i>
              {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <i className={`${icon} text-2xl text-white`}></i>
        </div>
      </div>
    </div>
  )

  return href ? (
    <Link href={href} className="block">
      {CardContent}
    </Link>
  ) : CardContent
}

// Low stock alerts component
function LowStockAlerts({ products }) {
  const lowStockProducts = products?.filter(product => 
    product.inventory && product.inventory.quantity <= product.inventory.low_stock_threshold
  ) || []

  if (lowStockProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500">
            <i className="fas fa-check-circle text-green-500 text-3xl mb-2"></i>
            <p>All products are well stocked!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Low Stock Alerts</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center">
                <img 
                  src={product.featured_image} 
                  alt={product.name}
                  className="w-12 h-12 rounded object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">
                    Only {product.inventory?.quantity || 0} left in stock
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                  Low Stock
                </span>
                <Link href={`/admin/store/products/${product.id}/edit`} className="text-primary hover:text-primary-dark">
                  <i className="fas fa-edit"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Recent orders component
function RecentOrders({ orders }) {
  const recentOrders = orders?.slice(0, 5) || []

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <Link href="/admin/store/orders" className="text-primary hover:text-primary-dark text-sm">
          View All
        </Link>
      </div>
      <div className="p-6">
        {recentOrders.length === 0 ? (
          <div className="text-center text-gray-500">
            <i className="fas fa-shopping-cart text-3xl mb-2"></i>
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">#{order.order_number}</div>
                  <div className="text-sm text-gray-600">
                    {order.customer_first_name} {order.customer_last_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ${order.total_amount?.toFixed(2)}
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Quick actions component
function QuickActions() {
  const actions = [
    { 
      name: 'Add Product', 
      href: '/admin/store/products/new', 
      icon: 'fas fa-plus-circle', 
      color: 'bg-primary',
      description: 'Create new product'
    },
    { 
      name: 'View Orders', 
      href: '/admin/store/orders', 
      icon: 'fas fa-shopping-cart', 
      color: 'bg-yellow-500',
      description: 'Manage customer orders'
    },
    { 
      name: 'Manage Collections', 
      href: '/admin/store/collections', 
      icon: 'fas fa-layer-group', 
      color: 'bg-purple-500',
      description: 'Organize products'
    },
    { 
      name: 'Inventory Report', 
      href: '/admin/store/inventory', 
      icon: 'fas fa-boxes', 
      color: 'bg-coral',
      description: 'Track stock levels'
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
            >
              <div className={`${action.color} p-3 rounded-lg mr-4 group-hover:scale-105 transition-transform`}>
                <i className={`${action.icon} text-white text-lg`}></i>
              </div>
              <div>
                <div className="font-medium text-gray-900">{action.name}</div>
                <div className="text-sm text-gray-600">{action.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function StoreDashboard() {
  // Fetch store data
  const [metricsResponse, productsResponse, ordersResponse] = await Promise.all([
    storeQueries.getStoreMetrics(),
    storeQueries.getAllProducts(),
    storeQueries.getAllOrders()
  ])

  const metrics = metricsResponse.data || {}
  const products = productsResponse.data || []
  const orders = ordersResponse.data || []

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Store Dashboard</h2>
          <p>Manage your iSPEAK store products, orders, and inventory.</p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            title="Total Products"
            value={metrics.totalProducts || 0}
            icon="fas fa-box"
            color="bg-primary"
            href="/admin/store/products"
          />
          <MetricCard
            title="Total Orders"
            value={metrics.totalOrders || 0}
            icon="fas fa-shopping-cart"
            color="bg-yellow-500"
            href="/admin/store/orders"
          />
          <MetricCard
            title="Pending Orders"
            value={metrics.pendingOrders || 0}
            icon="fas fa-clock"
            color="bg-orange-500"
            href="/admin/store/orders?status=pending"
          />
          <MetricCard
            title="This Month"
            value={metrics.monthlyOrders || 0}
            icon="fas fa-calendar-alt"
            color="bg-green-500"
            change={15}
          />
          <MetricCard
            title="Low Stock Items"
            value={metrics.lowStockItems || 0}
            icon="fas fa-exclamation-triangle"
            color="bg-red-500"
            href="/admin/store/products?filter=low-stock"
          />
        </div>

        {/* Two column layout for alerts and orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LowStockAlerts products={products} />
          <RecentOrders orders={orders} />
        </div>

        {/* Quick actions */}
        <QuickActions />
      </div>
    </AdminLayout>
  )
}