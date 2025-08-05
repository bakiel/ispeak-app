'use client'

import { useState } from 'react'

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description')
  
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'shipping', label: 'Shipping' }
  ]

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-accent text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl">
        {activeTab === 'description' && (
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.long_description || product.description}
            </p>
            
            {product.details && product.details.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'details' && (
          <div>
            {product.specifications ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-2">
                    <dt className="font-medium text-gray-900">{key}</dt>
                    <dd className="text-gray-700 mt-1">{value}</dd>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available.</p>
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Shipping Information</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Free standard shipping on orders over $50</li>
                <li>• Standard shipping (5-7 business days): $4.99</li>
                <li>• Express shipping (2-3 business days): $9.99</li>
                <li>• International shipping available</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Return Policy</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 30-day return window</li>
                <li>• Items must be in original condition</li>
                <li>• Free returns for defective items</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}