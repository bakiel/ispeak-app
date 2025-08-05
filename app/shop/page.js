import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductCard from '@/components/shop/ProductCard'
import ShopFilters from '@/components/shop/ShopFilters'
import { products, collections, getProductsByCollection, getFeaturedProducts, searchProducts } from '@/lib/productData'

export const metadata = {
  title: 'Shop | iSPEAK Language Learning',
  description: 'Shop official iSPEAK merchandise including apparel, school supplies, and accessories featuring Paji mascot. Support African language education with every purchase.',
}

// Force dynamic rendering to avoid stale data
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getProducts(filters = {}) {
  // Simulate API delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const { collection, search, featured, sale, newArrivals } = filters
  
  try {
    // First try to get from Supabase if available
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('project_name', 'ispeak')
      .eq('status', 'active')
      .limit(100) // Explicitly request up to 100 products

    console.log('Supabase query result:', { data, error })

    if (data && !error) {
      // Filter Supabase data based on parameters
      let filteredData = data
      
      if (collection) {
        filteredData = filteredData.filter(product => product.collection?.slug === collection)
      }
      
      if (search) {
        const searchTerm = search.toLowerCase()
        filteredData = filteredData.filter(product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        )
      }
      
      if (featured) {
        filteredData = filteredData.filter(product => product.featured)
      }
      
      if (sale) {
        filteredData = filteredData.filter(product => product.sale_price && product.sale_price < product.price)
      }
      
      if (newArrivals) {
        // Filter products created in the last 30 days
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        filteredData = filteredData.filter(product => new Date(product.createdAt) > thirtyDaysAgo)
      }
      
      console.log('Returning Supabase data:', filteredData.length, 'products')
      return filteredData
    }
    console.log('Supabase data empty or error, falling back to mock data')
  } catch (error) {
    console.log('Supabase error, using mock data:', error.message)
  }

  // Fallback to comprehensive mock data with advanced filtering
  console.log('Using mock data fallback')
  let filteredProducts = products.filter(product => product.isActive)
  
  if (collection) {
    filteredProducts = filteredProducts.filter(product => product.collection.slug === collection)
  }
  
  if (search) {
    const searchTerm = search.toLowerCase()
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.collection.name.toLowerCase().includes(searchTerm)
    )
  }
  
  if (featured) {
    filteredProducts = filteredProducts.filter(product => product.featured)
  }
  
  if (sale) {
    filteredProducts = filteredProducts.filter(product => product.sale_price && product.sale_price < product.price)
  }
  
  if (newArrivals) {
    // Filter products created in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    filteredProducts = filteredProducts.filter(product => new Date(product.createdAt) > thirtyDaysAgo)
  }
  
  return filteredProducts
}

async function getCollections() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50))
  
  try {
    // First try to get from Supabase
    const { data, error } = await supabase
      .from('product_collections')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && !error) {
      return data
    }
  } catch (error) {
    console.log('Supabase error, using mock collections:', error.message)
  }

  // Fallback to mock data
  return collections
}

