import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function GroupRatesPage() {
  const groupPlans = [
    {
      size: "2 Students",
      discount: "20% Off",
      monthlyBasic: "$60",
      originalBasic: "$75",
      monthlyPremium: "$72",
      originalPremium: "$90",
      features: [
        "Perfect for siblings or friends",
        "Same language and level",
        "Interactive peer learning",
        "Shared cultural activities"
      ]
    },
    {
      size: "3 Students",
      discount: "30% Off",
      monthlyBasic: "$52.50",
      originalBasic: "$75",
      monthlyPremium: "$63",
      originalPremium: "$90",
      features: [
        "Ideal for small homeschool groups",
        "Enhanced group dynamics",
        "Collaborative projects",
        "Group games and activities"
      ]
    },
    {
      size: "4 Students",
      discount: "40% Off",
      monthlyBasic: "$45",
      originalBasic: "$75",
      monthlyPremium: "$54",
      originalPremium: "$90",
      features: [
        "Maximum group size",
        "Best value per student",
        "Team-based learning",
        "Cultural presentations"
      ]
    }
  ]

  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Group Class Rates</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Learn together, save together! Our small group classes offer the same quality 
              education at significantly reduced rates.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose Group Classes?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-dollar-sign text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Save Money</h3>
                <p className="text-gray-600">
                  Save up to 40% compared to individual lessons while maintaining 
                  personalized attention.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-users text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Peer Learning</h3>
                <p className="text-gray-600">
                  Children motivate each other and learn through collaboration, 
                  games, and friendly competition.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-star text-3xl text-yellow-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Social Skills</h3>
                <p className="text-gray-600">
                  Build friendships with other heritage language learners while 
                  developing communication skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Group Pricing Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {groupPlans.map((plan, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-purple-500 text-white p-6 text-center">
                    <h3 className="text-2xl font-bold">{plan.size}</h3>
                    <p className="text-3xl font-bold mt-2">{plan.discount}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-3">Monthly Rates (per student)</h4>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span>Basic (4 lessons)</span>
                        <div>
                          <span className="text-2xl font-bold text-green-600">{plan.monthlyBasic}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">{plan.originalBasic}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Premium (6 lessons)</span>
                        <div>
                          <span className="text-2xl font-bold text-green-600">{plan.monthlyPremium}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">{plan.originalPremium}</span>
                        </div>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="fas fa-check text-green-500 mr-2 mt-1"></i>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      href="/free-trial" 
                      className="block text-center bg-purple-500 text-white py-2 rounded-md font-bold hover:bg-purple-600 transition duration-300"
                    >
                      Start Free Trial
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">How Group Classes Work</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold text-purple-600">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Form Your Group</h3>
                  <p className="text-gray-600">
                    Gather 2-4 students of similar age and language level. They can be siblings, 
                    friends, or other families in your community.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold text-purple-600">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Choose Your Schedule</h3>
                  <p className="text-gray-600">
                    Select times that work for all families. We offer flexible scheduling 
                    including after-school and weekend options.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold text-purple-600">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Start Learning Together</h3>
                  <p className="text-gray-600">
                    Your group will be matched with an educator experienced in teaching 
                    small groups, ensuring everyone gets attention and stays engaged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">Group Class FAQs</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-2">
                  Do all students need to be at the same level?
                </h3>
                <p className="text-gray-600">
                  Yes, for the best learning experience, students should be within one level 
                  of each other. We'll assess during the trial to ensure good fit.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-2">
                  Can we add or remove students later?
                </h3>
                <p className="text-gray-600">
                  Yes! Groups can be adjusted with 2 weeks notice. Adding students may require 
                  schedule adjustments based on educator availability.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-2">
                  What if one student misses a class?
                </h3>
                <p className="text-gray-600">
                  The class continues as scheduled. We provide catch-up materials for absent 
                  students, and educators brief them at the next lesson.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-2">
                  How is payment handled for groups?
                </h3>
                <p className="text-gray-600">
                  Each family pays separately for their child(ren). We can also arrange single 
                  payment if one family is covering all students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start a Group?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Gather your group and book a free trial lesson. See how fun and effective 
              learning together can be!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/free-trial" 
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
              >
                Book Group Trial
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-purple-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}