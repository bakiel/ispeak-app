import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PhilosophyPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Educational Philosophy</h1>
            <p className="text-xl">Building Bridges Between Heritage and Future</p>
          </div>
        </section>

        {/* Core Philosophy */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">The Foundation of Our Approach</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At iSPEAK, we believe that language is more than words—it's a living connection to culture, 
              identity, and community. Our educational philosophy is built on the understanding that children 
              learn best when they feel connected, engaged, and celebrated.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our approach centers on creating positive associations with heritage languages using immersion 
              through play, stories, and meaningful communication. We recognize that each child's journey 
              is unique, and we tailor our methods to honor their individual learning style while fostering 
              a deep appreciation for their cultural roots.
            </p>
          </div>
        </section>

        {/* Key Principles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Our Key Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-heart text-teal-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold">Connection Before Correction</h3>
                </div>
                <p className="text-gray-600">
                  We prioritize building confidence and joy in language learning over perfect pronunciation. 
                  When children feel connected to their heritage, accuracy naturally follows.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-child text-yellow-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold">Child-Centered Learning</h3>
                </div>
                <p className="text-gray-600">
                  Every lesson is designed around the child's interests, energy level, and developmental stage. 
                  We adapt to each learner rather than expecting them to fit a rigid curriculum.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-globe-africa text-purple-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold">Cultural Immersion</h3>
                </div>
                <p className="text-gray-600">
                  Language and culture are inseparable. We weave cultural stories, traditions, and values 
                  into every lesson, creating a rich, authentic learning experience.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-gamepad text-blue-600 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold">Learning Through Play</h3>
                </div>
                <p className="text-gray-600">
                  Games, songs, and interactive activities make language learning natural and enjoyable. 
                  When children are having fun, they're absorbing language effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Three Pillars */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">The Three-Pillar Method</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-ear-listen text-white text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">Pillar 1: Listening</h3>
                <p className="text-gray-700">
                  Children begin by developing an ear for the language through stories, songs, and 
                  conversation. This foundation of comprehension creates confidence and prepares 
                  them for active communication.
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-white text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">Pillar 2: Speaking</h3>
                <p className="text-gray-700">
                  Through guided practice and encouragement, children progress from simple repetition 
                  to creative expression. We celebrate every attempt, building fluency through 
                  positive reinforcement.
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-book-open text-white text-4xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">Pillar 3: Reading</h3>
                <p className="text-gray-700">
                  As children advance, we introduce written language through culturally relevant 
                  texts. This literacy component deepens their connection and opens new worlds 
                  of learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Special Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">What Makes iSPEAK Special</h2>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4">Native Speaker Educators</h3>
              <p className="text-gray-700 mb-4">
                All our educators are native speakers who bring authentic pronunciation, cultural 
                knowledge, and genuine passion for their languages. They're not just teachers—they're 
                cultural ambassadors.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4">Name Pronunciation Service</h3>
              <p className="text-gray-700 mb-4">
                Parents may struggle with pronouncing African names correctly, especially for names 
                with tonal elements. Having a native speaker record their child's name is invaluable. 
                It takes the educator just a minute or two to record, but provides lasting value to 
                families.
              </p>
              <p className="text-sm text-gray-600 italic">
                Available for Explorer tier members and above (150 points value)
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold mb-4">Small Group Dynamics</h3>
              <p className="text-gray-700">
                Our 1:1 and small group sessions ensure personalized attention while fostering 
                peer learning. Children motivate each other and build friendships across continents.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">Parent Partnership</h3>
              <p className="text-gray-700">
                We believe parents are essential partners in the language learning journey. We provide 
                resources, progress updates, and guidance to help families continue learning together 
                between lessons.
              </p>
            </div>
          </div>
        </section>

        {/* Age-Appropriate Learning */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Age-Appropriate Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Ages 3-6: Foundation</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Focus on listening and basic vocabulary</li>
                  <li>• Songs, rhymes, and movement</li>
                  <li>• 15-20 minute sessions</li>
                  <li>• Visual aids and puppets</li>
                  <li>• Celebration of every attempt</li>
                </ul>
              </div>

              <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Ages 7-10: Expansion</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Building conversational skills</li>
                  <li>• Introduction to reading</li>
                  <li>• 25-30 minute sessions</li>
                  <li>• Cultural stories and games</li>
                  <li>• Peer interaction encouraged</li>
                </ul>
              </div>

              <div className="bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">Ages 11-14: Mastery</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Advanced conversation</li>
                  <li>• Reading and writing skills</li>
                  <li>• 30-45 minute sessions</li>
                  <li>• Cultural discussions</li>
                  <li>• Leadership opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Our Philosophy in Action</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              See how our unique approach can transform your child's relationship with their heritage language.
            </p>
            <a 
              href="/free-trial" 
              className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
            >
              Book a Free Trial Lesson
            </a>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}