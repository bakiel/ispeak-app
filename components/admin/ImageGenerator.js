'use client'
import { useState } from 'react'

export default function ImageGenerator({ onImageGenerated, defaultType = 'illustration' }) {
  const [prompt, setPrompt] = useState('')
  const [type, setType] = useState(defaultType)
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [error, setError] = useState(null)
  
  const imageTypes = [
    { value: 'illustration', label: 'Illustration', icon: 'fas fa-palette' },
    { value: 'avatar', label: 'Avatar', icon: 'fas fa-user-circle' },
    { value: 'banner', label: 'Banner', icon: 'fas fa-image' },
    { value: 'icon', label: 'Icon', icon: 'fas fa-shapes' },
    { value: 'cultural', label: 'Cultural Art', icon: 'fas fa-masks-theater' }
  ]
  
  const promptSuggestions = {
    illustration: [
      'Happy African children learning languages together',
      'Colorful classroom with Yoruba alphabet on walls',
      'Kids practicing Kiswahili greetings',
      'Teacher and students in traditional African attire'
    ],
    avatar: [
      'Friendly African language teacher smiling',
      'Young student with traditional hairstyle',
      'Elder storyteller with warm expression',
      'Professional educator in cultural dress'
    ],
    banner: [
      'African landscape with children playing and learning',
      'Vibrant classroom scene with language posters',
      'Cultural celebration with educational elements',
      'Modern African city with language school'
    ],
    icon: [
      'Speech bubble with African patterns',
      'Book with Adinkra symbols',
      'Globe highlighting Africa',
      'Traditional drum with ABC letters'
    ],
    cultural: [
      'Traditional African art with educational elements',
      'Kente patterns forming letters and words',
      'Ndebele geometric designs with numbers',
      'Ethiopian script in decorative style'
    ]
  }
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for the image')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }
      
      setGeneratedImage(data.imageUrl)
      
      if (onImageGenerated) {
        onImageGenerated(data.imageUrl)
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError(err.message || 'Failed to generate image')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion)
  }
  
  const handleUseImage = () => {
    if (generatedImage && onImageGenerated) {
      onImageGenerated(generatedImage)
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {imageTypes.map((imageType) => (
            <button
              key={imageType.value}
              type="button"
              onClick={() => setType(imageType.value)}
              className={`p-3 rounded-lg border-2 transition-all ${
                type === imageType.value
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <i className={`${imageType.icon} text-lg mb-1`}></i>
              <div className="text-xs">{imageType.label}</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Prompt Input */}
      <div>
        <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Describe the image you want
        </label>
        <textarea
          id="image-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="E.g., Happy African children in a colorful classroom learning Yoruba..."
        />
      </div>
      
      {/* Suggestions */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Suggestions for {type}:</p>
        <div className="flex flex-wrap gap-2">
          {promptSuggestions[type].map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Generating...
            </>
          ) : (
            <>
              <i className="fas fa-magic mr-2"></i>
              Generate Image
            </>
          )}
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </p>
        </div>
      )}
      
      {/* Generated Image Preview */}
      {generatedImage && (
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={generatedImage}
              alt="Generated image"
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              <i className="fas fa-check-circle text-green-500 mr-1"></i>
              Image generated successfully
            </p>
            
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => setGeneratedImage(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Generate New
              </button>
              <button
                type="button"
                onClick={handleUseImage}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              >
                Use This Image
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Info Box */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          <i className="fas fa-info-circle mr-1"></i>
          AI Image Generation Tips
        </h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Be specific about cultural elements and clothing</li>
          <li>• Mention age groups (e.g., "young children", "teenagers")</li>
          <li>• Include educational context (classroom, books, learning)</li>
          <li>• Specify colors and mood (bright, cheerful, warm)</li>
          <li>• Add language-specific elements when relevant</li>
        </ul>
      </div>
    </div>
  )
}