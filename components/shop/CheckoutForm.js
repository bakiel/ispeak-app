'use client'

import { useState } from 'react'

export default function CheckoutForm({
  customerInfo,
  setCustomerInfo,
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress,
  billingMatchesShipping,
  setBillingMatchesShipping,
  guestCheckout,
  setGuestCheckout
}) {
  const [errors, setErrors] = useState({})

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleShippingChange = (field, value) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
    if (errors[`shipping_${field}`]) {
      setErrors(prev => ({ ...prev, [`shipping_${field}`]: '' }))
    }
  }

  const handleBillingChange = (field, value) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }))
    if (errors[`billing_${field}`]) {
      setErrors(prev => ({ ...prev, [`billing_${field}`]: '' }))
    }
  }

  const states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' }
  ]

  return (
    <div className="space-y-8">
      {/* Account Options */}
      <div>
        <h2 className="text-xl font-bold mb-4">Account</h2>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="checkout-type"
              checked={guestCheckout}
              onChange={() => setGuestCheckout(true)}
              className="mr-3 text-yellow-400 focus:ring-yellow-400"
            />
            <span>Guest checkout</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="checkout-type"
              checked={!guestCheckout}
              onChange={() => setGuestCheckout(false)}
              className="mr-3 text-yellow-400 focus:ring-yellow-400"
            />
            <span>Create account for faster checkout</span>
          </label>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={customerInfo.email}
              onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={customerInfo.phone}
              onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={customerInfo.firstName}
              onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={customerInfo.lastName}
              onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="shipping-address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              id="shipping-address"
              value={shippingAddress.address}
              onChange={(e) => handleShippingChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="123 Main Street"
              required
            />
            {errors.shipping_address && <p className="text-red-500 text-xs mt-1">{errors.shipping_address}</p>}
          </div>

          <div>
            <label htmlFor="shipping-address2" className="block text-sm font-medium text-gray-700 mb-1">
              Apartment, suite, etc. (optional)
            </label>
            <input
              type="text"
              id="shipping-address2"
              value={shippingAddress.address2}
              onChange={(e) => handleShippingChange('address2', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Apt 4B"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="shipping-city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="shipping-city"
                value={shippingAddress.city}
                onChange={(e) => handleShippingChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="New York"
                required
              />
              {errors.shipping_city && <p className="text-red-500 text-xs mt-1">{errors.shipping_city}</p>}
            </div>

            <div>
              <label htmlFor="shipping-state" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <select
                id="shipping-state"
                value={shippingAddress.state}
                onChange={(e) => handleShippingChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.shipping_state && <p className="text-red-500 text-xs mt-1">{errors.shipping_state}</p>}
            </div>

            <div>
              <label htmlFor="shipping-zip" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                id="shipping-zip"
                value={shippingAddress.zipCode}
                onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="10001"
                required
              />
              {errors.shipping_zipCode && <p className="text-red-500 text-xs mt-1">{errors.shipping_zipCode}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="shipping-country" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              id="shipping-country"
              value={shippingAddress.country}
              onChange={(e) => handleShippingChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Billing Address</h2>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={billingMatchesShipping}
              onChange={(e) => setBillingMatchesShipping(e.target.checked)}
              className="mr-2 text-yellow-400 focus:ring-yellow-400"
            />
            <span className="text-sm">Same as shipping address</span>
          </label>
        </div>

        {!billingMatchesShipping && (
          <div className="space-y-4">
            <div>
              <label htmlFor="billing-address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                id="billing-address"
                value={billingAddress.address}
                onChange={(e) => handleBillingChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="123 Main Street"
                required
              />
            </div>

            <div>
              <label htmlFor="billing-address2" className="block text-sm font-medium text-gray-700 mb-1">
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                id="billing-address2"
                value={billingAddress.address2}
                onChange={(e) => handleBillingChange('address2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Apt 4B"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="billing-city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="billing-city"
                  value={billingAddress.city}
                  onChange={(e) => handleBillingChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="New York"
                  required
                />
              </div>

              <div>
                <label htmlFor="billing-state" className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  id="billing-state"
                  value={billingAddress.state}
                  onChange={(e) => handleBillingChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="billing-zip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="billing-zip"
                  value={billingAddress.zipCode}
                  onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="10001"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="billing-country" className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                id="billing-country"
                value={billingAddress.country}
                onChange={(e) => handleBillingChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="border-t pt-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            className="mr-3 mt-1 text-yellow-400 focus:ring-yellow-400"
            defaultChecked
          />
          <div>
            <span className="text-sm font-medium">Keep me updated on language learning resources</span>
            <p className="text-xs text-gray-600 mt-1">
              Get exclusive content, learning tips, and special offers for African language education
            </p>
          </div>
        </label>
      </div>
    </div>
  )
}