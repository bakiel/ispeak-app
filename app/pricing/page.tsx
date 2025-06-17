'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card'
import { Check, X, Star, Clock, Users, Globe, ChevronRight } from 'lucide-react'

export default function PricingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('yoruba')
  
  const languages = [
    { id: 'yoruba', name: 'Yoruba', flag: '🇳🇬' },
    { id: 'kiswahili', name: 'Kiswahili', flag: '🇰🇪' },
    { id: 'twi', name: 'Twi', flag: '🇬🇭' },
    { id: 'amharic', name: 'Amharic', flag: '🇪🇹', comingSoon: true },
  ]
  
  const plans = [
    {
      name: 'Single Session',
      price: '$25',
      period: 'per lesson',
      description: 'Perfect for trying out our program or occasional lessons',
      features: [
        '1 live 30-minute lesson',
        'Certified native speaker',
        'Interactive learning materials',
        'Progress feedback',
        'Access to lesson recording',
      ],
      notIncluded: [
        'Monthly progress reports',
        'Parent dashboard access',
        'Cultural workshop invitations',
      ],
      color: 'secondary',
    },
    {
      name: 'Monthly Basic',
      price: '$75',
      period: 'per month',
      description: 'Ideal for consistent weekly learning',
      features: [
        '4 live 30-minute lessons',
        'Certified native speaker',
        'Interactive learning materials',
        'Weekly homework activities',
        'Basic progress tracking',
        'Email support',
      ],
      notIncluded: [
        'Detailed progress reports',
        'Cultural workshop access',
        'Priority scheduling',
      ],
      color: 'primary',
    },
    {
      name: 'Monthly Premium',
      price: '$90',
      period: 'per month',
      description: 'Our most popular plan for committed learners',
      features: [
        '4 live 30-minute lessons',
        'Certified native speaker',
        'Interactive learning materials',
        'Weekly homework activities',
        'Detailed progress reports',
        'Parent dashboard access',
        'Cultural workshop invitations',
        'Priority scheduling',
        'Lesson recordings',
      ],
      notIncluded: [],
      color: 'accent',
      popular: true,
    },
    {
      name: '3-Month Intensive',
      price: '$350',
      period: 'per 3 months',
      description: 'Accelerated learning with maximum value',
      features: [
        '12 live 30-minute lessons',
        'Same dedicated educator',
        'Premium learning materials',
        'Personalized curriculum',
        'Weekly progress reports',
        'Parent dashboard access',
        'All cultural workshops',
        'Priority scheduling',
        'All lesson recordings',
        'Certificate of completion',
        'Save $20 compared to monthly',
      ],
      notIncluded: [],
      color: 'coral',
      bestValue: true,
    },
  ]
  
  const faqs = [
    {
      id: '1',
      title: 'Can I switch between plans?',
      content: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
    },
    {
      id: '2',
      title: 'What if my child misses a lesson?',
      content: 'For monthly plans, we offer one makeup lesson per month with 24-hour notice. Premium and Intensive plans include flexible rescheduling options.',
    },
    {
      id: '3',
      title: 'Are there family discounts?',
      content: 'Yes! We offer 10% off for the second child and 15% off for three or more children in the same family.',
    },
    {
      id: '4',
      title: 'What ages are the lessons designed for?',
      content: 'Our curriculum is tailored for children ages 3-14, with age-appropriate materials and teaching methods for each group.',
    },
    {
      id: '5',
      title: 'Can I pause my subscription?',
      content: 'Monthly Premium and 3-Month Intensive plans can be paused once for up to 4 weeks. Basic plans cannot be paused.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-secondary py-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
            Plans & Pricing
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Choose the perfect plan for your child's language learning journey. 
            All plans include access to certified native speakers and culturally enriched curriculum.
          </p>
        </div>
      </section>
      
      {/* Language Selector */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold mb-2">Select Your Language</h2>
            <p className="text-gray-600">Pricing is the same for all languages</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => !lang.comingSoon && setSelectedLanguage(lang.id)}
                disabled={lang.comingSoon}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all
                  ${selectedLanguage === lang.id 
                    ? 'bg-primary text-white shadow-lg' 
                    : lang.comingSoon
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }
                `}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
                {lang.comingSoon && <span className="ml-2 text-xs">(Coming Soon)</span>}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                hover="lift"
                className={`relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-primary px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                {plan.bestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-coral text-white px-4 py-1 rounded-full text-sm font-bold">
                      Best Value
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pb-6">
                  <div className="space-y-3">
                    <p className="font-medium text-sm text-gray-700 mb-2">Includes:</p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.notIncluded.length > 0 && (
                      <>
                        <div className="border-t pt-3 mt-4">
                          <p className="font-medium text-sm text-gray-500 mb-2">Not included:</p>
                          {plan.notIncluded.map((feature, idx) => (
                            <div key={idx} className="flex items-start text-sm">
                              <X className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-500">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    href="/register" 
                    variant={plan.color === 'accent' ? 'primary' : plan.color as any}
                    fullWidth
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              All plans include a free 15-minute trial lesson. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm">100% satisfaction guarantee</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm">Secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Group Rates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4">Group & Family Rates</h2>
              <p className="text-lg text-gray-600">
                Special pricing for families and organizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Users className="w-8 h-8 text-primary mr-3" />
                    <CardTitle>Family Plans</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Enroll multiple children and save! Our family discounts make it 
                    affordable to preserve heritage language for all your children.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>2nd child: 10% off</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>3+ children: 15% off each</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Flexible scheduling for siblings</span>
                    </li>
                  </ul>
                  <Button href="/contact" variant="secondary" className="mt-6" fullWidth>
                    Inquire About Family Plans
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <Globe className="w-8 h-8 text-secondary mr-3" />
                    <CardTitle>School & Organization Plans</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Bring indigenous language learning to your school, community center, 
                    or organization with our custom group packages.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Groups of 10+: 20% off</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Dedicated program coordinator</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span>Custom curriculum options</span>
                    </li>
                  </ul>
                  <Button href="/contact" variant="primary" className="mt-6" fullWidth>
                    Get Custom Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold mb-8 text-center">
              Pricing FAQs
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id} className="overflow-hidden">
                  <details className="group">
                    <summary className="p-6 cursor-pointer list-none flex justify-between items-center hover:bg-gray-50">
                      <h3 className="font-medium text-lg">{faq.title}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-90" />
                    </summary>
                    <CardContent className="pt-0 pb-6">
                      <p className="text-gray-600">{faq.content}</p>
                    </CardContent>
                  </details>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Have more questions?</p>
              <Button href="/contact" variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Start Your Child's Language Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of families preserving their heritage through interactive, 
            engaging language lessons with native speakers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/register" variant="accent" size="lg">
              Start Free Trial
            </Button>
            <Button href="/about" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              Learn More About iSPEAK
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
