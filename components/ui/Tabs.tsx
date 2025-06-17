'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultActiveTab?: string
  className?: string
  tabListClassName?: string
  tabClassName?: string
  activeTabClassName?: string
  contentClassName?: string
  variant?: 'default' | 'pills' | 'underline'
}

export function Tabs({
  tabs,
  defaultActiveTab,
  className,
  tabListClassName,
  tabClassName,
  activeTabClassName,
  contentClassName,
  variant = 'default',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id)

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  const baseTabClasses = {
    default: 'px-4 py-2 font-medium transition-all duration-300 border-b-2',
    pills: 'px-4 py-2 font-medium transition-all duration-300 rounded-lg',
    underline: 'px-4 py-2 font-medium transition-all duration-300 relative',
  }

  const activeTabClasses = {
    default: 'text-primary border-primary',
    pills: 'bg-primary text-white',
    underline: 'text-primary',
  }

  const inactiveTabClasses = {
    default: 'text-gray-600 border-transparent hover:text-primary hover:border-gray-300',
    pills: 'text-gray-600 hover:bg-gray-100',
    underline: 'text-gray-600 hover:text-primary',
  }

  return (
    <div className={cn('', className)}>
      <div
        className={cn(
          'flex space-x-2 border-b border-gray-200',
          variant === 'pills' && 'border-0 bg-gray-100 p-1 rounded-lg',
          variant === 'underline' && 'border-0',
          tabListClassName
        )}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                baseTabClasses[variant],
                isActive ? activeTabClasses[variant] : inactiveTabClasses[variant],
                tabClassName,
                isActive && activeTabClassName
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
            >
              {tab.icon && (
                <span className="mr-2 inline-flex">{tab.icon}</span>
              )}
              {tab.label}
              {variant === 'underline' && isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
          )
        })}
      </div>
      
      <div
        className={cn('mt-6', contentClassName)}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={activeTab}
      >
        {activeTabContent}
      </div>
    </div>
  )
}

// Export Tab separately (it's already exported as an interface above)