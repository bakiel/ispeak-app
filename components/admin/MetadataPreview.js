'use client'
import { useState } from 'react'

export default function MetadataPreview({ formData }) {
  const [activeTab, setActiveTab] = useState('google')
  
  const title = formData.meta_title || formData.title || 'Untitled Post'
  const description = formData.meta_description || formData.excerpt || 'No description provided'
  const image = formData.og_image || formData.featured_image || '/placeholder-image.jpg'
  const siteName = 'iSPEAK Language Learning'
  const url = `https://ispeaklanguages.com/blog/${formData.slug || 'preview'}`
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">SEO & Social Media Preview</h3>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 border-b">
        <button
          onClick={() => setActiveTab('google')}
          className={`px-4 py-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'google' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <i className="fab fa-google mr-2"></i>
          Google Search
        </button>
        <button
          onClick={() => setActiveTab('facebook')}
          className={`px-4 py-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'facebook' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <i className="fab fa-facebook mr-2"></i>
          Facebook
        </button>
        <button
          onClick={() => setActiveTab('twitter')}
          className={`px-4 py-2 pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'twitter' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <i className="fab fa-twitter mr-2"></i>
          Twitter/X
        </button>
      </div>
      
      {/* Preview Content */}
      <div className="mt-4">
        {activeTab === 'google' && (
          <div className="space-y-2">
            <div className="text-xs text-gray-600">{url}</div>
            <h4 className="text-xl text-blue-800 hover:underline cursor-pointer">
              {title.length > 60 ? title.substring(0, 57) + '...' : title}
            </h4>
            <p className="text-sm text-gray-600">
              {description.length > 160 ? description.substring(0, 157) + '...' : description}
            </p>
            {formData.meta_keywords && (
              <div className="text-xs text-gray-500 mt-2">
                <span className="font-medium">Keywords:</span> {formData.meta_keywords}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'facebook' && (
          <div className="border rounded-lg overflow-hidden">
            {image && (
              <div className="aspect-video bg-gray-100">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg'
                  }}
                />
              </div>
            )}
            <div className="p-3 bg-gray-50">
              <div className="text-xs text-gray-500 uppercase">{siteName}</div>
              <h4 className="text-base font-semibold mt-1">
                {(formData.og_title || title).length > 70 
                  ? (formData.og_title || title).substring(0, 67) + '...' 
                  : (formData.og_title || title)}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {(formData.og_description || description).length > 200 
                  ? (formData.og_description || description).substring(0, 197) + '...' 
                  : (formData.og_description || description)}
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'twitter' && (
          <div className="border rounded-lg overflow-hidden">
            {image && (
              <div className="aspect-video bg-gray-100">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg'
                  }}
                />
              </div>
            )}
            <div className="p-3">
              <h4 className="text-base font-semibold">
                {(formData.og_title || title).length > 70 
                  ? (formData.og_title || title).substring(0, 67) + '...' 
                  : (formData.og_title || title)}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {(formData.og_description || description).length > 125 
                  ? (formData.og_description || description).substring(0, 122) + '...' 
                  : (formData.og_description || description)}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                <i className="fas fa-link mr-1"></i>{siteName}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* SEO Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="text-sm font-medium text-blue-900 mb-2">
          <i className="fas fa-lightbulb mr-1"></i>
          SEO Tips
        </h5>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Keep titles under 60 characters for Google</li>
          <li>• Descriptions should be 150-160 characters</li>
          <li>• Include primary keywords naturally</li>
          <li>• Use unique meta descriptions for each page</li>
          <li>• Open Graph images should be 1200x630px</li>
        </ul>
      </div>
    </div>
  )
}