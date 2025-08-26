'use client'

import { useState } from 'react'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    setLoading(true)
    
    try {
      // TODO: Implement actual contact form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-lg text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have questions about our programs, 
            need technical support, or want to learn more about iSPEAK, we're here to help.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-2">
                    <span className="text-2xl mr-2">📍</span> Mailing Address
                  </h3>
                  <p className="text-gray-600 ml-9">
                    P.O. Box 4511<br />
                    Macon, Georgia 31213<br />
                    United States
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-2">
                    <span className="text-2xl mr-2">📞</span> Phone/WhatsApp
                  </h3>
                  <p className="text-gray-600 ml-9">+1 (478) 390-4040</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-2">
                    <span className="text-2xl mr-2">✉️</span> Email
                  </h3>
                  <div className="text-gray-600 ml-9">
                    <p>General Inquiries: info@ispeaklanguage.org</p>
                    <p>Support: support@ispeaklanguage.org</p>
                    <p>Privacy: privacy@ispeaklanguage.org</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-2">
                    <span className="text-2xl mr-2">🕒</span> Business Hours
                  </h3>
                  <p className="text-gray-600 ml-9">
                    Monday - Friday<br />
                    9:00 AM - 5:00 PM Eastern Time
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-2">
                    <span className="text-2xl mr-2">👤</span> Owner
                  </h3>
                  <p className="text-gray-600 ml-9">Daisy Ross</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="enrollment">Enrollment Questions</option>
                    <option value="educator">Educator Application</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="donation">Donation Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    maxLength={2000}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {formData.message.length}/2000 characters
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-yellow-400 text-gray-900 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-10 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-6">
              Before contacting us, you might find your answer in our{' '}
              <a href="/faq" className="text-teal-500 hover:underline">FAQ section</a>.
            </p>

            <h2 className="text-2xl font-bold mb-4">Social Media</h2>
            <p className="text-gray-600 mb-4">
              Follow us on social media for updates, language tips, and cultural insights:
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600" aria-label="Facebook">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600" aria-label="Instagram">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600" aria-label="YouTube">
                <i className="fab fa-youtube text-2xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400" aria-label="Twitter">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}