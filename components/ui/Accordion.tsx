'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface AccordionItem {
  id: string
  title: string
  content: string | React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export function Accordion({ items, allowMultiple = false, defaultOpen = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      )
    } else {
      setOpenItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      )
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        
        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="font-medium text-gray-900 pr-4">{item.title}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              style={{
                maxHeight: isOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out'
              }}
            >
              <div className="px-6 py-4 bg-gray-50 text-gray-700">
                {typeof item.content === 'string' ? (
                  <p>{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Single Accordion Item Component for custom usage
interface AccordionItemComponentProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  titleClassName?: string
  contentClassName?: string
}

export function AccordionItemComponent({
  title,
  children,
  defaultOpen = false,
  className,
  titleClassName,
  contentClassName,
}: AccordionItemComponentProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn('border border-gray-200 rounded-lg overflow-hidden', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors',
          titleClassName
        )}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 pr-4">{title}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out'
        }}
      >
        <div className={cn('px-6 py-4 bg-gray-50', contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}