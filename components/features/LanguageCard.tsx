import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

interface LanguageCardProps {
  language: string
  description: string
  image: string
  features: string[]
  href: string
  color?: 'primary' | 'secondary' | 'accent' | 'coral'
  comingSoon?: boolean
  className?: string
}

export function LanguageCard({
  language,
  description,
  image,
  features,
  href,
  color = 'primary',
  comingSoon = false,
  className,
}: LanguageCardProps) {
  const colorClasses = {
    primary: 'border-primary hover:shadow-primary/20',
    secondary: 'border-secondary hover:shadow-secondary/20',
    accent: 'border-accent hover:shadow-accent/20',
    coral: 'border-coral hover:shadow-coral/20',
  }

  const bgColorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    coral: 'bg-coral',
  }

  return (
    <Card
      variant="bordered"
      padding="none"
      hover="lift"
      className={cn(
        'overflow-hidden border-2 transition-all duration-300',
        colorClasses[color],
        comingSoon && 'opacity-75',
        className
      )}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={image}
          alt={`${language} language learning`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        {comingSoon && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xl">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="font-heading font-bold text-2xl mb-2">{language}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={cn('mr-2', bgColorClasses[color], 'text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5')}>
                ✓
              </span>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        {!comingSoon ? (
          <Button
            href={href}
            variant={color === 'accent' ? 'primary' : color}
            fullWidth
          >
            Learn {language}
          </Button>
        ) : (
          <Button variant="outline" fullWidth disabled>
            Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Mini Language Card for compact displays
interface MiniLanguageCardProps {
  language: string
  icon?: React.ReactNode
  studentCount: number
  href: string
  color?: 'primary' | 'secondary' | 'accent' | 'coral'
}

export function MiniLanguageCard({
  language,
  icon,
  studentCount,
  href,
  color = 'primary',
}: MiniLanguageCardProps) {
  const bgColorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    coral: 'bg-coral',
  }

  return (
    <Link href={href}>
      <Card
        hover="scale"
        className="p-4 text-center cursor-pointer"
      >
        <div className={cn(
          'w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-white text-2xl',
          bgColorClasses[color]
        )}>
          {icon || language.charAt(0)}
        </div>
        <h4 className="font-medium text-gray-900 mb-1">{language}</h4>
        <p className="text-sm text-gray-600">{studentCount} students</p>
      </Card>
    </Link>
  )
}