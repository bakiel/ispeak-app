'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function PortalLayout({ children, portalType = 'student' }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    checkAuth()
    fetchNotifications()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) {
        throw new Error('Auth failed')
      }

      const userData = await response.json()
      setUser(userData)

      // Verify role matches portal
      const allowedRoles = {
        student: ['student', 'admin'],
        educator: ['educator', 'admin'],
        parent: ['parent', 'admin']
      }

      if (!allowedRoles[portalType]?.includes(userData.role)) {
        router.push('/login')
        return
      }
    } catch (error) {
      localStorage.removeItem('token')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications || [])
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const menuItems = {
    student: [
      { icon: 'fas fa-home', label: 'Dashboard', href: '/portal/student' },
      { icon: 'fas fa-book', label: 'My Lessons', href: '/portal/student/lessons' },
      { icon: 'fas fa-chart-line', label: 'Progress', href: '/portal/student/progress' },
      { icon: 'fas fa-calendar-plus', label: 'Book Lesson', href: '/portal/student/book' },
      { icon: 'fas fa-trophy', label: 'Achievements', href: '/portal/student/achievements' },
      { icon: 'fas fa-cog', label: 'Settings', href: '/portal/student/settings' }
    ],
    educator: [
      { icon: 'fas fa-home', label: 'Dashboard', href: '/portal/educator' },
      { icon: 'fas fa-calendar', label: 'Schedule', href: '/portal/educator/schedule' },
      { icon: 'fas fa-users', label: 'Students', href: '/portal/educator/students' },
      { icon: 'fas fa-clock', label: 'Availability', href: '/portal/educator/availability' },
      { icon: 'fas fa-chart-bar', label: 'Reports', href: '/portal/educator/reports' },
      { icon: 'fas fa-cog', label: 'Settings', href: '/portal/educator/settings' }
    ],
    parent: [
      { icon: 'fas fa-home', label: 'Dashboard', href: '/portal/parent' },
      { icon: 'fas fa-child', label: 'My Children', href: '/portal/parent/children' },
      { icon: 'fas fa-calendar', label: 'Lessons', href: '/portal/parent/lessons' },
      { icon: 'fas fa-chart-line', label: 'Progress', href: '/portal/parent/progress' },
      { icon: 'fas fa-credit-card', label: 'Billing', href: '/portal/parent/billing' },
      { icon: 'fas fa-cog', label: 'Settings', href: '/portal/parent/settings' }
    ]
  }

  const portalColors = {
    student: 'bg-primary',
    educator: 'bg-green-600',
    parent: 'bg-purple-600'
  }

  const portalTitles = {
    student: 'Student Portal',
    educator: 'Educator Portal',
    parent: 'Parent Portal'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className={`${portalColors[portalType]} text-white p-4 flex items-center justify-between lg:hidden`}>
        <button onClick={() => setSidebarOpen(true)} className="text-2xl">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-lg font-semibold">{portalTitles[portalType]}</h1>
        <div className="relative">
          <button className="text-xl">
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 ${portalColors[portalType]} text-white z-50
        transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-2xl font-bold">iSPEAK</Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-xl">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 mb-8 p-3 bg-white/10 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <i className="fas fa-user text-xl"></i>
              )}
            </div>
            <div>
              <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm opacity-75 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems[portalType].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
                onClick={() => setSidebarOpen(false)}
              >
                <i className={`${item.icon} w-5 text-center`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex bg-white shadow-sm p-4 items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">{portalTitles[portalType]}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="text-gray-600 hover:text-gray-800 text-xl relative">
                <i className="fas fa-bell"></i>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Welcome,</span>
              <span className="font-semibold text-gray-800">{user?.firstName}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
