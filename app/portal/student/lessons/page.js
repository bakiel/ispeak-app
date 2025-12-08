'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function StudentLessons() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('upcoming') // upcoming, completed, cancelled

  useEffect(() => {
    fetchLessons()
  }, [filter])

  const fetchLessons = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/student/lessons?status=${filter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch lessons')

      const data = await response.json()
      setLessons(data.lessons || [])
    } catch (err) {
      console.error('Error fetching lessons:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelLesson = async (lessonId) => {
    if (!confirm('Are you sure you want to cancel this lesson?')) return

    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${API_BASE}/api/portal/booking/${lessonId}/cancel`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        fetchLessons()
      }
    } catch (err) {
      console.error('Error cancelling lesson:', err)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <PortalLayout portalType="student">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Lessons</h1>
          <p className="text-gray-600">View and manage your scheduled lessons</p>
        </div>
        <Link
          href="/portal/student/book"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          <i className="fas fa-plus mr-2"></i> Book New Lesson
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b">
          {[
            { key: 'upcoming', label: 'Upcoming', icon: 'fa-calendar' },
            { key: 'completed', label: 'Completed', icon: 'fa-check-circle' },
            { key: 'cancelled', label: 'Cancelled', icon: 'fa-times-circle' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                filter === tab.key
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className={`fas ${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons List */}
      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : lessons.length > 0 ? (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-lg shadow p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-video text-primary text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {lesson.language_name} Lesson
                    </h3>
                    <p className="text-gray-600">
                      with {lesson.educator_name}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                      <span>
                        <i className="fas fa-calendar mr-1"></i>
                        {new Date(lesson.scheduled_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span>
                        <i className="fas fa-clock mr-1"></i>
                        {lesson.scheduled_time}
                      </span>
                      <span>
                        <i className="fas fa-hourglass-half mr-1"></i>
                        {lesson.duration || 30} min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(lesson.status)}`}>
                    {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                  </span>

                  {lesson.status === 'scheduled' || lesson.status === 'confirmed' ? (
                    <div className="flex gap-2 mt-2">
                      {lesson.meeting_link && (
                        <a
                          href={lesson.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                        >
                          <i className="fas fa-video mr-2"></i>
                          Join
                        </a>
                      )}
                      <button
                        onClick={() => handleCancelLesson(lesson.id)}
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : lesson.status === 'completed' && !lesson.has_review ? (
                    <Link
                      href={`/portal/student/lessons/${lesson.id}/review`}
                      className="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary/5 transition"
                    >
                      <i className="fas fa-star mr-2"></i>
                      Leave Review
                    </Link>
                  ) : null}
                </div>
              </div>

              {lesson.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <i className="fas fa-sticky-note mr-2"></i>
                    {lesson.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <i className="fas fa-calendar-times text-gray-300 text-5xl mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No {filter} lessons
          </h3>
          <p className="text-gray-600 mb-4">
            {filter === 'upcoming'
              ? "You don't have any upcoming lessons scheduled."
              : filter === 'completed'
              ? "You haven't completed any lessons yet."
              : "No cancelled lessons."}
          </p>
          {filter === 'upcoming' && (
            <Link
              href="/portal/student/book"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition"
            >
              Book Your First Lesson
            </Link>
          )}
        </div>
      )}
    </PortalLayout>
  )
}
