import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function MissionPage() {
  return (
    <>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
            <p className="text-xl">Preserving Heritage, Empowering Futures</p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-6">What Drives Us</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                iSPEAK has partnered with several community-based organizations and initiatives to 
                support efforts aligned with our mission of preserving and promoting African languages 
                and cultures. Through these collaborative partnerships, we work together to strengthen 
                indigenous language communities and create meaningful educational opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-hands-holding-heart text-3xl text-yellow-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Cultural Preservation</h3>
                <p className="text-gray-600">
                  We believe that language is the heart of culture. By teaching African languages to 
                  the next generation, we ensure that rich cultural traditions, stories, and wisdom 
                  continue to thrive.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-globe-africa text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Global Connection</h3>
                <p className="text-gray-600">
                  We bridge continents by connecting diaspora children with their linguistic heritage, 
                  fostering a sense of belonging and identity that transcends geographical boundaries.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-graduation-cap text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence in Education</h3>
                <p className="text-gray-600">
                  We maintain the highest standards in language education, employing native speakers 
                  and proven pedagogical methods to ensure effective and engaging learning experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Our Impact</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold mb-4">For Children</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">Build confidence in their cultural identity</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">Develop cognitive benefits of multilingualism</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">Connect with extended family across continents</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">Gain valuable 21st-century global skills</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">For Communities</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">Preserve indigenous languages for future generations</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">Create employment for native language speakers</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">Strengthen cultural bonds within diaspora communities</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">Document and share cultural knowledge</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Approach */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Our Partnership Approach</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-6">
                We believe in the power of collaboration. Our partnerships with community organizations, 
                cultural centers, and educational institutions amplify our impact and ensure that our 
                programs remain culturally authentic and community-driven.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Community Partners</h3>
                  <p className="text-gray-600">
                    We work with local organizations to identify needs, recruit educators, and ensure 
                    our programs serve their communities effectively.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Educational Partners</h3>
                  <p className="text-gray-600">
                    Collaborations with schools and educational institutions help us reach more 
                    children and integrate language learning into broader educational goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Looking to the Future</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our vision extends beyond language lessons. We're building a global community where 
              African languages thrive, where children embrace their heritage with pride, and where 
              cultural wisdom passes seamlessly from generation to generation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold mb-2">Expand Languages</h3>
                <p className="text-gray-600">
                  Add more African languages to serve diverse communities worldwide.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold mb-2">Develop Resources</h3>
                <p className="text-gray-600">
                  Create comprehensive learning materials and cultural content libraries.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold mb-2">Build Communities</h3>
                <p className="text-gray-600">
                  Foster connections between learners, families, and cultural communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Whether as a learner, educator, partner, or supporter, you can help us preserve 
              African languages and empower the next generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/donate" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
              >
                Support Our Mission
              </Link>
              <Link 
                href="/register" 
                className="bg-white text-teal-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300"
              >
                Start Learning Today
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}