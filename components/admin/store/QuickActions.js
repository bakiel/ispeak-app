import Link from 'next/link'

// Reusable quick actions component for different admin sections
export default function QuickActions({ title = "Quick Actions", actions = [] }) {
  const defaultActions = [
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
      name: 'Store Settings', 
      href: '/admin/store/settings', 
      icon: 'fas fa-cog', 
      color: 'bg-gray-500',
      description: 'Configure store'
    },
  ]

  const actionList = actions.length > 0 ? actions : defaultActions

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actionList.map((action) => (
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
                {action.description && (
                  <div className="text-sm text-gray-600">{action.description}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}