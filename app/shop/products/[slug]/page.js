import { supabase } from '@/lib/supabase'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductDetailClient from '@/components/shop/ProductDetailClient'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, getProductReviews } from '@/lib/productData'

// Get product by slug with enhanced data integration
async function getProduct(slug) {
  // First try to get from Supabase
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (data && !error) {
      return data
    }
  } catch (error) {
    console.log('Supabase error, using mock data:', error.message)
  }

  // Fallback to comprehensive mock data
  return getProductBySlug(slug)
}

// Get related products with enhanced filtering
async function getProductRelated(productId, collectionSlug, limit = 4) {
  try {
    // Filter to only show iSPEAK educational products
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .neq('id', productId)
      .or('slug.like.ispeak-%,slug.like.paji-%,slug.like.african-%,slug.like.teacher-%,slug.like.amharic-%,slug.like.yoruba-%,slug.like.kiswahili-%,slug.like.twi-%')
      .limit(limit)

    if (data && !error && data.length > 0) {
      return data
    }
  } catch (error) {
    console.log('Supabase error, using mock data for related products:', error.message)
  }

  // Fallback to comprehensive mock data
  return getRelatedProducts(productId, collectionSlug, limit)
}

// Generate static params for all products
export async function generateStaticParams() {
  try {
    // Import products here to avoid build-time issues
    const { products } = await import('@/lib/productData')
    
    // Return all active product slugs
    return products
      .filter(product => product.isActive)
      .map((product) => ({
        slug: product.slug
      }))
  } catch (error) {
    console.error('Error generating static params for products:', error)
    // Return empty array if there's an error
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found | iSPEAK Shop',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: `${product.name} | iSPEAK Shop`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.map(img => ({ url: img })) || []
    }
  }
}

// Main ProductDetailPage component (Server Component)
export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getProductRelated(product.id, product.collection?.slug)

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Enhanced Breadcrumb with African pattern */}
        <section className="bg-white border-b relative overflow-hidden">
          {/* African pattern background */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" className="w-full h-full">
              <defs>
                <pattern id="breadcrumb-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="2" fill="#FFD93D" />
                  <path d="M12.5 12.5 L37.5 37.5 M37.5 12.5 L12.5 37.5" stroke="#FFD93D" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#breadcrumb-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 py-6 relative z-10">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-secondary transition-colors flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/shop" className="text-gray-500 hover:text-secondary transition-colors">Shop</Link>
              <span className="text-gray-400">/</span>
              {product.collection ? (
                <Link href={`/shop?collection=${product.collection.slug}`} className="text-gray-500 hover:text-secondary transition-colors">
                  {product.collection.name}
                </Link>
              ) : (
                <span className="text-gray-500">Products</span>
              )}
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Detail Client Component */}
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />

        {/* Enhanced Trust Badges */}
        <section className="bg-gradient-to-br from-light-blue via-cream to-light-blue py-20 border-t relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-8">
            <svg width="100%" height="100%" className="w-full h-full">
              <defs>
                <pattern id="trust-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="3" fill="#FFD93D" />
                  <circle cx="20" cy="20" r="2" fill="#FF8C61" />
                  <circle cx="60" cy="60" r="2" fill="#FF8C61" />
                  <circle cx="60" cy="20" r="1.5" fill="#FFD93D" />
                  <circle cx="20" cy="60" r="1.5" fill="#FFD93D" />
                  <path d="M15 15 L25 25 M55 55 L65 65 M65 15 L55 25 M25 55 L15 65" stroke="#FFD93D" strokeWidth="0.5" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#trust-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-coral rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Why Choose iSPEAK?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                We're committed to quality products, exceptional service, and supporting African language education worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-3xl p-8 text-center group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-secondary/20">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">Quality Guaranteed</h3>
                <p className="text-gray-600 leading-relaxed">Premium materials and craftsmanship in every product we create</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 text-center group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-primary/20">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">Secure & Safe</h3>
                <p className="text-gray-600 leading-relaxed">SSL encrypted checkout with secure payment processing</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 text-center group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-coral/20">
                <div className="w-20 h-20 bg-gradient-to-br from-coral to-coral/80 rounded-full flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">Easy Returns</h3>
                <p className="text-gray-600 leading-relaxed">30-day hassle-free return policy with free return shipping</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 text-center group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-accent/20">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-coral rounded-full flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">Educational Impact</h3>
                <p className="text-gray-600 leading-relaxed">15% of proceeds support African language education programs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Educational Impact Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary text-white py-24 relative overflow-hidden">
          {/* African-inspired background pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="w-full h-full">
              <defs>
                <pattern id="impact-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="3" fill="#FFD93D" />
                  <circle cx="25" cy="25" r="2" fill="#FF8C61" />
                  <circle cx="75" cy="75" r="2" fill="#FF8C61" />
                  <circle cx="75" cy="25" r="1.5" fill="#FFD93D" />
                  <circle cx="25" cy="75" r="1.5" fill="#FFD93D" />
                  <path d="M20 20 L30 30 M70 70 L80 80 M80 20 L70 30 M30 70 L20 80" stroke="#FFD93D" strokeWidth="1" opacity="0.7" />
                  <path d="M40 40 L60 60 M60 40 L40 60" stroke="#FF8C61" strokeWidth="0.8" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#impact-pattern)" />
            </svg>
          </div>
          
          {/* Floating elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-coral/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full animate-pulse delay-500"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-accent to-coral rounded-full mb-8">
                <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-accent to-coral bg-clip-text text-transparent">
                Your Purchase Makes a Difference
              </h2>
              <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-16 max-w-4xl mx-auto">
                Every purchase supports our mission to preserve and teach African languages to the next generation. 
                Your investment helps us provide free lessons to underserved communities worldwide.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="text-6xl font-bold text-accent mb-4">15%</div>
                  <p className="text-gray-300 text-xl">of profits fund free lessons</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="text-6xl font-bold text-accent mb-4">1,500+</div>
                  <p className="text-gray-300 text-xl">students supported this year</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="text-6xl font-bold text-accent mb-4">4</div>
                  <p className="text-gray-300 text-xl">African languages preserved</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/mission"
                  className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-accent to-coral text-primary rounded-2xl font-bold text-lg hover:from-accent/90 hover:to-coral/90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  Learn About Our Impact
                  <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <Link
                  href="/donate"
                  className="inline-flex items-center px-10 py-5 border-2 border-white/40 text-white rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 transform hover:scale-105"
                >
                  Support Our Mission
                  <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}

