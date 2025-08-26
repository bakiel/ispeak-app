'use client'

import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'

export default function TestGeneratedImages() {
  const images = [
    {
      name: 'Children Counting Swahili',
      path: '/images/generated/children-counting-swahili.jpg',
      description: 'Homepage banner replacement for second video'
    },
    {
      name: 'About Hero Educators',
      path: '/images/generated/about-hero-educators.jpg',
      description: 'About page hero image'
    },
    {
      name: 'iSPEAK Method Pillars',
      path: '/images/generated/ispeak-method-pillars.jpg',
      description: 'Three pillars methodology illustration'
    },
    {
      name: 'Yoruba Culture Card',
      path: '/images/generated/yoruba-culture-card.jpg',
      description: 'Yoruba language card cultural image'
    },
    {
      name: 'Kiswahili Culture Card',
      path: '/images/generated/kiswahili-culture-card.jpg',
      description: 'Kiswahili language card cultural image'
    },
    {
      name: 'Twi Culture Card',
      path: '/images/generated/twi-culture-card.jpg',
      description: 'Twi language card cultural image'
    },
    {
      name: 'Amharic Culture Card',
      path: '/images/generated/amharic-culture-card.jpg',
      description: 'Amharic language card cultural image'
    }
  ]

  return (
    <>
      <ModernNavigation />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Generated Images Test</h1>
          
          <div className="space-y-8">
            {images.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-2">{image.name}</h2>
                <p className="text-gray-600 mb-4">{image.description}</p>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={image.path} 
                    alt={image.name}
                    className="w-full h-auto"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg'
                      e.target.onerror = null
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Path: {image.path}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}