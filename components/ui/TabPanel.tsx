'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils/cn'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface TabPanelProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
  tabListClassName?: string
  tabClassName?: string
  activeTabClassName?: string
  contentClassName?: string
  variant?: 'default' | 'pills' | 'underline'
  orientation?: 'horizontal' | 'vertical'
}

export function TabPanel({
  tabs,
  defaultTab,
  className,
  tabListClassName,
  tabClassName,
  activeTabClassName,
  contentClassName,
  variant = 'default',
  orientation = 'horizontal',
}: TabPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

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
          'flex',
          orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-2 border-b border-gray-200',
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
        className={cn(
          'mt-6',
          orientation === 'vertical' && 'ml-6',
          contentClassName
        )}
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={activeTab}
      >
        {activeTabContent}
      </div>
    </div>
  )
}

// Responsive Tabs that become accordion on mobile
interface ResponsiveTab extends Tab {
  mobileTitle?: string
}

interface ResponsiveTabsProps {
  tabs: ResponsiveTab[]
  defaultTab?: string
  breakpoint?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ResponsiveTabs({
  tabs,
  defaultTab,
  breakpoint = 'md',
  className,
}: ResponsiveTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const [mobileActiveItems, setMobileActiveItems] = useState<string[]>([defaultTab || tabs[0]?.id])

  const toggleMobileItem = (tabId: string) => {
    setMobileActiveItems(prev =>
      prev.includes(tabId)
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    )
  }

  return (
    <>
      {/* Desktop Tabs */}
      <div className={cn(`hidden ${breakpoint}:block`, className)}>
        <TabPanel
          tabs={tabs}
          defaultTab={defaultTab}
          variant="underline"
        />
      </div>

      {/* Mobile Accordion */}
      <div className={cn(`${breakpoint}:hidden space-y-3`, className)}>
        {tabs.map((tab) => {
          const isActive = mobileActiveItems.includes(tab.id)
          
          return (
            <div
              key={tab.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleMobileItem(tab.id)}
                className="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {tab.mobileTitle || tab.label}
                </span>
                <span className={cn(
                  'transition-transform duration-300',
                  isActive && 'rotate-180'
                )}>
                  ▼
                </span>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  isActive ? 'max-h-96' : 'max-h-0'
                )}
              >
                <div className="p-4 bg-gray-50">
                  {tab.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}