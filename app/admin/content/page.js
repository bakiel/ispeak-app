'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

export default function ContentManagementPage() {
  const contentSections = [
    {
      title: 'Languages',
      description: 'Manage available languages (Yoruba, Kiswahili, Twi, Amharic)',
      icon: 'fas fa-globe-africa',
      href: '/admin/content/languages',
      color: 'bg-emerald-500'
    },
    {
      title: 'Pricing Plans',
      description: 'Update pricing and subscription plans',
      icon: 'fas fa-dollar-sign',
      href: '/admin/content/pricing',
      color: 'bg-teal-500'
    },
    {
      title: 'Testimonials',
      description: 'Manage parent and student testimonials',
      icon: 'fas fa-comment-dots',
      href: '/admin/content/testimonials',
      color: 'bg-yellow-500'
    },
    {
      title: 'FAQ',
      description: 'Update frequently asked questions',
      icon: 'fas fa-question-circle',
      href: '/admin/content/faq',
      color: 'bg-red-500'
    },
    {
      title: 'Team Members',
      description: 'Manage educator and staff profiles',
      icon: 'fas fa-chalkboard-teacher',
      href: '/admin/content/team',
      color: 'bg-pink-500'
    },
    {
      title: 'Hero Sections',
      description: 'Manage hero banners for different pages',
      icon: 'fas fa-image',
      href: '/admin/content/hero-sections',
      color: 'bg-blue-500'
    },
    {
      title: 'Statistics',
      description: 'Update homepage statistics and metrics',
      icon: 'fas fa-chart-bar',
      href: '/admin/content/statistics',
      color: 'bg-green-500'
    },
    {
      title: 'Content Blocks',
      description: 'Manage page content blocks and sections',
      icon: 'fas fa-th-large',
      href: '/admin/content/blocks',
      color: 'bg-purple-500'
    }
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">
            Manage all website content from one central location. Click on any section below to edit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentSections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className={`${section.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                  <i className={`${section.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Manage</span>
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded p-4 text-center">
              <p className="text-3xl font-bold text-primary">10</p>
              <p className="text-sm text-gray-600">Active Pages</p>
            </div>
            <div className="bg-white rounded p-4 text-center">
              <p className="text-3xl font-bold text-green-500">25</p>
              <p className="text-sm text-gray-600">Content Blocks</p>
            </div>
            <div className="bg-white rounded p-4 text-center">
              <p className="text-3xl font-bold text-purple-500">15</p>
              <p className="text-sm text-gray-600">Testimonials</p>
            </div>
            <div className="bg-white rounded p-4 text-center">
              <p className="text-3xl font-bold text-yellow-500">8</p>
              <p className="text-sm text-gray-600">FAQ Items</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}