'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    dropdown: [
      { label: 'What is iSPEAK?', href: '/about' },
      { label: 'Our Mission', href: '/about#mission' },
      { label: 'The iSPEAK Method', href: '/about#method' },
      { label: 'Educational Philosophy', href: '/about#philosophy' },
    ],
  },
  {
    label: 'Pricing',
    dropdown: [
      { label: 'Yoruba Programs', href: '/pricing#yoruba' },
      { label: 'Kiswahili Programs', href: '/pricing#kiswahili' },
      { label: 'Twi Programs', href: '/pricing#twi' },
      { label: 'Amharic Programs', href: '/pricing#amharic' },
      { label: 'Group Rates', href: '/pricing#group' },
    ],
  },
  { label: 'Shop', href: '/shop' },
  { label: 'Loyalty', href: '/loyalty' },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Free Resources', href: '/resources/free' },
      { label: 'Learning Articles', href: '/resources/articles' },
      { label: 'Cultural Info', href: '/resources/culture' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label)
  }

  return (
    <>
      {/* Top Bar - Hidden on mobile, visible on tablet and desktop */}
      <div className="hidden md:block bg-primary text-white py-1.5">
        <div className="container px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs lg:text-sm">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-2 md:mb-0">
            <a href="tel:+14783904040" className="flex items-center hover:text-secondary transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              <span>+1 (478) 390-4040</span>
            </a>
            <a href="mailto:info@ispeaklanguage.org" className="flex items-center hover:text-secondary transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              <span>info@ispeaklanguage.org</span>
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={cn(
        "sticky top-0 z-40 bg-white transition-shadow duration-300 border-b border-gray-100",
        isScrolled && "shadow-lg border-transparent"
      )}>
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo/iSpeak Logo.png"
                alt="iSPEAK Logo"
                width={42}
                height={14}
                className="w-7 sm:w-8 md:w-10 lg:w-11 h-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation - Hidden on mobile and tablet, visible on desktop */}
            <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
              {navigation.map((item) => (
                <div key={item.label} className="relative group">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="px-2 xl:px-3 py-2 text-gray-700 hover:text-secondary transition-colors text-sm xl:text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button className="px-2 xl:px-3 py-2 text-gray-700 hover:text-secondary transition-colors text-sm xl:text-base font-medium flex items-center relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                      {item.label}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                  )}
                  {item.dropdown && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary hover:text-white transition-colors"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Login/Register Button - Desktop Only */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                className="btn btn-accent text-xs lg:text-sm py-1.5 px-3 lg:px-4 whitespace-nowrap"
              >
                Login / Register
              </button>
              {isLoginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <div className="py-2">
                    <Link href="/student/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-white transition-colors">
                      Parent/Student Login
                    </Link>
                    <Link href="/educator/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-white transition-colors">
                      Educator Login
                    </Link>
                    <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-white transition-colors">
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -mr-2 text-gray-700 hover:text-secondary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Menu */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-full sm:w-80 md:w-96 bg-white shadow-lg overflow-y-auto">
          <div className="p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-700 hover:text-secondary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mt-12 space-y-2">
              {navigation.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-secondary hover:text-white rounded-lg transition-colors font-medium"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                      >
                        {item.label}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform",
                          openMobileDropdown === item.label && "rotate-180"
                        )} />
                      </button>
                      {item.dropdown && (
                        <div className={cn(
                          "ml-4 space-y-1 overflow-hidden transition-all duration-300",
                          openMobileDropdown === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}>
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-4 py-2 text-gray-600 hover:text-secondary transition-colors"
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Login/Register Buttons */}
            <div className="mt-8 space-y-3 px-4">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full btn btn-primary text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full btn btn-accent text-center"
              >
                Register
              </Link>
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-8 px-4 py-4 bg-gray-50 rounded-lg">
              <a href="tel:+14783904040" className="flex items-center text-gray-700 hover:text-secondary mb-2">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+1 (478) 390-4040</span>
              </a>
              <a href="mailto:info@ispeaklanguage.org" className="flex items-center text-gray-700 hover:text-secondary">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">info@ispeaklanguage.org</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}