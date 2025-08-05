import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { storeQueries } from '@/lib/supabase'

export const metadata = {
  title: 'Collections Management | iSPEAK Admin',
  description: 'Manage product collections for iSPEAK store'
}

// Collection card component
function CollectionCard({ collection }) {
  const productCount = collection.products?.[0]?.count || 0

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
              <i className="fas fa-layer-group text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{collection.name}</h3>
              <p className="text-sm text-gray-500">{collection.slug}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/store/collections/${collection.id}/edit`}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-edit"></i>
            </Link>
            <button className="text-gray-400 hover:text-red-600">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {collection.description || 'No description provided'}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-box mr-2"></i>
            <span>{productCount} product{productCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/store/products?collection=${collection.id}`}
              className="text-primary hover:text-primary-dark text-sm"
            >
              View Products
            </Link>
            <Link
              href={`/shop/collections/${collection.slug}`}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              <i className="fas fa-external-link-alt"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Collection form modal component (simplified for demo)
function CreateCollectionModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Create New Collection</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter collection name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="collection-slug"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter collection description"
              />
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Create Collection
          </button>
        </div>
      </div>
    </div>
  )
}

// Collection stats component
function CollectionStats({ collections }) {
  const totalCollections = collections?.length || 0
  const totalProducts = collections?.reduce((sum, collection) => 
    sum + (collection.products?.[0]?.count || 0), 0) || 0
  const avgProductsPerCollection = totalCollections > 0 ? 
    Math.round(totalProducts / totalCollections) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary">
            <i className="fas fa-layer-group text-white text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Collections</p>
            <p className="text-2xl font-bold text-gray-900">{totalCollections}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-500">
            <i className="fas fa-box text-white text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-500">
            <i className="fas fa-chart-bar text-white text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Avg. Products</p>
            <p className="text-2xl font-bold text-gray-900">{avgProductsPerCollection}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function CollectionsPage() {
  // Fetch collections
  const { data: collections, error } = await storeQueries.getAllCollections()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
            <p className="mt-1 text-sm text-gray-600">
              Organize your products into collections for better navigation
            </p>
          </div>
          <Link
            href="/admin/store/collections/new"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors inline-flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            New Collection
          </Link>
        </div>

        {/* Collection Stats */}
        <CollectionStats collections={collections} />

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search collections..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Sort by</option>
              <option value="name">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="products-desc">Most Products</option>
              <option value="products-asc">Fewest Products</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Collections grid */}
        {error ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-red-600">
              <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
              <h3 className="text-lg font-medium mb-2">Error loading collections</h3>
              <p>{error.error}</p>
            </div>
          </div>
        ) : collections && collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-500">
              <i className="fas fa-layer-group text-4xl mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No collections found</h3>
              <p className="text-gray-500 mb-6">
                Collections help organize your products and make them easier for customers to find.
              </p>
              <Link
                href="/admin/store/collections/new"
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors inline-flex items-center"
              >
                <i className="fas fa-plus mr-2"></i>
                Create Your First Collection
              </Link>
            </div>
          </div>
        )}

        {/* Quick tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <i className="fas fa-lightbulb text-blue-500 text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Collection Tips</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Group related products together (e.g., "Educational Materials", "Toys & Games")</li>
                <li>• Use descriptive names that customers would search for</li>
                <li>• Keep collection names short and memorable</li>
                <li>• Add descriptions to help customers understand what's in each collection</li>
                <li>• Featured collections appear prominently on your store homepage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}