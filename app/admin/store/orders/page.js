import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { storeQueries } from '@/lib/supabase'

export const metadata = {
  title: 'Order Management | iSPEAK Admin',
  description: 'Manage customer orders for iSPEAK store'
}

// Order row component
function OrderRow({ order }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'fas fa-check-circle'
      case 'shipped': return 'fas fa-shipping-fast'
      case 'processing': return 'fas fa-cog'
      case 'pending': return 'fas fa-clock'
      case 'cancelled': return 'fas fa-times-circle'
      default: return 'fas fa-question-circle'
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">#{order.order_number}</div>
            <div className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {order.customer_first_name} {order.customer_last_name}
        </div>
        <div className="text-sm text-gray-500">{order.customer_email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
        </div>
        <div className="text-xs text-gray-500">
          {order.items?.slice(0, 2).map((item, index) => (
            <div key={index}>{item.product_name} (x{item.quantity})</div>
          ))}
          {order.items?.length > 2 && (
            <div>+{order.items.length - 2} more...</div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          ${order.total_amount?.toFixed(2)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
          <i className={`${getStatusIcon(order.status)} mr-1`}></i>
          {order.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3">
          <Link href={`/admin/store/orders/${order.id}`} className="text-primary hover:text-primary-dark">
            <i className="fas fa-eye"></i> View
          </Link>
          <Link href={`/admin/store/orders/${order.id}/edit`} className="text-gray-600 hover:text-gray-900">
            <i className="fas fa-edit"></i> Edit
          </Link>
          <button className="text-red-600 hover:text-red-900" title="Cancel order">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </td>
    </tr>
  )
}

// Order stats component
function OrderStats({ orders }) {
  const stats = {
    total: orders?.length || 0,
    pending: orders?.filter(o => o.status === 'pending').length || 0,
    processing: orders?.filter(o => o.status === 'processing').length || 0,
    shipped: orders?.filter(o => o.status === 'shipped').length || 0,
    completed: orders?.filter(o => o.status === 'completed').length || 0,
    revenue: orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        <div className="text-sm text-gray-600">Total Orders</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-yellow-600">{stats.processing}</div>
        <div className="text-sm text-gray-600">Processing</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.shipped}</div>
        <div className="text-sm text-gray-600">Shipped</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-primary">${stats.revenue.toFixed(2)}</div>
        <div className="text-sm text-gray-600">Revenue</div>
      </div>
    </div>
  )
}

// Bulk actions component
function BulkActions() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700">Select all</span>
        </div>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-gray-300 rounded px-3 py-1">
            <option value="">Bulk actions</option>
            <option value="mark-processing">Mark as Processing</option>
            <option value="mark-shipped">Mark as Shipped</option>
            <option value="mark-completed">Mark as Completed</option>
            <option value="export">Export Selected</option>
          </select>
          <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default async function OrdersPage() {
  // Fetch orders
  const { data: orders, error } = await storeQueries.getAllOrders()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage customer orders and track fulfillment
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors inline-flex items-center">
              <i className="fas fa-download mr-2"></i>
              Export
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-flex items-center">
              <i className="fas fa-plus mr-2"></i>
              Manual Order
            </button>
          </div>
        </div>

        {/* Order Stats */}
        <OrderStats orders={orders} />

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Sort by Date</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Orders table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <BulkActions />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
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
                {error ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-red-600">
                      Error loading orders: {error.error}
                    </td>
                  </tr>
                ) : orders && orders.length > 0 ? (
                  orders.map((order) => <OrderRow key={order.id} order={order} />)
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500 mb-4">Orders will appear here once customers start purchasing.</p>
                        <Link
                          href="/shop"
                          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-flex items-center"
                        >
                          <i className="fas fa-external-link-alt mr-2"></i>
                          Visit Store
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {orders && orders.length > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{orders.length}</span> of{' '}
                    <span className="font-medium">{orders.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}