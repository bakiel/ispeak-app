'use client'

import { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.srv1145603.hstgr.cloud'

export default function ParentBilling() {
  const [billing, setBilling] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchBilling()
  }, [])

  const fetchBilling = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`${API_BASE}/api/portal/parent/billing`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setBilling(data)
      }
    } catch (err) {
      console.error('Error:', err)
      // Set demo data
      setBilling({
        currentPlan: {
          name: 'Family Plan',
          price: 99,
          lessonsPerMonth: 20,
          lessonsUsed: 14
        },
        balance: 0,
        nextBillingDate: '2024-12-15',
        paymentMethod: {
          type: 'card',
          last4: '4242',
          brand: 'Visa'
        },
        invoices: [
          { id: 1, date: '2024-11-15', amount: 99, status: 'paid' },
          { id: 2, date: '2024-10-15', amount: 99, status: 'paid' },
          { id: 3, date: '2024-09-15', amount: 99, status: 'paid' }
        ],
        lessonCredits: 6
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <PortalLayout portalType="parent">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout portalType="parent">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription and payment methods</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b">
          {[
            { key: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
            { key: 'invoices', label: 'Invoices', icon: 'fa-file-invoice' },
            { key: 'payment', label: 'Payment Method', icon: 'fa-credit-card' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className={`fas ${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Current Plan</h3>
                <h2 className="text-2xl font-bold text-gray-800">{billing?.currentPlan?.name}</h2>
                <p className="text-gray-600 mt-1">
                  ${billing?.currentPlan?.price}/month
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50">
                  Change Plan
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  Cancel
                </button>
              </div>
            </div>

            <hr className="my-6" />

            {/* Lesson Usage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Lessons Used This Month</span>
                <span className="font-semibold text-gray-800">
                  {billing?.currentPlan?.lessonsUsed} / {billing?.currentPlan?.lessonsPerMonth}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 rounded-full h-3"
                  style={{
                    width: `${(billing?.currentPlan?.lessonsUsed / billing?.currentPlan?.lessonsPerMonth) * 100}%`
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {billing?.currentPlan?.lessonsPerMonth - billing?.currentPlan?.lessonsUsed} lessons remaining
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fas fa-coins text-green-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{billing?.lessonCredits || 0}</p>
                  <p className="text-sm text-gray-500">Lesson Credits</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-calendar text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">
                    {billing?.nextBillingDate
                      ? new Date(billing.nextBillingDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">Next Billing Date</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <i className="fas fa-wallet text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">${billing?.balance || 0}</p>
                  <p className="text-sm text-gray-500">Account Balance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buy More Credits */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Need More Lessons?</h3>
            <p className="opacity-90 mb-4">Purchase additional lesson credits at any time</p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Buy Lesson Credits
            </button>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Invoice History</h3>
          </div>
          <div className="divide-y">
            {billing?.invoices?.map((invoice) => (
              <div key={invoice.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <i className="fas fa-file-invoice text-gray-600"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Invoice #{invoice.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-gray-800">${invoice.amount}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </span>
                  <button className="text-purple-600 hover:text-purple-800">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Method Tab */}
      {activeTab === 'payment' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Current Payment Method</h3>
            {billing?.paymentMethod ? (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-blue-600 flex items-center justify-center">
                    <i className="fab fa-cc-visa text-white text-2xl"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {billing.paymentMethod.brand} ending in {billing.paymentMethod.last4}
                    </p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-800">
                  <i className="fas fa-edit mr-1"></i> Edit
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No payment method on file</p>
            )}

            <button className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-600 transition">
              <i className="fas fa-plus mr-2"></i> Add New Payment Method
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Billing Address</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">123 Main Street</p>
              <p className="text-gray-700">New York, NY 10001</p>
              <p className="text-gray-700">United States</p>
            </div>
            <button className="mt-4 text-purple-600 hover:text-purple-800">
              <i className="fas fa-edit mr-1"></i> Edit Address
            </button>
          </div>
        </div>
      )}
    </PortalLayout>
  )
}
