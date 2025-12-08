'use client'

import { useState, useEffect } from 'react'
import { blogAPI, adminAPI } from '@/lib/api-client'
import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import { useRouter, useParams } from 'next/navigation'

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category_id: '',
    author_name: '',
    author_bio: '',
    is_published: false,
    meta_title: '',
    meta_description: ''
  })

  useEffect(() => {
    if (postId) {
      fetchData()
    }
  }, [postId])

  const fetchData = async () => {
    setLoading(true)

    // Fetch post and categories in parallel
    const [postResult, categoriesResult] = await Promise.all([
      adminAPI.getPost(postId),
      blogAPI.getCategories()
    ])

    if (postResult.data) {
      const post = postResult.data
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        featured_image: post.featured_image || '',
        category_id: post.category_id || '',
        author_name: post.author_name || '',
        author_bio: post.author_bio || '',
        is_published: post.is_published || false,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || ''
      })
    }

    if (categoriesResult.data) {
      const catList = categoriesResult.data.categories || categoriesResult.data || []
      setCategories(catList)
    }

    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    const updateData = {
      ...formData,
      updated_at: new Date().toISOString()
    }

    // If publishing for the first time, set published_at
    if (formData.is_published && !formData.published_at) {
      updateData.published_at = new Date().toISOString()
    }

    const { error } = await adminAPI.updatePost(postId, updateData)

    if (error) {
      alert('Error updating post: ' + (error.message || 'Unknown error'))
      setSaving(false)
    } else {
      alert('Post updated successfully!')
      router.push('/admin/blog')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ModernNavigation />
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernNavigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="mt-2 text-gray-600">Update your blog post content and settings</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Post Content</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="url-friendly-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    rows="3"
                    placeholder="Brief description of the post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                    rows="20"
                    placeholder="Write your blog post content here (HTML supported)..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supports HTML formatting
                  </p>
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">SEO Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    rows="2"
                    placeholder="SEO description"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Publish Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image
                  </label>
                  <input
                    type="text"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({...formData, featured_image: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Image URL"
                  />
                  {formData.featured_image && (
                    <img
                      src={formData.featured_image}
                      alt="Preview"
                      className="mt-2 w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                    className="h-4 w-4 text-purple-600 rounded mr-2"
                  />
                  <span>Published</span>
                </label>
              </div>
            </div>

            {/* Author */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Author Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author Bio
                  </label>
                  <textarea
                    value={formData.author_bio}
                    onChange={(e) => setFormData({...formData, author_bio: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    rows="3"
                    placeholder="Brief author biography"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/admin/blog')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
