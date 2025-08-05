import Link from 'next/link'

// Reusable metric card component for dashboards
export default function MetricCard({ 
  title, 
  value, 
  icon, 
  color = 'bg-primary', 
  change = null, 
  href = null,
  subtitle = null,
  loading = false 
}) {
  const CardContent = (
    <div className={`bg-white rounded-lg shadow p-6 transition-shadow ${href ? 'hover:shadow-lg cursor-pointer' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mt-1 w-20"></div>
              {change && <div className="h-4 bg-gray-200 rounded mt-2 w-16"></div>}
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
              {subtitle && (
                <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
              )}
              {change !== null && (
                <p className={`text-sm mt-2 flex items-center ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  {change > 0 && <i className="fas fa-arrow-up mr-1"></i>}
                  {change < 0 && <i className="fas fa-arrow-down mr-1"></i>}
                  {change === 0 && <i className="fas fa-minus mr-1"></i>}
                  {Math.abs(change)}% from last month
                </p>
              )}
            </>
          )}
        </div>
        <div className={`p-3 rounded-full flex-shrink-0 ${color}`}>
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