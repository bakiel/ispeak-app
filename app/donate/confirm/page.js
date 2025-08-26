'use client'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DonationConfirmPage() {
  const router = useRouter()
  const [donationDetails, setDonationDetails] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    zipCode: ''
  })

  useEffect(() => {
    // Retrieve donation details from session storage
    const pendingDonation = sessionStorage.getItem('pendingDonation')
    if (pendingDonation) {
      setDonationDetails(JSON.parse(pendingDonation))
    } else {
      // Redirect back if no pending donation
      router.push('/donate')
    }
  }, [router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Send donation to backend API
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: donationDetails.amount,
          donationType: donationDetails.donationType,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          isAnonymous: donationDetails.isAnonymous,
          categories: donationDetails.categories,
          paymentMethod: paymentMethod
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to process donation')
      }
      
      const result = await response.json()
      
      // Clear session storage
      sessionStorage.removeItem('pendingDonation')
      
      // Store success details for thank you page
      sessionStorage.setItem('donationSuccess', JSON.stringify({
        ...donationDetails,
        paymentMethod,
        donorName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        confirmationNumber: result.confirmation_number
      }))
      
      // Redirect to thank you page
      router.push('/donate/thank-you')
    } catch (error) {
      console.error('Error processing donation:', error)
      alert('There was an error processing your donation. Please try again.')
      setIsProcessing(false)
    }
  }

  if (!donationDetails) {
    return null // Will redirect
  }

  return (
    <>
      <ModernNavigation />
      
      {/* Hero Section with African Pattern */}
      <section className="relative bg-gradient-to-br from-teal-600 to-yellow-400 text-white py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="hero-pattern h-full"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Complete Your Donation</h1>
          <p className="text-lg text-white/90">You're making a difference in preserving African languages</p>
        </div>
      </section>

      {/* Confirmation Content */}
      <section className="py-12 bg-gray-50 relative">
        {/* African Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="hero-pattern h-full"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Donation Summary */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Donation Summary</h2>
                  
                  {/* Categories */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Supporting:</h3>
                    <div className="space-y-2">
                      {donationDetails.categories.map((category, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded">
                          <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                          <div>
                            <p className="font-medium">{category.name}</p>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Donation Amount:</span>
                      <span className="text-2xl font-bold text-teal-600">
                        ${donationDetails.amount}
                        {donationDetails.donationType === 'monthly' && <span className="text-sm"> /month</span>}
                      </span>
                    </div>
                    {donationDetails.isAnonymous && (
                      <p className="text-sm text-gray-600 mt-2">
                        <i className="fas fa-user-secret mr-1"></i> Anonymous donation
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                  
                  {/* Payment Method Tabs */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                        paymentMethod === 'card'
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fas fa-credit-card mr-2"></i>Credit/Debit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                        paymentMethod === 'paypal'
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fab fa-paypal mr-2"></i>PayPal
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Contact Information */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3">Card Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Card Number *</label>
                            <input
                              type="text"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Expiry Date *</label>
                              <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">CVV *</label>
                              <input
                                type="text"
                                name="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Billing Zip Code *</label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="mb-6 text-center py-8 bg-gray-50 rounded-lg">
                        <i className="fab fa-paypal text-5xl text-blue-600 mb-4"></i>
                        <p className="text-gray-700">You will be redirected to PayPal to complete your donation</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-yellow-400 text-gray-900 py-3 rounded-md font-bold text-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <span className="animate-spin rounded-full h-5 w-5 border-2 border-gray-900 border-t-transparent"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-lock"></i>
                          Complete Donation of ${donationDetails.amount}
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-600 mt-3 text-center">
                      <i className="fas fa-shield-alt text-green-600"></i> Your payment information is secure and encrypted
                    </p>
                  </form>
                </div>
              </div>

              {/* Right Column - Security & Trust */}
              <div className="lg:col-span-1 space-y-6">
                {/* Security Badge */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold mb-3">🔒 Secure Donation</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-0.5"></i>
                      256-bit SSL encryption
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-0.5"></i>
                      PCI-DSS compliant
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-green-500 mt-0.5"></i>
                      Your data is never shared
                    </li>
                  </ul>
                </div>

                {/* Tax Deductible */}
                <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
                  <h3 className="font-semibold mb-2">📋 Tax Deductible</h3>
                  <p className="text-sm text-gray-700">
                    iSPEAK is a registered 501(c)(3) nonprofit organization. 
                    Your donation is tax-deductible to the fullest extent allowed by law.
                  </p>
                  <p className="text-xs text-gray-600 mt-2">EIN: XX-XXXXXXX</p>
                </div>

                {/* Need Help? */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold mb-3">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Questions about your donation? We're here to help.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <i className="fas fa-phone text-teal-600 mr-2"></i>
                      +1 (478) 390-4040
                    </div>
                    <div>
                      <i className="fas fa-envelope text-teal-600 mr-2"></i>
                      donate@ispeaklanguage.org
                    </div>
                  </div>
                </div>

                {/* Cancel Link */}
                <div className="text-center">
                  <Link 
                    href="/donate"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    ← Return to donation options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}