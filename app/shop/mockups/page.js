import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { mockupGallery } from '@/lib/productImages'

export const metadata = {
  title: 'Product Mockups | iSPEAK Shop',
  description: 'Explore our product mockup gallery showcasing iSPEAK merchandise designs and concepts.',
}

export default function MockupsPage() {
  const mockups = Object.entries(mockupGallery)

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Product Mockup Gallery</h1>
              <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
                Explore our collection of product designs featuring the beloved Paji mascot and iSPEAK branding
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  <i className="fas fa-palette mr-2"></i>
                  AI-Generated Designs
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  <i className="fas fa-heart mr-2"></i>
                  Community Approved
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  <i className="fas fa-star mr-2"></i>
                  Premium Quality
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Banner */}
        <section className="bg-white py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-images text-yellow-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{mockups.length}</h3>
                <p className="text-gray-600">Mockups</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-shopping-bag text-teal-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">8</h3>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-paint-brush text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">100%</h3>
                <p className="text-gray-600">Original</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <i className="fas fa-globe-africa text-purple-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">4</h3>
                <p className="text-gray-600">Languages</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Design Gallery</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each mockup showcases our commitment to quality design and cultural authenticity. 
                These designs represent the heart of the iSPEAK brand.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {mockups.map(([key, mockup]) => (
                <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={mockup.url}
                      alt={mockup.product}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <i className="fas fa-search-plus text-2xl mb-2"></i>
                        <p className="text-sm">View Details</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{mockup.product}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mockup.prompt}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mockup.product.toLowerCase().includes('kids') && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Kids</span>
                      )}
                      {mockup.product.toLowerCase().includes('teacher') && (
                        <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">Teacher</span>
                      )}
                      {mockup.product.toLowerCase().includes('school') && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">School</span>
                      )}
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Premium</span>
                    </div>
                    
                    {/* Action Button */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-md font-medium hover:bg-teal-600 transition duration-300">
                        <i className="fas fa-eye mr-2"></i>
                        Preview
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300">
                        <i className="fas fa-download text-gray-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Process Section */}
        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Process Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Design Process</h2>
                <p className="text-gray-600 mb-8">
                  Every mockup in our gallery represents hours of careful consideration of our brand values, 
                  target audience, and educational mission. We use cutting-edge AI technology combined with 
                  human creativity to produce authentic, engaging designs.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-lightbulb text-yellow-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Concept Development</h3>
                      <p className="text-gray-600 text-sm">Ideas rooted in African culture and language learning principles</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-robot text-teal-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">AI Generation</h3>
                      <p className="text-gray-600 text-sm">Advanced AI models create high-quality visual representations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-check-circle text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Quality Review</h3>
                      <p className="text-gray-600 text-sm">Expert review ensures brand consistency and cultural sensitivity</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Featured Mockup */}
              <div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Featured Design</h3>
                    <p className="text-gray-600">Our most popular mockup</p>
                  </div>
                  
                  <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-6">
                    <Image
                      src={mockupGallery['tshirt-white-kid'].url}
                      alt="Featured Design"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-bold mb-2">Kids T-Shirt Collection</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Clean, friendly design perfect for young language learners
                    </p>
                    <div className="flex gap-2">
                      <Link href="/shop/products/paji-t-shirt-kids" className="flex-1 bg-yellow-400 text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-yellow-300 transition duration-300 text-center">
                        Shop Now
                      </Link>
                      <Link href="/shop/specifications" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300">
                        Specs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-12">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Shop?</h2>
            <p className="text-lg mb-8">
              Browse our full product catalog and find the perfect items to support your language learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300">
                <i className="fas fa-shopping-bag mr-2"></i>
                Browse Shop
              </Link>
              <Link href="/shop/specifications" className="bg-gray-900 text-white px-8 py-3 rounded-md font-bold hover:bg-gray-800 transition duration-300">
                <i className="fas fa-info-circle mr-2"></i>
                View Specifications
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}