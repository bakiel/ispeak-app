import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      
      {/* Welcome Video Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Meet Paji, Your Language Guide</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
            Paji is the friendly guide who will accompany your child throughout their language learning journey
          </p>
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/_8DlRLO_h_I" 
                frameBorder="0" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Banner */}
      <section className="bg-teal-500 text-white py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="flex flex-col items-center">
              <i className="fas fa-globe text-3xl md:text-4xl mb-2 md:mb-3 text-yellow-300"></i>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">170+</h3>
              <p className="text-base md:text-lg">Countries</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-user-graduate text-3xl md:text-4xl mb-2 md:mb-3 text-yellow-300"></i>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">100,000+</h3>
              <p className="text-base md:text-lg">Students</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-clock text-3xl md:text-4xl mb-2 md:mb-3 text-yellow-300"></i>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">1.85M+</h3>
              <p className="text-base md:text-lg">Hours of Classes</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-star text-3xl md:text-4xl mb-2 md:mb-3 text-yellow-300"></i>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">97%</h3>
              <p className="text-base md:text-lg">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card 1: What is iSPEAK? */}
            <div className="value-card bg-white shadow-lg">
              <div className="p-6 accent-border-yellow h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center">
                    <img src="https://i.ibb.co/HpXdBJrQ/i-SPEAK-Favicon.png" alt="Paji bird" className="w-12 h-12" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">What is iSPEAK?</h3>
                <p className="text-gray-600 mb-5 flex-grow">
                  iSPEAK is the first language program designed specifically for young learners to connect with indigenous languages through live online lessons. Our unique three-pillar approach develops listening, speaking, and reading skills in a natural, engaging way that keeps children excited about their heritage.
                </p>
                <div className="text-center mt-auto">
                  <a href="#" className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md font-medium hover:bg-yellow-200 transition duration-300">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            
            {/* Card 2: Our Mission */}
            <div className="value-card bg-white shadow-lg">
              <div className="p-6 accent-border-teal h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center">
                    <i className="fas fa-globe-africa text-white text-3xl"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Our Mission</h3>
                <p className="text-gray-600 mb-5 flex-grow">
                  iSPEAK's mission goes beyond teaching—we're preserving cultural heritage. With over 255 African languages at risk of extinction, we empower the next generation to maintain their linguistic roots while supporting indigenous language speakers in becoming educational ambassadors for their cultures.
                </p>
                <div className="text-center mt-auto">
                  <a href="#" className="inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-md font-medium hover:bg-teal-200 transition duration-300">
                    More Details
                  </a>
                </div>
              </div>
            </div>
            
            {/* Card 3: Paji Shop */}
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
                  <p className="text-sm italic text-gray-500 mb-3 text-center">Currently Unavailable</p>
                  <p className="text-sm mb-4 text-center">Sign up to be notified when our shop launches!</p>
                  <div className="flex flex-col sm:flex-row">
                    <input type="email" placeholder="Your email" className="px-3 py-2 border border-gray-300 rounded-l-md flex-1 mb-2 sm:mb-0 w-full rounded-md sm:rounded-r-none" />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md sm:rounded-l-none">
                      Notify Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
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
                  <a href="#" className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-md font-medium hover:bg-red-200 transition duration-300">
                    View Plans
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
