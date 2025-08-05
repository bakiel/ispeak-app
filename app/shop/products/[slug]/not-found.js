import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ProductNotFound() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center px-4">
          <div className="mb-8">
            <img
              src="https://gfbedvoexpulmmfitxje.supabase.co/storage/v1/object/public/logos/paji-mascot-front.png"
              alt="Paji looking around"
              className="w-40 h-40 mx-auto mb-4"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find the product you're looking for. It might have been removed or the link is incorrect.
          </p>
          
          <div className="space-x-4">
            <Link
              href="/shop"
              className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-yellow-300 transition-colors"
            >
              Browse Shop
            </Link>
            
            <Link
              href="/"
              className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
            >
              Go Home
            </Link>
          </div>
          
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Popular Products
            </h3>
            <div className="flex justify-center space-x-4">
              <Link href="/shop/products/paji-t-shirt-kids" className="text-yellow-600 hover:text-yellow-700">
                Paji T-Shirt
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/shop/products/ispeak-learning-journal" className="text-yellow-600 hover:text-yellow-700">
                Learning Journal
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/shop/products/ispeak-hoodie" className="text-yellow-600 hover:text-yellow-700">
                iSPEAK Hoodie
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}