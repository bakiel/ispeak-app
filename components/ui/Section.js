const variants = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  teal: 'bg-teal-500 text-white',
  cream: 'bg-cream',
  gradient: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
}

export default function Section({ 
  children, 
  variant = 'white',
  className = '',
  containerClass = '',
  ...props 
}) {
  const variantClasses = variants[variant]
  
  return (
    <section 
      className={`py-10 md:py-16 ${variantClasses} ${className}`}
      {...props}
    >
      <div className={`container mx-auto px-4 ${containerClass}`}>
        {children}
      </div>
    </section>
  )
}

export function SectionTitle({ children, className = '', centered = true }) {
  return (
    <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${centered ? 'text-center' : ''} ${className}`}>
      {children}
    </h2>
  )
}

export function SectionSubtitle({ children, className = '', centered = true }) {
  return (
    <p className={`text-lg text-gray-600 mb-8 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {children}
    </p>
  )
}