'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function ParentDashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/parent/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch dashboard')

      const data = await response.json()
      setDashboard(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <PortalLayout portalType="parent">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </PortalLayout>
    )
  }

  const children = dashboard?.children || []
  const upcomingLessons = dashboard?.upcomingLessons || []
  const recentActivity = dashboard?.recentActivity || []

  return (
    <PortalLayout portalType="parent">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Parent Dashboard</h1>
        <p className="opacity-90">
          {children.length > 0
            ? `Managing ${children.length} child${children.length > 1 ? 'ren' : ''}'s learning journey`
            : "Add your children to start managing their learning"}
        </p>
        <Link
          href="/portal/parent/children"
          className="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          <i className="fas fa-child mr-2"></i> Manage Children
        </Link>
      </div>

      {/* Children Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {children.length > 0 ? (
          children.map((child) => (
            <div key={child.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                  {child.avatar_url ? (
                    <img src={child.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-purple-600">
                      {child.name?.charAt(0)?.toUpperCase() || 'C'}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{child.name}</h3>
                  <p className="text-sm text-gray-500">Age {child.age}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Language</span>
                  <span className="font-medium text-gray-700">{child.language_name || 'Not enrolled'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Lessons Completed</span>
                  <span className="font-medium text-gray-700">{child.lessons_completed || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Current Level</span>
                  <span className="font-medium text-gray-700">{child.current_level || 'Beginner'}</span>
                </div>
              </div>

              {child.next_lesson && (
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-purple-600 font-semibold mb-1">Next Lesson</p>
                  <p className="text-sm text-gray-700">
                    {new Date(child.next_lesson.date).toLocaleDateString()} at {child.next_lesson.time}
                  </p>
                </div>
              )}

              <Link
                href={`/portal/parent/children/${child.id}`}
                className="block text-center py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition text-sm"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
            <i className="fas fa-child text-gray-300 text-5xl mb-4"></i>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No children added yet</h3>
            <p className="text-gray-600 mb-4">Add your children to start booking lessons and tracking progress</p>
            <Link
              href="/portal/parent/children"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <i className="fas fa-plus mr-2"></i> Add Child
            </Link>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Lessons */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Lessons</h2>
            <Link href="/portal/parent/lessons" className="text-purple-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="p-4">
            {upcomingLessons.length > 0 ? (
              <div className="space-y-3">
                {upcomingLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <i className="fas fa-video text-purple-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{lesson.child_name}</p>
                        <p className="text-sm text-gray-500">
                          {lesson.language_name} with {lesson.educator_name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">
                        {new Date(lesson.scheduled_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-500">{lesson.scheduled_time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-calendar-times text-4xl mb-3"></i>
                <p>No upcoming lessons</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-4">
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'lesson' ? 'bg-green-100' :
                      activity.type === 'achievement' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <i className={`fas ${
                        activity.type === 'lesson' ? 'fa-check text-green-600' :
                        activity.type === 'achievement' ? 'fa-trophy text-yellow-600' :
                        'fa-info text-blue-600'
                      } text-sm`}></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time_ago}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-history text-4xl mb-3"></i>
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/portal/parent/lessons"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition"
          >
            <i className="fas fa-calendar-plus text-purple-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">Book Lesson</span>
          </Link>
          <Link
            href="/portal/parent/progress"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition"
          >
            <i className="fas fa-chart-line text-blue-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">View Progress</span>
          </Link>
          <Link
            href="/portal/parent/billing"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition"
          >
            <i className="fas fa-credit-card text-green-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">Billing</span>
          </Link>
          <Link
            href="/portal/parent/settings"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <i className="fas fa-cog text-gray-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </Link>
        </div>
      </div>
    </PortalLayout>
  )
}
