'use client'
import { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImageGenerator from './ImageGenerator'

export default function ImageUploadWithAI({ value, onChange, label, aspectRatio = "aspect-video" }) {
  const [activeTab, setActiveTab] = useState('upload')
  
  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 border-b">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'upload'
              ? 'text-teal-600 border-teal-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <i className="fas fa-upload mr-2"></i>
          Upload Image
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('generate')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'generate'
              ? 'text-teal-600 border-teal-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <i className="fas fa-magic mr-2"></i>
          Generate with AI
        </button>
      </div>
      
      {/* Current Image Preview */}
      {value && (
        <div className="mb-4">
          <div className={`${aspectRatio} rounded-lg overflow-hidden bg-gray-100 relative group`}>
            <img
              src={value}
              alt="Current image"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
      
      {/* Tab Content */}
      <div>
        {activeTab === 'upload' ? (
          <ImageUpload
            value={value}
            onChange={onChange}
            label={label}
            aspectRatio={aspectRatio}
          />
        ) : (
          <ImageGenerator
            onImageGenerated={onChange}
            defaultType="illustration"
          />
        )}
      </div>
    </div>
  )
}