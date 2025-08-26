import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Product Specifications | iSPEAK Shop',
  description: 'Detailed product specifications, sizing guides, and quality standards for iSPEAK merchandise.',
}

export default function SpecificationsPage() {
  return (
    <>
      <ModernNavigation />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Product Specifications</h1>
              <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
                Detailed specifications, sizing guides, and quality standards for all iSPEAK merchandise
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  <i className="fas fa-ruler mr-2"></i>
                  Precise Measurements
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  <i className="fas fa-certificate mr-2"></i>
                  Quality Assured
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  <i className="fas fa-leaf mr-2"></i>
                  Eco-Friendly Materials
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Quality Standards</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every iSPEAK product meets our rigorous quality standards for durability, safety, and educational value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-leaf text-green-600 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Sustainable Materials</h3>
                <p className="text-gray-600">
                  Organic cotton, recycled polyester, and eco-friendly inks for all textile products.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-blue-600 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Child Safety First</h3>
                <p className="text-gray-600">
                  All products tested for safety with non-toxic materials suitable for children ages 3-14.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-award text-purple-600 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                <p className="text-gray-600">
                  Durable construction designed to withstand daily use by active children.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Product Categories</h2>
            
            <div className="space-y-8">
              {/* Apparel */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-tshirt text-yellow-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Apparel</h3>
                    <p className="text-gray-600">T-shirts, hoodies, and caps</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4">Materials & Construction</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        100% organic cotton (t-shirts)
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Cotton-polyester blend (hoodies)
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Water-based, non-toxic screen printing
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Double-stitched seams for durability
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Pre-shrunk fabric
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold mb-4">Sizing Guide (Kids)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Size</th>
                            <th className="text-left py-2">Age</th>
                            <th className="text-left py-2">Chest (in)</th>
                            <th className="text-left py-2">Length (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 font-medium">XS</td>
                            <td className="py-2">3-4</td>
                            <td className="py-2">21-22</td>
                            <td className="py-2">14-15</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">S</td>
                            <td className="py-2">5-6</td>
                            <td className="py-2">23-24</td>
                            <td className="py-2">16-17</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">M</td>
                            <td className="py-2">7-8</td>
                            <td className="py-2">25-26</td>
                            <td className="py-2">18-19</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 font-medium">L</td>
                            <td className="py-2">9-10</td>
                            <td className="py-2">27-28</td>
                            <td className="py-2">20-21</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">XL</td>
                            <td className="py-2">11-14</td>
                            <td className="py-2">29-30</td>
                            <td className="py-2">22-23</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Materials */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-book text-teal-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Educational Materials</h3>
                    <p className="text-gray-600">Books, flashcards, and learning aids</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4">Specifications</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Premium paper stock (120gsm minimum)
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Laminated flashcards for durability
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Non-toxic, soy-based inks
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Rounded corners for safety
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Age-appropriate content design
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold mb-4">Educational Features</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Culturally authentic content
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Phonetic pronunciation guides
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Visual learning support
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Progressive difficulty levels
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Parent guide included
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Accessories */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-shopping-bag text-blue-600 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Accessories</h3>
                    <p className="text-gray-600">Backpacks, water bottles, and bags</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold mb-4">Material Standards</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        BPA-free materials (water bottles)
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Reinforced stitching (bags)
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Water-resistant coating
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Easy-clean surfaces
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-green-500 mr-2"></i>
                        Child-safe closures and zippers
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold mb-4">Capacity & Dimensions</h4>
                    <div className="space-y-3 text-gray-600">
                      <div>
                        <strong className="text-gray-900">Backpack:</strong>
                        <p className="text-sm">16" H × 12" W × 5" D (16L capacity)</p>
                      </div>
                      <div>
                        <strong className="text-gray-900">Water Bottle:</strong>
                        <p className="text-sm">500ml capacity, 9" H × 2.8" diameter</p>
                      </div>
                      <div>
                        <strong className="text-gray-900">Tote Bag:</strong>
                        <p className="text-sm">15" H × 16" W × 4" D with 12" handles</p>
                      </div>
                      <div>
                        <strong className="text-gray-900">Coffee Mug:</strong>
                        <p className="text-sm">11oz capacity, dishwasher & microwave safe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Care Instructions */}
        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Care Instructions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Proper care ensures your iSPEAK products maintain their quality and appearance over time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tint text-yellow-600 text-2xl"></i>
                </div>
                <h3 className="font-bold mb-2">Washing</h3>
                <p className="text-gray-600 text-sm">Machine wash cold, gentle cycle with like colors</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-sun text-teal-600 text-2xl"></i>
                </div>
                <h3 className="font-bold mb-2">Drying</h3>
                <p className="text-gray-600 text-sm">Tumble dry low or hang dry to preserve colors</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-iron text-blue-600 text-2xl"></i>
                </div>
                <h3 className="font-bold mb-2">Ironing</h3>
                <p className="text-gray-600 text-sm">Iron on low heat, avoid direct contact with prints</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-ban text-purple-600 text-2xl"></i>
                </div>
                <h3 className="font-bold mb-2">Avoid</h3>
                <p className="text-gray-600 text-sm">No bleach, dry cleaning, or fabric softener</p>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty & Returns */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Quality Guarantee</h2>
                <p className="text-gray-600 mb-6">
                  We stand behind the quality of our products. Every iSPEAK item comes with our 
                  satisfaction guarantee and comprehensive warranty coverage.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-shield-alt text-green-500 text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="font-bold mb-1">30-Day Quality Promise</h3>
                      <p className="text-gray-600 text-sm">Full refund or replacement for defective items</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="fas fa-undo text-blue-500 text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="font-bold mb-1">Easy Returns</h3>
                      <p className="text-gray-600 text-sm">Hassle-free return process with prepaid shipping</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="fas fa-headset text-purple-500 text-xl mr-3 mt-1"></i>
                    <div>
                      <h3 className="font-bold mb-1">Customer Support</h3>
                      <p className="text-gray-600 text-sm">Dedicated support team for all product questions</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <p className="text-gray-600 mb-6">
                    Have questions about sizing, materials, or care? Our team is here to help.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-teal-500 mr-3"></i>
                      <span className="text-gray-700">shop@ispeaklanguages.com</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-phone text-teal-500 mr-3"></i>
                      <span className="text-gray-700">+1 (478) 390-4040</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-clock text-teal-500 mr-3"></i>
                      <span className="text-gray-700">Mon-Fri 9AM-5PM EST</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link href="/contact" className="block text-center bg-teal-500 text-white py-3 px-6 rounded-md font-medium hover:bg-teal-600 transition duration-300">
                      Contact Support
                    </Link>
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
              Browse our full collection of high-quality iSPEAK merchandise designed for young language learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300">
                <i className="fas fa-shopping-bag mr-2"></i>
                Browse All Products
              </Link>
              <Link href="/shop/mockups" className="bg-gray-900 text-white px-8 py-3 rounded-md font-bold hover:bg-gray-800 transition duration-300">
                <i className="fas fa-images mr-2"></i>
                View Mockups
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}