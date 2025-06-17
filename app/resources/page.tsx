'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  BookOpen, 
  Download, 
  GraduationCap, 
  Users, 
  FileText,
  Video,
  Music,
  Gamepad2,
  Globe,
  Heart,
  ChevronRight,
  Star,
  ArrowRight,
  Check,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<'free-resources' | 'learning-articles' | 'cultural-information'>('free-resources')
  const [email, setEmail] = useState('')
  const [articleEmail, setArticleEmail] = useState('')
  
  const resourceCategories = [
    {
      title: 'Free Learning Materials',
      description: 'Downloadable worksheets, coloring pages, and activities for home practice',
      icon: Download,
      href: '/resources/free',
      color: 'bg-secondary',
      items: ['Printable Worksheets', 'Coloring Pages', 'Flashcards', 'Activity Sheets'],
      featured: true,
    },
    {
      title: 'Parent Resources',
      description: 'Guides and tips to support your child\'s language learning journey',
      icon: Users,
      href: '/resources/parents',
      color: 'bg-accent',
      items: ['Parent Guides', 'Progress Tracking', 'Home Practice Tips', 'FAQ'],
    },
    {
      title: 'Educational Articles',
      description: 'Expert insights on language learning, cultural education, and child development',
      icon: FileText,
      href: '/resources/articles',
      color: 'bg-coral',
      items: ['Language Learning Tips', 'Cultural Insights', 'Success Stories', 'Research'],
    },
    {
      title: 'Cultural Information',
      description: 'Learn about the rich cultures behind the languages we teach',
      icon: Globe,
      href: '/resources/culture',
      color: 'bg-primary',
      items: ['Traditions', 'Holidays', 'Food & Recipes', 'Music & Dance'],
    },
    {
      title: 'Video Library',
      description: 'Educational videos, songs, and cultural content for visual learners',
      icon: Video,
      href: '/resources/videos',
      color: 'bg-secondary',
      items: ['Language Songs', 'Cultural Stories', 'Tutorial Videos', 'Student Showcases'],
    },
    {
      title: 'Games & Interactive',
      description: 'Fun online games and activities to reinforce language learning',
      icon: Gamepad2,
      href: '/resources/games',
      color: 'bg-accent',
      items: ['Language Games', 'Quizzes', 'Interactive Stories', 'Puzzles'],
    },
  ]

  const featuredResources = [
    {
      title: 'Ultimate Parent\'s Guide to Heritage Language Learning',
      category: 'Guide',
      description: 'Everything you need to know about supporting your child\'s language journey',
      image: '/images/square/Mother_and_daughter_studying_together.png',
      downloadCount: '2.5k',
      rating: 4.9,
    },
    {
      title: 'African Folk Tales Collection',
      category: 'Stories',
      description: 'Traditional stories from across Africa with moral lessons and cultural insights',
      image: '/images/square/Grandmother_storytelling_to_children.png',
      downloadCount: '3.8k',
      rating: 4.8,
    },
    {
      title: 'Language Learning Songs Playlist',
      category: 'Music',
      description: 'Catchy songs in Yoruba, Kiswahili, and Twi to help memorization',
      image: '/images/square/Children_learning_languages_together.png',
      downloadCount: '5.2k',
      rating: 4.9,
    },
  ]

  const stats = [
    { number: '10,000+', label: 'Free Resources' },
    { number: '50+', label: 'Video Lessons' },
    { number: '100+', label: 'Cultural Articles' },
    { number: '25+', label: 'Interactive Games' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">iSPEAK Resources</h1>
            <p className="text-xl max-w-3xl mx-auto">Explore our collection of language learning materials, cultural guides, and educational resources</p>
          </div>
        </div>
      </section>

      {/* Resources Overview Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Discover Our Learning Resources</h2>
            <p className="text-lg text-gray-700">We've created a variety of educational materials to support your child's language learning journey. From downloadable practice sheets to cultural guides and learning activities, these resources help reinforce lessons and deepen cultural connections.</p>
          </div>
          
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
            <button
              onClick={() => setActiveCategory('free-resources')}
              className={`category-nav text-lg font-medium px-2 ${
                activeCategory === 'free-resources' ? 'border-b-3 border-accent font-semibold' : ''
              }`}
            >
              Free Resources
              <span className="inline-flex items-center justify-center w-6 h-6 bg-accent text-primary rounded-full text-xs font-semibold ml-2">12</span>
            </button>
            <button
              onClick={() => setActiveCategory('learning-articles')}
              className={`category-nav text-lg font-medium px-2 ${
                activeCategory === 'learning-articles' ? 'border-b-3 border-accent font-semibold' : ''
              }`}
            >
              Learning Articles
              <span className="inline-flex items-center justify-center w-6 h-6 bg-accent text-primary rounded-full text-xs font-semibold ml-2">8</span>
            </button>
            <button
              onClick={() => setActiveCategory('cultural-information')}
              className={`category-nav text-lg font-medium px-2 ${
                activeCategory === 'cultural-information' ? 'border-b-3 border-accent font-semibold' : ''
              }`}
            >
              Cultural Information
              <span className="inline-flex items-center justify-center w-6 h-6 bg-accent text-primary rounded-full text-xs font-semibold ml-2">10</span>
            </button>
          </div>
        </div>
      </section>

      {/* Free Resources Section */}
      {activeCategory === 'free-resources' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Free Resources</h2>
                <Link href="/resources/free" className="text-secondary hover:text-secondary/80 flex items-center">
                  View All Free Resources
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Resource Card 1 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/square/Child_happily_reading_book.png"
                      alt="Yoruba Alphabet Chart"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Yoruba</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Yoruba Alphabet Chart</h3>
                    <p className="text-gray-600 mb-4">Colorful printable chart showing all Yoruba alphabets with pronunciation guides and example words.</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">Printable</span>
                        <span className="text-xs text-gray-500">PDF, 2 Pages</span>
                      </div>
                      <Link href="#" className="flex items-center text-secondary font-medium hover:text-secondary/80">
                        <Download className="w-4 h-4 mr-1" /> Download
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Resource Card 2 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/landscape/Children_s_language_learning_materials.jpg"
                      alt="Kiswahili Number Flashcards"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Kiswahili</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Kiswahili Number Flashcards</h3>
                    <p className="text-gray-600 mb-4">Printable flashcards featuring numbers 1-20 in Kiswahili with colorful illustrations for learning and games.</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">Printable</span>
                        <span className="text-xs text-gray-500">PDF, 5 Pages</span>
                      </div>
                      <Link href="#" className="flex items-center text-secondary font-medium hover:text-secondary/80">
                        <Download className="w-4 h-4 mr-1" /> Download
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Resource Card 3 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/square/Children_learning_languages_together.png"
                      alt="Twi Greetings Guide"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Twi</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Twi Greetings Guide</h3>
                    <p className="text-gray-600 mb-4">Common greetings and responses in Twi with pronunciation guides and cultural context for proper usage.</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium mr-2">Audio</span>
                        <span className="text-xs text-gray-500">PDF + MP3</span>
                      </div>
                      <Link href="#" className="flex items-center text-secondary font-medium hover:text-secondary/80">
                        <Download className="w-4 h-4 mr-1" /> Download
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-xl font-bold mb-4">Featured Download</h3>
                  <div className="bg-gray-50 rounded-lg p-6 h-full flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3">
                      <Image
                        src="/images/square/Child_holding_a_Well_done_certificate.png"
                        alt="African Language Family Guide"
                        width={200}
                        height={200}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="text-xl font-bold mb-2">African Language Family Guide</h4>
                      <p className="text-gray-600 mb-4">This comprehensive guide introduces the major language families across Africa, including Bantu, Nilotic, Afroasiatic, and more. Perfect for parents and educators looking to provide broader context for language learning.</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                          <span>16-page illustrated guide with maps</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                          <span>Language relationship charts</span>
                        </div>
                        <div className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                          <span>Common word comparisons across languages</span>
                        </div>
                      </div>
                      <Button variant="primary">Download Free Guide</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Popular Resources</h3>
                  <Card>
                    <CardContent className="p-0">
                      <ul className="divide-y divide-gray-200">
                        <li className="hover:bg-gray-50 transition duration-150">
                          <Link href="#" className="block p-4">
                            <div className="flex items-start">
                              <div className="bg-accent text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                                <Star className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Cultural Coloring Pages</h4>
                                <p className="text-sm text-gray-600">Various African scenes and symbols</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-50 transition duration-150">
                          <Link href="#" className="block p-4">
                            <div className="flex items-start">
                              <div className="bg-secondary/20 text-secondary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                                <Music className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Children's Songs Collection</h4>
                                <p className="text-sm text-gray-600">Audio tracks with lyrics</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-50 transition duration-150">
                          <Link href="#" className="block p-4">
                            <div className="flex items-start">
                              <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                                <BookOpen className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Beginner's Conversation Guide</h4>
                                <p className="text-sm text-gray-600">Everyday phrases in all languages</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-50 transition duration-150">
                          <Link href="#" className="block p-4">
                            <div className="flex items-start">
                              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                                <Gamepad2 className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Language Learning Games</h4>
                                <p className="text-sm text-gray-600">Printable activities for practice</p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-6 border border-secondary/20">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">Members Get More</h3>
                    <p className="text-gray-700 mb-4">When you register for an iSPEAK account, you'll get access to our complete library of resources, including premium worksheets, audio lessons, and cultural guides. Many are available even before you book your first lesson!</p>
                    <Button variant="primary">Register Free Account</Button>
                  </div>
                  <div className="md:w-1/3 text-center">
                    <Image
                      src="/images/landscape/Child_holding_a_certificate.jpg"
                      alt="Child with certificate"
                      width={300}
                      height={200}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Learning Articles Section */}
      {activeCategory === 'learning-articles' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Learning Articles</h2>
                <Link href="/resources/articles" className="text-secondary hover:text-secondary/80 flex items-center">
                  View All Articles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              
              {/* Featured Article */}
              <div className="bg-gray-50 rounded-lg p-6 mb-12">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/5">
                    <Image
                      src="/images/square/Grandmother_storytelling_to_children.png"
                      alt="The Benefits of Early Language Learning"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md w-full h-auto"
                    />
                  </div>
                  <div className="md:w-3/5">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Heritage Learning</span>
                    <h3 className="text-2xl font-bold mb-3 mt-2">The Benefits of Early Language Learning</h3>
                    <p className="text-gray-700 mb-4">Research consistently shows that children who learn a second language before age 10 develop stronger cognitive abilities and cultural awareness. This comprehensive article explores the linguistic, cognitive, social, and cultural benefits of introducing your child to their heritage language during the formative years.</p>
                    <div className="article-preview mb-6">
                      <p className="text-gray-600">When children learn a second language at an early age, their brains develop different neural pathways compared to monolingual children. These additional pathways contribute to enhanced cognitive flexibility, improved problem-solving skills, and greater creativity. Furthermore, children who grow up with connections to multiple languages and cultures tend to demonstrate higher levels of empathy and cultural sensitivity.</p>
                      <p className="text-gray-600 mt-3">Heritage language learning, in particular, provides unique advantages by strengthening family bonds and creating a deeper sense of identity and belonging. Children who can communicate with grandparents and extended family in their heritage language often develop stronger intergenerational relationships and a more secure sense of self. This article examines the research behind these findings and offers practical advice for parents looking to support their child's language journey.</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src="/images/landscape/Smiling_person_in_colorful_shirt.jpg"
                          alt="Author"
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium">Dr. Maya Jenkins</p>
                          <p className="text-sm text-gray-500">Language Development Specialist</p>
                        </div>
                      </div>
                      <Button variant="secondary">Read Full Article</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Article Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Article Card 1 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/square/Mother_and_daughter_studying_together.png"
                      alt="Supporting Your Child's Language Journey"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Parenting Tips</span>
                    <h3 className="text-xl font-bold my-2">Supporting Your Child's Language Journey</h3>
                    <div className="article-preview mb-4">
                      <p className="text-gray-600">Practical strategies for parents who may not speak the target language themselves but want to support their child's learning at home. From creating a language-positive environment to finding community resources.</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">5 min read</p>
                      <Link href="#" className="text-secondary hover:text-secondary/80">Read More</Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Article Card 2 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/square/Child_learning_online_with_headphones.png"
                      alt="Making the Most of Online Lessons"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Learning Tips</span>
                    <h3 className="text-xl font-bold my-2">Making the Most of Online Lessons</h3>
                    <div className="article-preview mb-4">
                      <p className="text-gray-600">How to prepare your learning space, minimize distractions, and help your child engage fully with online language lessons. Includes tech tips and pre/post-lesson activities to maximize learning.</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">7 min read</p>
                      <Link href="#" className="text-secondary hover:text-secondary/80">Read More</Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Article Card 3 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/landscape/Family_celebrating_Kwanzaa_Umoja.jpg"
                      alt="Language and Cultural Celebrations"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Cultural Insights</span>
                    <h3 className="text-xl font-bold my-2">Language and Cultural Celebrations</h3>
                    <div className="article-preview mb-4">
                      <p className="text-gray-600">How to incorporate language learning into cultural celebrations throughout the year. Features holiday-specific vocabulary, traditions, and activities for families to experience together.</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">6 min read</p>
                      <Link href="#" className="text-secondary hover:text-secondary/80">Read More</Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Article Categories */}
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-6">Browse Articles by Category</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <Link href="#" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <i className="fas fa-brain"></i>
                    </div>
                    <span className="font-medium">Child Development</span>
                  </Link>
                  <Link href="#" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      <i className="fas fa-globe-africa"></i>
                    </div>
                    <span className="font-medium">Cultural Insights</span>
                  </Link>
                  <Link href="#" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      <i className="fas fa-home"></i>
                    </div>
                    <span className="font-medium">At-Home Practice</span>
                  </Link>
                  <Link href="#" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
                      <i className="fas fa-lightbulb"></i>
                    </div>
                    <span className="font-medium">Learning Strategies</span>
                  </Link>
                  <Link href="#" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
                      <i className="fas fa-heart"></i>
                    </div>
                    <span className="font-medium">Heritage Identity</span>
                  </Link>
                  <Link href="#" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                      <i className="fas fa-user-friends"></i>
                    </div>
                    <span className="font-medium">Family Connection</span>
                  </Link>
                  <Link href="#" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-3">
                      <i className="fas fa-book-reader"></i>
                    </div>
                    <span className="font-medium">Literacy Skills</span>
                  </Link>
                  <Link href="#" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mr-3">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <span className="font-medium">Academic Benefits</span>
                  </Link>
                </div>
              </div>
              
              {/* Subscribe Section */}
              <div className="bg-gradient-to-r from-secondary to-blue-500 rounded-lg p-8 text-white">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4">Subscribe to Our Article Series</h3>
                    <p className="mb-6">Get our latest language learning articles, research updates, and cultural insights delivered directly to your inbox. One email per week with practical tips you can use right away.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        placeholder="Your email address" 
                        value={articleEmail}
                        onChange={(e) => setArticleEmail(e.target.value)}
                        className="px-4 py-3 rounded-md bg-white text-gray-800 flex-grow focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <Button variant="accent">Subscribe</Button>
                    </div>
                    <p className="text-sm mt-3 text-blue-100">We respect your privacy and will never share your information.</p>
                  </div>
                  <div className="md:w-1/3 text-center">
                    <div className="bg-white/20 p-3 rounded-full inline-block">
                      <Mail className="w-16 h-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Cultural Information Section */}
      {activeCategory === 'cultural-information' && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Cultural Information</h2>
                <Link href="/resources/culture" className="text-secondary hover:text-secondary/80 flex items-center">
                  Explore All Cultural Content
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              
              {/* Cultural Region Navigation */}
              <div className="mb-10">
                <div className="bg-gray-50 p-2 rounded-lg flex flex-wrap justify-center">
                  <button className="px-4 py-2 mx-1 my-1 rounded-md bg-secondary text-white font-medium">All Regions</button>
                  <button className="px-4 py-2 mx-1 my-1 rounded-md hover:bg-gray-200 font-medium">West Africa</button>
                  <button className="px-4 py-2 mx-1 my-1 rounded-md hover:bg-gray-200 font-medium">East Africa</button>
                  <button className="px-4 py-2 mx-1 my-1 rounded-md hover:bg-gray-200 font-medium">Central Africa</button>
                  <button className="px-4 py-2 mx-1 my-1 rounded-md hover:bg-gray-200 font-medium">Southern Africa</button>
                  <button className="px-4 py-2 mx-1 my-1 rounded-md hover:bg-gray-200 font-medium">North Africa</button>
                  <button className="px-4 py-2 mx-1 my-1 rounded-md hover:bg-gray-200 font-medium">Diaspora</button>
                </div>
              </div>
              
              {/* Featured Cultural Content */}
              <div className="mb-12 bg-gray-50 rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative">
                    <Image
                      src="/images/landscape/Elderly_woman_storytelling_to_children.jpg"
                      alt="Storytelling Traditions"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 md:hidden">
                      <h3 className="text-2xl font-bold text-white">Storytelling Traditions Across Africa</h3>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <h3 className="text-2xl font-bold mb-4 hidden md:block">Storytelling Traditions Across Africa</h3>
                    <p className="text-gray-700 mb-4">Storytelling has been a cornerstone of African cultures for millennia, serving as a means to preserve history, impart values, and entertain communities. This rich tradition varies across regions but shares common themes of community, respect for elders, and the supernatural.</p>
                    <p className="text-gray-700 mb-6">In many African societies, storytelling is not merely entertainment but a sophisticated educational tool. Stories often feature animal characters representing human traits, supernatural elements teaching moral lessons, and historical narratives preserving communal memory.</p>
                    
                    <div className="mb-6 space-y-4">
                      <div className="flex items-start">
                        <div className="bg-yellow-100 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                          <i className="fas fa-comment"></i>
                        </div>
                        <div>
                          <h4 className="font-bold">Griot Tradition (West Africa)</h4>
                          <p className="text-sm text-gray-600">Oral historians and storytellers who preserve and share cultural history through performance</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-secondary/20 text-secondary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                          <i className="fas fa-moon"></i>
                        </div>
                        <div>
                          <h4 className="font-bold">Fireside Tales (East Africa)</h4>
                          <p className="text-sm text-gray-600">Evening gatherings where elders share myths, legends, and communal histories</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-3">
                          <i className="fas fa-theater-masks"></i>
                        </div>
                        <div>
                          <h4 className="font-bold">Performance Storytelling (Southern Africa)</h4>
                          <p className="text-sm text-gray-600">Dramatic tellings with music, dance, and audience participation</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="secondary">Read Full Guide</Button>
                  </div>
                </div>
              </div>
              
              {/* Cultural Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Cultural Card 1 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/landscape/Birds_on_trees_listening_speaking_reading.jpg"
                      alt="Adinkra Symbols"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">West Africa</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Adinkra Symbols of Ghana</h3>
                    <p className="text-gray-600 mb-4">Exploring the visual language of Adinkra symbols from Ghana, their meanings, and their continued relevance in modern contexts.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">15 symbols with explanations</span>
                      <Link href="#" className="text-secondary hover:text-secondary/80 font-medium">View Guide</Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Cultural Card 2 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/landscape/Children_learning_online_with_laptop.jpg"
                      alt="Traditional Music"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">East Africa</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Traditional Music Instruments</h3>
                    <p className="text-gray-600 mb-4">A guide to traditional musical instruments from East Africa, their cultural significance, and the sounds they create.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Includes audio samples</span>
                      <Link href="#" className="text-secondary hover:text-secondary/80 font-medium">Explore Guide</Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Cultural Card 3 */}
                <Card hover="lift" className="overflow-hidden">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src="/images/landscape/Kid_learning_Kiswahili_numbers.jpg"
                      alt="Festivals Calendar"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pan-African</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">African Festivals Calendar</h3>
                    <p className="text-gray-600 mb-4">Annual calendar of major cultural festivals and celebrations across different African countries with vocabulary guides.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Year-round celebrations</span>
                      <Link href="#" className="text-secondary hover:text-secondary/80 font-medium">View Calendar</Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Cultural Series Promotion */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Cultural Heritage Series</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                    <div className="text-blue-500 mb-3">
                      <i className="fas fa-utensils text-3xl"></i>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Food & Cuisine</h4>
                    <p className="text-sm text-gray-600 mb-3">Traditional dishes, ingredients, and cooking techniques with cultural significance.</p>
                    <Link href="#" className="text-blue-600 text-sm font-medium">Explore Series →</Link>
                  </div>
                  
                  <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                    <div className="text-green-500 mb-3">
                      <i className="fas fa-tshirt text-3xl"></i>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Traditional Dress</h4>
                    <p className="text-sm text-gray-600 mb-3">Cultural attire, fabrics, and symbolic patterns across different regions.</p>
                    <Link href="#" className="text-green-600 text-sm font-medium">Explore Series →</Link>
                  </div>
                  
                  <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
                    <div className="text-yellow-500 mb-3">
                      <i className="fas fa-drum text-3xl"></i>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Music & Dance</h4>
                    <p className="text-sm text-gray-600 mb-3">Traditional rhythms, dances, and their roles in cultural expression.</p>
                    <Link href="#" className="text-yellow-600 text-sm font-medium">Explore Series →</Link>
                  </div>
                  
                  <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                    <div className="text-purple-500 mb-3">
                      <i className="fas fa-hands text-3xl"></i>
                    </div>
                    <h4 className="font-bold text-lg mb-2">Traditional Crafts</h4>
                    <p className="text-sm text-gray-600 mb-3">Artisanal techniques and cultural artifacts with historical significance.</p>
                    <Link href="#" className="text-purple-600 text-sm font-medium">Explore Series →</Link>
                  </div>
                </div>
              </div>
              
              {/* Cultural Activity */}
              <div className="bg-accent/10 rounded-lg p-8 border border-accent/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4">Family Cultural Activity: Create Your Own Talking Drum</h3>
                    <p className="text-gray-700 mb-4">Talking drums have been used across West Africa for centuries as a form of long-distance communication. This activity guide helps your family create a simple version at home while learning about this fascinating cultural tradition.</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                        <span>Step-by-step instructions with photos</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                        <span>Uses simple household materials</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                        <span>Cultural background and educational content</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                        <span>Appropriate for ages 5+</span>
                      </div>
                    </div>
                    <Button variant="primary">Download Activity Guide</Button>
                  </div>
                  <div className="md:w-1/3 text-center">
                    <Image
                      src="/images/landscape/Child_learning_languages_online.jpg"
                      alt="Talking drum activity"
                      width={300}
                      height={200}
                      className="rounded-lg shadow-md mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Call to Action Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Child's Language Journey Today</h2>
            <p className="text-xl mb-8">Our resources are designed to complement our live language lessons. Experience the full iSPEAK approach with a free trial lesson.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/register" variant="accent" size="lg">Book a Free Trial</Button>
              <Button href="/pricing" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-secondary">View Plans</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}