'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import { useRouter } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function BookLesson() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Language, 2: Educator, 3: Time, 4: Confirm
  const [languages, setLanguages] = useState([])
  const [educators, setEducators] = useState([])
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState({
    languageId: null,
    languageName: '',
    educatorId: null,
    educatorName: '',
    date: '',
    time: '',
    duration: 30,
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLanguages()
  }, [])

  useEffect(() => {
    if (booking.languageId) {
      fetchEducators(booking.languageId)
    }
  }, [booking.languageId])

  useEffect(() => {
    if (booking.educatorId && booking.date) {
      fetchAvailability(booking.educatorId, booking.date)
    }
  }, [booking.educatorId, booking.date])

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/content/languages`)
      if (!response.ok) throw new Error('Failed to fetch languages')
      const data = await response.json()
      setLanguages(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchEducators = async (languageId) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/portal/booking/educators?language_id=${languageId}`)
      if (!response.ok) throw new Error('Failed to fetch educators')
      const data = await response.json()
      setEducators(data.educators || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailability = async (educatorId, date) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${API_BASE}/api/portal/booking/availability?educator_id=${educatorId}&date=${date}`
      )
      if (!response.ok) throw new Error('Failed to fetch availability')
      const data = await response.json()
      setAvailability(data.slots || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    setSubmitting(true)
    setError(null)

    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/portal/booking/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          educator_id: booking.educatorId,
          language_id: booking.languageId,
          scheduled_date: booking.date,
          scheduled_time: booking.time,
          duration: booking.duration,
          notes: booking.notes
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to book lesson')
      }

      // Success - redirect to lessons
      router.push('/portal/student/lessons?booked=success')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const selectLanguage = (lang) => {
    setBooking({
      ...booking,
      languageId: lang.id,
      languageName: lang.name
    })
    setStep(2)
  }

  const selectEducator = (educator) => {
    setBooking({
      ...booking,
      educatorId: educator.id,
      educatorName: educator.name
    })
    setStep(3)
  }

  const selectTimeSlot = (time) => {
    setBooking({ ...booking, time })
    setStep(4)
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  return (
    <PortalLayout portalType="student">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Book a Lesson</h1>
        <p className="text-gray-600">Schedule your next language learning session</p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Language' },
            { num: 2, label: 'Educator' },
            { num: 3, label: 'Date & Time' },
            { num: 4, label: 'Confirm' }
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s.num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s.num ? <i className="fas fa-check"></i> : s.num}
              </div>
              <span className={`ml-2 hidden sm:block ${step >= s.num ? 'text-primary font-medium' : 'text-gray-500'}`}>
                {s.label}
              </span>
              {i < 3 && (
                <div className={`w-12 sm:w-24 h-1 mx-2 sm:mx-4 ${
                  step > s.num ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
          <button onClick={() => setError(null)} className="float-right">&times;</button>
        </div>
      )}

      {/* Step 1: Select Language */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select a Language</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => selectLanguage(lang)}
                  className="p-6 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
                >
                  <div className="text-4xl mb-3">{lang.flag_emoji || '🌍'}</div>
                  <h3 className="font-semibold text-gray-800">{lang.name}</h3>
                  <p className="text-sm text-gray-500">{lang.native_name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Select Educator */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Select an Educator</h2>
            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            Learning: <span className="font-semibold text-primary">{booking.languageName}</span>
          </p>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : educators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {educators.map((educator) => (
                <button
                  key={educator.id}
                  onClick={() => selectEducator(educator)}
                  className="p-4 border-2 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      {educator.avatar_url ? (
                        <img src={educator.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <i className="fas fa-user text-primary text-xl"></i>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{educator.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        <i className="fas fa-star"></i>
                        <span>{educator.rating || '5.0'}</span>
                        <span className="text-gray-400">({educator.review_count || 0} reviews)</span>
                      </div>
                    </div>
                  </div>
                  {educator.bio && (
                    <p className="text-sm text-gray-600 line-clamp-2">{educator.bio}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {educator.lessons_taught || 0} lessons taught
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Native speaker
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-user-slash text-4xl mb-4"></i>
              <p>No educators available for this language at the moment.</p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Select Date & Time */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Select Date & Time</h2>
            <button onClick={() => setStep(2)} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
          </div>
          <div className="mb-6">
            <p className="text-gray-600">
              Learning <span className="font-semibold text-primary">{booking.languageName}</span> with{' '}
              <span className="font-semibold text-primary">{booking.educatorName}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                min={getMinDate()}
                max={getMaxDate()}
                value={booking.date}
                onChange={(e) => setBooking({ ...booking, date: e.target.value, time: '' })}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Duration</label>
              <div className="flex gap-4">
                {[30, 45, 60].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setBooking({ ...booking, duration: dur })}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition ${
                      booking.duration === dur
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                  >
                    {dur} min
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots */}
          {booking.date && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : availability.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {availability.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => selectTimeSlot(slot.time)}
                      disabled={!slot.available}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                        !slot.available
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : booking.time === slot.time
                          ? 'bg-primary text-white'
                          : 'bg-gray-50 hover:bg-primary/10 text-gray-700'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <i className="fas fa-calendar-times text-3xl mb-2"></i>
                  <p>No available slots for this date</p>
                  <p className="text-sm">Please try another date</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Your Booking</h2>
            <button onClick={() => setStep(3)} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-arrow-left mr-2"></i> Back
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-semibold text-gray-800">{booking.languageName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Educator</p>
                <p className="font-semibold text-gray-800">{booking.educatorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold text-gray-800">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold text-gray-800">{booking.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-800">{booking.duration} minutes</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes for Educator (Optional)
            </label>
            <textarea
              value={booking.notes}
              onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary"
              rows="3"
              placeholder="Any specific topics you'd like to cover, questions, or special requests..."
            ></textarea>
          </div>

          <button
            onClick={handleBooking}
            disabled={submitting}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i> Booking...
              </>
            ) : (
              <>
                <i className="fas fa-check mr-2"></i> Confirm Booking
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            You will receive a confirmation email once the educator approves your booking.
          </p>
        </div>
      )}
    </PortalLayout>
  )
}
