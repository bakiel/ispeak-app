import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/Card'
import { Quote, Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating?: number
  image?: string
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

export function TestimonialCard({
  name,
  role,
  content,
  rating = 5,
  image,
  variant = 'default',
  className,
}: TestimonialCardProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-4 h-4',
          i < rating ? 'fill-accent text-accent' : 'fill-gray-200 text-gray-200'
        )}
      />
    ))
  }

  if (variant === 'featured') {
    return (
      <Card
        variant="gradient"
        hover="glow"
        className={cn('relative overflow-hidden', className)}
      >
        <div className="absolute top-4 right-4 text-white/20">
          <Quote className="w-16 h-16" />
        </div>
        <CardContent className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            {renderStars()}
          </div>
          <p className="text-white text-lg mb-6 italic">"{content}"</p>
          <div className="flex items-center">
            {image && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-semibold text-white">{name}</p>
              <p className="text-white/80 text-sm">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card hover="lift" className={cn('p-4', className)}>
        <div className="flex items-start space-x-3">
          {image && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900 text-sm">{name}</p>
                <p className="text-gray-600 text-xs">{role}</p>
              </div>
              <div className="flex items-center space-x-0.5">
                {renderStars()}
              </div>
            </div>
            <p className="text-gray-700 text-sm">"{content}"</p>
          </div>
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card hover="lift" className={className}>
      <CardContent>
        <div className="flex items-center space-x-1 mb-4">
          {renderStars()}
        </div>
        <Quote className="w-8 h-8 text-gray-300 mb-4" />
        <p className="text-gray-700 mb-6 italic">"{content}"</p>
        <div className="flex items-center">
          {image && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-gray-600 text-sm">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Testimonial Carousel Component
interface TestimonialCarouselProps {
  testimonials: Array<{
    name: string
    role: string
    content: string
    rating?: number
    image?: string
  }>
  autoPlay?: boolean
  interval?: number
  className?: string
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <TestimonialCard
                {...testimonial}
                variant="featured"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              currentIndex === index
                ? 'w-8 bg-primary'
                : 'bg-gray-300 hover:bg-gray-400'
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        aria-label="Previous testimonial"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        aria-label="Next testimonial"
      >
        →
      </button>
    </div>
  )
}