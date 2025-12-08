'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function EducatorSchedule() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('week') // week, month, list
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedLesson, setSelectedLesson] = useState(null)

  useEffect(() => {
    fetchLessons()
  }, [currentDate, view])

  const fetchLessons = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    const startDate = getStartDate()
    const endDate = getEndDate()

    try {
      const response = await fetch(
        `${API_BASE}/api/portal/educator/lessons?start_date=${startDate}&end_date=${endDate}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )

      if (!response.ok) throw new Error('Failed to fetch lessons')

      const data = await response.json()
      setLessons(data.lessons || [])
    } catch (err) {
      console.error('Error fetching lessons:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStartDate = () => {
    const date = new Date(currentDate)
    if (view === 'week') {
      date.setDate(date.getDate() - date.getDay())
    } else if (view === 'month') {
      date.setDate(1)
    }
    return date.toISOString().split('T')[0]
  }

  const getEndDate = () => {
    const date = new Date(currentDate)
    if (view === 'week') {
      date.setDate(date.getDate() - date.getDay() + 6)
    } else if (view === 'month') {
      date.setMonth(date.getMonth() + 1, 0)
    } else {
      date.setDate(date.getDate() + 30)
    }
    return date.toISOString().split('T')[0]
  }

  const handleAction = async (lessonId, action) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${API_BASE}/api/portal/educator/lessons/${lessonId}/${action}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        fetchLessons()
        setSelectedLesson(null)
      }
    } catch (err) {
      console.error(`Error ${action} lesson:`, err)
    }
  }

  const navigateDate = (direction) => {
    const date = new Date(currentDate)
    if (view === 'week') {
      date.setDate(date.getDate() + (direction * 7))
    } else if (view === 'month') {
      date.setMonth(date.getMonth() + direction)
    }
    setCurrentDate(date)
  }

  const getWeekDays = () => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      days.push(day)
    }
    return days
  }

  const getLessonsForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return lessons.filter(l => l.scheduled_date === dateStr)
  }

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-500',
      confirmed: 'bg-green-500',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-500',
      pending: 'bg-yellow-500'
    }
    return colors[status] || 'bg-gray-500'
  }

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ]

  return (
    <PortalLayout portalType="educator">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Schedule</h1>
          <p className="text-gray-600">Manage your teaching schedule</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'list'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                view === v
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
        <button
          onClick={() => navigateDate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <i className="fas fa-chevron-left text-gray-600"></i>
        </button>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {view === 'week' ? (
              `${getWeekDays()[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${getWeekDays()[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
            ) : (
              currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            )}
          </h2>
        </div>
        <button
          onClick={() => navigateDate(1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <i className="fas fa-chevron-right text-gray-600"></i>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : view === 'list' ? (
        /* List View */
        <div className="bg-white rounded-lg shadow">
          {lessons.length > 0 ? (
            <div className="divide-y">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-12 rounded-full ${getStatusColor(lesson.status)}`}></div>
                    <div>
                      <p className="font-medium text-gray-800">{lesson.student_name}</p>
                      <p className="text-sm text-gray-600">{lesson.language_name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(lesson.scheduled_date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })} at {lesson.scheduled_time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(lesson.status)}`}>
                      {lesson.status}
                    </span>
                    {lesson.status === 'confirmed' && lesson.meeting_link && (
                      <a
                        href={lesson.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                      >
                        Start
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-calendar-times text-4xl mb-4"></i>
              <p>No lessons scheduled for this period</p>
            </div>
          )}
        </div>
      ) : (
        /* Week/Month View */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Days Header */}
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-3 text-center font-semibold text-gray-600 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {view === 'week' ? (
            /* Week Grid */
            <div className="grid grid-cols-7">
              {getWeekDays().map((day) => {
                const dayLessons = getLessonsForDay(day)
                const isToday = day.toDateString() === new Date().toDateString()

                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-[200px] p-2 border-r border-b last:border-r-0 ${
                      isToday ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-green-600' : 'text-gray-600'}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayLessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full text-left p-2 rounded text-xs text-white ${getStatusColor(lesson.status)} hover:opacity-90`}
                        >
                          <p className="font-semibold truncate">{lesson.scheduled_time}</p>
                          <p className="truncate">{lesson.student_name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Month Grid */
            <div className="grid grid-cols-7">
              {(() => {
                const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
                const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
                const days = []

                // Add empty cells for days before first of month
                for (let i = 0; i < firstDay.getDay(); i++) {
                  days.push(<div key={`empty-${i}`} className="min-h-[100px] p-2 border-r border-b bg-gray-50"></div>)
                }

                // Add days of month
                for (let d = 1; d <= lastDay.getDate(); d++) {
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d)
                  const dayLessons = getLessonsForDay(date)
                  const isToday = date.toDateString() === new Date().toDateString()

                  days.push(
                    <div
                      key={d}
                      className={`min-h-[100px] p-2 border-r border-b ${isToday ? 'bg-green-50' : ''}`}
                    >
                      <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-green-600' : 'text-gray-600'}`}>
                        {d}
                      </div>
                      {dayLessons.length > 0 && (
                        <div className="text-xs">
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {dayLessons.length} lesson{dayLessons.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                }

                return days
              })()}
            </div>
          )}
        </div>
      )}

      {/* Lesson Detail Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Lesson Details</h3>
                <button onClick={() => setSelectedLesson(null)} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Student</p>
                  <p className="font-medium text-gray-800">{selectedLesson.student_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-medium text-gray-800">{selectedLesson.language_name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(selectedLesson.scheduled_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-800">{selectedLesson.scheduled_time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${getStatusColor(selectedLesson.status)}`}>
                    {selectedLesson.status}
                  </span>
                </div>
                {selectedLesson.notes && (
                  <div>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="text-gray-700">{selectedLesson.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                {selectedLesson.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleAction(selectedLesson.id, 'confirm')}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleAction(selectedLesson.id, 'decline')}
                      className="flex-1 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Decline
                    </button>
                  </>
                )}
                {selectedLesson.status === 'confirmed' && selectedLesson.meeting_link && (
                  <a
                    href={selectedLesson.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700"
                  >
                    <i className="fas fa-video mr-2"></i> Start Lesson
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  )
}
