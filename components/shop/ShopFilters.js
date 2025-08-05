'use client'

import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ShopFilters({ collections, currentCollection }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    return params.toString()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    } else {
      params.delete('search')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const toggleFilter = (filterType, value) => {
    const params = new URLSearchParams(searchParams)
    const currentValue = params.get(filterType)
    
    if (currentValue === value) {
      params.delete(filterType)
    } else {
      params.set(filterType, value)
    }
    
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-bold text-lg mb-4">Filter Products</h3>
      
      {/* Search */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Search</h4>
        <form onSubmit={handleSearch}>
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-primary rounded-r-md hover:bg-accent/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Categories</h4>
        <ul className="space-y-2">
          <li>
            <Link
              href="/shop"
              className={`block py-2 px-3 rounded transition-colors ${
                !currentCollection 
                  ? 'bg-yellow-100 text-yellow-800 font-medium' 
                  : 'hover:bg-gray-100'
              }`}
            >
              All Products
            </Link>
          </li>
          {collections.map((collection) => (
            <li key={collection.id}>
              <Link
                href={`/shop?${createQueryString('collection', collection.slug)}`}
                className={`block py-2 px-3 rounded transition-colors ${
                  currentCollection === collection.slug 
                    ? 'bg-yellow-100 text-yellow-800 font-medium' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Under $25</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>$25 - $50</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>$50 - $100</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Over $100</span>
          </label>
        </div>
      </div>

      {/* Special Offers */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Special Offers</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2" 
              checked={searchParams.get('sale') === 'true'}
              onChange={() => toggleFilter('sale', 'true')}
            />
            <span>On Sale</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2" 
              checked={searchParams.get('featured') === 'true'}
              onChange={() => toggleFilter('featured', 'true')}
            />
            <span>Featured</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2" 
              checked={searchParams.get('new') === 'true'}
              onChange={() => toggleFilter('new', 'true')}
            />
            <span>New Arrivals</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <Link
        href="/shop"
        className="block w-full text-center py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </Link>
    </div>
  )
}