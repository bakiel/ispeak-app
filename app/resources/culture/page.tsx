'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Globe, 
  Users, 
  Heart, 
  Book, 
  Music,
  Calendar,
  Utensils,
  Crown,
  Palette,
  Home,
  ChevronRight,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function CulturalInformationPage() {
  const cultures = [
    {
      language: 'Yoruba',
      country: 'Nigeria, Benin, Togo',
      speakers: '40+ million',
      image: '/images/landscape/Family_celebrating_Kwanzaa_Umoja.jpg',
      color: 'from-secondary to-primary',
      highlights: [
        'Rich oral tradition and storytelling',
        'Vibrant festivals like Egungun and Osun-Osogbo',
        'Traditional music featuring talking drums',
        'Elaborate naming ceremonies (Isomoloruko)',
      ],
      description: 'The Yoruba people have one of the richest cultural heritages in Africa, with a sophisticated system of governance, art, and spirituality that dates back centuries.',
      slug: 'yoruba',
    },
    {
      language: 'Kiswahili',
      country: 'Kenya, Tanzania, Uganda, DRC',
      speakers: '200+ million',
      image: '/images/landscape/Children_learning_online_with_laptop.jpg',
      color: 'from-accent to-secondary',
      highlights: [
        'Lingua franca of East Africa',
        'Beautiful coastal Swahili architecture',
        'Rich maritime trading history',
        'Fusion of African, Arab, and Persian cultures',
      ],
      description: 'Kiswahili serves as a unifying language across East Africa, embodying centuries of cultural exchange and creating a unique blend of traditions.',
      slug: 'kiswahili',
    },
    {
      language: 'Twi',
      country: 'Ghana',
      speakers: '9+ million',
      image: '/images/landscape/Elderly_woman_storytelling_to_children.jpg',
      color: 'from-coral to-accent',
      highlights: [
        'Part of the Akan language family',
        'Home to Kente cloth tradition',
        'Adinkra symbols with deep meanings',
        'Rich gold-working heritage',
      ],
      description: 'The Akan people of Ghana have created some of Africa\'s most recognizable cultural symbols, from the geometric patterns of Kente to the wisdom of Adinkra.',
      slug: 'twi',
    },
    {
      language: 'Amharic',
      country: 'Ethiopia',
      speakers: '32+ million',
      image: '/images/landscape/Child_holding_a_certificate.jpg',
      color: 'from-primary to-coral',
      highlights: [
        'Ancient Ge\'ez script heritage',
        'Unique calendar system (13 months)',
        'Coffee ceremony traditions',
        'Orthodox Christian influences',
      ],
      description: 'Ethiopia\'s unique position as never being colonized has preserved ancient traditions, creating a distinctive culture that bridges Africa and the Middle East.',
      slug: 'amharic',
    },
  ]

  const culturalTopics = [
    {
      icon: Calendar,
      title: 'Festivals & Celebrations',
      description: 'Learn about traditional festivals, holidays, and important cultural celebrations',
      color: 'bg-secondary',
    },
    {
      icon: Utensils,
      title: 'Traditional Cuisine',
      description: 'Discover authentic recipes, cooking methods, and the cultural significance of food',
      color: 'bg-accent',
    },
    {
      icon: Music,
      title: 'Music & Dance',
      description: 'Explore traditional instruments, dance styles, and the role of music in daily life',
      color: 'bg-coral',
    },
    {
      icon: Crown,
      title: 'History & Heritage',
      description: 'Understand the historical kingdoms, leaders, and events that shaped these cultures',
      color: 'bg-primary',
    },
    {
      icon: Palette,
      title: 'Art & Crafts',
      description: 'Appreciate traditional art forms, textiles, sculptures, and contemporary expressions',
      color: 'bg-secondary',
    },
    {
      icon: Book,
      title: 'Stories & Proverbs',
      description: 'Dive into folk tales, proverbs, and oral traditions that pass down wisdom',
      color: 'bg-accent',
    },
  ]

  const resources = [
    {
      title: 'African Cultural Calendar 2024',
      type: 'PDF Download',
      description: 'Important dates, festivals, and celebrations across African cultures',
      downloads: '3.2k',
    },
    {
      title: 'Traditional African Names & Meanings',
      type: 'Interactive Guide',
      description: 'Explore the meanings behind names in different African languages',
      downloads: '5.1k',
    },
    {
      title: 'Cultural Etiquette Guide',
      type: 'Article Series',
      description: 'Learn respectful greetings, customs, and social norms',
      downloads: '2.8k',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-primary py-16 md:py-20">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Globe className="w-10 h-10" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore African Cultures
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Immerse yourself in the rich traditions, histories, and customs of Africa. 
              Understanding culture is key to meaningful language learning.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Culture Brings Language to Life
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At iSPEAK, we believe that language and culture are inseparable. When children understand 
              the cultural context behind the words they're learning, they develop a deeper connection 
              to their heritage and communicate with greater authenticity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-bold mb-2">Build Identity</h3>
                <p className="text-gray-600">
                  Connect children with their roots and strengthen cultural identity
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold mb-2">Foster Understanding</h3>
                <p className="text-gray-600">
                  Develop empathy and appreciation for diverse perspectives
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-coral" />
                </div>
                <h3 className="font-bold mb-2">Bridge Generations</h3>
                <p className="text-gray-600">
                  Create meaningful connections between children and elders
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultures Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Discover Our Featured Cultures
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any culture below to explore its traditions, customs, and unique characteristics 
              that make each language special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cultures.map((culture, index) => (
              <Card key={index} hover="lift" className="overflow-hidden">
                <div className={`h-48 relative bg-gradient-to-r ${culture.color}`}>
                  <Image
                    src={culture.image}
                    alt={culture.language}
                    fill
                    className="object-cover opacity-30"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="font-heading text-3xl font-bold mb-2">{culture.language}</h3>
                      <p className="text-white/90">{culture.country}</p>
                      <p className="text-sm text-white/80">{culture.speakers} speakers</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{culture.description}</p>
                  <h4 className="font-bold mb-3">Cultural Highlights:</h4>
                  <ul className="space-y-2 mb-6">
                    {culture.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <Star className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    href={`/resources/culture/${culture.slug}`} 
                    variant="primary" 
                    fullWidth
                  >
                    Explore {culture.language} Culture
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Topics */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What You'll Learn
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our cultural resources cover every aspect of African life, helping children and families 
              connect with their heritage in meaningful ways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalTopics.map((topic, index) => (
              <Card key={index} hover="lift">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${topic.color} rounded-full flex items-center justify-center mb-4`}>
                    <topic.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">
              Popular Cultural Resources
            </h2>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <Card key={index} hover="lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg mb-2">{resource.title}</h3>
                        <p className="text-gray-600 mb-2">{resource.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.downloads} downloads</span>
                        </div>
                      </div>
                      <Button href="/resources/free" variant="secondary" size="sm">
                        View Resource
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button href="/resources/free" variant="outline">
                Browse All Cultural Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Activities */}
      <section className="py-16 bg-white">
        <div className="container">
          <Card variant="gradient" className="text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Bring Culture Home
              </h2>
              <p className="text-lg mb-8 text-white/90 max-w-3xl mx-auto">
                Looking for ways to celebrate African culture with your family? Our monthly cultural 
                activity boxes include crafts, recipes, music playlists, and storytelling guides to 
                create immersive cultural experiences at home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/shop" variant="accent" size="lg">
                  Explore Activity Boxes
                </Button>
                <Button 
                  href="/resources/free" 
                  variant="outline" 
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-primary"
                >
                  Free Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Experience Culture Through Language
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            The best way to understand a culture is to speak its language. Start your child's 
            journey today with native speakers who bring culture to life in every lesson.
          </p>
          <Button href="/register" variant="accent" size="lg">
            Book Your Cultural Journey
          </Button>
        </div>
      </section>
    </>
  )
}