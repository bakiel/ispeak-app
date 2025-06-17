import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-primary hover:bg-[#FFCE00] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:ring-accent',
        secondary: 'bg-secondary text-white hover:bg-[#5DB1A5] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:ring-secondary',
        accent: 'bg-accent text-primary hover:bg-[#FFCE00] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:ring-accent',
        coral: 'bg-coral text-white hover:bg-opacity-90 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:ring-coral',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 focus:ring-primary',
        ghost: 'text-primary hover:bg-primary hover:bg-opacity-10 focus:ring-primary',
        link: 'text-primary underline-offset-4 hover:underline focus:ring-primary p-0',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  external?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, href, external, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, fullWidth, className }))

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        )
      }

      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'