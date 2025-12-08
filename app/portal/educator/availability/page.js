'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
]

export default function EducatorAvailability() {
  const [availability, setAvailability] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    fetchAvailability()
  }, [])

  const fetchAvailability = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/educator/availability`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Failed to fetch availability')

      const data = await response.json()
      // Convert array to object keyed by day
      const avail = {}
      DAYS.forEach((day, index) => {
        const dayData = data.availability?.find(a => a.day_of_week === index)
        avail[index] = dayData ? {
          enabled: dayData.is_available,
          start: dayData.start_time || '09:00',
          end: dayData.end_time || '17:00'
        } : {
          enabled: false,
          start: '09:00',
          end: '17:00'
        }
      })
      setAvailability(avail)
    } catch (err) {
      console.error('Error fetching availability:', err)
      // Set defaults
      const defaults = {}
      DAYS.forEach((_, index) => {
        defaults[index] = {
          enabled: index >= 1 && index <= 5, // Mon-Fri
          start: '09:00',
          end: '17:00'
        }
      })
      setAvailability(defaults)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    const token = localStorage.getItem('token')

    // Convert to array format for API
    const availabilityArray = Object.entries(availability).map(([day, data]) => ({
      day_of_week: parseInt(day),
      is_available: data.enabled,
      start_time: data.start,
      end_time: data.end
    }))

    try {
      const response = await fetch(`${API_BASE}/api/portal/educator/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ availability: availabilityArray })
      })

      if (!response.ok) throw new Error('Failed to save availability')

      setMessage({ type: 'success', text: 'Availability saved successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const toggleDay = (dayIndex) => {
    setAvailability({
      ...availability,
      [dayIndex]: {
        ...availability[dayIndex],
        enabled: !availability[dayIndex]?.enabled
      }
    })
  }

  const updateDayTime = (dayIndex, field, value) => {
    setAvailability({
      ...availability,
      [dayIndex]: {
        ...availability[dayIndex],
        [field]: value
      }
    })
  }

  const copyToAllWeekdays = (dayIndex) => {
    const source = availability[dayIndex]
    const updated = { ...availability }
    for (let i = 1; i <= 5; i++) {
      updated[i] = { ...source }
    }
    setAvailability(updated)
    setMessage({ type: 'success', text: 'Copied to all weekdays!' })
    setTimeout(() => setMessage({ type: '', text: '' }), 2000)
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Availability</h1>
          <p className="text-gray-600">Set your weekly teaching schedule</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {saving ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i> Saving...
            </>
          ) : (
            <>
              <i className="fas fa-save mr-2"></i> Save Changes
            </>
          )}
        </button>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const updated = { ...availability }
              for (let i = 1; i <= 5; i++) {
                updated[i] = { enabled: true, start: '09:00', end: '17:00' }
              }
              updated[0] = { enabled: false, start: '09:00', end: '17:00' }
              updated[6] = { enabled: false, start: '09:00', end: '17:00' }
              setAvailability(updated)
            }}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Standard Weekdays (9-5)
          </button>
          <button
            onClick={() => {
              const updated = { ...availability }
              for (let i = 0; i <= 6; i++) {
                updated[i] = { enabled: true, start: '08:00', end: '20:00' }
              }
              setAvailability(updated)
            }}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            All Days (8AM-8PM)
          </button>
          <button
            onClick={() => {
              const updated = { ...availability }
              for (let i = 0; i <= 6; i++) {
                updated[i] = { enabled: false, start: '09:00', end: '17:00' }
              }
              setAvailability(updated)
            }}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Weekly Schedule</h3>
          <p className="text-sm text-gray-500">Toggle days on/off and set your available hours</p>
        </div>

        <div className="divide-y">
          {DAYS.map((day, index) => (
            <div key={day} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Day Toggle */}
                <div className="flex items-center gap-4 sm:w-48">
                  <button
                    onClick={() => toggleDay(index)}
                    className={`w-12 h-6 rounded-full transition ${
                      availability[index]?.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                      availability[index]?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                  <span className={`font-medium ${
                    availability[index]?.enabled ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {day}
                  </span>
                </div>

                {/* Time Selection */}
                {availability[index]?.enabled && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={availability[index]?.start || '09:00'}
                      onChange={(e) => updateDayTime(index, 'start', e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                    >
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    <span className="text-gray-500">to</span>
                    <select
                      value={availability[index]?.end || '17:00'}
                      onChange={(e) => updateDayTime(index, 'end', e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500"
                    >
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>

                    {index >= 1 && index <= 5 && (
                      <button
                        onClick={() => copyToAllWeekdays(index)}
                        className="ml-2 px-3 py-2 text-xs text-green-600 hover:bg-green-50 rounded-lg"
                        title="Copy to all weekdays"
                      >
                        <i className="fas fa-copy mr-1"></i> Copy to weekdays
                      </button>
                    )}
                  </div>
                )}

                {!availability[index]?.enabled && (
                  <span className="text-sm text-gray-400">Not available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Preview */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Weekly Overview</h3>
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-xs font-medium text-gray-500 mb-2">{day.slice(0, 3)}</div>
              <div className={`h-24 rounded-lg ${
                availability[index]?.enabled ? 'bg-green-100' : 'bg-gray-100'
              } flex items-center justify-center`}>
                {availability[index]?.enabled ? (
                  <div className="text-xs text-green-700 text-center p-1">
                    <div>{availability[index]?.start}</div>
                    <div>-</div>
                    <div>{availability[index]?.end}</div>
                  </div>
                ) : (
                  <i className="fas fa-times text-gray-400"></i>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          <i className="fas fa-lightbulb mr-2"></i> Tips
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>Students can only book during your available hours</li>
          <li>Consider time zones when setting availability for international students</li>
          <li>You can block specific dates for holidays in your calendar settings</li>
          <li>Changes take effect immediately after saving</li>
        </ul>
      </div>
    </PortalLayout>
  )
}
