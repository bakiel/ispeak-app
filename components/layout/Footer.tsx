'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, Clock } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Plans & Pricing', href: '/pricing' },
    { label: 'Paji Shop', href: '/shop' },
    { label: 'Free Registration', href: '/register' },
    { label: 'Login', href: '/login' },
    { label: 'Contact Us', href: '/contact' },
  ]

  const resources = [
    { label: 'Free Printables', href: '/resources/free' },
    { label: 'Articles', href: '/resources/articles' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Educator Applications', href: '/educators/apply' },
    { label: 'Loyalty Program', href: '/loyalty' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
  ]

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand Column - Spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4 mb-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo/iSPEAK_language_learning_logo_white.png"
                  alt="iSPEAK Logo"
                  width={150}
                  height={60}
                  className="h-12 md:h-16 w-auto"
                />
              </Link>
              <Image
                src="/images/logo/iSpeak Mascot.png"
                alt="iSPEAK Mascot"
                width={60}
                height={60}
                className="h-12 md:h-16 w-auto opacity-80"
              />
            </div>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Connecting children to heritage through language
            </p>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400">
                <span className="font-medium text-white">Owner:</span> Daisy Ross
              </p>
              <a href="tel:+14783904040" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                +1 (478) 390-4040
              </a>
              <a href="mailto:info@ispeaklanguage.org" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                info@ispeaklanguage.org
              </a>
              <p className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                Monday-Friday, 9am-5pm Eastern Time
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Join our newsletter for language tips and cultural insights
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-secondary text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-secondary hover:bg-teal-600 text-white rounded-lg transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer Links Grid - Visible only on mobile */}
        <div className="grid grid-cols-2 gap-4 mt-8 md:hidden">
          <div>
            <h4 className="font-medium text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              {resources.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6">
          {/* Copyright and Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 iSPEAK Language Learning Program. All Rights Reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Proudly created in partnership with{' '}
              <span className="text-secondary">NyaEden</span>.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mt-4 text-xs">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-gray-600 hidden md:inline">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}