'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Globe, 
  Music, 
  Utensils, 
  Users, 
  Book,
  Calendar,
  Crown,
  Palette,
  Heart,
  Home,
  ChevronRight,
  Play,
  Download,
  Star,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs, Tab } from '@/components/ui/Tabs'

export default function YorubaCulturePage() {
  const cultureTabs: Tab[] = [
    { 
      id: 'overview', 
      label: 'Overview', 
      content: <OverviewContent /> 
    },
    { 
      id: 'traditions', 
      label: 'Traditions', 
      content: <TraditionsContent /> 
    },
    { 
      id: 'language', 
      label: 'Language & Names', 
      content: <LanguageContent /> 
    },
    { 
      id: 'arts', 
      label: 'Arts & Music', 
      content: <ArtsContent /> 
    },
    { 
      id: 'food', 
      label: 'Food & Cuisine', 
      content: <FoodContent /> 
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-secondary py-16 md:py-20">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-white">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-white/80">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li><Link href="/resources/culture" className="hover:text-white">Culture</Link></li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li className="text-white">Yoruba</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Yoruba Culture & Heritage
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Discover the rich traditions of one of West Africa's most influential cultures, 
                spanning Nigeria, Benin, and Togo with over 40 million speakers worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/register" variant="accent" size="lg">
                  Learn Yoruba
                </Button>
                <Button 
                  href="/resources/free" 
                  variant="outline" 
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-primary"
                >
                  Free Resources
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">40M+</p>
              <p className="text-gray-600">Native Speakers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">3</p>
              <p className="text-gray-600">Countries</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">1000+</p>
              <p className="text-gray-600">Years of History</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-coral">400+</p>
              <p className="text-gray-600">Orisha (Deities)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Tabs tabs={cultureTabs} defaultActiveTab="overview" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Start Your Yoruba Journey Today
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Connect your child with their Yoruba heritage through engaging lessons with native speakers 
            who bring the culture to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/register" variant="accent" size="lg">
              Book a Free Trial
            </Button>
            <Button href="/pricing" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              View Programs
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

// Tab Content Components
function OverviewContent() {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="font-heading text-2xl font-bold mb-4">The Yoruba People</h2>
        <p className="text-gray-600 mb-6">
          The Yoruba people are one of the largest ethnic groups in Africa, with a rich cultural 
          heritage that has influenced art, religion, and philosophy across the globe. Traditionally 
          based in southwestern Nigeria, as well as parts of Benin and Togo, the Yoruba have created 
          one of Africa's most sophisticated civilizations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <Globe className="w-12 h-12 text-secondary mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3">Geographic Spread</h3>
              <p className="text-gray-600 mb-4">
                Originally from the Yorubaland region of West Africa, Yoruba culture has spread 
                globally through the diaspora, particularly to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Brazil (Candomblé religion)</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Cuba (Santería/Lucumí)</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Trinidad & Tobago (Orisha faith)</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>United States (Growing communities)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Crown className="w-12 h-12 text-accent mb-4" />
              <h3 className="font-heading font-bold text-xl mb-3">Historical Kingdoms</h3>
              <p className="text-gray-600 mb-4">
                The Yoruba established powerful city-states and kingdoms, each with its own 
                unique contributions to Yoruba civilization:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Ife - The spiritual homeland</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Oyo - The political capital</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Benin - The artistic center</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Ibadan - The warrior state</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <h2 className="font-heading text-2xl font-bold mb-4">Core Values & Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover="lift">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-coral mx-auto mb-4" />
              <h4 className="font-bold mb-2">Omoluabi</h4>
              <p className="text-gray-600">
                The concept of good character, integrity, and being a complete person
              </p>
            </CardContent>
          </Card>
          <Card hover="lift">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-bold mb-2">Iwa Pele</h4>
              <p className="text-gray-600">
                Gentle character - the highest form of beauty in Yoruba philosophy
              </p>
            </CardContent>
          </Card>
          <Card hover="lift">
            <CardContent className="p-6 text-center">
              <Home className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2">Ebi</h4>
              <p className="text-gray-600">
                Extended family system that provides support and maintains traditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function TraditionsContent() {
  const traditions = [
    {
      title: 'Naming Ceremony (Isomoloruko)',
      description: 'A elaborate 8-day ceremony where a child receives their names, each with specific meanings and prayers',
      icon: Users,
      details: [
        'Held on the 8th day after birth',
        'Multiple names given by different family members',
        'Symbolic items like honey, salt, and water used',
        'Community celebration with feast',
      ],
    },
    {
      title: 'Egungun Festival',
      description: 'Annual masquerade festival honoring ancestors and celebrating the continuity of life',
      icon: Crown,
      details: [
        'Elaborate costumes representing ancestors',
        'Sacred rituals and prayers',
        'Community processions and dances',
        'Passing of wisdom and blessings',
      ],
    },
    {
      title: 'Marriage Traditions',
      description: 'Multi-stage process involving both families, demonstrating respect and building bonds',
      icon: Heart,
      details: [
        'Introduction ceremony (Mo mi i mo e)',
        'Family investigation and approval',
        'Bride price and gift exchange',
        'Traditional engagement (Idana)',
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="font-heading text-2xl font-bold mb-4">Living Traditions</h2>
        <p className="text-gray-600 mb-8">
          Yoruba traditions are not mere customs of the past but living practices that continue 
          to bind communities together and pass wisdom across generations. These ceremonies and 
          festivals mark important life transitions and seasonal celebrations.
        </p>
      </div>

      <div className="space-y-6">
        {traditions.map((tradition, index) => (
          <Card key={index} hover="lift">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <tradition.icon className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl mb-2">{tradition.title}</h3>
                  <p className="text-gray-600 mb-4">{tradition.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tradition.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center">
                        <Star className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card variant="accent">
        <CardContent className="p-8 text-center">
          <h3 className="font-heading font-bold text-2xl mb-4">Experience Yoruba Traditions</h3>
          <p className="text-gray-700 mb-6">
            Want to participate in or learn more about Yoruba cultural events in your area? 
            Join our community network to connect with local celebrations and ceremonies.
          </p>
          <Button href="/contact" variant="primary">
            Connect With Community
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function LanguageContent() {
  const greetings = [
    { yoruba: 'E kaaro', english: 'Good morning', pronunciation: 'Eh kah-roh' },
    { yoruba: 'E kaasan', english: 'Good afternoon', pronunciation: 'Eh kah-sahn' },
    { yoruba: 'E ku irole', english: 'Good evening', pronunciation: 'Eh koo ee-roh-leh' },
    { yoruba: 'O daa bi?', english: 'How are you?', pronunciation: 'Oh dah bee?' },
    { yoruba: 'A dupe', english: 'Thank you', pronunciation: 'Ah doo-peh' },
  ]

  const nameCategories = [
    {
      category: 'Oruko Amutorunwa',
      description: 'Names given based on circumstances of birth',
      examples: ['Taiwo (first twin)', 'Kehinde (second twin)', 'Idowu (child after twins)'],
    },
    {
      category: 'Oruko Abiso',
      description: 'Names given at naming ceremony',
      examples: ['Ayomide (my joy has come)', 'Oluwaseun (God has done it)', 'Adunni (sweet to have)'],
    },
    {
      category: 'Oriki',
      description: 'Praise names and family poetry',
      examples: ['Akanbi (bravely born)', 'Akintunde (bravery returns)', 'Aduke (beloved)'],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="font-heading text-2xl font-bold mb-4">The Yoruba Language</h2>
        <p className="text-gray-600 mb-6">
          Yoruba is a tonal language with three basic tones (high, mid, and low) that change 
          word meanings. It's written using the Latin alphabet with additional letters and 
          diacritical marks. The language is rich in proverbs, which are considered the 
          "horses of speech" - vehicles for conveying wisdom.
        </p>
      </div>

      {/* Common Greetings */}
      <Card>
        <CardHeader>
          <CardTitle>Essential Greetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {greetings.map((greeting, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <p className="font-bold text-lg text-primary">{greeting.yoruba}</p>
                <p className="text-gray-600">{greeting.english}</p>
                <p className="text-sm text-gray-500 italic">"{greeting.pronunciation}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Yoruba Names */}
      <div>
        <h3 className="font-heading text-xl font-bold mb-4">Understanding Yoruba Names</h3>
        <p className="text-gray-600 mb-6">
          Yoruba names are not just labels but carry deep meanings, prayers, and family history. 
          Each child typically receives multiple names from different family members.
        </p>
        
        <div className="space-y-4">
          {nameCategories.map((category, index) => (
            <Card key={index} hover="lift">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2">{category.category}</h4>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">
                      {example}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Proverbs */}
      <Card variant="gradient" className="text-white">
        <CardContent className="p-8">
          <h3 className="font-heading text-2xl font-bold mb-4">Yoruba Proverbs (Owe)</h3>
          <p className="text-white/90 mb-6">
            Proverbs are central to Yoruba communication, encoding centuries of wisdom in memorable phrases:
          </p>
          <div className="space-y-4">
            <blockquote className="border-l-4 border-white/50 pl-4">
              <p className="font-medium">"Bi a ba n gun yan ninu odo, bi a ba n se obe ninu epo epa, obe naa o le dun bi eni pe a fi ata ilu Yoruba se."</p>
              <p className="text-sm text-white/80 mt-2">No matter how well-prepared, food lacks flavor without Yoruba pepper.</p>
            </blockquote>
            <blockquote className="border-l-4 border-white/50 pl-4">
              <p className="font-medium">"Ti a ba fi oju oloju wo oju orun, oju oloju a foo."</p>
              <p className="text-sm text-white/80 mt-2">If we use a jealous person's eyes to look at the sky, their eyes will go blind.</p>
            </blockquote>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ArtsContent() {
  const artForms = [
    {
      title: 'Bronze Casting',
      description: 'The Yoruba, particularly in Ife and Benin, created some of the world\'s finest bronze sculptures',
      image: '/images/square/Grandmother_storytelling_to_children.png',
      highlights: ['Lost-wax casting technique', 'Naturalistic portraits', 'Royal commemorative heads'],
    },
    {
      title: 'Textiles & Adire',
      description: 'Traditional resist-dye techniques creating intricate patterns on cloth',
      image: '/images/square/Mother_and_daughter_studying_together.png',
      highlights: ['Indigo dyeing', 'Symbolic patterns', 'Storytelling through design'],
    },
    {
      title: 'Drumming & Music',
      description: 'Complex polyrhythmic traditions with talking drums that mimic tonal language',
      image: '/images/square/Children_learning_languages_together.png',
      highlights: ['Dundun (talking drum)', 'Bata sacred drums', 'Call-and-response singing'],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="font-heading text-2xl font-bold mb-4">Artistic Excellence</h2>
        <p className="text-gray-600 mb-8">
          Yoruba artistic traditions have influenced global art movements and continue to inspire 
          contemporary artists. From the classical bronze heads of Ife to modern Afrobeat music, 
          Yoruba creativity spans centuries and continents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artForms.map((art, index) => (
          <Card key={index} hover="lift" className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={art.image}
                alt={art.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-lg mb-2">{art.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{art.description}</p>
              <ul className="space-y-1">
                {art.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <ChevronRight className="w-4 h-4 text-accent mr-1" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Music Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Music className="w-6 h-6 mr-2 text-secondary" />
            Musical Heritage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Yoruba music has profoundly influenced world music, from traditional sacred rhythms 
            to contemporary Afrobeat. The talking drum tradition allows drummers to literally 
            "speak" through their instruments, mimicking the tonal patterns of the language.
          </p>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-bold mb-3">Listen & Learn</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Traditional Yoruba Drums</p>
                  <p className="text-sm text-gray-600">Experience authentic rhythms</p>
                </div>
                <Button variant="secondary" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Play Sample
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Children's Songs Collection</p>
                  <p className="text-sm text-gray-600">Learn through music</p>
                </div>
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FoodContent() {
  const dishes = [
    {
      name: 'Jollof Rice',
      description: 'Aromatic rice cooked in tomato sauce with spices',
      ingredients: ['Rice', 'Tomatoes', 'Peppers', 'Onions', 'Traditional spices'],
      occasion: 'Celebrations and everyday meals',
    },
    {
      name: 'Pounded Yam & Egusi',
      description: 'Smooth yam paste served with melon seed soup',
      ingredients: ['Yam', 'Melon seeds', 'Leafy vegetables', 'Meat or fish', 'Palm oil'],
      occasion: 'Traditional family dinners',
    },
    {
      name: 'Akara',
      description: 'Deep-fried bean cakes, crispy outside and fluffy inside',
      ingredients: ['Black-eyed peas', 'Onions', 'Peppers', 'Salt', 'Oil for frying'],
      occasion: 'Breakfast or street food snack',
    },
    {
      name: 'Ewa Agoyin',
      description: 'Mashed beans with spicy palm oil sauce',
      ingredients: ['Honey beans', 'Palm oil', 'Dried peppers', 'Onions', 'Crayfish'],
      occasion: 'Popular street food and comfort meal',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="font-heading text-2xl font-bold mb-4">Yoruba Cuisine</h2>
        <p className="text-gray-600 mb-8">
          Yoruba cuisine reflects the agricultural richness of the region and the importance of 
          communal dining. Meals are often shared from common dishes, reinforcing family bonds. 
          The cuisine emphasizes fresh ingredients, bold flavors, and time-honored cooking methods.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dishes.map((dish, index) => (
          <Card key={index} hover="lift">
            <CardContent className="p-6">
              <div className="flex items-start">
                <Utensils className="w-8 h-8 text-coral mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-lg mb-2">{dish.name}</h3>
                  <p className="text-gray-600 mb-3">{dish.description}</p>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Key Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {dish.ingredients.map((ingredient, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Best for:</span> {dish.occasion}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cooking Classes CTA */}
      <Card variant="accent">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-4">Learn to Cook Yoruba Dishes</h3>
              <p className="text-gray-700 mb-4">
                Join our virtual cooking classes where children and families learn to prepare 
                traditional Yoruba dishes while practicing language skills with native speakers.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  <span>Monthly cooking workshops</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  <span>Learn food vocabulary</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  <span>Family-friendly recipes</span>
                </li>
              </ul>
              <Button href="/resources/free" variant="primary">
                Get Free Recipes
              </Button>
            </div>
            <div className="relative h-64">
              <Image
                src="/images/square/Mother_and_daughter_studying_together.png"
                alt="Cooking together"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}