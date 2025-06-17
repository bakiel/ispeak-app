'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Mail, Phone, MessageSquare, Clock, MapPin, Globe, Users, Send } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    childAge: '',
    language: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Our primary communication channel',
      contact: 'support@ispeaklanguage.org',
      subtext: 'We respond within 24 hours',
      color: 'primary'
    },
    {
      icon: MessageSquare,
      title: 'Book a Consultation',
      description: 'Schedule a free 15-minute call',
      contact: 'Schedule via registration',
      subtext: 'Discuss your child or teen\'s needs',
      color: 'secondary'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      description: 'When we\'re available',
      contact: 'Monday - Friday: 9 AM - 6 PM EST',
      subtext: 'Weekend: Limited support',
      color: 'accent'
    }
  ]

  const additionalServices = [
    {
      icon: Globe,
      title: 'Translation Services',
      email: 'translations@ispeaklanguage.org',
      description: 'Professional translation to/from African languages'
    },
    {
      icon: Users,
      title: 'Group & School Programs',
      email: 'groups@ispeaklanguage.org',
      description: 'Custom packages for organizations'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg-primary py-20 px-4">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">
            Get in Touch
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            We're here to help you start your child or teen's language learning journey. 
            Reach out with questions about our programs, scheduling, or anything else.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} hover="lift">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-${method.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className={`w-8 h-8 text-${method.color}`} />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <p className="font-medium text-gray-900 mb-2">{method.contact}</p>
                  <p className="text-xs text-gray-500">{method.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Have questions about our programs? Want to learn more about how iSPEAK can help 
                  your child connect with their heritage? Fill out the form below and we'll get 
                  back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">
                        Student's Age
                      </label>
                      <select
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select age</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-8">6-8 years</option>
                        <option value="9-11">9-11 years</option>
                        <option value="12-14">12-14 years</option>
                        <option value="15+">15+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                        Language of Interest
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select language</option>
                        <option value="yoruba">Yoruba</option>
                        <option value="kiswahili">Kiswahili</option>
                        <option value="twi">Twi</option>
                        <option value="amharic">Amharic (Coming Soon)</option>
                        <option value="undecided">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="registration">Registration Help</option>
                        <option value="scheduling">Scheduling Questions</option>
                        <option value="pricing">Pricing & Plans</option>
                        <option value="technical">Technical Support</option>
                        <option value="group">Group/School Programs</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button type="submit" variant="primary" fullWidth>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy and will never share your information. 
                    View our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              </div>

              {/* Additional Info */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="font-heading text-xl font-bold mb-4">Quick Answers</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">How do I book a free trial?</h4>
                      <p className="text-sm text-gray-600">
                        Simply <Link href="/register" className="text-primary hover:underline">register here</Link> and 
                        you'll be able to schedule your complimentary 15-minute trial lesson.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">What technology do I need?</h4>
                      <p className="text-sm text-gray-600">
                        A device with camera and microphone, plus a stable internet connection. 
                        We use Zoom for lessons.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Can I change educators?</h4>
                      <p className="text-sm text-gray-600">
                        Yes! We want your child to have the best experience. Contact us anytime 
                        to discuss educator preferences.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Services */}
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-bold mb-4">Additional Services</h3>
                  {additionalServices.map((service, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <service.icon className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-medium mb-1">{service.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                            <a 
                              href={`mailto:${service.email}`}
                              className="text-sm text-primary hover:underline"
                            >
                              {service.email}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Emergency Contact */}
                <div className="mt-6 p-4 bg-accent/10 border-2 border-accent rounded-lg">
                  <h4 className="font-medium mb-2">Need immediate assistance?</h4>
                  <p className="text-sm text-gray-700">
                    For urgent matters regarding scheduled lessons, please email us at{' '}
                    <a href="mailto:urgent@ispeaklanguage.org" className="font-medium text-primary hover:underline">
                      urgent@ispeaklanguage.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Check out our comprehensive FAQ section for answers to common questions about 
            our programs, pricing, and teaching methods.
          </p>
          <Button href="/resources/articles" variant="accent">
            View FAQs
          </Button>
        </div>
      </section>
    </>
  )
}