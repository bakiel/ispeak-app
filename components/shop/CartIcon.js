'use client'
import { useCart } from '@/lib/cartContext'
import Link from 'next/link'

export default function CartIcon({ className = "", showSidebar = true }) {
  const { itemCount, toggleSidebar, openSidebar } = useCart()

  const handleClick = (e) => {
    if (showSidebar) {
      e.preventDefault()
      openSidebar()
    }
  }

  return (
    <div className={`relative ${className}`}>
      {showSidebar ? (
        <button
          onClick={handleClick}
          className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          <i className="fas fa-shopping-cart text-xl"></i>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </button>
      ) : (
        <Link
          href="/cart"
          className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          <i className="fas fa-shopping-cart text-xl"></i>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </Link>
      )}
    </div>
  )
}

// Mobile cart icon component
export function MobileCartIcon() {
  const { itemCount, openSidebar } = useCart()

  return (
    <button
      onClick={openSidebar}
      className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <i className="fas fa-shopping-cart text-xl"></i>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}