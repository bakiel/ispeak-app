import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function EducatorApplyPage() {
  const requirements = [
    {
      category: "Language Requirements",
      icon: "fas fa-comments",
      items: [
        "Native speaker of Yoruba, Kiswahili, Twi, or Amharic",
        "Excellent command of English for parent communication",
        "Clear, articulate pronunciation and speech",
        "Understanding of cultural context and traditions"
      ]
    },
    {
      category: "Educational Background",
      icon: "fas fa-graduation-cap",
      items: [
        "Bachelor's degree or equivalent experience preferred",
        "Experience working with children ages 3-14",
        "Teaching, tutoring, or childcare background",
        "Understanding of child development principles"
      ]
    },
    {
      category: "Technical Requirements",
      icon: "fas fa-laptop",
      items: [
        "Reliable high-speed internet connection",
        "Computer/laptop with webcam and microphone",
        "Quiet, well-lit teaching space",
        "Basic proficiency with video conferencing tools"
      ]
    },
    {
      category: "Personal Qualities",
      icon: "fas fa-heart",
      items: [
        "Patience and enthusiasm for teaching children",
        "Cultural pride and desire to share heritage",
        "Reliability and commitment to scheduled lessons",
        "Professional demeanor and communication skills"
      ]
    }
  ]

  const benefits = [
    {
      title: "Flexible Schedule",
      description: "Choose your own hours and work around your other commitments",
      icon: "fas fa-clock"
    },
    {
      title: "Competitive Pay",
      description: "Earn $15-25 per hour based on experience and student feedback",
      icon: "fas fa-dollar-sign"
    },
    {
      title: "Cultural Impact",
      description: "Help preserve and promote African languages for future generations",
      icon: "fas fa-globe-africa"
    },
    {
      title: "Training Provided",
      description: "Complete orientation and ongoing support for teaching methodology",
      icon: "fas fa-chalkboard-teacher"
    },
    {
      title: "Community Connection",
      description: "Join a network of passionate educators from across the diaspora",
      icon: "fas fa-users"
    },
    {
      title: "Growth Opportunities",
      description: "Potential for curriculum development and leadership roles",
      icon: "fas fa-arrow-up"
    }
  ]

  const applicationSteps = [
    {
      step: 1,
      title: "Submit Application",
      description: "Complete our online application form with your background and teaching philosophy"
    },
    {
      step: 2,
      title: "Language Assessment",
      description: "Demonstrate your native language proficiency and cultural knowledge"
    },
    {
      step: 3,
      title: "Interview Process",
      description: "Video interview to assess teaching style and child interaction skills"
    },
    {
      step: 4,
      title: "Background Check",
      description: "Complete background verification for child safety requirements"
    },
    {
      step: 5,
      title: "Training Program",
      description: "Complete our educator training program and methodology workshop"
    },
    {
      step: 6,
      title: "Start Teaching",
      description: "Begin taking students with ongoing support from our education team"
    }
  ]

  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Become an iSPEAK Educator</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Share your heritage language and culture with the next generation. 
              Join our global community of native-speaking educators making a difference.
            </p>
            <div className="mt-8">
              <Link 
                href="#application" 
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-yellow-300 transition duration-300"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>

        {/* Why Teach With Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Why Teach With iSPEAK?</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Make a meaningful impact while earning competitive income from the comfort of your home.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${benefit.icon} text-2xl text-teal-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">What We're Looking For</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {requirements.map((req, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                      <i className={`${req.icon} text-xl text-teal-600`}></i>
                    </div>
                    <h3 className="text-xl font-bold">{req.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="fas fa-check text-green-500 mr-2 mt-1 text-sm"></i>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Application Process</h2>
            
            <div className="relative">
              {/* Timeline line for desktop */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-teal-200"></div>
              
              <div className="space-y-8">
                {applicationSteps.map((step, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center z-10 relative">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-teal-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">What Our Educators Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 italic mb-4">
                  "Teaching with iSPEAK has been incredibly rewarding. I get to share my Yoruba 
                  heritage with children who are hungry to learn about their roots. The flexibility 
                  allows me to work around my other commitments."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-yellow-800">A</span>
                  </div>
                  <div>
                    <p className="font-bold">Adunni O.</p>
                    <p className="text-sm text-gray-600">Yoruba Educator, 2 years</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 italic mb-4">
                  "I love seeing the excitement in children's eyes when they successfully 
                  communicate in Kiswahili. iSPEAK's training program prepared me well, and 
                  the support team is always available when I need help."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-teal-800">K</span>
                  </div>
                  <div>
                    <p className="font-bold">Khamisi M.</p>
                    <p className="text-sm text-gray-600">Kiswahili Educator, 3 years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="application" className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">Ready to Apply?</h2>
            <p className="text-lg text-gray-600 text-center mb-8">
              Start your journey as an iSPEAK educator today. We'll guide you through every step.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">First Name *</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Native Language(s) *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Yoruba', 'Kiswahili', 'Twi', 'Amharic'].map((lang) => (
                      <label key={lang} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Country of Residence *</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Teaching Experience</label>
                  <textarea 
                    rows="4" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Tell us about your experience working with children or teaching..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Why do you want to teach with iSPEAK?</label>
                  <textarea 
                    rows="4" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Share your motivation and teaching philosophy..."
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input type="checkbox" className="mr-3 mt-1" required />
                  <label className="text-sm text-gray-700">
                    I confirm that I am a native speaker of the selected language(s) and agree to 
                    complete a background check if selected to move forward in the application process.
                  </label>
                </div>
                
                <div className="text-center">
                  <button 
                    type="submit" 
                    className="bg-teal-500 text-white px-8 py-3 rounded-md font-bold hover:bg-teal-600 transition duration-300"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-2">How many hours per week can I expect to teach?</h3>
                <p className="text-gray-600">
                  It varies based on demand and your availability. New educators typically start with 
                  5-10 hours per week and can increase as they build their student base.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-2">Do I need formal teaching certification?</h3>
                <p className="text-gray-600">
                  Formal certification is not required, but experience working with children and 
                  passion for cultural education are essential. We provide comprehensive training.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-2">What equipment do I need to get started?</h3>
                <p className="text-gray-600">
                  You'll need a computer with webcam and microphone, reliable internet, and a quiet 
                  teaching space. We'll provide guidance on optimal setup during training.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-2">How long does the application process take?</h3>
                <p className="text-gray-600">
                  The complete process typically takes 2-4 weeks, depending on your responsiveness 
                  to requests and completion of required steps.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}