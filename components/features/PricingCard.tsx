import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Check, X, Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  title: string
  subtitle?: string
  price: string | number
  period?: string
  description?: string
  savings?: string
  badge?: string
  features: PricingFeature[]
  buttonText?: string
  buttonHref?: string
  isPopular?: boolean
  isHighlighted?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'accent'
  className?: string
}

export function PricingCard({
  title,
  subtitle,
  price,
  period = '/month',
  description,
  savings,
  badge,
  features,
  buttonText = 'Get Started',
  buttonHref = '/register',
  isPopular = false,
  isHighlighted = false,
  variant = 'default',
  className,
}: PricingCardProps) {
  const cardVariant = isHighlighted ? variant : 'default'
  const buttonVariant = variant === 'default' ? 'primary' : variant

  return (
    <div className={cn('relative', className)}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-accent text-primary px-4 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
            <Star className="w-4 h-4 mr-1 fill-current" />
            Most Popular
          </div>
        </div>
      )}
      
      {badge && !isPopular && (
        <div className="absolute -top-3 right-3 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            {badge}
          </div>
        </div>
      )}
      
      <Card
        variant={cardVariant}
        hover={isHighlighted ? 'glow' : 'lift'}
        className={cn(
          'h-full flex flex-col',
          isHighlighted && 'ring-2 ring-secondary ring-opacity-50'
        )}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {subtitle && (
            <p className={cn(
              'text-sm font-medium mt-1',
              variant !== 'default' ? 'text-white/70' : 'text-gray-500'
            )}>{subtitle}</p>
          )}
          {description && (
            <p className={cn(
              'mt-2',
              variant !== 'default' ? 'text-white/80' : 'text-gray-600'
            )}>{description}</p>
          )}
        </CardHeader>
        
        <CardContent className="text-center flex-grow">
          <div className="mb-8">
            <span className={cn(
              'text-4xl md:text-5xl font-bold',
              variant !== 'default' ? 'text-white' : 'text-gray-900'
            )}>
              {typeof price === 'number' ? `$${price}` : price}
            </span>
            {period && (
              <span className={cn(
                'text-lg ml-1',
                variant !== 'default' ? 'text-white/80' : 'text-gray-600'
              )}>{period}</span>
            )}
            {savings && (
              <p className={cn(
                'text-sm mt-2',
                variant !== 'default' ? 'text-white/70' : 'text-gray-500'
              )}>{savings}</p>
            )}
          </div>
          
          <ul className="space-y-3 text-left">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                {feature.included ? (
                  <Check className={cn(
                    'w-5 h-5 mr-3 flex-shrink-0 mt-0.5',
                    variant !== 'default' ? 'text-white' : 'text-green-500'
                  )} />
                ) : (
                  <X className={cn(
                    'w-5 h-5 mr-3 flex-shrink-0 mt-0.5',
                    variant !== 'default' ? 'text-white/40' : 'text-gray-400'
                  )} />
                )}
                <span className={cn(
                  feature.included
                    ? variant !== 'default' ? 'text-white' : 'text-gray-700'
                    : variant !== 'default' ? 'text-white/60' : 'text-gray-400'
                )}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter>
          <Button
            href={buttonHref}
            variant={buttonVariant}
            fullWidth
            size="lg"
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Pricing Comparison Table Component
interface ComparisonFeature {
  name: string
  basic: boolean | string
  standard: boolean | string
  premium: boolean | string
}

interface PricingComparisonProps {
  features: ComparisonFeature[]
  className?: string
}

export function PricingComparison({ features, className }: PricingComparisonProps) {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-400 mx-auto" />
      )
    }
    return <span className="text-gray-700">{value}</span>
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-4 px-4 font-heading font-semibold text-gray-900">
              Features
            </th>
            <th className="text-center py-4 px-4 font-heading font-semibold text-gray-900">
              Basic
            </th>
            <th className="text-center py-4 px-4 font-heading font-semibold text-gray-900 bg-gray-50">
              Standard
            </th>
            <th className="text-center py-4 px-4 font-heading font-semibold text-gray-900">
              Premium
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={index}
              className={cn(
                'border-b border-gray-200',
                index % 2 === 0 && 'bg-gray-50'
              )}
            >
              <td className="py-4 px-4 text-gray-700 font-medium">
                {feature.name}
              </td>
              <td className="py-4 px-4 text-center">
                {renderFeatureValue(feature.basic)}
              </td>
              <td className="py-4 px-4 text-center bg-gray-50">
                {renderFeatureValue(feature.standard)}
              </td>
              <td className="py-4 px-4 text-center">
                {renderFeatureValue(feature.premium)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Pricing Toggle Component
interface PricingToggleProps {
  monthly: boolean
  onToggle: (monthly: boolean) => void
  monthlyLabel?: string
  annualLabel?: string
  discount?: string
  className?: string
}

export function PricingToggle({
  monthly,
  onToggle,
  monthlyLabel = 'Monthly',
  annualLabel = 'Annual',
  discount = 'Save 20%',
  className,
}: PricingToggleProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <span className={cn(
        'mr-3 font-medium',
        monthly ? 'text-gray-900' : 'text-gray-500'
      )}>
        {monthlyLabel}
      </span>
      <button
        onClick={() => onToggle(!monthly)}
        className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Toggle pricing period"
      >
        <span
          className={cn(
            'inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform',
            monthly ? 'translate-x-1' : 'translate-x-7'
          )}
        />
      </button>
      <span className={cn(
        'ml-3 font-medium',
        !monthly ? 'text-gray-900' : 'text-gray-500'
      )}>
        {annualLabel}
      </span>
      {discount && !monthly && (
        <span className="ml-2 text-sm text-green-600 font-medium">
          {discount}
        </span>
      )}
    </div>
  )
}