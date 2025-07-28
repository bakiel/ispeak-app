'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <i className="fas fa-phone-alt text-sm mr-2 text-teal-600"></i>
              <span className="text-sm">+1 (478) 390-4040</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-envelope text-sm mr-2 text-teal-600"></i>
              <span className="text-sm">privacy@ispeaklanguage.org</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" className="social-icon text-gray-600 hover:text-blue-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon text-gray-600 hover:text-pink-600">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon text-gray-600 hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white py-4 shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img 
              src="https://i.ibb.co/GQyxXsMB/ISPEAK.png" 
              alt="iSPEAK Logo" 
              className="h-10 md:h-14"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="nav-link font-medium">Home</Link>
            
            <div className="relative group">
              <button className="nav-link font-medium flex items-center">
                About Us
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 min-w-[200px]">
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">What is iSPEAK?</Link>
                <Link href="/mission" className="block px-4 py-2 hover:bg-gray-100">Our Mission</Link>
                <Link href="/method" className="block px-4 py-2 hover:bg-gray-100">The iSPEAK Method</Link>
                <Link href="/philosophy" className="block px-4 py-2 hover:bg-gray-100">Educational Philosophy</Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className="nav-link font-medium flex items-center">
                Plans & Pricing
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 min-w-[200px]">
                <Link href="/plans/yoruba" className="block px-4 py-2 hover:bg-gray-100">Yoruba Programs</Link>
                <Link href="/plans/kiswahili" className="block px-4 py-2 hover:bg-gray-100">Kiswahili Programs</Link>
                <Link href="/plans/twi" className="block px-4 py-2 hover:bg-gray-100">Twi Programs</Link>
                <Link href="/plans" className="block px-4 py-2 hover:bg-gray-100">All Programs</Link>
                <Link href="/group-rates" className="block px-4 py-2 hover:bg-gray-100">Group Rates</Link>
              </div>
            </div>
            
            <Link href="/shop" className="nav-link font-medium">Paji Shop</Link>
            <Link href="/loyalty" className="nav-link font-medium">Loyalty Program</Link>
            
            <div className="relative group">
              <button className="nav-link font-medium flex items-center">
                Resources
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 min-w-[200px]">
                <Link href="/resources/free" className="block px-4 py-2 hover:bg-gray-100">Free Resources</Link>
                <Link href="/resources/articles" className="block px-4 py-2 hover:bg-gray-100">Learning Articles</Link>
                <Link href="/resources/culture" className="block px-4 py-2 hover:bg-gray-100">Cultural Information</Link>
              </div>
            </div>
            
            <Link href="/contact" className="nav-link font-medium">Contact Us</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="relative group">
              <button className="btn-primary px-6 py-2 rounded-md flex items-center">
                Login / Register
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute top-full right-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 min-w-[200px]">
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Parent/Student Login</Link>
                <Link href="/educator-login" className="block px-4 py-2 hover:bg-gray-100">Educator Login</Link>
                <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">Register</Link>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-50 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <img 
              src="https://i.ibb.co/GQyxXsMB/ISPEAK.png" 
              alt="iSPEAK Logo" 
              className="h-12"
            />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          
          <div className="space-y-4">
            <Link href="/" className="block py-2 border-b border-gray-200">Home</Link>
            
            <div>
              <button 
                className="flex justify-between items-center py-2 border-b border-gray-200 w-full"
                onClick={() => toggleDropdown('about')}
              >
                <span>About Us</span>
                <i className={`fas fa-chevron-${activeDropdown === 'about' ? 'up' : 'down'} text-sm`}></i>
              </button>
              <div className={`pl-4 py-2 space-y-2 ${activeDropdown === 'about' ? 'block' : 'hidden'}`}>
                <Link href="/about" className="block py-1">What is iSPEAK?</Link>
                <Link href="/mission" className="block py-1">Our Mission</Link>
                <Link href="/method" className="block py-1">The iSPEAK Method</Link>
                <Link href="/philosophy" className="block py-1">Educational Philosophy</Link>
              </div>
            </div>
            
            <div>
              <button 
                className="flex justify-between items-center py-2 border-b border-gray-200 w-full"
                onClick={() => toggleDropdown('plans')}
              >
                <span>Plans & Pricing</span>
                <i className={`fas fa-chevron-${activeDropdown === 'plans' ? 'up' : 'down'} text-sm`}></i>
              </button>
              <div className={`pl-4 py-2 space-y-2 ${activeDropdown === 'plans' ? 'block' : 'hidden'}`}>
                <Link href="/plans/yoruba" className="block py-1">Yoruba Programs</Link>
                <Link href="/plans/kiswahili" className="block py-1">Kiswahili Programs</Link>
                <Link href="/plans/twi" className="block py-1">Twi Programs</Link>
                <Link href="/plans" className="block py-1">All Programs</Link>
                <Link href="/group-rates" className="block py-1">Group Rates</Link>
              </div>
            </div>
            
            <Link href="/shop" className="block py-2 border-b border-gray-200">Paji Shop</Link>
            <Link href="/loyalty" className="block py-2 border-b border-gray-200">Loyalty Program</Link>
            
            <div>
              <button 
                className="flex justify-between items-center py-2 border-b border-gray-200 w-full"
                onClick={() => toggleDropdown('resources')}
              >
                <span>Resources</span>
                <i className={`fas fa-chevron-${activeDropdown === 'resources' ? 'up' : 'down'} text-sm`}></i>
              </button>
              <div className={`pl-4 py-2 space-y-2 ${activeDropdown === 'resources' ? 'block' : 'hidden'}`}>
                <Link href="/resources/free" className="block py-1">Free Resources</Link>
                <Link href="/resources/articles" className="block py-1">Learning Articles</Link>
                <Link href="/resources/culture" className="block py-1">Cultural Information</Link>
              </div>
            </div>
            
            <Link href="/contact" className="block py-2 border-b border-gray-200">Contact Us</Link>
            
            <div className="pt-4 space-y-3">
              <Link href="/login" className="block py-2 px-4 bg-yellow-300 text-center rounded-md font-medium">Login</Link>
              <Link href="/register" className="block py-2 px-4 bg-teal-500 text-white text-center rounded-md font-medium">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
