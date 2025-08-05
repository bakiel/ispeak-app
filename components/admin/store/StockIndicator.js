// Component to show stock levels with visual indicators
export default function StockIndicator({ quantity, lowStockThreshold = 10, size = 'default' }) {
  const stockLevel = quantity || 0
  const threshold = lowStockThreshold || 10
  
  const getStockStatus = () => {
    if (stockLevel === 0) return 'out-of-stock'
    if (stockLevel <= threshold) return 'low-stock'
    return 'in-stock'
  }

  const getStockColor = (status) => {
    switch (status) {
      case 'in-stock':
        return 'text-green-600'
      case 'low-stock':
        return 'text-yellow-600'
      case 'out-of-stock':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStockIcon = (status) => {
    switch (status) {
      case 'in-stock':
        return 'fas fa-check-circle'
      case 'low-stock':
        return 'fas fa-exclamation-triangle'
      case 'out-of-stock':
        return 'fas fa-times-circle'
      default:
        return 'fas fa-question-circle'
    }
  }

  const stockStatus = getStockStatus()
  const stockColor = getStockColor(stockStatus)
  const stockIcon = getStockIcon(stockStatus)
  
  const sizeClasses = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base'
  }

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <span className={`font-medium ${stockColor}`}>
        {stockLevel}
      </span>
      {stockStatus !== 'in-stock' && (
        <i className={`${stockIcon} ${stockColor} ml-2`} title={stockStatus.replace('-', ' ')}></i>
      )}
    </div>
  )
}