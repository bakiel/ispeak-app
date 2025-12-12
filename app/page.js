import ModernNavigation from '@/components/ModernNavigation'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import StatisticsBanner from '@/components/StatisticsBanner'
import FeatureCards from '@/components/FeatureCards'
import Link from 'next/link'
import Image from 'next/image'

// Deployment validation trigger - Build: 2025-08-05

export default function Home() {
  return (
    <>
      <ModernNavigation />
      <HeroSection />
      
      {/* Welcome Video Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Meet Paji, Your Language Guide</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
            Paji is the friendly guide who will accompany your child throughout their language learning journey
          </p>
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/v1PUzEl4j80?rel=0&modestbranding=1"
                title="Meet Paji - iSPEAK Language Learning"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="/plans"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
            >
              <span>Start Free Trial</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Statistics Banner */}
      <StatisticsBanner />

      {/* Value Proposition Cards */}
      <FeatureCards pageSlug="home" />
      
      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="value-card bg-white shadow-lg">
              <div className="p-6 accent-border-teal h-full flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-center">Our Mission</h3>
                <p className="text-gray-600 mb-5 flex-grow">
                  iSPEAK has partnered with several community-based organizations and initiatives to support efforts aligned with our mission of preserving and promoting African languages and cultures. Through these collaborative partnerships, we work together to strengthen indigenous language communities and create meaningful educational opportunities.
                </p>
                <div className="text-center mt-auto">
                  <a href="/donate" className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-md font-medium hover:bg-teal-200 transition duration-300">
                    Support Our Mission
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            
      {/* Paji Shop Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="value-card bg-white shadow-lg">
              <div className="p-6 accent-border-blue h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                    <i className="fas fa-shopping-bag text-white text-3xl"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Paji Shop</h3>
                <p className="text-gray-600 mb-5 flex-grow">
                  Enhance your child's learning experience with carefully curated cultural materials from the Paji Shop. Browse our collection of children's books, educational toys, and exclusive resources designed to reinforce language learning outside of lessons.
                </p>
                <div className="mt-auto">
                  <p className="text-sm font-medium text-gray-600 mb-3 text-center">Coming Soon!</p>
                  <p className="text-sm mb-4 text-center">Sign up to be notified when our shop launches!</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="email" placeholder="Enter your email" className="px-3 py-2 border border-gray-300 rounded-md flex-1 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap font-medium">
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            
      {/* Plans and Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Card 4: Plans and Pricing */}
            <div className="value-card bg-white shadow-lg">
              <div className="p-6 accent-border-coral h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-red-400 flex items-center justify-center">
                    <i className="fas fa-calendar-alt text-white text-3xl"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Plans and Pricing</h3>
                <p className="text-gray-600 mb-5 flex-grow">
                  From single sessions to comprehensive monthly packages, we offer flexible plans to fit every schedule and budget. Choose from $25 single lessons, $75 monthly basics, $90 premium packages, or our $350 three-month immersion experience.
                </p>
                <div className="text-center mt-auto">
                  <a href="/plans" className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-md font-medium hover:bg-red-200 transition duration-300">
                    View Plans
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Three-Pillar Approach */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">The iSPEAK Method</h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">iSPEAK uses a research-based three-pillar approach to language acquisition. Each lesson is carefully crafted to develop essential language skills through engaging, age-appropriate activities that keep children motivated and excited to learn.</p>
              
              <div className="flex justify-center mb-6 md:mb-8">
                <img src="/images/generated/ispeak-method-pillars.jpg" alt="iSPEAK Method Three Pillars" className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg" />
              </div>
              
              {/* Three Pillars */}
              <div className="space-y-4">
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-headphones text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Listening Skills</h3>
                      <p className="text-gray-600 text-sm">Each lesson provides opportunities for learners to hear authentic language. Children develop skills to recognize sounds, understand tones, and comprehend meanings.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-comments text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Speaking Skills</h3>
                      <p className="text-gray-600 text-sm">Early lessons focus on imitation and repetition, while advanced lessons develop vocabulary and proper grammar through guided conversations.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <i className="fas fa-book-open text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Reading Skills</h3>
                      <p className="text-gray-600 text-sm">As learners progress, lessons incorporate grammar, tonal, and spelling rules that build reading and writing skills for cultural literacy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Live Class Preview */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience a Real iSPEAK Lesson</h2>
              <p className="text-base md:text-lg text-gray-600 mb-6">Watch how our certified indigenous language educators create engaging, interactive lessons that keep children excited to learn. Our virtual classroom combines fun visuals, cultural elements, and personalized attention.</p>
              
              <div className="bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="relative w-full aspect-video">
                  <img 
                    src="/images/generated/children-counting-swahili.jpg" 
                    alt="Children learning to count in Kiswahili with Paji mascot" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6 text-center italic">Children learning numbers in Kiswahili (Moja, Mbili, Tatu)</p>
              
              <div className="bg-teal-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 italic mb-2">"My daughter gets so excited for her Yoruba class every week! The teacher makes learning fun with songs, games, and stories."</p>
                <p className="text-sm text-gray-600">— Amara J., Parent of 7-year-old</p>
              </div>
              
              <div className="text-center">
                <a href="/free-trial" className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300">Book a Free Trial Lesson</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Offerings Section */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Choose Your Language Journey</h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Our curriculum is developed by experienced educators who are native speakers of each language, 
            ensuring authentic pronunciation, cultural context, and age-appropriate learning progression.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Yoruba */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-yellow-400 p-4">
                <h3 className="text-xl font-bold text-gray-900">Yoruba</h3>
              </div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/images/generated/yoruba-culture-card.jpg" 
                  alt="Yoruba cultural elements" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">West Africa</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">40M+ Speakers</span>
                </div>
                <p className="text-gray-600 mb-4">One of West Africa's most widely spoken languages, rich in tonal expression and cultural significance.</p>
                <p className="text-sm text-gray-500 mb-4 italic">Learn proverbs, folktales, and traditions</p>
                <a href="/plans/yoruba" className="block text-center bg-yellow-400 text-gray-900 py-2 rounded-md font-medium hover:bg-yellow-300 transition duration-300">
                  Explore Yoruba Programs
                </a>
              </div>
            </div>
            
            {/* Kiswahili */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-teal-500 p-4">
                <h3 className="text-xl font-bold text-white">Kiswahili</h3>
              </div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/images/generated/kiswahili-culture-card.jpg" 
                  alt="Kiswahili cultural elements" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">East Africa</span>
                  <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm">100M+ Speakers</span>
                </div>
                <p className="text-gray-600 mb-4">The lingua franca of East Africa, spoken across Kenya, Tanzania, Uganda, and beyond.</p>
                <p className="text-sm text-gray-500 mb-4 italic">Discover coastal traditions and stories</p>
                <a href="/plans/kiswahili" className="block text-center bg-teal-500 text-white py-2 rounded-md font-medium hover:bg-teal-600 transition duration-300">
                  Explore Kiswahili Programs
                </a>
              </div>
            </div>
            
            {/* Twi */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-500 p-4">
                <h3 className="text-xl font-bold text-white">Twi</h3>
              </div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/images/generated/twi-culture-card.jpg" 
                  alt="Twi cultural elements" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Ghana</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">9M+ Speakers</span>
                </div>
                <p className="text-gray-600 mb-4">The most widely spoken language in Ghana, known for its tonal qualities and rich oral traditions.</p>
                <p className="text-sm text-gray-500 mb-4 italic">Learn about Adinkra symbols and customs</p>
                <a href="/plans/twi" className="block text-center bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition duration-300">
                  Explore Twi Programs
                </a>
              </div>
            </div>
            
            {/* Amharic */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-purple-500 p-4">
                <h3 className="text-xl font-bold text-white">Amharic</h3>
              </div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="/images/generated/amharic-culture-card.jpg" 
                  alt="Amharic cultural elements" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Ethiopia</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">25M+ Speakers</span>
                </div>
                <p className="text-gray-600 mb-4">Ethiopia's official language features a unique script and rich literary tradition.</p>
                <p className="text-sm text-gray-500 mb-4 italic font-bold">Coming Soon</p>
                <a href="/register?language=amharic&waitlist=true" className="block text-center bg-purple-500 text-white py-2 rounded-md font-medium hover:bg-purple-600 transition duration-300">
                  Join Waitlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="bg-gray-900 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center bg-yellow-400 text-gray-900 px-4 py-2 rounded-full mb-4">
              <i className="fas fa-star mr-2"></i>
              <span className="font-semibold">NEW FEATURE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interactive Language Games
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Reinforce language learning between lessons with our fun, educational games. 
              Practice vocabulary and pronunciation in an engaging way.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-4">
                <i className="fas fa-sort-numeric-up text-2xl text-yellow-400 mb-2"></i>
                <p className="text-white text-sm font-medium">Number Match</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <i className="fas fa-hand-wave text-2xl text-teal-400 mb-2"></i>
                <p className="text-white text-sm font-medium">Greetings</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <i className="fas fa-palette text-2xl text-blue-400 mb-2"></i>
                <p className="text-white text-sm font-medium">Colors</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <i className="fas fa-paw text-2xl text-purple-400 mb-2"></i>
                <p className="text-white text-sm font-medium">Animals</p>
              </div>
            </div>
            
            <a 
              href="/games" 
              className="inline-flex items-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-yellow-300 transition duration-300"
            >
              <i className="fas fa-gamepad mr-3"></i>
              Play Free Games
            </a>
            
            <div className="mt-6 flex items-center justify-center space-x-6 text-gray-400 text-sm">
              <span><i className="fas fa-check-circle mr-1"></i>No signup required</span>
              <span><i className="fas fa-check-circle mr-1"></i>Ages 3-14</span>
              <span><i className="fas fa-check-circle mr-1"></i>3 Languages</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">How iSPEAK Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-yellow-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Language</h3>
              <p className="text-gray-600">Select from Yoruba, Kiswahili, Twi, or join the waitlist for Amharic</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Book Your Schedule</h3>
              <p className="text-gray-600">Pick times that work for your family with our flexible scheduling</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Meet Your Educator</h3>
              <p className="text-gray-600">Connect with native speakers who are passionate about teaching</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Learn & Grow</h3>
              <p className="text-gray-600">Watch your child flourish with engaging lessons and cultural connections</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What Parents Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map((star) => (
                  <i key={star} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "My kids love their Yoruba lessons! The teacher is patient and makes learning fun. 
                They're now teaching ME words they've learned!"
              </p>
              <p className="font-semibold">— Folake A.</p>
              <p className="text-sm text-gray-600">Parent of 5 & 8 year olds</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map((star) => (
                  <i key={star} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The iSPEAK method really works! My daughter went from shy to confidently speaking 
                Kiswahili with her grandparents in Kenya."
              </p>
              <p className="font-semibold">— James M.</p>
              <p className="text-sm text-gray-600">Parent of 7 year old</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map((star) => (
                  <i key={star} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Worth every penny! The cultural education alongside language learning is exactly 
                what we were looking for."
              </p>
              <p className="font-semibold">— Akosua D.</p>
              <p className="text-sm text-gray-600">Parent of 6 year old</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="bg-gradient-to-r from-yellow-50 to-teal-50 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Support Our Mission</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Your donation helps preserve African languages and provides educational opportunities for children worldwide. 
                Every contribution makes a difference in keeping our heritage alive.
              </p>
            </div>

            {/* Donation Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* FWS Learners */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <i className="fas fa-graduation-cap text-white text-2xl"></i>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-center">FWS Cooperative Learners</h3>
                <p className="text-sm text-gray-600 text-center">
                  Support individual learners with tuition assistance, technology, and educational resources for their language journey.
                </p>
              </div>

              {/* Partner Schools */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-school text-white text-2xl"></i>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-center">FWS Partner Schools</h3>
                <p className="text-sm text-gray-600 text-center">
                  Build infrastructure and provide technology for partner schools across Africa to expand language education access.
                </p>
              </div>

              {/* Language Councils */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-language text-white text-2xl"></i>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-center">Language Councils</h3>
                <p className="text-sm text-gray-600 text-center">
                  Create and maintain language preservation initiatives for indigenous African languages and cultural heritage.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <a href="/donate" className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-heart mr-2"></i>
                Make a Donation
              </a>
              <p className="mt-4 text-sm text-gray-600">
                <i className="fas fa-shield-alt mr-1 text-green-600"></i>
                Secure donation • Tax-deductible • 501(c)(3) nonprofit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial CTA Section */}
      <section className="bg-teal-500 text-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Language Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Give your child the gift of heritage language learning with a free trial lesson. 
            No commitment required!
          </p>
          <a href="/free-trial" className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-yellow-300 transition duration-300">
            Book Your Free Trial
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold mb-2">What age groups do you serve?</h3>
              <p className="text-gray-600">We offer programs for children ages 3-14, with age-appropriate curricula for each developmental stage.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold mb-2">How long are the lessons?</h3>
              <p className="text-gray-600">Lessons range from 15-20 minutes for ages 3-6, 25-30 minutes for ages 7-10, and 30-45 minutes for ages 11-14.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold mb-2">Do you offer group classes?</h3>
              <p className="text-gray-600">Yes! We offer both 1:1 personalized lessons and small group classes (up to 4 students) at discounted rates.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-xl font-bold mb-2">What if my child has never spoken the language before?</h3>
              <p className="text-gray-600">Perfect! Our programs are designed for heritage language learners starting from zero. We'll meet your child exactly where they are.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How do I track my child's progress?</h3>
              <p className="text-gray-600">Parents receive regular progress reports and can observe lessons. Our educators also provide tips for practicing at home.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a href="/faq" className="text-teal-600 font-medium hover:underline">View All FAQs →</a>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}