'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function StudentProgress() {
  const [progress, setProgress] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  useEffect(() => {
    fetchProgress()
  }, [])

  const fetchProgress = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/student/progress`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch progress')

      const data = await response.json()
      setProgress(data.languages || [])
      setStats(data.overallStats || {})
      if (data.languages?.length > 0) {
        setSelectedLanguage(data.languages[0])
      }
    } catch (err) {
      console.error('Error fetching progress:', err)
    } finally {
      setLoading(false)
    }
  }

  const getLevelProgress = (level) => {
    const levels = ['beginner', 'elementary', 'intermediate', 'upper-intermediate', 'advanced', 'fluent']
    const index = levels.indexOf(level?.toLowerCase() || 'beginner')
    return ((index + 1) / levels.length) * 100
  }

  const getLevelColor = (level) => {
    const colors = {
      beginner: 'bg-blue-500',
      elementary: 'bg-green-500',
      intermediate: 'bg-yellow-500',
      'upper-intermediate': 'bg-orange-500',
      advanced: 'bg-red-500',
      fluent: 'bg-purple-500'
    }
    return colors[level?.toLowerCase()] || 'bg-gray-500'
  }

  if (loading) {
    return (
      <PortalLayout portalType="student">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout portalType="student">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Progress</h1>
        <p className="text-gray-600">Track your learning journey across languages</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fas fa-clock text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalHours || 0}</p>
              <p className="text-sm text-gray-500">Total Hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fas fa-book text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalLessons || 0}</p>
              <p className="text-sm text-gray-500">Lessons Done</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <i className="fas fa-language text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalVocabulary || 0}</p>
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
              <p className="text-2xl font-bold text-gray-800">{stats.currentStreak || 0}</p>
              <p className="text-sm text-gray-500">Day Streak</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Languages List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">My Languages</h2>
          </div>
          <div className="p-4">
            {progress.length > 0 ? (
              <div className="space-y-3">
                {progress.map((lang) => (
                  <button
                    key={lang.language_id}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`w-full p-4 rounded-lg text-left transition ${
                      selectedLanguage?.language_id === lang.language_id
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">{lang.language_name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full text-white ${getLevelColor(lang.current_level)}`}>
                        {lang.current_level || 'Beginner'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getLevelColor(lang.current_level)}`}
                        style={{ width: `${getLevelProgress(lang.current_level)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {lang.total_lessons_completed || 0} lessons completed
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-globe-africa text-4xl mb-3"></i>
                <p>No languages enrolled yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Language Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedLanguage ? (
            <>
              {/* Language Header */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <i className="fas fa-language text-primary text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedLanguage.language_name}</h2>
                    <p className="text-gray-600">Current Level: {selectedLanguage.current_level || 'Beginner'}</p>
                  </div>
                </div>

                {/* Progress Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{selectedLanguage.total_lessons_completed || 0}</p>
                    <p className="text-sm text-gray-500">Lessons</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{selectedLanguage.total_practice_minutes || 0}</p>
                    <p className="text-sm text-gray-500">Minutes</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{selectedLanguage.vocabulary_learned || 0}</p>
                    <p className="text-sm text-gray-500">Words</p>
                  </div>
                </div>
              </div>

              {/* Level Progression */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Level Progression</h3>
                <div className="space-y-4">
                  {['Beginner', 'Elementary', 'Intermediate', 'Upper-Intermediate', 'Advanced', 'Fluent'].map((level, index) => {
                    const isCompleted = getLevelProgress(selectedLanguage.current_level) > ((index) / 6) * 100
                    const isCurrent = selectedLanguage.current_level?.toLowerCase() === level.toLowerCase()

                    return (
                      <div key={level} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {isCompleted ? (
                            <i className="fas fa-check text-sm"></i>
                          ) : (
                            <span className="text-sm font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${isCurrent ? 'text-primary' : 'text-gray-700'}`}>
                            {level}
                            {isCurrent && <span className="text-xs ml-2 text-gray-500">(Current)</span>}
                          </p>
                        </div>
                        {isCurrent && (
                          <span className="text-xs text-gray-500">In Progress</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Speaking', score: selectedLanguage.speaking_score || 60, icon: 'fa-microphone' },
                    { name: 'Listening', score: selectedLanguage.listening_score || 55, icon: 'fa-headphones' },
                    { name: 'Reading', score: selectedLanguage.reading_score || 70, icon: 'fa-book-open' },
                    { name: 'Writing', score: selectedLanguage.writing_score || 50, icon: 'fa-pen' },
                    { name: 'Vocabulary', score: selectedLanguage.vocabulary_score || 65, icon: 'fa-spell-check' }
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          <i className={`fas ${skill.icon} mr-2 text-gray-400`}></i>
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">{skill.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <i className="fas fa-chart-line text-gray-300 text-5xl mb-4"></i>
              <p className="text-gray-500">Select a language to view detailed progress</p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  )
}
