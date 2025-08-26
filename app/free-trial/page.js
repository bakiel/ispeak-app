'use client'

import { useState } from 'react'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FreeTrialPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    language: '',
    experience: '',
    goals: '',
    preferredDays: [],
    preferredTimes: '',
    timezone: '',
    additionalInfo: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleDayToggle = (day) => {
    if (formData.preferredDays.includes(day)) {
      setFormData({
        ...formData,
        preferredDays: formData.preferredDays.filter(d => d !== day)
      })
    } else {
      setFormData({
        ...formData,
        preferredDays: [...formData.preferredDays, day]
      })
    }
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement form submission
    setStep(4) // Go to success step
  }

  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${step >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
                Parent Info
              </span>
              <span className={`text-sm font-medium ${step >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
                Student Info
              </span>
              <span className={`text-sm font-medium ${step >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>
                Schedule
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Steps */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-2">Book Your Free Trial Lesson</h1>
              <p className="text-gray-600 mb-6">
                Experience the iSPEAK difference with a free 30-minute trial lesson. 
                No payment required!
              </p>

              <h2 className="text-xl font-bold mb-4">Parent/Guardian Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Tell Us About Your Child</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Child's Name *
                  </label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Child's Age *
                  </label>
                  <select
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select age</option>
                    {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(age => (
                      <option key={age} value={age}>{age} years old</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Which Language? *
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select a language</option>
                    <option value="yoruba">Yoruba</option>
                    <option value="kiswahili">Kiswahili</option>
                    <option value="twi">Twi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Previous Experience with the Language
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="none">No previous experience</option>
                    <option value="some">Hears it at home sometimes</option>
                    <option value="understands">Understands but doesn't speak</option>
                    <option value="basic">Speaks basic words/phrases</option>
                    <option value="conversational">Can have simple conversations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    What are your goals for your child?
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="E.g., Connect with grandparents, preserve heritage, prepare for a trip..."
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  className="text-teal-600 font-medium hover:underline"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Schedule Your Trial</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Preferred Days (select all that apply) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`py-2 px-4 rounded-md font-medium transition-all ${
                          formData.preferredDays.includes(day)
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Preferred Time Range *
                  </label>
                  <select
                    name="preferredTimes"
                    value={formData.preferredTimes}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select time range</option>
                    <option value="morning">Morning (8am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 4pm)</option>
                    <option value="evening">Evening (4pm - 8pm)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Time Zone *
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select time zone</option>
                    <option value="PST">Pacific Time (PST/PDT)</option>
                    <option value="MST">Mountain Time (MST/MDT)</option>
                    <option value="CST">Central Time (CST/CDT)</option>
                    <option value="EST">Eastern Time (EST/EDT)</option>
                    <option value="GMT">GMT/UTC</option>
                    <option value="CET">Central European Time</option>
                    <option value="EAT">East Africa Time</option>
                    <option value="WAT">West Africa Time</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Any special needs, learning preferences, or questions?"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  className="text-teal-600 font-medium hover:underline"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
                >
                  Submit Request
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-4xl text-green-600"></i>
                </div>
                <h2 className="text-3xl font-bold mb-4">Trial Request Submitted!</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Thank you for your interest in iSPEAK! We've received your trial lesson request.
                </p>
              </div>

              <div className="bg-teal-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-bold text-lg mb-3">What happens next?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-600 mr-2 mt-1"></i>
                    <span>You'll receive a confirmation email within a few minutes</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-600 mr-2 mt-1"></i>
                    <span>Our team will contact you within 24 hours to schedule your trial</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-600 mr-2 mt-1"></i>
                    <span>We'll match you with the perfect educator for your child</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-teal-600 mr-2 mt-1"></i>
                    <span>You'll receive a Zoom link and preparation tips before the lesson</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Link 
                  href="/" 
                  className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
                >
                  Return to Homepage
                </Link>
                <p className="text-sm text-gray-600">
                  Questions? Email us at{' '}
                  <a href="mailto:info@ispeaklanguage.org" className="text-teal-600 hover:underline">
                    info@ispeaklanguage.org
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  )
}