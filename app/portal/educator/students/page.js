'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function EducatorStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all, active, inactive
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/educator/students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch students')

      const data = await response.json()
      setStudents(data.students || [])
    } catch (err) {
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.email?.toLowerCase().includes(search.toLowerCase())

    if (filter === 'all') return matchesSearch
    if (filter === 'active') return matchesSearch && student.is_active
    if (filter === 'inactive') return matchesSearch && !student.is_active

    return matchesSearch
  })

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
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

  return (
    <PortalLayout portalType="educator">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Students</h1>
        <p className="text-gray-600">View and manage your student roster</p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === f
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-gray-800">{students.length}</p>
          <p className="text-sm text-gray-500">Total Students</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-green-600">{students.filter(s => s.is_active).length}</p>
          <p className="text-sm text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-blue-600">
            {students.reduce((sum, s) => sum + (s.total_lessons || 0), 0)}
          </p>
          <p className="text-sm text-gray-500">Total Lessons</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-2xl font-bold text-purple-600">
            {students.length > 0
              ? Math.round(students.reduce((sum, s) => sum + (s.progress || 0), 0) / students.length)
              : 0}%
          </p>
          <p className="text-sm text-gray-500">Avg Progress</p>
        </div>
      </div>

      {/* Students Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedStudent(student)}
            >
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    {student.avatar_url ? (
                      <img src={student.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-green-600">
                        {student.name?.charAt(0)?.toUpperCase() || 'S'}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{student.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{student.email}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                      student.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {student.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium text-gray-700">{student.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(student.progress || 0)}`}
                        style={{ width: `${student.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Language</span>
                    <span className="font-medium text-gray-700">{student.language_name || 'N/A'}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lessons Completed</span>
                    <span className="font-medium text-gray-700">{student.total_lessons || 0}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Lesson</span>
                    <span className="font-medium text-gray-700">
                      {student.last_lesson_date
                        ? new Date(student.last_lesson_date).toLocaleDateString()
                        : 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t p-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Message student functionality
                  }}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  <i className="fas fa-envelope mr-2"></i> Message
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedStudent(student)
                  }}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                >
                  <i className="fas fa-eye mr-2"></i> View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <i className="fas fa-users-slash text-gray-300 text-5xl mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No students found</h3>
          <p className="text-gray-600">
            {search ? 'Try a different search term.' : 'You have no students assigned yet.'}
          </p>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Student Profile</h3>
                <button onClick={() => setSelectedStudent(null)} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  {selectedStudent.avatar_url ? (
                    <img src={selectedStudent.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-green-600">
                      {selectedStudent.name?.charAt(0)?.toUpperCase() || 'S'}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h2>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedStudent.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedStudent.is_active ? 'Active Student' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-semibold text-gray-800">{selectedStudent.language_name || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Current Level</p>
                  <p className="font-semibold text-gray-800">{selectedStudent.current_level || 'Beginner'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Lessons</p>
                  <p className="font-semibold text-gray-800">{selectedStudent.total_lessons || 0}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Practice Hours</p>
                  <p className="font-semibold text-gray-800">{selectedStudent.practice_hours || 0}h</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Progress Overview</h4>
                <div className="space-y-3">
                  {['Speaking', 'Listening', 'Reading', 'Writing'].map((skill) => (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{skill}</span>
                        <span className="text-gray-800">{Math.floor(Math.random() * 40) + 40}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 40) + 40}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                  <i className="fas fa-envelope mr-2"></i> Send Message
                </button>
                <button className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <i className="fas fa-file-alt mr-2"></i> View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  )
}
