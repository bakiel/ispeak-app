import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About iSPEAK</h1>
            <p className="text-xl">Connecting Children to Heritage Through Language</p>
          </div>
        </section>

        {/* What is iSPEAK Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">What is iSPEAK?</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  iSPEAK is the first language program designed specifically for young learners to 
                  connect with indigenous African languages through live online lessons. Founded with 
                  the vision of preserving linguistic heritage, we create bridges between generations 
                  and continents.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our unique three-pillar approach develops listening, speaking, and reading skills 
                  in a natural, engaging way that keeps children excited about their heritage. We 
                  believe that language is more than words—it's a gateway to culture, identity, and 
                  belonging.
                </p>
              </div>
              <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <i className="fas fa-image text-6xl text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              iSPEAK has partnered with several community-based organizations and initiatives to 
              support efforts aligned with our mission of preserving and promoting African languages 
              and cultures. Through these collaborative partnerships, we work together to strengthen 
              indigenous language communities and create meaningful educational opportunities.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">Join us in supporting language preservation and cultural education.</p>
              <Link href="/donate" className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300">
                Support Our Mission
              </Link>
            </div>
          </div>
        </section>

        {/* The iSPEAK Method */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">The iSPEAK Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-ear-listen text-3xl text-teal-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Listening Skills</h3>
                <p className="text-gray-600">
                  Develop recognition of sounds, tones, and meanings through authentic language exposure.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-3xl text-yellow-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Speaking Skills</h3>
                <p className="text-gray-600">
                  Progress from imitation to independent conversation through guided practice.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-book-open text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">Reading Skills</h3>
                <p className="text-gray-600">
                  Build literacy through grammar, tonal understanding, and cultural texts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-16 bg-teal-500 text-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div>Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4</div>
                <div>Languages Offered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div>Indigenous Educators</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div>Parent Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Led by founder Daisy Ross, our team consists of passionate educators, cultural 
                ambassadors, and technology professionals dedicated to making African language 
                learning accessible to children worldwide.
              </p>
              <p>
                Our educators are native speakers who bring not just language expertise, but 
                deep cultural knowledge and a genuine love for teaching children.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Child's Language Journey?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our growing community of families preserving their heritage through language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-trial" className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300">
                Book a Free Trial
              </Link>
              <Link href="/philosophy" className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-3 rounded-md font-bold hover:bg-teal-50 transition duration-300">
                Learn Our Philosophy
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}