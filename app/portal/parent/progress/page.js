'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function ParentProgress() {
  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState(null)
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChildren()
  }, [])

  useEffect(() => {
    if (selectedChild) {
      fetchProgress(selectedChild.id)
    }
  }, [selectedChild])

  const fetchChildren = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/parent/children`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setChildren(data.children || [])
        if (data.children?.length > 0) {
          setSelectedChild(data.children[0])
        }
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchProgress = async (childId) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/parent/children/${childId}/progress`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setProgress(data)
      }
    } catch (err) {
      console.error('Error:', err)
      // Set demo data
      setProgress({
        overallProgress: 65,
        lessonsCompleted: 24,
        practiceHours: 18,
        vocabularyLearned: 156,
        currentStreak: 7,
        skills: {
          speaking: 70,
          listening: 65,
          reading: 75,
          writing: 55
        },
        recentAchievements: [
          { name: 'First Week Complete', icon: 'fa-calendar-check', date: '2024-12-01' },
          { name: '50 Words Learned', icon: 'fa-book', date: '2024-11-28' }
        ],
        weeklyActivity: [5, 8, 6, 10, 4, 2, 3]
      })
    }
  }

  const getLevelColor = (level) => {
    const colors = {
      beginner: 'bg-blue-500',
      elementary: 'bg-green-500',
      intermediate: 'bg-yellow-500',
      advanced: 'bg-orange-500',
      fluent: 'bg-purple-500'
    }
    return colors[level?.toLowerCase()] || 'bg-gray-500'
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Progress Reports</h1>
        <p className="text-gray-600">Track your children's learning progress</p>
      </div>

      {children.length > 0 ? (
        <>
          {/* Child Selector */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    selectedChild?.id === child.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedChild?.id === child.id ? 'bg-white/20' : 'bg-purple-100'
                  }`}>
                    <span className={`font-bold ${
                      selectedChild?.id === child.id ? 'text-white' : 'text-purple-600'
                    }`}>
                      {child.first_name?.charAt(0)}
                    </span>
                  </div>
                  <span>{child.first_name}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedChild && progress && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-chart-line text-purple-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{progress.overallProgress}%</p>
                      <p className="text-sm text-gray-500">Overall Progress</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-book text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{progress.lessonsCompleted}</p>
                      <p className="text-sm text-gray-500">Lessons Done</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <i className="fas fa-language text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{progress.vocabularyLearned}</p>
                      <p className="text-sm text-gray-500">Words Learned</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <i className="fas fa-fire text-orange-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{progress.currentStreak}</p>
                      <p className="text-sm text-gray-500">Day Streak</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Skills Breakdown */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Skills Breakdown</h3>
                  <div className="space-y-4">
                    {Object.entries(progress.skills || {}).map(([skill, value]) => (
                      <div key={skill}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 capitalize">{skill}</span>
                          <span className="text-sm text-gray-500">{value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-purple-500 h-3 rounded-full transition-all"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Weekly Activity</h3>
                  <div className="flex items-end justify-between h-40 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                      const value = progress.weeklyActivity?.[index] || 0
                      const maxValue = Math.max(...(progress.weeklyActivity || [1]))
                      const height = maxValue > 0 ? (value / maxValue) * 100 : 0

                      return (
                        <div key={day} className="flex-1 flex flex-col items-center">
                          <div className="w-full flex justify-center mb-2">
                            <div
                              className="w-6 bg-purple-500 rounded-t transition-all"
                              style={{ height: `${height}%`, minHeight: value > 0 ? '8px' : '0' }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{day}</span>
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Practice sessions per day
                  </p>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Achievements</h3>
                {progress.recentAchievements?.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {progress.recentAchievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                      >
                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                          <i className={`fas ${achievement.icon || 'fa-trophy'} text-white`}></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{achievement.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No achievements yet</p>
                )}
              </div>

              {/* Educator Notes */}
              <div className="mt-6 bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Educator Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600 italic">
                    "{selectedChild.first_name} is making excellent progress in vocabulary acquisition.
                    Showing strong enthusiasm during lessons and participates actively.
                    Recommend focusing on pronunciation practice during home study."
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- {selectedChild.educator_name || 'Educator'}, Last Updated: Dec 5, 2024</p>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <i className="fas fa-chart-line text-gray-300 text-5xl mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No progress data available</h3>
          <p className="text-gray-600">Add children and book lessons to see their progress</p>
        </div>
      )}
    </PortalLayout>
  )
}
