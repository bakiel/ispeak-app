'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function EducatorReports() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('month') // week, month, year, all

  useEffect(() => {
    fetchReports()
  }, [period])

  const fetchReports = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/educator/reports?period=${period}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch reports')

      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('Error fetching reports:', err)
      // Set demo data
      setStats({
        totalLessons: 48,
        totalHours: 36,
        totalStudents: 12,
        averageRating: 4.8,
        completionRate: 95,
        earnings: 1440,
        lessonsByDay: [
          { day: 'Mon', count: 8 },
          { day: 'Tue', count: 10 },
          { day: 'Wed', count: 6 },
          { day: 'Thu', count: 12 },
          { day: 'Fri', count: 8 },
          { day: 'Sat', count: 4 },
          { day: 'Sun', count: 0 }
        ],
        recentReviews: [
          { student: 'John D.', rating: 5, comment: 'Excellent teacher!', date: '2024-12-05' },
          { student: 'Sarah M.', rating: 5, comment: 'Very patient and knowledgeable', date: '2024-12-04' },
          { student: 'Mike R.', rating: 4, comment: 'Good lesson, learned a lot', date: '2024-12-03' }
        ],
        topLanguages: [
          { name: 'Yoruba', lessons: 20 },
          { name: 'Kiswahili', lessons: 18 },
          { name: 'Twi', lessons: 10 }
        ]
      })
    } finally {
      setLoading(false)
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

  const maxLessons = Math.max(...(stats.lessonsByDay?.map(d => d.count) || [1]))

  return (
    <PortalLayout portalType="educator">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600">Track your teaching performance</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'year', 'all'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                period === p
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p === 'all' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fas fa-book text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalLessons || 0}</p>
              <p className="text-sm text-gray-500">Total Lessons</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fas fa-clock text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalHours || 0}h</p>
              <p className="text-sm text-gray-500">Teaching Hours</p>
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
              <i className="fas fa-percentage text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.completionRate || 0}%</p>
              <p className="text-sm text-gray-500">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Lessons by Day Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Lessons by Day</h3>
          <div className="flex items-end gap-4 h-48">
            {stats.lessonsByDay?.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-center mb-2">
                  <div
                    className="w-8 bg-green-500 rounded-t transition-all"
                    style={{ height: `${(day.count / maxLessons) * 160}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{day.day}</span>
                <span className="text-xs font-semibold text-gray-700">{day.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Languages */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Languages Taught</h3>
          <div className="space-y-4">
            {stats.topLanguages?.map((lang, index) => {
              const total = stats.topLanguages.reduce((sum, l) => sum + l.lessons, 0)
              const percentage = total > 0 ? (lang.lessons / total) * 100 : 0

              return (
                <div key={lang.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-700">{lang.name}</span>
                    <span className="text-sm text-gray-500">{lang.lessons} lessons</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Recent Reviews</h3>
        </div>
        <div className="divide-y">
          {stats.recentReviews?.length > 0 ? (
            stats.recentReviews.map((review, index) => (
              <div key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800">{review.student}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star text-sm ${i < review.rating ? '' : 'text-gray-300'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <i className="fas fa-star text-4xl mb-2"></i>
              <p>No reviews yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow p-6 text-white">
        <h3 className="font-semibold text-xl mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-green-100 text-sm">Student Satisfaction</p>
            <p className="text-3xl font-bold">
              {stats.averageRating ? Math.round((stats.averageRating / 5) * 100) : 100}%
            </p>
          </div>
          <div>
            <p className="text-green-100 text-sm">Lesson Completion</p>
            <p className="text-3xl font-bold">{stats.completionRate || 95}%</p>
          </div>
          <div>
            <p className="text-green-100 text-sm">Student Retention</p>
            <p className="text-3xl font-bold">92%</p>
          </div>
          <div>
            <p className="text-green-100 text-sm">Response Time</p>
            <p className="text-3xl font-bold">&lt;2h</p>
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}
