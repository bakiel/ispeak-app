'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'

export default function DonationsAdminPage() {
  const [donations, setDonations] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    end: new Date().toISOString().split('T')[0] // Today
  })

  useEffect(() => {
    fetchDonations()
    fetchStats()
  }, [filter, dateRange])

  const fetchDonations = async () => {
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.append('status', filter)
      if (dateRange.start) params.append('startDate', dateRange.start)
      if (dateRange.end) params.append('endDate', dateRange.end)
      
      const response = await fetch(`/api/donations?${params}`)
      const data = await response.json()
      setDonations(data || [])
    } catch (error) {
      console.error('Error fetching donations:', error)
      setDonations([])
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/donations?type=stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleStatusUpdate = async (donationId, newStatus) => {
    try {
      const response = await fetch(`/api/donations/${donationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        fetchDonations()
        fetchStats()
      }
    } catch (error) {
      console.error('Error updating donation status:', error)
    }
  }

  const handleDelete = async (donationId) => {
    if (!confirm('Are you sure you want to delete this donation record?')) return
    
    try {
      const response = await fetch(`/api/donations/${donationId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchDonations()
        fetchStats()
      }
    } catch (error) {
      console.error('Error deleting donation:', error)
    }
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Confirmation', 'Donor', 'Email', 'Amount', 'Type', 'Status', 'Categories']
    const rows = donations.map(d => [
      new Date(d.created_at).toLocaleDateString(),
      d.confirmation_number,
      `${d.donor_first_name || ''} ${d.donor_last_name || ''}`.trim() || 'Anonymous',
      d.donor_email,
      `$${d.amount}`,
      d.donation_type,
      d.payment_status,
      d.category_allocations?.map(c => c.category_id).join(', ') || ''
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `donations_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Donation Management</h1>
          <p className="text-gray-600">Manage and track all donations</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Raised</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${stats.summary?.totalRaised?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="text-green-600 text-3xl">
                  <i className="fas fa-dollar-sign"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Donors</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.summary?.totalDonors || 0}
                  </p>
                </div>
                <div className="text-blue-600 text-3xl">
                  <i className="fas fa-users"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Goal Progress</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.summary?.percentageComplete?.toFixed(1) || 0}%
                  </p>
                </div>
                <div className="text-purple-600 text-3xl">
                  <i className="fas fa-chart-line"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.categories?.filter(c => c.is_active).length || 0}
                  </p>
                </div>
                <div className="text-orange-600 text-3xl">
                  <i className="fas fa-flag"></i>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Progress */}
        {stats?.categories && (
          <div className="bg-white rounded-lg shadow mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">Category Progress</h2>
            <div className="space-y-4">
              {stats.categories.map(category => {
                const percentage = category.goal_amount > 0 
                  ? (category.current_amount / category.goal_amount) * 100 
                  : 0
                
                return (
                  <div key={category.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-semibold">{category.name}</span>
                        <span className="ml-2 text-sm text-gray-600">
                          ({category.donor_count || 0} donors)
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">${category.current_amount || 0}</span>
                        <span className="text-gray-600"> / ${category.goal_amount || 0}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-teal-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status Filter</label>
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Donations</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-download mr-2"></i>Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date/Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confirmation #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categories
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </td>
                  </tr>
                ) : donations.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No donations found
                    </td>
                  </tr>
                ) : (
                  donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(donation.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-gray-900">
                          {donation.confirmation_number}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {donation.is_anonymous ? (
                              <span className="italic">Anonymous</span>
                            ) : (
                              `${donation.donor_first_name || ''} ${donation.donor_last_name || ''}`.trim() || 'N/A'
                            )}
                          </p>
                          <p className="text-sm text-gray-500">{donation.donor_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-green-600">
                          ${donation.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          donation.donation_type === 'monthly' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {donation.donation_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {donation.category_allocations?.map((alloc, idx) => (
                            <span key={idx} className="inline-block bg-gray-100 rounded px-2 py-1 text-xs mr-1 mb-1">
                              {alloc.category_id}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={donation.payment_status}
                          onChange={(e) => handleStatusUpdate(donation.id, e.target.value)}
                          className={`text-sm rounded px-2 py-1 font-semibold ${
                            donation.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                            donation.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            donation.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(donation.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        {stats?.recentDonations && stats.recentDonations.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Completed Donations</h2>
            <div className="space-y-3">
              {stats.recentDonations.slice(0, 5).map((donation, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-heart text-green-600"></i>
                    </div>
                    <div>
                      <p className="font-medium">
                        {donation.is_anonymous ? 'Anonymous' : 
                          `${donation.donor_first_name || ''} ${donation.donor_last_name || ''}`.trim() || donation.donor_email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${donation.amount}</p>
                    <p className="text-xs text-gray-600">{donation.donation_type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}