'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logoUrls } from '@/lib/logoConfig'
import CartIcon, { MobileCartIcon } from '@/components/shop/CartIcon'

export default function ModernNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [allMenuOpen, setAllMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  const mainNavItems = [
    {
      label: 'Programs',
      href: '/plans',
      dropdown: [
        { label: 'Yoruba', href: '/plans/yoruba' },
        { label: 'Kiswahili', href: '/plans/kiswahili' },
        { label: 'Twi', href: '/plans/twi' },
        { label: 'All Programs', href: '/plans' },
        { label: 'Group Rates', href: '/group-rates' },
      ]
    },
    {
      label: 'About',
      href: '/about',
      dropdown: [
        { label: 'Our Mission', href: '/mission' },
        { label: 'Method', href: '/method' },
        { label: 'Philosophy', href: '/philosophy' },
      ]
    },
    { label: 'Shop', href: '/shop' },
    { label: 'Games', href: '/games' },
    { label: 'Resources', href: '/blog' },
  ]

  const allSitePages = [
    {
      category: 'Programs & Pricing',
      items: [
        { label: 'All Programs', href: '/plans' },
        { label: 'Yoruba Program', href: '/plans/yoruba' },
        { label: 'Kiswahili Program', href: '/plans/kiswahili' },
        { label: 'Twi Program', href: '/plans/twi' },
        { label: 'Group Rates', href: '/group-rates' },
        { label: 'Free Trial', href: '/free-trial' },
      ]
    },
    {
      category: 'About iSPEAK',
      items: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Mission', href: '/mission' },
        { label: 'The iSPEAK Method', href: '/method' },
        { label: 'Educational Philosophy', href: '/philosophy' },
      ]
    },
    {
      category: 'Shop & Games',
      items: [
        { label: 'Paji Shop', href: '/shop' },
        { label: 'Language Games', href: '/games' },
        { label: 'Cart', href: '/cart' },
      ]
    },
    {
      category: 'Resources',
      items: [
        { label: 'Blog', href: '/blog' },
        { label: 'Free Resources', href: '/resources/free' },
        { label: 'Learning Articles', href: '/resources/articles' },
        { label: 'Cultural Information', href: '/resources/culture' },
        { label: 'FAQ', href: '/faq' },
      ]
    },
    {
      category: 'Support',
      items: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'Donate', href: '/donate' },
        { label: 'Loyalty Program', href: '/loyalty' },
      ]
    },
    {
      category: 'Account',
      items: [
        { label: 'Login', href: '/login' },
        { label: 'Register', href: '/register' },
        { label: 'Educator Login', href: '/educator-login' },
        { label: 'Apply as Educator', href: '/educator-apply' },
      ]
    },
    {
      category: 'Admin',
      items: [
        { label: 'Dashboard', href: '/admin/dashboard' },
        { label: 'Products', href: '/admin/products' },
        { label: 'Blog', href: '/admin/blog' },
        { label: 'Donations', href: '/admin/donations' },
      ]
    },
    {
      category: 'Legal',
      items: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
      ]
    }
  ]

  return (
    <>
      {/* Modern Slim Header */}
      <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md py-2' : 'shadow-sm py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Section: Logo + Main Nav */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <img 
                  src={logoUrls.mainLogo} 
                  alt="iSPEAK" 
                  className={`transition-all duration-300 ${
                    scrolled ? 'h-8' : 'h-10'
                  }`}
                />
              </Link>

              {/* Desktop Main Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {mainNavItems.map((item) => (
                  <div key={item.label} className="relative group">
                    <Link 
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                    >
                      {item.label}
                      {item.dropdown && (
                        <svg className="ml-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </Link>
                    
                    {/* Dropdown Menu */}
                    {item.dropdown && (
                      <div className="absolute left-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform -translate-y-1 group-hover:translate-y-0">
                        <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search programs, resources..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </form>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Icon (Mobile) */}
              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart */}
              <div className="hidden md:block">
                <CartIcon />
              </div>

              {/* User Account */}
              <div className="hidden md:block">
                <Link 
                  href="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-full transition-colors"
                >
                  Sign In
                </Link>
              </div>

              {/* All Pages Menu (3 dots) */}
              <div className="relative">
                <button
                  onClick={() => setAllMenuOpen(!allMenuOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  aria-label="All pages menu"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>

                {/* All Pages Dropdown */}
                {allMenuOpen && (
                  <div className="absolute right-0 mt-2 w-[90vw] sm:w-96 max-w-md max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">All Pages</h3>
                        <button
                          onClick={() => setAllMenuOpen(false)}
                          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Categories Grid - Responsive */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {allSitePages.map((category) => (
                          <div key={category.category} className="space-y-1">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
                              {category.category}
                            </h4>
                            {category.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors"
                                onClick={() => setAllMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <Link
                            href="/donate"
                            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            onClick={() => setAllMenuOpen(false)}
                          >
                            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            Donate
                          </Link>
                          <Link
                            href="/free-trial"
                            className="flex items-center px-3 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                            onClick={() => setAllMenuOpen(false)}
                          >
                            Free Trial
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="lg:hidden py-3 border-t border-gray-200 mt-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search programs, resources..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-teal-500"
                  autoFocus
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <img 
              src={logoUrls.mainLogo} 
              alt="iSPEAK" 
              className="h-8"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Search */}
          <div className="p-4 border-b">
            <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-teal-500"
              />
            </form>
          </div>

          {/* Menu Categories - Touch Optimized */}
          <div className="p-4 space-y-6">
            {allSitePages.map((category) => (
              <div key={category.category}>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  {category.category}
                </h4>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Click outside to close all menu */}
      {allMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setAllMenuOpen(false)}
        />
      )}
    </>
  )
}