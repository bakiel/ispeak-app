import { mockupGallery } from '@/lib/productImages'

export const metadata = {
  title: 'E-commerce Mockups | iSPEAK',
  description: 'Product mockups for iSPEAK merchandise'
}

export default function MockupsPage() {
  const mockups = Object.entries(mockupGallery).map(([name, data]) => ({
    name,
    ...data
  }))

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">iSPEAK E-commerce Mockups</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockups.map((mockup) => (
            <div key={mockup.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={mockup.url}
                  alt={mockup.name}
                  className="w-full h-full object-contain bg-gray-50"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {mockup.name.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{mockup.prompt}</p>
                <p className="text-xs text-gray-500">
                  Generated: {new Date(mockup.generatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready for Print-on-Demand</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These AI-generated mockups showcase how the iSPEAK logo and Paji mascot can be applied to various products. 
            Created with fal.ai GPT Image Editor for realistic product placement.
            Perfect for use with print-on-demand services like Gelato, Printful, or any other POD platform.
          </p>
        </div>
      </div>
    </div>
  )
}