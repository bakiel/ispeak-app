'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function EducatorDashboard() {
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
      const response = await fetch(`${API_BASE}/api/portal/educator/dashboard`, {
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

  const handleLessonAction = async (lessonId, action) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${API_BASE}/api/portal/educator/lessons/${lessonId}/${action}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        fetchDashboard()
      }
    } catch (err) {
      console.error(`Error ${action} lesson:`, err)
    }
  }

  if (loading) {
    return (
      <PortalLayout portalType="educator">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </PortalLayout>
    )
  }

  const stats = dashboard?.stats || {}
  const todayLessons = dashboard?.todayLessons || []
  const upcomingLessons = dashboard?.upcomingLessons || []
  const pendingRequests = dashboard?.pendingRequests || []

  return (
    <PortalLayout portalType="educator">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Educator Dashboard</h1>
        <p className="opacity-90">
          {todayLessons.length > 0
            ? `You have ${todayLessons.length} lesson${todayLessons.length > 1 ? 's' : ''} scheduled today!`
            : "No lessons scheduled for today. Check your upcoming schedule."}
        </p>
        <Link
          href="/portal/educator/availability"
          className="inline-block mt-4 bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          <i className="fas fa-clock mr-2"></i> Manage Availability
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fas fa-users text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalStudents || 0}</p>
              <p className="text-sm text-gray-500">Active Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fas fa-book text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.lessonsThisMonth || 0}</p>
              <p className="text-sm text-gray-500">Lessons This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <i className="fas fa-star text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.averageRating?.toFixed(1) || '5.0'}</p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <i className="fas fa-clock text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalHours || 0}</p>
              <p className="text-sm text-gray-500">Teaching Hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-3">
            <i className="fas fa-bell mr-2"></i>
            Pending Booking Requests ({pendingRequests.length})
          </h3>
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg p-4 flex flex-col sm:flex-row justify-between gap-4"
              >
                <div>
                  <p className="font-medium text-gray-800">{request.student_name}</p>
                  <p className="text-sm text-gray-600">
                    {request.language_name} - {new Date(request.scheduled_date).toLocaleDateString()} at {request.scheduled_time}
                  </p>
                  {request.notes && (
                    <p className="text-sm text-gray-500 mt-1">Note: {request.notes}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLessonAction(request.id, 'confirm')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                  >
                    <i className="fas fa-check mr-1"></i> Accept
                  </button>
                  <button
                    onClick={() => handleLessonAction(request.id, 'decline')}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition"
                  >
                    <i className="fas fa-times mr-1"></i> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Lessons */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
            <Link href="/portal/educator/schedule" className="text-green-600 text-sm hover:underline">
              Full Schedule
            </Link>
          </div>
          <div className="p-4">
            {todayLessons.length > 0 ? (
              <div className="space-y-3">
                {todayLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <i className="fas fa-video text-green-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{lesson.student_name}</p>
                        <p className="text-sm text-gray-500">{lesson.language_name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{lesson.scheduled_time}</p>
                      <p className="text-sm text-gray-500">{lesson.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-calendar-check text-4xl mb-3"></i>
                <p>No lessons scheduled for today</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Lessons</h2>
            <Link href="/portal/educator/schedule" className="text-green-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="p-4">
            {upcomingLessons.length > 0 ? (
              <div className="space-y-3">
                {upcomingLessons.slice(0, 5).map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <i className="fas fa-user text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{lesson.student_name}</p>
                        <p className="text-sm text-gray-500">{lesson.language_name}</p>
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
                <i className="fas fa-calendar text-4xl mb-3"></i>
                <p>No upcoming lessons</p>
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
            href="/portal/educator/availability"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition"
          >
            <i className="fas fa-clock text-green-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">Set Availability</span>
          </Link>
          <Link
            href="/portal/educator/students"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition"
          >
            <i className="fas fa-users text-blue-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">View Students</span>
          </Link>
          <Link
            href="/portal/educator/reports"
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition"
          >
            <i className="fas fa-chart-bar text-purple-600 text-2xl mb-2"></i>
            <span className="text-sm font-medium text-gray-700">View Reports</span>
          </Link>
          <Link
            href="/portal/educator/settings"
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
