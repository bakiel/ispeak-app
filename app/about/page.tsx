'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Check, Target, Users, Globe, BookOpen, Heart, Award, Star } from 'lucide-react'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('what-is-ispeak')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['what-is-ispeak', 'mission', 'method', 'philosophy']
      const scrollPosition = window.scrollY + 150
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section)
        }
      }
      
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-primary py-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
            About iSPEAK Language Learning
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Connecting children to their heritage through interactive online language lessons 
            with certified indigenous speakers
          </p>
        </div>
      </section>

      {/* Navigation Bar */}
      <section className={`sticky top-0 z-30 bg-white border-b transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-6 py-4">
            {[
              { id: 'what-is-ispeak', label: 'What is iSPEAK?' },
              { id: 'mission', label: 'Our Mission' },
              { id: 'method', label: 'The iSPEAK Method' },
              { id: 'philosophy', label: 'Educational Philosophy' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-secondary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* What is iSPEAK Section */}
      <section id="what-is-ispeak" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
              What is iSPEAK?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  iSPEAK Language Learning Program is the first online platform designed specifically 
                  to connect children ages 3-14 with their African heritage through live, interactive 
                  language lessons with certified indigenous speakers.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Founded in 2020, iSPEAK was born from a simple yet powerful observation: children 
                  in the diaspora were losing their connection to their heritage languages, and with 
                  it, a vital link to their cultural identity.
                </p>
                <p className="text-lg text-gray-700">
                  Today, we serve over 100,000 students across 170+ countries, making African 
                  languages accessible to families everywhere.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/landscape/Children_learning_online_with_laptop.jpg"
                  alt="Children learning online"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card hover="lift">
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Global Reach</h3>
                  <p className="text-gray-600">Students in 170+ countries learning their heritage languages</p>
                </CardContent>
              </Card>
              
              <Card hover="lift">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Native Speakers</h3>
                  <p className="text-gray-600">All educators are certified indigenous language speakers</p>
                </CardContent>
              </Card>
              
              <Card hover="lift">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Cultural Context</h3>
                  <p className="text-gray-600">Lessons include stories, songs, and cultural traditions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
              Our Mission
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <p className="text-xl text-center text-gray-700 mb-6">
                "To preserve and promote African languages by connecting children in the diaspora 
                with their heritage through accessible, engaging, and culturally rich online education."
              </p>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-2xl font-bold mb-4 flex items-center">
                  <Target className="w-8 h-8 text-secondary mr-3" />
                  Language Preservation
                </h3>
                <p className="text-gray-700 mb-4">
                  With over 255 African languages at risk of extinction, we're committed to 
                  preserving these linguistic treasures for future generations. Every child who 
                  learns their heritage language becomes a guardian of cultural knowledge.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    <span>Documenting and teaching endangered languages</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    <span>Creating modern learning resources</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    <span>Training new language educators</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading text-2xl font-bold mb-4 flex items-center">
                  <Heart className="w-8 h-8 text-coral mr-3" />
                  Community Impact
                </h3>
                <p className="text-gray-700 mb-4">
                  iSPEAK creates meaningful employment opportunities for indigenous language 
                  speakers while strengthening cultural bonds across the global African diaspora.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    <span>Supporting indigenous educators financially</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    <span>Building bridges between continents</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    <span>Fostering cultural pride in youth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Method Section */}
      <section id="method" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
              The iSPEAK Method
            </h2>
            
            <p className="text-xl text-center text-gray-700 mb-12">
              Our research-based three-pillar approach ensures comprehensive language acquisition
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Listening Skills</h3>
                <p className="text-gray-600">
                  Children develop ear training for tones, sounds, and comprehension through 
                  stories, songs, and conversational practice.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Speaking Skills</h3>
                <p className="text-gray-600">
                  From basic greetings to complex conversations, students practice pronunciation 
                  and build confidence in real-time interactions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Reading Skills</h3>
                <p className="text-gray-600">
                  Age-appropriate introduction to writing systems, grammar, and cultural texts 
                  builds literacy alongside oral fluency.
                </p>
              </div>
            </div>

            <Card hover="lift" className="bg-primary text-white">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-center">
                  Why Live 1:1 Lessons Work
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-accent mr-2 mt-1" />
                      <span>Personalized pace and attention</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-accent mr-2 mt-1" />
                      <span>Real-time pronunciation correction</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-accent mr-2 mt-1" />
                      <span>Cultural immersion with native speakers</span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-accent mr-2 mt-1" />
                      <span>Flexible scheduling for families</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-accent mr-2 mt-1" />
                      <span>Safe, monitored online environment</span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-accent mr-2 mt-1" />
                      <span>Progress tracking and parent updates</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
              Educational Philosophy
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h3 className="font-heading text-2xl font-bold mb-4 text-center">
                Learning Through Joy and Connection
              </h3>
              <p className="text-lg text-gray-700 text-center">
                We believe language learning should be a joyful journey of discovery, not a chore. 
                Our approach centers on creating positive associations with heritage languages 
                through play, stories, and meaningful connections.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card hover="lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-6 h-6 text-secondary mr-2" />
                    Child-Centered Approach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Every child learns differently. Our educators adapt their teaching style to 
                    match each student's learning pace, interests, and personality.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      <span>Age-appropriate activities and materials</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      <span>Celebration of small victories</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      <span>Focus on confidence building</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card hover="lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-6 h-6 text-primary mr-2" />
                    Cultural Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Language is the gateway to culture. Our lessons seamlessly blend language 
                    learning with cultural education, creating well-rounded global citizens.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      <span>Traditional stories and folktales</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      <span>Cultural celebrations and customs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1" />
                      <span>Music, art, and cultural expressions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h3 className="font-heading text-2xl font-bold mb-4">
                Join Our Growing Community
              </h3>
              <p className="text-lg text-gray-700 mb-8">
                Become part of a global movement preserving African languages for future generations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/register" variant="primary" size="lg">
                  Start Your Free Trial
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Meet Our Founder
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Driven by passion and purpose to preserve African languages
            </p>
            
            <Card hover="lift" className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold mb-2">Daisy Ross</h3>
                  <p className="text-secondary font-medium mb-4">Founder & CEO</p>
                </div>
                <p className="text-gray-700 mb-4">
                  As a mother raising children in the diaspora, Daisy experienced firsthand the 
                  challenge of maintaining cultural and linguistic connections. This personal 
                  journey inspired the creation of iSPEAK.
                </p>
                <p className="text-gray-700 italic">
                  "Every child deserves to know their heritage language. It's not just about 
                  words—it's about identity, belonging, and the stories that connect us across 
                  generations."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Child's Language Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of families worldwide who are keeping their heritage alive through language
          </p>
          <Button href="/register" variant="accent" size="lg">
            Start Your Free Trial Today
          </Button>
        </div>
      </section>
    </>
  )
}
