import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function FAQPage() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What age groups do you serve?",
          a: "We offer programs for children ages 3-14, with age-appropriate curricula for each developmental stage. Our classes are divided into three groups: ages 3-6 (Foundation), ages 7-10 (Expansion), and ages 11-14 (Mastery)."
        },
        {
          q: "What languages do you offer?",
          a: "We currently offer Yoruba, Kiswahili, and Twi. Amharic is coming soon! Each language is taught by native speakers who bring authentic pronunciation and cultural knowledge."
        },
        {
          q: "Do I need to speak the language to help my child?",
          a: "No! Many of our parents don't speak the language their child is learning. We provide resources and tips for supporting your child's learning journey, regardless of your own language skills."
        },
        {
          q: "What if my child has never spoken the language before?",
          a: "Perfect! Our programs are designed for heritage language learners starting from zero. We'll meet your child exactly where they are and build their confidence step by step."
        }
      ]
    },
    {
      category: "Classes & Scheduling",
      questions: [
        {
          q: "How long are the lessons?",
          a: "Lessons range from 15-20 minutes for ages 3-6, 25-30 minutes for ages 7-10, and 30-45 minutes for ages 11-14. We keep younger learners engaged with shorter, activity-packed sessions."
        },
        {
          q: "How often are classes held?",
          a: "Most students take 1-2 classes per week. You can choose a schedule that works for your family, with flexible options including weekday and weekend slots."
        },
        {
          q: "What happens if we miss a class?",
          a: "Life happens! You can reschedule missed classes with at least 24 hours notice. No-shows cannot be rescheduled, but we'll provide practice materials to help your child catch up."
        },
        {
          q: "Do you offer group classes?",
          a: "Yes! We offer both 1:1 personalized lessons and small group classes (up to 4 students) at discounted rates. Group classes are a great way for children to learn with peers."
        }
      ]
    },
    {
      category: "Technology & Requirements",
      questions: [
        {
          q: "What technology do we need?",
          a: "You'll need a device with a camera and microphone (computer, tablet, or smartphone), a stable internet connection, and a quiet space for learning. We use Zoom for our classes."
        },
        {
          q: "Can my child use a tablet or phone?",
          a: "Yes! Many of our younger students use tablets. We recommend a larger screen when possible, but our educators are experienced in making lessons work on any device."
        },
        {
          q: "Do you provide learning materials?",
          a: "Yes! We provide digital worksheets, activity sheets, and cultural resources. Physical materials can be purchased through our Paji Shop (coming soon)."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          q: "How much do lessons cost?",
          a: "We offer flexible pricing: $25 for single lessons, $75 for monthly basics (4 lessons), $90 for premium packages (6 lessons), or $350 for our three-month immersion experience."
        },
        {
          q: "Do you offer sibling discounts?",
          a: "Yes! We offer family discounts when multiple children from the same household enroll. Contact us for specific rates based on your family's needs."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, debit cards, and PayPal. Payment is processed securely through our platform."
        },
        {
          q: "Can I get a refund?",
          a: "We offer a 7-day money-back guarantee for new students. If you're not satisfied after your first lesson, we'll provide a full refund."
        }
      ]
    },
    {
      category: "Educational Approach",
      questions: [
        {
          q: "What is the iSPEAK Method?",
          a: "Our three-pillar approach focuses on Listening, Speaking, and Reading skills. Each lesson combines these elements through games, stories, songs, and cultural activities tailored to your child's age and level."
        },
        {
          q: "How do you keep young children engaged online?",
          a: "Our educators use interactive props, songs, movement, and visual aids. We keep activities short and varied, and our teachers are experts at reading children's energy levels and adapting accordingly."
        },
        {
          q: "Will my child learn about culture too?",
          a: "Absolutely! Language and culture are inseparable. Children learn through folktales, traditions, music, and cultural practices, making their language journey rich and meaningful."
        },
        {
          q: "How do I track my child's progress?",
          a: "Parents receive regular progress reports and can observe lessons. Our educators also provide tips for practicing at home and celebrate milestones with digital certificates."
        }
      ]
    },
    {
      category: "Educators",
      questions: [
        {
          q: "Who are your educators?",
          a: "All our educators are native speakers who have been carefully selected and trained in our methodology. They bring not just language expertise, but cultural knowledge and a genuine love for teaching children."
        },
        {
          q: "Can we request a specific educator?",
          a: "Yes! Once you find an educator your child connects with, you can request to continue with them. We believe consistency helps build strong learning relationships."
        },
        {
          q: "What if my child is shy?",
          a: "Our educators are experienced in working with shy children. They use gentle encouragement, start with non-verbal activities, and create a safe space where children feel comfortable making mistakes."
        }
      ]
    }
  ]

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl">Everything you need to know about iSPEAK</p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-600 text-center mb-10">
              Find answers to common questions about our programs, technology requirements, 
              pricing, and educational approach. Can't find what you're looking for? 
              <a href="/contact" className="text-teal-600 hover:underline ml-1">Contact us</a>!
            </p>

            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-teal-600">{category.category}</h2>
                <div className="space-y-6">
                  {category.questions.map((item, questionIndex) => (
                    <div key={questionIndex} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-lg font-bold mb-3">{item.q}</h3>
                      <p className="text-gray-700 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Additional Help */}
            <div className="mt-12 bg-teal-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-700 mb-6">
                Our friendly team is here to help! Reach out and we'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
                >
                  Contact Us
                </a>
                <a 
                  href="/free-trial" 
                  className="bg-white text-teal-600 border-2 border-teal-600 px-6 py-3 rounded-md font-bold hover:bg-teal-50 transition duration-300"
                >
                  Book a Free Trial
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  )
}