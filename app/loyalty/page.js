import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'

export default function LoyaltyPage() {
  const tiers = [
    {
      name: 'Beginner',
      points: '0-99',
      color: 'bg-gray-100',
      icon: '🌱',
      benefits: [
        'Welcome bonus: 25 points',
        'Monthly newsletter with language tips',
        'Access to free printable resources',
        'Birthday surprise for your child'
      ]
    },
    {
      name: 'Explorer',
      points: '100-299',
      color: 'bg-blue-100',
      icon: '🗺️',
      benefits: [
        'All Beginner benefits',
        '5% discount on lesson packages',
        'Early access to new programs',
        'Name pronunciation recording (150 points value)',
        'Quarterly cultural activity guide'
      ]
    },
    {
      name: 'Adventurer',
      points: '300-599',
      color: 'bg-purple-100',
      icon: '🎯',
      benefits: [
        'All Explorer benefits',
        '10% discount on lesson packages',
        'Priority booking for popular time slots',
        'Free lesson on your child\'s birthday',
        'Exclusive cultural workshop invitations'
      ]
    },
    {
      name: 'Champion',
      points: '600+',
      color: 'bg-yellow-100',
      icon: '🏆',
      benefits: [
        'All Adventurer benefits',
        '15% discount on lesson packages',
        'Free monthly group cultural class',
        'Personalized learning progress report',
        'VIP customer support',
        'Annual gift from the Paji Shop'
      ]
    }
  ]

  const earnPoints = [
    { action: 'Sign up for an account', points: '25' },
    { action: 'Book your first lesson', points: '50' },
    { action: 'Complete a lesson', points: '10' },
    { action: 'Purchase a monthly package', points: '75' },
    { action: 'Purchase a 3-month package', points: '200' },
    { action: 'Refer a friend who books a lesson', points: '100' },
    { action: 'Write a testimonial', points: '50' },
    { action: 'Follow us on social media', points: '15' },
    { action: 'Complete a learning milestone', points: '25' },
    { action: 'Participate in cultural events', points: '30' }
  ]

  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">iSPEAK Loyalty Program</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join Paji's Loyalty Club and earn rewards while your child learns their heritage language!
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Earn Points</h3>
                <p className="text-gray-600">
                  Get points for lessons, purchases, referrals, and engaging with our community.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Level Up</h3>
                <p className="text-gray-600">
                  Progress through tiers from Beginner to Champion, unlocking new benefits.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Enjoy Rewards</h3>
                <p className="text-gray-600">
                  Use points for discounts, free lessons, exclusive content, and special gifts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loyalty Tiers */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Loyalty Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier, index) => (
                <div key={index} className={`${tier.color} rounded-lg p-6 shadow-md`}>
                  <div className="text-center mb-4">
                    <span className="text-5xl">{tier.icon}</span>
                    <h3 className="text-2xl font-bold mt-2">{tier.name}</h3>
                    <p className="text-sm text-gray-600">{tier.points} points</p>
                  </div>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="fas fa-check text-green-600 mr-2 mt-1 text-sm"></i>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ways to Earn */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">Ways to Earn Points</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {earnPoints.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-md">
                    <span className="text-gray-700">{item.action}</span>
                    <span className="font-bold text-teal-600">+{item.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Special Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-10">Special Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-bold mb-2">Name Pronunciation Recording</h3>
                <p className="text-gray-600 mb-3">
                  Available for Explorer tier and above (150 points value)
                </p>
                <p className="text-sm text-gray-500">
                  Have your child's name recorded by a native speaker - invaluable for families wanting authentic pronunciation.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-xl font-bold mb-2">Birthday Rewards</h3>
                <p className="text-gray-600 mb-3">
                  Special surprises on your child's birthday
                </p>
                <p className="text-sm text-gray-500">
                  From birthday greetings in their learning language to free lessons at higher tiers.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-bold mb-2">Family Points</h3>
                <p className="text-gray-600 mb-3">
                  Earn points for all children in your account
                </p>
                <p className="text-sm text-gray-500">
                  Points accumulate across all your children's activities, helping you reach rewards faster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">How do I join the loyalty program?</h3>
                <p className="text-gray-600">
                  It's automatic! Simply create an account and you'll receive 25 welcome points to start your journey.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Do points expire?</h3>
                <p className="text-gray-600">
                  Points remain active as long as you complete at least one lesson every 6 months.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Can I share points with family members?</h3>
                <p className="text-gray-600">
                  Points are tied to your family account and benefit all children enrolled under that account.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">How do referral rewards work?</h3>
                <p className="text-gray-600">
                  When your referred friend signs up and books their first lesson, you'll receive 100 points. There's no limit to referral rewards!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning Rewards?</h2>
            <p className="text-xl mb-8">
              Join the iSPEAK family today and watch your child flourish while earning great benefits!
            </p>
            <a 
              href="/register" 
              className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
            >
              Sign Up Now - Get 25 Points!
            </a>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}