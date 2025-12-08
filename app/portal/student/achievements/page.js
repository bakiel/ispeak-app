'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function StudentAchievements() {
  const [achievements, setAchievements] = useState([])
  const [allAchievements, setAllAchievements] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('earned') // earned, available, all

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/student/achievements`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch achievements')

      const data = await response.json()
      setAchievements(data.earned || [])
      setAllAchievements(data.available || [])
      setStats(data.stats || {})
    } catch (err) {
      console.error('Error fetching achievements:', err)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category) => {
    const icons = {
      streak: 'fa-fire',
      lessons: 'fa-book',
      vocabulary: 'fa-language',
      practice: 'fa-clock',
      social: 'fa-users',
      special: 'fa-star'
    }
    return icons[category] || 'fa-trophy'
  }

  const getCategoryColor = (category) => {
    const colors = {
      streak: 'bg-orange-500',
      lessons: 'bg-blue-500',
      vocabulary: 'bg-purple-500',
      practice: 'bg-green-500',
      social: 'bg-pink-500',
      special: 'bg-yellow-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  const getRarityBorder = (rarity) => {
    const borders = {
      common: 'border-gray-300',
      uncommon: 'border-green-400',
      rare: 'border-blue-400',
      epic: 'border-purple-400',
      legendary: 'border-yellow-400'
    }
    return borders[rarity] || 'border-gray-300'
  }

  const filteredAchievements = () => {
    if (filter === 'earned') return achievements
    if (filter === 'available') {
      const earnedIds = achievements.map(a => a.achievement_id)
      return allAchievements.filter(a => !earnedIds.includes(a.id))
    }
    return allAchievements
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
        <h1 className="text-2xl font-bold text-gray-800">Achievements</h1>
        <p className="text-gray-600">Celebrate your learning milestones</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-trophy text-2xl"></i>
            </div>
            <div>
              <p className="text-3xl font-bold">{achievements.length}</p>
              <p className="text-sm opacity-90">Earned</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-bullseye text-2xl"></i>
            </div>
            <div>
              <p className="text-3xl font-bold">{allAchievements.length}</p>
              <p className="text-sm opacity-90">Total Available</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-gem text-2xl"></i>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.totalPoints || 0}</p>
              <p className="text-sm opacity-90">Points Earned</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg shadow p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <i className="fas fa-percentage text-2xl"></i>
            </div>
            <div>
              <p className="text-3xl font-bold">
                {allAchievements.length > 0
                  ? Math.round((achievements.length / allAchievements.length) * 100)
                  : 0}%
              </p>
              <p className="text-sm opacity-90">Completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b">
          {[
            { key: 'earned', label: 'My Achievements', icon: 'fa-medal' },
            { key: 'available', label: 'Available', icon: 'fa-lock-open' },
            { key: 'all', label: 'All Achievements', icon: 'fa-list' }
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

      {/* Achievements Grid */}
      {filteredAchievements().length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAchievements().map((achievement) => {
            const isEarned = achievements.some(a => a.achievement_id === achievement.id || a.id === achievement.id)
            const earnedData = achievements.find(a => a.achievement_id === achievement.id || a.id === achievement.id)

            return (
              <div
                key={achievement.id || achievement.achievement_id}
                className={`bg-white rounded-lg shadow p-4 border-2 ${
                  isEarned ? getRarityBorder(achievement.rarity) : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-14 h-14 rounded-full ${
                    isEarned ? getCategoryColor(achievement.category) : 'bg-gray-300'
                  } flex items-center justify-center`}>
                    <i className={`fas ${achievement.icon || getCategoryIcon(achievement.category)} text-white text-xl`}></i>
                  </div>
                  {achievement.points && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isEarned ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      +{achievement.points} pts
                    </span>
                  )}
                </div>

                <h3 className={`font-semibold mb-1 ${isEarned ? 'text-gray-800' : 'text-gray-500'}`}>
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>

                {isEarned && earnedData?.earned_at ? (
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <i className="fas fa-check-circle"></i>
                    <span>Earned {new Date(earnedData.earned_at).toLocaleDateString()}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <i className="fas fa-lock"></i>
                    <span>Not yet earned</span>
                  </div>
                )}

                {achievement.rarity && (
                  <div className="mt-3 pt-3 border-t">
                    <span className={`text-xs font-medium capitalize ${
                      achievement.rarity === 'legendary' ? 'text-yellow-600' :
                      achievement.rarity === 'epic' ? 'text-purple-600' :
                      achievement.rarity === 'rare' ? 'text-blue-600' :
                      achievement.rarity === 'uncommon' ? 'text-green-600' :
                      'text-gray-500'
                    }`}>
                      <i className="fas fa-gem mr-1"></i>
                      {achievement.rarity}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <i className="fas fa-trophy text-gray-300 text-5xl mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {filter === 'earned' ? 'No achievements earned yet' : 'No achievements available'}
          </h3>
          <p className="text-gray-600">
            {filter === 'earned'
              ? 'Complete lessons and practice regularly to unlock achievements!'
              : 'Check back later for new achievements to unlock.'}
          </p>
        </div>
      )}

      {/* Recent Achievements */}
      {achievements.length > 0 && filter !== 'earned' && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recently Earned</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="divide-y">
              {achievements.slice(0, 5).map((achievement) => (
                <div key={achievement.id} className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${getCategoryColor(achievement.category)} flex items-center justify-center flex-shrink-0`}>
                    <i className={`fas ${achievement.icon || getCategoryIcon(achievement.category)} text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{achievement.name}</p>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(achievement.earned_at).toLocaleDateString()}
                    </p>
                    {achievement.points && (
                      <p className="text-sm font-semibold text-yellow-600">+{achievement.points} pts</p>
                    )}
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
