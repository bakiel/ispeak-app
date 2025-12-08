'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function StudentDashboard() {
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
      const response = await fetch(`${API_BASE}/api/portal/student/dashboard`, {
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
      <PortalLayout portalType="student">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PortalLayout>
    )
  }

  const stats = dashboard?.stats || {}
  const upcomingLessons = dashboard?.upcomingLessons || []
  const progress = dashboard?.progress || []
  const achievements = dashboard?.achievements || []

  return (
    <PortalLayout portalType="student">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="opacity-90">
          {stats.currentStreak > 0
            ? `You're on a ${stats.currentStreak} day learning streak!`
            : "Let's start your learning journey today!"}
        </p>
        <Link
          href="/portal/student/book"
          className="inline-block mt-4 bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          <i className="fas fa-plus mr-2"></i> Book a Lesson
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fas fa-book text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalLessonsCompleted || 0}</p>
              <p className="text-sm text-gray-500">Lessons Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <i className="fas fa-clock text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalPracticeMinutes || 0}</p>
              <p className="text-sm text-gray-500">Practice Minutes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <i className="fas fa-language text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.vocabularyLearned || 0}</p>
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
        {/* Upcoming Lessons */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Lessons</h2>
            <Link href="/portal/student/lessons" className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="p-4">
            {upcomingLessons.length > 0 ? (
              <div className="space-y-3">
                {upcomingLessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <i className="fas fa-video text-primary"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{lesson.language_name}</p>
                        <p className="text-sm text-gray-500">with {lesson.educator_name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">
                        {new Date(lesson.scheduled_date).toLocaleDateString()}
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
                <Link
                  href="/portal/student/book"
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  Book your first lesson
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* My Languages */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">My Languages</h2>
            <Link href="/portal/student/progress" className="text-primary text-sm hover:underline">
              Details
            </Link>
          </div>
          <div className="p-4">
            {progress.length > 0 ? (
              <div className="space-y-4">
                {progress.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">{lang.language_name}</span>
                      <span className="text-sm text-gray-500 capitalize">{lang.current_level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${Math.min((lang.total_lessons_completed || 0) * 10, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {lang.total_lessons_completed || 0} lessons completed
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-globe-africa text-4xl mb-3"></i>
                <p>No languages enrolled</p>
                <Link
                  href="/programs"
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  Explore programs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      {achievements.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recent Achievements</h2>
            <Link href="/portal/student/achievements" className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                    <i className={`${achievement.icon || 'fas fa-trophy'} text-white text-xl`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{achievement.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(achievement.earned_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  )
}
