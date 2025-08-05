import { productImages, mockupGallery } from '@/lib/productImages'

export default function TestImagesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">E-commerce Product Mockups Test</h1>
      
      <h2 className="text-xl font-semibold mb-4">All Generated Mockups</h2>
      <div className="grid grid-cols-3 gap-4 mb-12">
        {Object.entries(mockupGallery).map(([name, data]) => (
          <div key={name} className="border p-4 rounded">
            <h3 className="font-semibold mb-2">{data.product}</h3>
            <img 
              src={data.url} 
              alt={data.product}
              className="w-full h-64 object-contain bg-gray-100"
            />
            <p className="text-xs mt-2 text-gray-600">{data.prompt}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Product-to-Mockup Mapping</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(productImages).map(([slug, url]) => (
          <div key={slug} className="border p-4 rounded">
            <h3 className="font-semibold mb-2 text-sm">{slug}</h3>
            <img 
              src={url} 
              alt={slug}
              className="w-full h-48 object-contain bg-gray-100"
            />
          </div>
        ))}
      </div>
    </div>
  )
}