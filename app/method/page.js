import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function MethodPage() {
  return (
    <>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">The iSPEAK Method</h1>
            <p className="text-xl">A Research-Based Approach to Heritage Language Learning</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The iSPEAK Method is built on decades of language acquisition research and cultural 
              pedagogy. Our three-pillar approach ensures that children not only learn to communicate 
              in their heritage language but also develop a deep connection to their cultural identity.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Unlike traditional language programs, we recognize that heritage language learners have 
              unique needs and advantages. Our method leverages their cultural connections while 
              addressing the specific challenges of learning a language outside its primary environment.
            </p>
          </div>
        </section>

        {/* Three Pillars Visual */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">The Three Pillars of Language Mastery</h2>
            
            <div className="relative">
              {/* Visual representation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pillar 1 */}
                <div className="relative">
                  <div className="bg-teal-500 text-white rounded-lg p-6 h-full">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-ear-listen text-4xl text-teal-500"></i>
                      </div>
                      <h3 className="text-2xl font-bold">Pillar 1: Listening</h3>
                      <p className="text-sm opacity-90">Foundation Stage</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Sound recognition and discrimination</li>
                      <li>• Tonal awareness development</li>
                      <li>• Comprehension through context</li>
                      <li>• Cultural storytelling</li>
                      <li>• Music and rhythm integration</li>
                    </ul>
                  </div>
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-400">
                    →
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="relative">
                  <div className="bg-yellow-400 text-gray-900 rounded-lg p-6 h-full">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-comments text-4xl text-yellow-500"></i>
                      </div>
                      <h3 className="text-2xl font-bold">Pillar 2: Speaking</h3>
                      <p className="text-sm opacity-90">Expression Stage</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Guided repetition and mimicry</li>
                      <li>• Conversational practice</li>
                      <li>• Pronunciation refinement</li>
                      <li>• Role-playing activities</li>
                      <li>• Confidence building</li>
                    </ul>
                  </div>
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-400">
                    →
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="relative">
                  <div className="bg-blue-500 text-white rounded-lg p-6 h-full">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-book-open text-4xl text-blue-500"></i>
                      </div>
                      <h3 className="text-2xl font-bold">Pillar 3: Reading</h3>
                      <p className="text-sm opacity-90">Literacy Stage</p>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li>• Letter and character recognition</li>
                      <li>• Phonics and word formation</li>
                      <li>• Grammar fundamentals</li>
                      <li>• Cultural texts exploration</li>
                      <li>• Written expression</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Method in Practice */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">The Method in Practice</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Lesson Structure</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="font-bold text-teal-600 mr-2">5 min:</span>
                    <span>Warm-up with greetings and review</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-teal-600 mr-2">10 min:</span>
                    <span>New material introduction</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-teal-600 mr-2">10 min:</span>
                    <span>Interactive practice activities</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-teal-600 mr-2">5 min:</span>
                    <span>Cultural connection and closing</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Teaching Techniques</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                    <span>Total Physical Response (TPR)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                    <span>Communicative Language Teaching</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                    <span>Task-Based Learning</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                    <span>Cultural Immersion Activities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Progression Path */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Learning Progression</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Months 1-3: Foundation Building</h3>
                    <p className="text-gray-600">Basic greetings, numbers, colors, family terms. Focus on listening comprehension and simple responses.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Months 4-6: Vocabulary Expansion</h3>
                    <p className="text-gray-600">Daily activities, foods, animals, weather. Introduction to simple sentences and questions.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Months 7-9: Conversational Skills</h3>
                    <p className="text-gray-600">Short conversations, expressing preferences, describing objects and people. Basic reading introduction.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Months 10-12: Cultural Integration</h3>
                    <p className="text-gray-600">Stories, songs, cultural practices. More complex sentences and beginning written expression.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">Why the iSPEAK Method Works</h2>
            
            <div className="space-y-6">
              <div className="bg-teal-50 border-l-4 border-teal-500 p-6">
                <h3 className="font-bold text-lg mb-2">Culturally Responsive</h3>
                <p className="text-gray-700">
                  Our method honors the cultural context of each language, teaching not just words but 
                  the cultural values and practices embedded within them.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                <h3 className="font-bold text-lg mb-2">Age-Appropriate</h3>
                <p className="text-gray-700">
                  Activities and expectations are carefully calibrated to match developmental stages, 
                  ensuring children are challenged without being overwhelmed.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="font-bold text-lg mb-2">Research-Based</h3>
                <p className="text-gray-700">
                  Grounded in second language acquisition research and heritage language pedagogy, 
                  our method incorporates proven strategies for effective learning.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                <h3 className="font-bold text-lg mb-2">Family Inclusive</h3>
                <p className="text-gray-700">
                  We provide resources and guidance for families to support learning at home, 
                  recognizing that language acquisition happens best with family involvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience the iSPEAK Method</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              See how our proven method can help your child connect with their heritage language 
              in a fun, engaging, and effective way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/free-trial" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
              >
                Book a Free Trial
              </Link>
              <Link 
                href="/philosophy" 
                className="bg-white text-teal-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300"
              >
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