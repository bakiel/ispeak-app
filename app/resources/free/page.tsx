'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Download, 
  FileText, 
  Music, 
  Video, 
  Book, 
  Printer,
  Filter,
  Search,
  ChevronRight,
  Clock,
  Users,
  Star,
  Calendar,
  Gamepad2,
  Home,
  RefreshCw,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

type ResourceCategory = 'all' | 'worksheets' | 'songs' | 'videos' | 'stories' | 'activities'
type Language = 'all' | 'yoruba' | 'kiswahili' | 'twi'
type AgeGroup = 'all' | '3-5' | '6-8' | '9-11' | '12-14'

export default function FreeResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('all')
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLanguageFilter, setActiveLanguageFilter] = useState('all-languages')
  const [activeTypeFilter, setActiveTypeFilter] = useState('all-types')
  const [activeAgeFilter, setActiveAgeFilter] = useState('all-ages')

  const resources = [
    {
      id: 1,
      title: 'Yoruba Alphabet Coloring Pages',
      category: 'worksheets',
      language: 'yoruba',
      ageGroup: '3-5',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1247,
      rating: 4.8,
      description: 'Fun coloring pages featuring the Yoruba alphabet with pictures and pronunciation guides.',
      thumbnail: '/images/square/Child_learning_online_with_headphones.png',
      featured: true,
    },
    {
      id: 2,
      title: 'Kiswahili Numbers Song',
      category: 'songs',
      language: 'kiswahili',
      ageGroup: '3-5',
      type: 'MP3',
      size: '3.8 MB',
      downloads: 892,
      rating: 4.9,
      description: 'Catchy song to help children learn numbers 1-10 in Kiswahili with native pronunciation.',
      thumbnail: '/images/square/Children_learning_languages_together.png',
      featured: true,
    },
    {
      id: 3,
      title: 'Twi Greetings Flashcards',
      category: 'worksheets',
      language: 'twi',
      ageGroup: '6-8',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 654,
      rating: 4.7,
      description: 'Printable flashcards with common Twi greetings and responses, perfect for daily practice.',
      thumbnail: '/images/square/Mother_and_daughter_studying_together.png',
      featured: false,
    },
    {
      id: 4,
      title: 'African Folk Tales Collection',
      category: 'stories',
      language: 'all',
      ageGroup: '6-8',
      type: 'PDF',
      size: '5.2 MB',
      downloads: 2103,
      rating: 4.9,
      description: 'Collection of traditional African stories with moral lessons, available in multiple languages.',
      thumbnail: '/images/square/Grandmother_storytelling_to_children.png',
      featured: true,
    },
    {
      id: 5,
      title: 'Yoruba Family Tree Activity',
      category: 'activities',
      language: 'yoruba',
      ageGroup: '9-11',
      type: 'PDF',
      size: '1.2 MB',
      downloads: 432,
      rating: 4.6,
      description: 'Interactive worksheet to learn family member names in Yoruba while creating a family tree.',
      thumbnail: '/images/square/Child_happily_reading_book.png',
      featured: false,
    },
    {
      id: 6,
      title: 'Kiswahili Animal Sounds Video',
      category: 'videos',
      language: 'kiswahili',
      ageGroup: '3-5',
      type: 'Video Link',
      size: 'Stream',
      downloads: 1567,
      rating: 4.8,
      description: 'Fun animated video teaching animal names and sounds in Kiswahili.',
      thumbnail: '/images/square/Child_holding_a_Well_done_certificate.png',
      featured: false,
    },
    {
      id: 7,
      title: 'Twi Days of the Week Song',
      category: 'songs',
      language: 'twi',
      ageGroup: '6-8',
      type: 'MP3',
      size: '2.9 MB',
      downloads: 789,
      rating: 4.7,
      description: 'Rhythmic song to memorize the days of the week in Twi with traditional instruments.',
      thumbnail: '/images/square/Children_learning_languages_together.png',
      featured: false,
    },
    {
      id: 8,
      title: 'African Proverbs Workbook',
      category: 'worksheets',
      language: 'all',
      ageGroup: '12-14',
      type: 'PDF',
      size: '3.4 MB',
      downloads: 567,
      rating: 4.8,
      description: 'Collection of African proverbs with explanations and activities for older learners.',
      thumbnail: '/images/square/Child_learning_online_with_headphones.png',
      featured: false,
    },
  ]

  const categories = [
    { value: 'all', label: 'All Resources', icon: FileText },
    { value: 'worksheets', label: 'Worksheets', icon: Printer },
    { value: 'songs', label: 'Songs', icon: Music },
    { value: 'videos', label: 'Videos', icon: Video },
    { value: 'stories', label: 'Stories', icon: Book },
    { value: 'activities', label: 'Activities', icon: Users },
  ]

  const languages = [
    { value: 'all', label: 'All Languages' },
    { value: 'yoruba', label: 'Yoruba' },
    { value: 'kiswahili', label: 'Kiswahili' },
    { value: 'twi', label: 'Twi' },
  ]

  const ageGroups = [
    { value: 'all', label: 'All Ages' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-8', label: '6-8 years' },
    { value: '9-11', label: '9-11 years' },
    { value: '12-14', label: '12-14 years' },
  ]

  // Filter resources based on selections
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage || resource.language === 'all'
    const matchesAge = selectedAge === 'all' || resource.ageGroup === selectedAge
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesLanguage && matchesAge && matchesSearch
  })

  const featuredResources = resources.filter(r => r.featured)

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-primary py-16 md:py-20">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Free Resources
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Downloadable language materials to support your child's learning journey
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section className="bg-gray-100 py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-secondary hover:text-secondary/80 flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href="/resources" className="text-secondary hover:text-secondary/80">
                  Resources
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-600">Free Resources</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6 text-center">
              Enhance Your Child's Language Learning
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Welcome to our free resource library! Here you'll find a variety of downloadable materials 
              to support your child's language learning journey. From vocabulary sheets and pronunciation 
              guides to fun activities and games, these resources are designed to reinforce lessons and 
              make language learning enjoyable.
            </p>
            <p className="text-lg text-gray-600">
              All resources are available without membership and can be downloaded instantly. For even 
              more comprehensive materials, consider{' '}
              <Link href="/register" className="text-secondary hover:underline">
                registering
              </Link>{' '}
              for a free account or becoming an iSPEAK member.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12 bg-accent/10">
        <div className="container">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id} hover="lift" className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={resource.thumbnail}
                    alt={resource.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {resource.downloads}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-accent" />
                        {resource.rating}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-primary">{resource.size}</span>
                  </div>
                  <Button variant="primary" fullWidth size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Free
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Filters */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Find Resources</h3>
              
              {/* Language Filters */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Language</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setActiveLanguageFilter('all-languages')
                      setSelectedLanguage('all')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeLanguageFilter === 'all-languages'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All Languages
                  </button>
                  <button
                    onClick={() => {
                      setActiveLanguageFilter('yoruba')
                      setSelectedLanguage('yoruba')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeLanguageFilter === 'yoruba'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Yoruba
                  </button>
                  <button
                    onClick={() => {
                      setActiveLanguageFilter('kiswahili')
                      setSelectedLanguage('kiswahili')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeLanguageFilter === 'kiswahili'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Kiswahili
                  </button>
                  <button
                    onClick={() => {
                      setActiveLanguageFilter('twi')
                      setSelectedLanguage('twi')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeLanguageFilter === 'twi'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Twi
                  </button>
                  <button
                    onClick={() => {
                      setActiveLanguageFilter('multiple')
                      setSelectedLanguage('all')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeLanguageFilter === 'multiple'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Multiple Languages
                  </button>
                </div>
              </div>
              
              {/* Resource Type Filters */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Resource Type</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setActiveTypeFilter('all-types')
                      setSelectedCategory('all')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTypeFilter === 'all-types'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => {
                      setActiveTypeFilter('vocabulary')
                      setSelectedCategory('worksheets')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTypeFilter === 'vocabulary'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Vocabulary
                  </button>
                  <button
                    onClick={() => {
                      setActiveTypeFilter('pronunciation')
                      setSelectedCategory('worksheets')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTypeFilter === 'pronunciation'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Pronunciation
                  </button>
                  <button
                    onClick={() => {
                      setActiveTypeFilter('activities')
                      setSelectedCategory('activities')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTypeFilter === 'activities'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Activities
                  </button>
                  <button
                    onClick={() => {
                      setActiveTypeFilter('games')
                      setSelectedCategory('activities')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTypeFilter === 'games'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Games
                  </button>
                  <button
                    onClick={() => {
                      setActiveTypeFilter('cultural')
                      setSelectedCategory('stories')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTypeFilter === 'cultural'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cultural
                  </button>
                </div>
              </div>
              
              {/* Age Group Filters */}
              <div>
                <h4 className="text-lg font-medium mb-3">Age Group</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setActiveAgeFilter('all-ages')
                      setSelectedAge('all')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeAgeFilter === 'all-ages'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All Ages
                  </button>
                  <button
                    onClick={() => {
                      setActiveAgeFilter('ages-3-5')
                      setSelectedAge('3-5')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeAgeFilter === 'ages-3-5'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Ages 3-5
                  </button>
                  <button
                    onClick={() => {
                      setActiveAgeFilter('ages-6-9')
                      setSelectedAge('6-8')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeAgeFilter === 'ages-6-9'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Ages 6-9
                  </button>
                  <button
                    onClick={() => {
                      setActiveAgeFilter('ages-10-14')
                      setSelectedAge('12-14')
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeAgeFilter === 'ages-10-14'
                        ? 'bg-accent text-primary'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Ages 10-14
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Resources Section */}
      <section className="py-16 md:py-20">
        <div className="container">

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as ResourceCategory)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <cat.icon className="w-5 h-5 mr-2" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} hover="lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-lg mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </div>
                    <div className="ml-4">
                      {resource.category === 'worksheets' && <Printer className="w-8 h-8 text-primary" />}
                      {resource.category === 'songs' && <Music className="w-8 h-8 text-secondary" />}
                      {resource.category === 'videos' && <Video className="w-8 h-8 text-accent" />}
                      {resource.category === 'stories' && <Book className="w-8 h-8 text-coral" />}
                      {resource.category === 'activities' && <Users className="w-8 h-8 text-primary" />}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {resource.language === 'all' ? 'Multiple Languages' : resource.language.charAt(0).toUpperCase() + resource.language.slice(1)}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      Ages {resource.ageGroup}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {resource.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {resource.downloads}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-accent" />
                        {resource.rating}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{resource.size}</span>
                  </div>

                  <Button variant="secondary" fullWidth size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No resources found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedLanguage('all')
                  setSelectedAge('all')
                  setSearchQuery('')
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Flashcards Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-6 text-center">
              Interactive Flashcards Preview
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Try our interactive flashcards to help with vocabulary practice. Hover over or tap a card to see the translation. 
              Download the full set as printable PDFs below.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Flashcard 1 */}
              <div>
                <div className="flashcard">
                  <div className="flashcard-inner">
                    <div className="flashcard-front">
                      <h4 className="text-xl font-bold mb-2">Jambo</h4>
                      <p className="text-gray-600 italic">(Kiswahili)</p>
                      <div className="flip-indicator">
                        <RefreshCw className="w-4 h-4 inline mr-1" /> Hover to flip
                      </div>
                    </div>
                    <div className="flashcard-back">
                      <h4 className="text-xl font-bold mb-2">Hello</h4>
                      <p className="italic">A common greeting in Kiswahili</p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-sm font-medium">From the Kiswahili Greetings set</span>
                </div>
              </div>
              
              {/* Flashcard 2 */}
              <div>
                <div className="flashcard">
                  <div className="flashcard-inner">
                    <div className="flashcard-front">
                      <h4 className="text-xl font-bold mb-2">Bawo ni</h4>
                      <p className="text-gray-600 italic">(Yoruba)</p>
                      <div className="flip-indicator">
                        <RefreshCw className="w-4 h-4 inline mr-1" /> Hover to flip
                      </div>
                    </div>
                    <div className="flashcard-back">
                      <h4 className="text-xl font-bold mb-2">How are you</h4>
                      <p className="italic">A common greeting in Yoruba</p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-sm font-medium">From the Yoruba Greetings set</span>
                </div>
              </div>
              
              {/* Flashcard 3 */}
              <div>
                <div className="flashcard">
                  <div className="flashcard-inner">
                    <div className="flashcard-front">
                      <h4 className="text-xl font-bold mb-2">Ɛte sɛn</h4>
                      <p className="text-gray-600 italic">(Twi)</p>
                      <div className="flip-indicator">
                        <RefreshCw className="w-4 h-4 inline mr-1" /> Hover to flip
                      </div>
                    </div>
                    <div className="flashcard-back">
                      <h4 className="text-xl font-bold mb-2">How are you</h4>
                      <p className="italic">A common greeting in Twi</p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-sm font-medium">From the Twi Greetings set</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-bold mb-3">Download Full Flashcard Sets</h4>
              <div className="flex justify-center flex-wrap gap-3">
                <Button variant="secondary" size="sm">
                  Kiswahili Greetings (PDF)
                </Button>
                <Button variant="secondary" size="sm">
                  Yoruba Greetings (PDF)
                </Button>
                <Button variant="secondary" size="sm">
                  Twi Greetings (PDF)
                </Button>
                <Button variant="secondary" size="sm">
                  Complete Set (PDF)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Printable Activities */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8">Printable Activities & Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Activity 1 */}
              <Card hover="lift">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src="/images/square/Child_learning_online_with_headphones.png"
                    alt="Yoruba Word Search"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Yoruba</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl">Yoruba Word Search</h3>
                    <span className="text-xs bg-coral/10 text-coral px-2 py-1 rounded-full">Ages 10-14</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Fun word search puzzles with Yoruba vocabulary words related to family, food, animals, 
                    and everyday objects.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Game</span>
                      <span className="text-xs text-gray-500 ml-2">PDF, 4 Pages</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Activity 2 */}
              <Card hover="lift">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src="/images/landscape/Child_learning_languages_online.jpg"
                    alt="Kiswahili Matching Game"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Kiswahili</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl">Kiswahili Matching Game</h3>
                    <span className="text-xs bg-coral/10 text-coral px-2 py-1 rounded-full">Ages 3-5</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Printable memory matching cards with Kiswahili words and corresponding pictures. 
                    Great for young learners!
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Game</span>
                      <span className="text-xs text-gray-500 ml-2">PDF, 6 Pages</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Activity 3 */}
              <Card hover="lift">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src="/images/landscape/Kid_learning_Kiswahili_numbers.jpg"
                    alt="Twi Coloring Activity"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Twi</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl">Twi Coloring Activity</h3>
                    <span className="text-xs bg-coral/10 text-coral px-2 py-1 rounded-full">Ages 3-5</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Coloring pages with Twi vocabulary words and cultural symbols. 
                    Includes pronunciation guide for parents.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Activity</span>
                      <span className="text-xs text-gray-500 ml-2">PDF, 10 Pages</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pronunciation Guides */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8">Pronunciation Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Yoruba Tone Guide */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl">Yoruba Tone Guide</h3>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Yoruba</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Learn about the three tones in Yoruba language and how they change the meaning of words. 
                    Includes audio examples and practice exercises.
                  </p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium mb-2">Sample from the guide:</p>
                    <p className="text-sm mb-2">Yoruba is a tonal language with three basic tones:</p>
                    <ul className="text-sm list-disc pl-5 mb-2">
                      <li>High tone (´): as in <strong>bá</strong> (to meet)</li>
                      <li>Mid tone (unmarked): as in <strong>ba</strong> (to perch)</li>
                      <li>Low tone (`): as in <strong>bà</strong> (to hide)</li>
                    </ul>
                    <p className="text-sm">Notice how changing the tone changes the meaning completely!</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Audio</span>
                      <span className="text-xs text-gray-500 ml-2">PDF + MP3s</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Kiswahili Pronunciation */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl">Kiswahili Pronunciation</h3>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Kiswahili</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Comprehensive guide to Kiswahili pronunciation with audio examples. 
                    Perfect for parents learning alongside their children.
                  </p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium mb-2">Sample from the guide:</p>
                    <p className="text-sm mb-2">Kiswahili vowels are pronounced clearly and consistently:</p>
                    <ul className="text-sm list-disc pl-5 mb-2">
                      <li>A - pronounced as in "father"</li>
                      <li>E - pronounced as in "bet"</li>
                      <li>I - pronounced as in "meet"</li>
                      <li>O - pronounced as in "more"</li>
                      <li>U - pronounced as in "roof"</li>
                    </ul>
                    <p className="text-sm">Each vowel represents one syllable, so "jambo" is pronounced "jam-bo" (two syllables).</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Audio</span>
                      <span className="text-xs text-gray-500 ml-2">PDF + MP3s</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Twi Sounds & Symbols */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl">Twi Sounds & Symbols</h3>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Twi</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Guide to Twi special characters, sounds, and tone system with audio examples 
                    and practice words.
                  </p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium mb-2">Sample from the guide:</p>
                    <p className="text-sm mb-2">Twi uses some special characters not found in English:</p>
                    <ul className="text-sm list-disc pl-5 mb-2">
                      <li>Ɛ - pronounced like "e" in "let" but more open</li>
                      <li>Ɔ - pronounced like "o" in "hot" but more rounded</li>
                      <li>Ŋ - pronounced like "ng" in "singing"</li>
                    </ul>
                    <p className="text-sm">Mastering these special sounds is essential for proper Twi pronunciation.</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Audio</span>
                      <span className="text-xs text-gray-500 ml-2">PDF + MP3s</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Materials */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8">Cultural Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cultural Festivals Guide */}
              <Card hover="lift">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 h-48 md:h-auto">
                    <Image
                      src="/images/landscape/Family_celebrating_Kwanzaa_Umoja.jpg"
                      alt="Cultural Festivals Guide"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-3/5 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading font-bold text-xl">Cultural Festivals Guide</h3>
                      <span className="text-xs bg-coral/10 text-coral px-2 py-1 rounded-full">Multiple Languages</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Overview of important cultural festivals across West and East Africa with vocabulary, 
                      traditions, and activities for families.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">All Ages</span>
                        <span className="text-xs text-gray-500 ml-2">PDF, 12 Pages</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" /> Download
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
              
              {/* Adinkra Symbols Guide */}
              <Card hover="lift">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 h-48 md:h-auto">
                    <Image
                      src="/images/landscape/Birds_on_trees_listening_speaking_reading.jpg"
                      alt="Adinkra Symbols Guide"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-3/5 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading font-bold text-xl">Adinkra Symbols Guide</h3>
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Twi</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Introduction to traditional Ghanaian Adinkra symbols, their meanings, 
                      and pronunciation of their Twi names.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Ages 6+</span>
                        <span className="text-xs text-gray-500 ml-2">PDF, 8 Pages</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" /> Download
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Members Area Promotion */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-secondary/10 border-secondary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-2/3">
                    <h2 className="font-heading text-3xl font-bold mb-4">
                      Get Access to Premium Resources
                    </h2>
                    <p className="text-gray-700 mb-6">
                      These free resources are just the beginning! When you register for an iSPEAK account 
                      or become a member, you'll unlock hundreds of additional premium resources, including:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" />
                        <span>Complete vocabulary building sets</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" />
                        <span>Interactive audio lessons</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" />
                        <span>Age-appropriate reading materials</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" />
                        <span>Cultural deep-dive guides</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" />
                        <span>Video lessons and demonstrations</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" />
                        <span>Parent support materials</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button href="/register" variant="primary">
                        Register Free Account
                      </Button>
                      <Button href="/pricing" variant="secondary">
                        Explore Membership
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 text-center">
                    <Image
                      src="/images/square/Child_holding_a_Well_done_certificate.png"
                      alt="Premium member resources"
                      width={300}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Teacher Tips for Parents */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">
              Teacher Tips for Parents
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tip 1 */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-secondary mb-4">
                    <Calendar className="w-12 h-12" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">Consistency is Key</h3>
                  <p className="text-gray-600">
                    Set aside regular time for language practice, even if it's just 10-15 minutes per day. 
                    Consistent exposure is more effective than occasional longer sessions.
                  </p>
                </CardContent>
              </Card>
              
              {/* Tip 2 */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-secondary mb-4">
                    <Gamepad2 className="w-12 h-12" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">Make it Playful</h3>
                  <p className="text-gray-600">
                    Children learn best through play. Use the games and activities provided to create 
                    fun learning experiences rather than formal study sessions.
                  </p>
                </CardContent>
              </Card>
              
              {/* Tip 3 */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-secondary mb-4">
                    <Home className="w-12 h-12" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">Create a Language Corner</h3>
                  <p className="text-gray-600">
                    Designate a special area in your home where language resources are displayed 
                    and accessible. This visual reminder encourages regular engagement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Get New Resources Weekly
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter and receive new free resources every week, 
              plus teaching tips and cultural insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                required
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Want More Interactive Learning?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            While our free resources are great for practice at home, nothing beats live interaction 
            with native speakers. Try a free trial lesson today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/register" variant="accent" size="lg">
              Book a Free Trial
            </Button>
            <Button href="/pricing" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              View Our Programs
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}