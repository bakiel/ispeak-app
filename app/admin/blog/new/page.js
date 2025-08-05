import AdminLayout from '@/components/admin/AdminLayout'
import BlogPostForm from '@/components/admin/BlogPostForm'
import { blogQueries } from '@/lib/supabase'
import Link from 'next/link'

export const metadata = {
  title: 'Create New Blog Post | iSPEAK Admin',
  description: 'Create a new blog post for iSPEAK language learning platform'
}

export default async function NewBlogPostPage() {
  // Fetch categories for the form
  const { data: categories, error } = await blogQueries.getCategories()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/blog"
            className="text-gray-600 hover:text-gray-900"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Blog Post</h2>
            <p className="mt-1 text-sm text-gray-600">
              Add a new article to your blog
            </p>
          </div>
        </div>

        {/* Form */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600">
              Error loading categories: {error.error}
            </p>
          </div>
        ) : (
          <BlogPostForm categories={categories || []} />
        )}
      </div>
    </AdminLayout>
  )
}