'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Store, Book, Puzzle, Shirt, Tag, Gift, Star, Truck, Award } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'

export default function ShopPage() {
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Notification signup:', { email, language })
    setEmail('')
    setLanguage('')
  }

  const categories = [
    {
      title: 'Books',
      icon: Book,
      description: 'Our collection of children\'s books, educational texts, and reading materials will bring African languages and cultures to life.',
      subcategories: [
        { title: 'Children\'s Series', description: 'Illustrated storybooks featuring African cultural tales with integrated language learning.' },
        { title: 'Educational Texts', description: 'Language primers and guides for young learners at various proficiency levels.' },
        { title: 'Partner Publications', description: 'Specially selected books from our partner publishers that support cultural learning.' }
      ]
    },
    {
      title: 'Educational Materials',
      icon: Puzzle,
      description: 'Enhance your child\'s language learning experience with our educational materials designed to reinforce lessons.',
      subcategories: [
        { title: 'Workbooks', description: 'Activity books aligned with our curriculum to provide hands-on practice between lessons.' },
        { title: 'Flashcards', description: 'Beautifully illustrated flashcards for vocabulary building and quick practice sessions.' },
        { title: 'Learning Aids', description: 'Educational toys, games, and tools that make language learning fun and engaging.' }
      ]
    },
    {
      title: 'Merchandise',
      icon: Shirt,
      description: 'Show your pride in language learning with our collection of high-quality iSPEAK branded merchandise.',
      subcategories: [
        { title: 'Apparel', description: 'T-shirts, leggings, and other clothing items featuring African language phrases and the Paji mascot.' },
        { title: 'Accessories', description: 'Bags, hats, and other accessories that celebrate African languages and cultures.' },
        { title: 'Branded Items', description: 'Water bottles, stickers, and other items featuring the iSPEAK logo and Paji character.' }
      ]
    }
  ]

  const benefits = [
    { icon: Tag, text: 'Member discounts' },
    { icon: Gift, text: 'Earn points on purchases' },
    { icon: Star, text: 'Early access to new items' },
    { icon: Truck, text: 'Free shipping options' }
  ]

  const faqs: AccordionItem[] = [
    {
      id: '1',
      title: 'When will the Paji Shop launch?',
      content: 'We\'re currently in the final stages of curating our product selection and setting up our e-commerce platform. We expect to launch the Paji Shop within the next few months. Sign up for our notification list to be among the first to know when we launch!'
    },
    {
      id: '2',
      title: 'Will books be available in all languages?',
      content: 'At launch, we\'ll have items available for our currently offered languages: Yoruba, Kiswahili, and Twi. As we expand our language offerings, we\'ll also increase our shop inventory to include materials for those languages. We\'re committed to providing high-quality resources for all the languages we teach.'
    },
    {
      id: '3',
      title: 'Do I need to be an iSPEAK student to shop?',
      content: 'No, the Paji Shop will be open to everyone! While iSPEAK students and their families will receive special benefits through our loyalty program, anyone interested in African languages and cultures is welcome to purchase our educational materials and merchandise.'
    },
    {
      id: '4',
      title: 'Will you ship internationally?',
      content: 'Yes, we plan to offer international shipping! As part of our mission to connect the African diaspora worldwide with their heritage, we\'re committed to making our resources accessible globally. International shipping rates and delivery times will vary by location.'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Paji Shop</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Supplement your lessons with educational materials, cultural resources, and iSPEAK merchandise.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Store className="w-16 h-16 mx-auto text-secondary mb-4" />
            </div>
            <span className="inline-block bg-accent text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              COMING SOON
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Shop is Being Stocked!</h2>
            <p className="text-lg text-gray-700 mb-8">
              The Paji Shop will soon offer carefully curated materials designed to enhance your child's language 
              learning journey. From culturally authentic books to engaging learning aids and branded merchandise, 
              these products will help reinforce language skills between lessons and celebrate African linguistic heritage.
            </p>

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Be the First to Know When We Launch</h3>
              <p className="text-gray-700 mb-6">
                Join our mailing list to be notified when new products become available in the Paji Shop.
              </p>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-md w-full"
                    required
                  />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-md w-full md:w-auto"
                  >
                    <option value="">Language interest</option>
                    <option value="yoruba">Yoruba</option>
                    <option value="kiswahili">Kiswahili</option>
                    <option value="twi">Twi</option>
                    <option value="amharic">Amharic</option>
                    <option value="multiple">Multiple languages</option>
                  </select>
                </div>
                <Button type="submit" variant="primary" className="w-full">Notify Me</Button>
                <p className="text-xs text-gray-500">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Categories Preview */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Coming Soon to Our Shop</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category.title} className="overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <category.icon className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-gray-700">{category.description}</p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {category.subcategories.map((subcategory, index) => (
                      <div key={index}>
                        <h4 className="font-medium mb-3">{subcategory.title}</h4>
                        <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center mb-3">
                          <category.icon className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600">{subcategory.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty Program Reminder */}
      <section className="py-10 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/4 text-center">
                <Award className="w-16 h-16 mx-auto text-accent" />
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">Loyalty Program Benefits</h3>
                <p className="mb-4">
                  Members of our loyalty program will earn points on all Paji Shop purchases and receive 
                  exclusive discounts based on their membership tier.
                </p>
                <div className="flex flex-wrap gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white px-3 py-1 rounded-full text-sm border border-accent/20">
                      <benefit.icon className="w-4 h-4 inline mr-1 text-accent" />
                      {benefit.text}
                    </div>
                  ))}
                </div>
                <Link href="/loyalty" className="inline-block mt-4 text-secondary font-medium hover:underline">
                  Learn more about our Loyalty Program
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-secondary to-secondary/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start your child's language journey today
            </h2>
            <p className="text-lg mb-8">
              While you wait for our shop to launch, begin exploring African languages with our 
              certified instructors through interactive online lessons.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/register" variant="primary" size="lg">
                Register For Classes
              </Button>
              <Button href="/pricing" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}