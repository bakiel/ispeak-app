import AdminLayout from '@/components/admin/AdminLayout'
import BlogPostForm from '@/components/admin/BlogPostForm'
import { blogQueries, supabase, handleSupabaseError } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Edit Blog Post | iSPEAK Admin',
  description: 'Edit blog post for iSPEAK language learning platform'
}

async function getPost(id) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error: handleSupabaseError(error) }
  }
}

export default async function EditBlogPostPage({ params }) {
  const { id } = params

  // Fetch the post and categories
  const [postResult, categoriesResult] = await Promise.all([
    getPost(id),
    blogQueries.getCategories()
  ])

  if (postResult.error || !postResult.data) {
    notFound()
  }

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
            <h2 className="text-2xl font-bold text-gray-900">Edit Blog Post</h2>
            <p className="mt-1 text-sm text-gray-600">
              Update your blog post content and settings
            </p>
          </div>
        </div>

        {/* Form */}
        {categoriesResult.error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600">
              Error loading categories: {categoriesResult.error.error}
            </p>
          </div>
        ) : (
          <BlogPostForm 
            post={postResult.data} 
            categories={categoriesResult.data || []} 
          />
        )}
      </div>
    </AdminLayout>
  )
}