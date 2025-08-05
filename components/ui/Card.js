export default function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = true,
  ...props 
}) {
  const baseClasses = 'bg-white rounded-lg shadow-md'
  const hoverClasses = hover ? 'hover:shadow-xl transition-shadow duration-300' : ''
  const paddingClasses = padding ? 'p-6' : ''
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-xl font-bold ${className}`}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`text-gray-600 ${className}`}>
      {children}
    </div>
  )
}