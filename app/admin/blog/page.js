import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { blogQueries } from '@/lib/supabase'

export const metadata = {
  title: 'Blog Management | iSPEAK Admin',
  description: 'Manage blog posts for iSPEAK language learning platform'
}

// Blog post row component
function BlogPostRow({ post }) {
  const statusColor = post.is_published 
    ? 'bg-green-100 text-green-800' 
    : 'bg-yellow-100 text-yellow-800'

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img 
            className="h-10 w-10 rounded object-cover"
            src={post.featured_image || '/images/blog-placeholder.jpg'}
            alt={post.title}
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{post.title}</div>
            <div className="text-sm text-gray-500">{post.slug}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{post.author_name || 'iSPEAK Team'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          post.category ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {post.category?.name || 'Uncategorized'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
          {post.is_published ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(post.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3">
          <Link href={`/admin/blog/${post.id}/edit`} className="text-teal-600 hover:text-teal-900">
            <i className="fas fa-edit"></i> Edit
          </Link>
          <Link href={`/blog/${post.slug}`} className="text-gray-600 hover:text-gray-900">
            <i className="fas fa-external-link-alt"></i> View
          </Link>
        </div>
      </td>
    </tr>
  )
}

export default async function AdminBlogPage() {
  // Fetch blog posts
  const { data: posts, error } = await blogQueries.getAllPosts()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your blog content and publications
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors inline-flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            New Post
          </Link>
        </div>

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">All Categories</option>
              <option value="cultural-insights">Cultural Insights</option>
              <option value="language-learning">Language Learning</option>
              <option value="success-stories">Success Stories</option>
            </select>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Blog posts table */}
        <div className="bg-white shadow rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {error ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-red-600">
                    Error loading posts: {error.error}
                  </td>
                </tr>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => <BlogPostRow key={post.id} post={post} />)
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No blog posts found. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}