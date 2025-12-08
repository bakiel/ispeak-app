'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function ParentLessons() {
  const [children, setChildren] = useState([])
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedChild, setSelectedChild] = useState('all')
  const [filter, setFilter] = useState('upcoming')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (children.length > 0 || selectedChild === 'all') {
      fetchLessons()
    }
  }, [selectedChild, filter])

  const fetchData = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const childrenRes = await fetch(`${API_BASE}/api/portal/parent/children`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (childrenRes.ok) {
        const data = await childrenRes.json()
        setChildren(data.children || [])
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchLessons = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      let url = `${API_BASE}/api/portal/parent/lessons?status=${filter}`
      if (selectedChild !== 'all') {
        url += `&child_id=${selectedChild}`
      }

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setLessons(data.lessons || [])
      }
    } catch (err) {
      console.error('Error:', err)
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
      console.error('Error:', err)
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

  if (loading) {
    return (
      <PortalLayout portalType="parent">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout portalType="parent">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lessons</h1>
          <p className="text-gray-600">View and manage your children's lessons</p>
        </div>
        {children.length > 0 && (
          <Link
            href="/portal/student/book"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            <i className="fas fa-plus mr-2"></i> Book New Lesson
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Child Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Child</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Children</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.first_name} {child.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 items-end">
            {['upcoming', 'completed', 'cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons List */}
      {lessons.length > 0 ? (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-purple-600">
                      {lesson.child_name?.charAt(0)?.toUpperCase() || 'C'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {lesson.child_name}'s {lesson.language_name} Lesson
                    </h3>
                    <p className="text-gray-600">with {lesson.educator_name}</p>
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

                  {(lesson.status === 'scheduled' || lesson.status === 'confirmed') && (
                    <div className="flex gap-2 mt-2">
                      {lesson.meeting_link && (
                        <a
                          href={lesson.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                        >
                          <i className="fas fa-video mr-2"></i> Join
                        </a>
                      )}
                      <button
                        onClick={() => handleCancelLesson(lesson.id)}
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
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
              ? "No upcoming lessons scheduled for your children."
              : filter === 'completed'
              ? "No completed lessons yet."
              : "No cancelled lessons."}
          </p>
          {filter === 'upcoming' && children.length > 0 && (
            <Link
              href="/portal/student/book"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Book a Lesson
            </Link>
          )}
        </div>
      )}
    </PortalLayout>
  )
}
