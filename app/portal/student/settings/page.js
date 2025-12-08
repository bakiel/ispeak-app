'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import { useRouter } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://72.61.201.237:3001'

export default function StudentSettings() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [activeTab, setActiveTab] = useState('profile')

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    timezone: 'Africa/Lagos',
    avatarUrl: ''
  })

  const [notifications, setNotifications] = useState({
    emailLessonReminders: true,
    emailProgressReports: true,
    emailPromotions: false,
    pushLessonReminders: true,
    pushMessages: true
  })

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch profile')

      const data = await response.json()
      setProfile({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        dateOfBirth: data.dateOfBirth || '',
        timezone: data.timezone || 'Africa/Lagos',
        avatarUrl: data.avatarUrl || ''
      })

      if (data.notificationSettings) {
        setNotifications(data.notificationSettings)
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`${API_BASE}/api/portal/student/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      })

      if (!response.ok) throw new Error('Failed to update profile')

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveNotifications = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`${API_BASE}/api/portal/student/notifications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(notifications)
      })

      if (!response.ok) throw new Error('Failed to update notifications')

      setMessage({ type: 'success', text: 'Notification preferences saved!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (password.new !== password.confirm) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    if (password.new.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' })
      return
    }

    setSaving(true)
    setMessage({ type: '', text: '' })

    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`${API_BASE}/api/portal/student/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to change password')
      }

      setMessage({ type: 'success', text: 'Password changed successfully!' })
      setPassword({ current: '', new: '', confirm: '' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
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

  return (
    <PortalLayout portalType="student">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b overflow-x-auto">
          {[
            { key: 'profile', label: 'Profile', icon: 'fa-user' },
            { key: 'notifications', label: 'Notifications', icon: 'fa-bell' },
            { key: 'security', label: 'Security', icon: 'fa-lock' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key)
                setMessage({ type: '', text: '' })
              }}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition ${
                activeTab === tab.key
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

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Profile Information</h2>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <i className="fas fa-user text-primary text-3xl"></i>
                )}
              </div>
              <div>
                <button type="button" className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                  Change Photo
                </button>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG. Max 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                  <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                  <option value="Africa/Accra">Africa/Accra (GMT)</option>
                  <option value="Africa/Addis_Ababa">Africa/Addis Ababa (EAT)</option>
                  <option value="America/New_York">America/New York (EST)</option>
                  <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Notification Preferences</h2>

          <form onSubmit={handleSaveNotifications} className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-700">Lesson Reminders</p>
                    <p className="text-sm text-gray-500">Get reminders before your scheduled lessons</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailLessonReminders}
                    onChange={(e) => setNotifications({ ...notifications, emailLessonReminders: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-700">Progress Reports</p>
                    <p className="text-sm text-gray-500">Weekly summary of your learning progress</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailProgressReports}
                    onChange={(e) => setNotifications({ ...notifications, emailProgressReports: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-700">Promotions & Updates</p>
                    <p className="text-sm text-gray-500">News about new features and special offers</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailPromotions}
                    onChange={(e) => setNotifications({ ...notifications, emailPromotions: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-4">Push Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-700">Lesson Reminders</p>
                    <p className="text-sm text-gray-500">Push notifications before lessons</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.pushLessonReminders}
                    onChange={(e) => setNotifications({ ...notifications, pushLessonReminders: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-700">Messages</p>
                    <p className="text-sm text-gray-500">Notifications for new messages from educators</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.pushMessages}
                    onChange={(e) => setNotifications({ ...notifications, pushMessages: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Change Password</h2>

          <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
            >
              {saving ? 'Changing...' : 'Change Password'}
            </button>
          </form>

          <hr className="my-8" />

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Danger Zone</h2>
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-medium text-red-800">Delete Account</h3>
              <p className="text-sm text-red-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                type="button"
                className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  )
}
