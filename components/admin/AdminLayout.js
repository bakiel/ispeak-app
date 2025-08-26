'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import AdminAuthCheck from '@/components/admin/AdminAuthCheck'

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Start closed on mobile
  const [isMobile, setIsMobile] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState('Store') // Expand Store by default
  const [userEmail, setUserEmail] = useState('')
  const pathname = usePathname()
  const router = useRouter()

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setSidebarOpen(window.innerWidth >= 768) // Auto-open on desktop
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Get user info from localStorage
    const authData = localStorage.getItem('adminAuth')
    if (authData) {
      const auth = JSON.parse(authData)
      setUserEmail(auth.email)
    }
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'Donations', href: '/admin/donations', icon: 'fas fa-heart' },
    { name: 'Content', href: '/admin/content', icon: 'fas fa-file-alt' },
    { name: 'Blog Posts', href: '/admin/blog', icon: 'fas fa-blog' },
    { 
      name: 'Store', 
      href: '/admin/store', 
      icon: 'fas fa-store',
      submenu: [
        { name: 'Overview', href: '/admin/store', icon: 'fas fa-chart-pie' },
        { name: 'Products', href: '/admin/store/products', icon: 'fas fa-box' },
        { name: 'Collections', href: '/admin/store/collections', icon: 'fas fa-layer-group' },
        { name: 'Orders', href: '/admin/store/orders', icon: 'fas fa-receipt' },
        { name: 'Image Guide', href: '/admin/store/image-guide', icon: 'fas fa-image' },
      ]
    },
    { name: 'Educators', href: '/admin/educators', icon: 'fas fa-chalkboard-teacher' },
    { name: 'Students', href: '/admin/students', icon: 'fas fa-user-graduate' },
    { name: 'Lessons', href: '/admin/lessons', icon: 'fas fa-book-open' },
    { name: 'Analytics', href: '/admin/analytics', icon: 'fas fa-chart-line' },
    { name: 'Settings', href: '/admin/settings', icon: 'fas fa-cog' },
  ]

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <AdminAuthCheck>
      <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-64' : 'w-16'
      } ${
        isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'
      } bg-primary text-white transition-all duration-300 ${
        isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`font-bold text-xl ${sidebarOpen ? 'block' : 'hidden'}`}>iSPEAK Admin</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-gray-700 p-2 rounded"
            >
              <i className={`fas fa-${sidebarOpen ? 'chevron-left' : 'chevron-right'}`}></i>
            </button>
          </div>
          
          <nav className="space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        isActive(item.href) || item.submenu.some(sub => isActive(sub.href))
                          ? 'bg-teal-500 text-white'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <i className={`${item.icon} ${sidebarOpen ? 'mr-3' : 'mx-auto'} text-lg`}></i>
                        {sidebarOpen && <span>{item.name}</span>}
                      </div>
                      {sidebarOpen && (
                        <i className={`fas fa-chevron-${expandedMenu === item.name ? 'up' : 'down'} text-xs`}></i>
                      )}
                    </button>
                    {sidebarOpen && expandedMenu === item.name && (
                      <div className="mt-2 space-y-1 ml-4">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                              isActive(subItem.href)
                                ? 'bg-teal-600 text-white'
                                : 'hover:bg-gray-700'
                            }`}
                          >
                            <i className={`${subItem.icon} mr-2 text-sm`}></i>
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'bg-teal-500 text-white'
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <i className={`${item.icon} ${sidebarOpen ? 'mr-3' : 'mx-auto'} text-lg`}></i>
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        {/* User section at bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-user"></i>
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-semibold">Admin</p>
                  <p className="text-xs text-gray-400">{userEmail || 'admin@ispeak.com'}</p>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button 
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-xs bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="md:hidden mr-4 text-gray-600 hover:text-gray-900"
                >
                  <i className={`fas fa-${sidebarOpen ? 'times' : 'bars'} text-xl`}></i>
                </button>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600">
                  <i className="fas fa-bell text-xl"></i>
                  <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                  <i className="fas fa-external-link-alt mr-1"></i>
                  View Site
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
    </AdminAuthCheck>
  )
}