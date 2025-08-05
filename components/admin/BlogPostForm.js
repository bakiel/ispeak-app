'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from './RichTextEditor'
import MetadataPreview from './MetadataPreview'
import ImageUploadWithAI from './ImageUploadWithAI'
import Image from 'next/image'

export default function BlogPostForm({ post = null, categories = [] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Form data
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    featured_image: post?.featured_image || '',
    category_id: post?.category_id || '',
    author_name: post?.author_name || 'iSPEAK Team',
    author_bio: post?.author_bio || '',
    is_published: post?.is_published || false,
    
    // SEO fields
    meta_title: post?.meta_title || '',
    meta_description: post?.meta_description || '',
    meta_keywords: post?.meta_keywords || '',
    og_title: post?.og_title || '',
    og_description: post?.og_description || '',
    og_image: post?.og_image || '',
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Auto-generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setFormData(prev => ({ ...prev, slug }))
  }

  // Handle content change from rich text editor
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }))
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.slug) newErrors.slug = 'Slug is required'
    if (!formData.excerpt) newErrors.excerpt = 'Excerpt is required'
    if (!formData.content) newErrors.content = 'Content is required'
    if (!formData.category_id) newErrors.category_id = 'Category is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const method = post ? 'PUT' : 'POST'
      const url = post ? `/api/blog/${post.id}` : '/api/blog'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to save blog post')
      }
      
      router.push('/admin/blog')
      router.refresh()
    } catch (error) {
      console.error('Error saving blog post:', error)
      alert('Failed to save blog post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Main content section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter blog post title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2 border rounded-md ${
                      errors.slug ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="url-friendly-slug"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Generate
                  </button>
                </div>
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.excerpt ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Brief description of the blog post"
                />
                {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Content <span className="text-red-500">*</span>
            </h3>
            <RichTextEditor
              value={formData.content}
              onChange={handleContentChange}
              placeholder="Write your blog post content here..."
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="SEO title (defaults to post title)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.meta_title.length}/60 characters
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="SEO description (defaults to excerpt)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.meta_description.length}/160 characters
                </p>
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              {/* Open Graph Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Open Graph Title
                </label>
                <input
                  type="text"
                  name="og_title"
                  value={formData.og_title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Social media title"
                />
              </div>

              {/* Open Graph Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Open Graph Description
                </label>
                <textarea
                  name="og_description"
                  value={formData.og_description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Social media description"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Publish Settings</h3>
            
            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">
                    Publish this post
                  </span>
                </label>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.category_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author Bio
                </label>
                <textarea
                  name="author_bio"
                  value={formData.author_bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Brief author bio"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Featured Image</h3>
            
            <ImageUploadWithAI
              value={formData.featured_image}
              onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
              label="Blog post featured image"
              aspectRatio="aspect-video"
            />
          </div>

          {/* Social Media Image */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Social Media Image</h3>
            
            <ImageUploadWithAI
              value={formData.og_image}
              onChange={(url) => setFormData(prev => ({ ...prev, og_image: url }))}
              label="Social media preview image (Recommended: 1200x630px)"
              aspectRatio="aspect-video"
            />
          </div>

          {/* SEO Preview */}
          <MetadataPreview formData={formData} />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between items-center bg-white rounded-lg shadow p-6">
        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        
        <div className="space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </div>
    </form>
  )
}