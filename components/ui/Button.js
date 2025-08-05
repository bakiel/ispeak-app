import Link from 'next/link'

const variants = {
  primary: 'bg-teal-500 text-white hover:bg-teal-600',
  secondary: 'bg-yellow-400 text-gray-900 hover:bg-yellow-300',
  outline: 'border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'text-gray-600 hover:bg-gray-100'
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg'
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) {
  const baseClasses = 'rounded-md font-semibold transition duration-300 inline-flex items-center justify-center'
  const variantClasses = variants[variant]
  const sizeClasses = sizes[size]
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}