'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  BookOpen, 
  Clock, 
  Calendar,
  User,
  ChevronRight,
  Filter,
  Search,
  TrendingUp,
  Heart,
  Share2,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

type ArticleCategory = 'all' | 'language-learning' | 'cultural-insights' | 'parenting-tips' | 'success-stories'

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const featuredArticle = {
    id: 'featured',
    title: 'Why Heritage Language Learning Matters: A Parent\'s Guide',
    excerpt: 'Discover the cognitive, cultural, and social benefits of raising multilingual children and how heritage language learning shapes identity and family bonds.',
    author: 'Dr. Amara Okonkwo',
    date: 'December 15, 2024',
    readTime: '8 min read',
    category: 'language-learning',
    image: '/images/landscape/Children_learning_online_with_laptop.jpg',
    featured: true,
  }

  const articles = [
    {
      id: 1,
      title: '10 Fun Ways to Practice African Languages at Home',
      excerpt: 'Creative activities and games that make language learning enjoyable for the whole family, from cooking together to storytelling nights.',
      author: 'Fatima Diallo',
      date: 'December 10, 2024',
      readTime: '5 min read',
      category: 'parenting-tips',
      image: '/images/square/Mother_and_daughter_studying_together.png',
    },
    {
      id: 2,
      title: 'Understanding Yoruba Names: Meanings and Traditions',
      excerpt: 'Explore the deep significance behind Yoruba naming conventions and learn how names carry prayers, history, and family heritage.',
      author: 'Adebayo Ogundimu',
      date: 'December 8, 2024',
      readTime: '6 min read',
      category: 'cultural-insights',
      image: '/images/square/Child_happily_reading_book.png',
    },
    {
      id: 3,
      title: 'From Zero to Conversational: Amelia\'s Kiswahili Journey',
      excerpt: 'Follow 8-year-old Amelia\'s inspiring 6-month journey learning Kiswahili with iSPEAK and connecting with her Kenyan heritage.',
      author: 'Sarah Johnson',
      date: 'December 5, 2024',
      readTime: '4 min read',
      category: 'success-stories',
      image: '/images/square/Child_holding_a_Well_done_certificate.png',
    },
    {
      id: 4,
      title: 'The Science Behind Language Learning in Children',
      excerpt: 'Research-backed insights on how children\'s brains process multiple languages and why early exposure leads to better outcomes.',
      author: 'Prof. Michael Chen',
      date: 'December 3, 2024',
      readTime: '7 min read',
      category: 'language-learning',
      image: '/images/square/Child_learning_online_with_headphones.png',
    },
    {
      id: 5,
      title: 'Celebrating African Festivals: A Cultural Calendar',
      excerpt: 'A comprehensive guide to major festivals across Africa, their significance, and how to celebrate them with your family.',
      author: 'Kwame Asante',
      date: 'November 30, 2024',
      readTime: '10 min read',
      category: 'cultural-insights',
      image: '/images/square/Grandmother_storytelling_to_children.png',
    },
    {
      id: 6,
      title: 'Managing Screen Time: Making Online Language Learning Work',
      excerpt: 'Practical tips for parents on balancing screen time while maximizing the benefits of online language lessons.',
      author: 'Dr. Lisa Martinez',
      date: 'November 28, 2024',
      readTime: '5 min read',
      category: 'parenting-tips',
      image: '/images/square/Children_learning_languages_together.png',
    },
  ]

  const categories = [
    { value: 'all', label: 'All Articles', count: articles.length + 1 },
    { value: 'language-learning', label: 'Language Learning', count: 2 },
    { value: 'cultural-insights', label: 'Cultural Insights', count: 2 },
    { value: 'parenting-tips', label: 'Parenting Tips', count: 2 },
    { value: 'success-stories', label: 'Success Stories', count: 1 },
  ]

  const popularTags = [
    'Yoruba', 'Kiswahili', 'Twi', 'Heritage Language', 'Multilingual', 
    'Cultural Identity', 'Online Learning', 'African Culture', 'Language Tips'
  ]

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-secondary py-16 md:py-20">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Learning Articles & Insights
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Expert advice, cultural insights, and inspiring stories to support your family's 
              language learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value as ArticleCategory)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.value
                              ? 'bg-secondary text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category.label}</span>
                            <span className="text-sm">({category.count})</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Tag className="w-5 h-5 mr-2" />
                      Popular Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card variant="gradient" className="text-white">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg mb-3">
                      Weekly Insights
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      Get the latest articles and tips delivered to your inbox.
                    </p>
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 rounded-lg text-gray-900 mb-3"
                    />
                    <Button variant="accent" fullWidth size="sm">
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Articles */}
            <div className="lg:col-span-3">
              {/* Featured Article */}
              {(selectedCategory === 'all' || selectedCategory === featuredArticle.category) && 
               featuredArticle.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                <Card hover="lift" className="mb-8 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    </div>
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {featuredArticle.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredArticle.readTime}
                        </span>
                      </div>
                      <h2 className="font-heading text-2xl font-bold mb-3">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                          <span className="text-sm font-medium">{featuredArticle.author}</span>
                        </div>
                        <Button href={`/resources/articles/${featuredArticle.id}`} variant="secondary" size="sm">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} hover="lift" className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {article.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{article.author}</span>
                        <Link
                          href={`/resources/articles/${article.id}`}
                          className="text-secondary hover:text-secondary/80 flex items-center text-sm font-medium"
                        >
                          Read More
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSelectedCategory('all')
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Have a Story to Share?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            We love featuring success stories and insights from our iSPEAK families. 
            Share your language learning journey with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="accent" size="lg">
              Submit Your Story
            </Button>
            <Button href="/resources" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              More Resources
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}