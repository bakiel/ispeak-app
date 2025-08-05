// Reusable status badge component for products, orders, etc.
export default function StatusBadge({ status, type = 'default' }) {
  const getStatusStyles = (status, type) => {
    const normalizedStatus = status?.toLowerCase() || ''
    
    if (type === 'order') {
      switch (normalizedStatus) {
        case 'completed':
          return 'bg-green-100 text-green-800'
        case 'shipped':
          return 'bg-blue-100 text-blue-800'
        case 'processing':
          return 'bg-yellow-100 text-yellow-800'
        case 'pending':
          return 'bg-gray-100 text-gray-800'
        case 'cancelled':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
    
    if (type === 'product') {
      switch (normalizedStatus) {
        case 'active':
          return 'bg-green-100 text-green-800'
        case 'draft':
          return 'bg-yellow-100 text-yellow-800'
        case 'inactive':
          return 'bg-red-100 text-red-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
    
    // Default status colors
    switch (normalizedStatus) {
      case 'active':
      case 'published':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status, type) => {
    const normalizedStatus = status?.toLowerCase() || ''
    
    if (type === 'order') {
      switch (normalizedStatus) {
        case 'completed':
          return 'fas fa-check-circle'
        case 'shipped':
          return 'fas fa-shipping-fast'
        case 'processing':
          return 'fas fa-cog'
        case 'pending':
          return 'fas fa-clock'
        case 'cancelled':
          return 'fas fa-times-circle'
        default:
          return 'fas fa-question-circle'
      }
    }
    
    if (type === 'product') {
      switch (normalizedStatus) {
        case 'active':
          return 'fas fa-eye'
        case 'draft':
          return 'fas fa-edit'
        case 'inactive':
          return 'fas fa-eye-slash'
        default:
          return 'fas fa-question-circle'
      }
    }
    
    return null
  }

  const statusStyles = getStatusStyles(status, type)
  const statusIcon = getStatusIcon(status, type)

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${statusStyles}`}>
      {statusIcon && <i className={`${statusIcon} mr-1`}></i>}
      {status}
    </span>
  )
}