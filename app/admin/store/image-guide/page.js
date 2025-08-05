import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

export const metadata = {
  title: 'Image Optimization Guide | iSPEAK Admin',
  description: 'Learn how to optimize images for your iSPEAK store'
}

export default function ImageGuidePage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Image Optimization Guide</h2>
            <p className="mt-1 text-sm text-gray-600">
              Best practices for product images
            </p>
          </div>
          <Link
            href="/admin/store/products"
            className="text-gray-600 hover:text-gray-900 inline-flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Products
          </Link>
        </div>

        {/* Why Optimize */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <i className="fas fa-question-circle text-primary mr-2"></i>
            Why Optimize Images?
          </h3>
          <div className="prose max-w-none text-gray-600">
            <ul className="space-y-2">
              <li>⚡ <strong>Faster Loading:</strong> Smaller images load 10-20x faster</li>
              <li>📱 <strong>Mobile Friendly:</strong> Better experience for mobile shoppers</li>
              <li>🔍 <strong>Better SEO:</strong> Google ranks faster sites higher</li>
              <li>💰 <strong>Save Bandwidth:</strong> Lower hosting costs</li>
              <li>🛒 <strong>Higher Conversions:</strong> Faster sites = more sales</li>
            </ul>
          </div>
        </div>

        {/* Size Requirements */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <i className="fas fa-ruler text-yellow-600 mr-2"></i>
            Size Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">File Size</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✅ <strong>Recommended:</strong> 100-150KB</li>
                <li>⚠️ <strong>Maximum:</strong> 200KB</li>
                <li>❌ <strong>Avoid:</strong> Over 500KB</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Dimensions</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>📐 <strong>Recommended:</strong> 1200x1200px</li>
                <li>📏 <strong>Minimum:</strong> 800x800px</li>
                <li>🖼️ <strong>Aspect Ratio:</strong> 1:1 (square)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* File Formats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <i className="fas fa-file-image text-primary mr-2"></i>
            File Format Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">JPEG (Recommended)</h4>
              <p className="text-sm text-gray-600">
                Best for product photos with many colors. Excellent compression.
              </p>
              <div className="mt-2 text-xs text-gray-500">
                ✅ Photos<br/>
                ✅ Small file size<br/>
                ❌ No transparency
              </div>
            </div>
            <div className="border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">PNG</h4>
              <p className="text-sm text-gray-600">
                Use for logos or graphics needing transparency.
              </p>
              <div className="mt-2 text-xs text-gray-500">
                ✅ Transparency<br/>
                ✅ Sharp graphics<br/>
                ❌ Larger files
              </div>
            </div>
            <div className="border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-2">WebP</h4>
              <p className="text-sm text-gray-600">
                Modern format with best compression. Not all browsers support.
              </p>
              <div className="mt-2 text-xs text-gray-500">
                ✅ Smallest size<br/>
                ✅ Great quality<br/>
                ⚠️ Limited support
              </div>
            </div>
          </div>
        </div>

        {/* How to Optimize */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <i className="fas fa-tools text-primary mr-2"></i>
            How to Optimize Images
          </h3>
          
          <div className="space-y-6">
            {/* Online Tools */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Online Tools (Free)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="https://tinypng.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      🐼
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium">TinyPNG</h5>
                    <p className="text-sm text-gray-600">Compress PNG & JPEG up to 80%</p>
                  </div>
                </a>
                
                <a 
                  href="https://squoosh.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      🎯
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium">Squoosh</h5>
                    <p className="text-sm text-gray-600">Google's advanced image optimizer</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Desktop Tools */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Desktop Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h5 className="font-medium">Mac: ImageOptim</h5>
                  <p className="text-sm text-gray-600">Free app that removes metadata and compresses</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h5 className="font-medium">Windows: RIOT</h5>
                  <p className="text-sm text-gray-600">Radical Image Optimization Tool</p>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quick Optimization Steps</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1️⃣ <strong>Resize first:</strong> Scale to 1200x1200px maximum</li>
                <li>2️⃣ <strong>Export as JPEG:</strong> Use 85% quality for best balance</li>
                <li>3️⃣ <strong>Compress:</strong> Use TinyPNG or similar tool</li>
                <li>4️⃣ <strong>Check size:</strong> Ensure under 200KB</li>
                <li>5️⃣ <strong>Upload:</strong> Use the product upload form</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
            Common Mistakes to Avoid
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-red-800 mb-2">Don't Do This</h4>
              <ul className="space-y-1 text-gray-700">
                <li>❌ Upload straight from camera (5-10MB)</li>
                <li>❌ Use BMP or TIFF formats</li>
                <li>❌ Upload 4K resolution images</li>
                <li>❌ Ignore file size warnings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-2">Do This Instead</h4>
              <ul className="space-y-1 text-gray-700">
                <li>✅ Resize and compress first</li>
                <li>✅ Use JPEG for photos</li>
                <li>✅ Keep under 1200px wide</li>
                <li>✅ Aim for 100-150KB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <i className="fas fa-image text-primary mr-2"></i>
            Real Example
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-red-600 mb-2">Before Optimization</h4>
              <div className="bg-gray-100 rounded-lg p-4 text-sm">
                <p><strong>Format:</strong> PNG</p>
                <p><strong>Dimensions:</strong> 4000x4000px</p>
                <p><strong>File Size:</strong> 2.5MB</p>
                <p><strong>Load Time:</strong> 8-12 seconds</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-600 mb-2">After Optimization</h4>
              <div className="bg-gray-100 rounded-lg p-4 text-sm">
                <p><strong>Format:</strong> JPEG</p>
                <p><strong>Dimensions:</strong> 1200x1200px</p>
                <p><strong>File Size:</strong> 125KB</p>
                <p><strong>Load Time:</strong> 0.5 seconds</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Result:</strong> 95% smaller file, 20x faster loading, same visual quality!
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Optimize?</h3>
          <p className="mb-6">Start uploading optimized images for better performance</p>
          <Link
            href="/admin/store/products/new"
            className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            Add New Product
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}