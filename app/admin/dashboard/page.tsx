'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Globe,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function AdminDashboard() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/admin/login')
    }
  }, [router])

  // Mock data - in production this would come from API
  const stats = {
    totalStudents: 1247,
    activeStudents: 892,
    totalEducators: 67,
    activeEducators: 54,
    monthlyRevenue: 45680,
    yearlyRevenue: 487920,
    totalLessons: 18564,
    completionRate: 94.5,
  }

  const recentActivity = [
    {
      type: 'student',
      message: 'New student registration: Sarah Johnson',
      time: '10 minutes ago',
      status: 'success',
    },
    {
      type: 'educator',
      message: 'Educator application pending: Kwame Asante',
      time: '1 hour ago',
      status: 'warning',
    },
    {
      type: 'payment',
      message: 'Payment processed: $350 from 14 subscriptions',
      time: '3 hours ago',
      status: 'success',
    },
    {
      type: 'system',
      message: 'System maintenance scheduled for Sunday 2 AM EST',
      time: '5 hours ago',
      status: 'info',
    },
  ]

  const topEducators = [
    { name: 'Adunni Oyeleke', language: 'Yoruba', students: 47, rating: 4.9 },
    { name: 'Grace Mwangi', language: 'Kiswahili', students: 42, rating: 4.9 },
    { name: 'Kofi Mensah', language: 'Twi', students: 38, rating: 4.8 },
  ]

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin/dashboard', active: true },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: BookOpen, label: 'Lessons', href: '/admin/lessons' },
    { icon: DollarSign, label: 'Finances', href: '/admin/finances' },
    { icon: Globe, label: 'Languages', href: '/admin/languages' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <Image
          src="/images/logo/iSPEAK-Favicon.png"
          alt="iSPEAK Logo"
          width={40}
          height={40}
        />
        <Shield className="w-6 h-6 text-primary" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300`}>
          <div className="p-6">
            {/* Admin Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-heading font-bold text-lg">Admin Portal</h2>
              <p className="text-sm text-gray-600">System Administrator</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Logout */}
            <div className="mt-8 pt-8 border-t">
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors w-full"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome to the iSPEAK administrative portal
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Educators</p>
                    <p className="text-2xl font-bold">{stats.totalEducators}</p>
                    <p className="text-sm text-green-600">{stats.activeEducators} active</p>
                  </div>
                  <Award className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+8% from last month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-coral" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold">{stats.completionRate}%</p>
                    <p className="text-sm text-gray-600">Last 30 days</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Activity Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Platform Overview</span>
                    <div className="flex space-x-2">
                      {['week', 'month', 'year'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setSelectedPeriod(period)}
                          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            selectedPeriod === period
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-secondary">{stats.activeStudents}</p>
                      <p className="text-sm text-gray-600">Active Students</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-accent">{stats.totalLessons.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Lessons</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-coral">4</p>
                      <p className="text-sm text-gray-600">Languages</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">98%</p>
                      <p className="text-sm text-gray-600">Satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          activity.status === 'success' ? 'bg-green-100' :
                          activity.status === 'warning' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          {activity.status === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                           activity.status === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-600" /> :
                           <Clock className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.message}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button href="/admin/activity" variant="outline" size="sm">
                      View All Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Top Educators */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Top Performing Educators</span>
                    <Link href="/admin/educators" className="text-sm text-primary hover:text-primary/80">
                      View All
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topEducators.map((educator, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{educator.name}</h4>
                          <p className="text-sm text-gray-600">{educator.language} Educator</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{educator.students} students</p>
                          <div className="flex items-center text-sm text-gray-600">
                            <Award className="w-4 h-4 text-accent mr-1" />
                            {educator.rating} rating
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Platform Status</span>
                      <span className="text-sm font-medium text-green-600">Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response Time</span>
                      <span className="text-sm font-medium">124ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Health</span>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Zoom Integration</span>
                      <span className="text-sm font-medium text-green-600">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment Gateway</span>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button href="/admin/users/add" variant="primary" fullWidth size="sm">
                      Add New Educator
                    </Button>
                    <Button href="/admin/announcements" variant="secondary" fullWidth size="sm">
                      Create Announcement
                    </Button>
                    <Button href="/admin/reports" variant="outline" fullWidth size="sm">
                      Generate Reports
                    </Button>
                    <Button href="/admin/support" variant="outline" fullWidth size="sm">
                      View Support Tickets
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Summary */}
              <Card variant="gradient" className="text-white">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold mb-4">Revenue Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Today</span>
                      <span className="font-bold">$1,420</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Week</span>
                      <span className="font-bold">$8,350</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-bold">${stats.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <span>YTD Revenue</span>
                        <span className="font-bold">${stats.yearlyRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}