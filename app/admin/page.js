import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard | iSPEAK',
  description: 'iSPEAK admin dashboard for managing language learning platform'
}

// Dashboard stats component
function StatCard({ title, value, icon, color, change }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <i className={`fas fa-arrow-${change > 0 ? 'up' : 'down'} mr-1`}></i>
              {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <i className={`${icon} text-2xl text-white`}></i>
        </div>
      </div>
    </div>
  )
}

// Recent activity component
function RecentActivity() {
  const activities = [
    { id: 1, type: 'blog', message: 'New blog post published', time: '2 hours ago', icon: 'fas fa-blog' },
    { id: 2, type: 'student', message: 'New student registration', time: '3 hours ago', icon: 'fas fa-user-plus' },
    { id: 3, type: 'lesson', message: 'Lesson completed by Sarah M.', time: '5 hours ago', icon: 'fas fa-check-circle' },
    { id: 4, type: 'educator', message: 'New educator application', time: '1 day ago', icon: 'fas fa-user-tie' },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className={`${activity.icon} text-teal-600`}></i>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Quick actions component
function QuickActions() {
  const actions = [
    { name: 'Create Blog Post', href: '/admin/blog/new', icon: 'fas fa-plus-circle', color: 'bg-teal-500' },
    { name: 'View Applications', href: '/admin/educators', icon: 'fas fa-users', color: 'bg-purple-500' },
    { name: 'Schedule Lesson', href: '/admin/lessons/new', icon: 'fas fa-calendar-plus', color: 'bg-yellow-500' },
    { name: 'Export Reports', href: '/admin/analytics', icon: 'fas fa-file-export', color: 'bg-coral' },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className={`${action.color} p-2 rounded-lg mr-3`}>
                <i className={`${action.icon} text-white`}></i>
              </div>
              <span className="text-sm font-medium text-gray-900">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome section */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
          <p>Here's what's happening with your platform today.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value="1,234"
            icon="fas fa-user-graduate"
            color="bg-teal-500"
            change={12}
          />
          <StatCard
            title="Active Educators"
            value="45"
            icon="fas fa-chalkboard-teacher"
            color="bg-purple-500"
            change={8}
          />
          <StatCard
            title="Lessons This Month"
            value="3,456"
            icon="fas fa-book-open"
            color="bg-yellow-500"
            change={-5}
          />
          <StatCard
            title="Blog Views"
            value="12.5K"
            icon="fas fa-eye"
            color="bg-coral"
            change={25}
          />
        </div>

        {/* Two column layout for activity and actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <QuickActions />
        </div>

        {/* Additional sections can be added here */}
      </div>
    </AdminLayout>
  )
}