import { getFeatureCards } from '@/lib/content'
import Link from 'next/link'

export default async function FeatureCards({ pageSlug = 'home' }) {
  const cards = await getFeatureCards(pageSlug)
  
  // Fallback data for homepage
  const defaultCards = [
    {
      title: 'What is iSPEAK?',
      description: 'iSPEAK is the first language program designed specifically for young learners to connect with indigenous languages through live online lessons. Our unique three-pillar approach develops listening, speaking, and reading skills in a natural, engaging way that keeps children excited about their heritage.',
      icon: 'fas fa-graduation-cap',
      icon_type: 'fontawesome',
      icon_bg_color: 'bg-yellow-300',
      accent_color: 'accent-border-yellow',
      cta_text: 'Learn More',
      cta_link: '/about'
    },
    {
      title: 'Our Mission',
      description: "We believe every child deserves to speak their mother tongue fluently. Our mission is to preserve African languages by making them accessible, engaging, and fun for the next generation through technology and cultural connection.",
      icon: 'fas fa-globe-africa',
      icon_type: 'fontawesome',
      icon_bg_color: 'bg-teal-500',
      accent_color: 'accent-border-teal',
      cta_text: 'Our Story',
      cta_link: '/about'
    },
    {
      title: 'Meet Our Educators',
      description: "Our certified native speakers are more than teachers – they're cultural ambassadors who bring languages to life through stories, songs, and games. Each educator is carefully selected for their warmth, patience, and ability to connect with young learners.",
      icon: 'fas fa-chalkboard-teacher',
      icon_type: 'fontawesome',
      icon_bg_color: 'bg-purple-500',
      accent_color: 'accent-border-purple',
      cta_text: 'View Educators',
      cta_link: '/educators'
    },
    {
      title: 'Try a FREE Lesson',
      description: 'Experience the iSPEAK difference with a complimentary trial lesson. See how our personalized approach helps your child fall in love with their heritage language in just one session!',
      icon: 'fas fa-gift',
      icon_type: 'fontawesome',
      icon_bg_color: 'bg-pink-500',
      accent_color: 'accent-border-pink',
      cta_text: 'Book Free Trial',
      cta_link: '/free-trial'
    }
  ]
  
  const featureCards = cards.length > 0 ? cards : defaultCards

  return (
    <section className="bg-gray-50 py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featureCards.map((card, index) => (
            <div key={card.id || index} className="value-card bg-white shadow-lg">
              <div className={`p-6 ${card.accent_color} h-full flex flex-col`}>
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full ${card.icon_bg_color || 'bg-gray-400'} flex items-center justify-center`}>
                    {card.icon_type === 'image' && card.icon_url ? (
                      <img src={card.icon_url} alt={card.title} className="w-12 h-12 object-contain" />
                    ) : card.icon ? (
                      <i className={`${card.icon} text-white text-2xl`}></i>
                    ) : (
                      <i className="fas fa-star text-white text-2xl"></i>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{card.title}</h3>
                <p className="text-gray-600 mb-5 flex-grow">
                  {card.description}
                </p>
                {card.cta_text && card.cta_link && (
                  <div className="text-center mt-auto">
                    <Link 
                      href={card.cta_link} 
                      className={`inline-block px-4 py-2 rounded-md font-medium transition duration-300 ${
                        card.icon_bg_color === 'bg-yellow-300' 
                          ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
                          : card.icon_bg_color === 'bg-teal-500'
                          ? 'bg-teal-500 text-white hover:bg-teal-600'
                          : card.icon_bg_color === 'bg-purple-500'
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : card.icon_bg_color === 'bg-pink-500'
                          ? 'bg-pink-500 text-white hover:bg-pink-600'
                          : 'bg-gray-500 text-white hover:bg-gray-600'
                      }`}
                    >
                      {card.cta_text}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}