export default async function ShopPage({ searchParams }) {
  const filters = {
    collection: searchParams?.collection || null,
    search: searchParams?.search || null,
    featured: searchParams?.featured === 'true' || null,
    sale: searchParams?.sale === 'true' || null,
    newArrivals: searchParams?.new === 'true' || null
  }
  
  // Pagination
  const page = parseInt(searchParams?.page) || 1
  const itemsPerPage = 9
  
  const allProducts = await getProducts(filters)
  const collectionsList = await getCollections()
  
  // Calculate pagination
  const totalProducts = allProducts.length
  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const productList = allProducts.slice(startIndex, endIndex)

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">iSPEAK Shop</h1>
            <p className="text-xl mb-6">Support African language education with official iSPEAK merchandise</p>
            <div className="flex items-center space-x-4">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                ✨ New Arrivals
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                🚚 Free Shipping on Orders $50+
              </span>
            </div>
          </div>
        </section>

        {/* Shop Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:w-64">
                <ShopFilters 
                  collections={collectionsList} 
                  currentCollection={filters.collection}
                />
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {(() => {
                      if (filters.collection) {
                        return collectionsList.find(c => c.slug === filters.collection)?.name || 'All Products'
                      }
                      if (filters.search) {
                        return `Search Results for "${filters.search}"`
                      }
                      if (filters.featured) {
                        return 'Featured Products'
                      }
                      if (filters.sale) {
                        return 'On Sale'
                      }
                      if (filters.newArrivals) {
                        return 'New Arrivals'
                      }
                      return 'All Products'
                    })()}
                  </h2>
                  <p className="text-gray-600">
                    {totalProducts > itemsPerPage 
                      ? `Showing ${startIndex + 1}-${Math.min(endIndex, totalProducts)} of ${totalProducts} products`
                      : `${totalProducts} products`
                    }
                  </p>
                </div>

                {productList.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {productList.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-12 flex justify-center">
                        <nav className="flex items-center space-x-2">
                          {/* Previous button */}
                          <a
                            href={page > 1 ? `?page=${page - 1}${filters.collection ? `&collection=${filters.collection}` : ''}${filters.search ? `&search=${filters.search}` : ''}` : '#'}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${
                              page > 1 
                                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' 
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            aria-disabled={page <= 1}
                          >
                            Previous
                          </a>
                          
                          {/* Page numbers */}
                          <div className="flex items-center space-x-1">
                            {[...Array(totalPages)].map((_, i) => {
                              const pageNum = i + 1
                              const isCurrentPage = pageNum === page
                              
                              // Show first page, last page, current page, and pages around current
                              if (
                                pageNum === 1 || 
                                pageNum === totalPages || 
                                (pageNum >= page - 1 && pageNum <= page + 1)
                              ) {
                                return (
                                  <a
                                    key={pageNum}
                                    href={`?page=${pageNum}${filters.collection ? `&collection=${filters.collection}` : ''}${filters.search ? `&search=${filters.search}` : ''}`}
                                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                      isCurrentPage
                                        ? 'bg-accent text-primary'
                                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                  >
                                    {pageNum}
                                  </a>
                                )
                              } else if (
                                pageNum === page - 2 || 
                                pageNum === page + 2
                              ) {
                                return <span key={pageNum} className="px-2">...</span>
                              }
                              return null
                            })}
                          </div>
                          
                          {/* Next button */}
                          <a
                            href={page < totalPages ? `?page=${page + 1}${filters.collection ? `&collection=${filters.collection}` : ''}${filters.search ? `&search=${filters.search}` : ''}` : '#'}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${
                              page < totalPages 
                                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' 
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            aria-disabled={page >= totalPages}
                          >
                            Next
                          </a>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {filters.search ? `No products found for "${filters.search}".` : 'No products found in this category.'}
                    </p>
                    {filters.search && (
                      <p className="text-gray-400 mt-2">Try adjusting your search terms or browse our collections.</p>
                    )}
                    {(filters.featured || filters.sale || filters.newArrivals) && (
                      <p className="text-gray-400 mt-2">Try removing some filters to see more products.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-white py-12 border-t">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl mb-2">🌍</div>
                <h3 className="font-semibold mb-1">Ethically Made</h3>
                <p className="text-sm text-gray-600">Supporting fair trade practices</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold mb-1">Educational Impact</h3>
                <p className="text-sm text-gray-600">Proceeds support language programs</p>
              </div>
              <div>
                <div className="text-3xl mb-2">✨</div>
                <h3 className="font-semibold mb-1">Premium Quality</h3>
                <p className="text-sm text-gray-600">Durable materials built to last</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold mb-1">Fast Shipping</h3>
                <p className="text-sm text-gray-600">Free shipping on orders $50+</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}