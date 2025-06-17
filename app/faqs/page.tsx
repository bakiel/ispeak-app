'use client'

import React from 'react'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import Link from 'next/link'

export default function FAQsPage() {
  const generalFaqs: AccordionItem[] = [
    {
      id: 'general-1',
      title: 'What is iSPEAK?',
      content: 'iSPEAK is an online African language learning platform designed specifically for children ages 3-14. We offer interactive, culturally-rich lessons in Yoruba, Kiswahili, Twi, and soon Amharic, taught by certified native-speaking educators.',
    },
    {
      id: 'general-2',
      title: 'What age groups does iSPEAK teach?',
      content: 'iSPEAK offers lessons for children between the ages of 3 and 14. Our curriculum is tailored to different age groups, with age-appropriate activities and learning approaches for very young learners (3-5), young learners (6-10), and pre-teens/teens (11-14).',
    },
    {
      id: 'general-3',
      title: 'Which languages do you offer?',
      content: 'We currently offer Yoruba, Kiswahili, and Twi. Amharic lessons will be launching soon. Each language program includes cultural education alongside language learning.',
    },
    {
      id: 'general-4',
      title: 'Where are your educators from?',
      content: 'All our educators are native speakers from the regions where these languages are spoken. They are certified teachers with experience in early childhood and youth education.',
    },
  ]

  const lessonFaqs: AccordionItem[] = [
    {
      id: 'lesson-1',
      title: 'How do the online lessons work?',
      content: 'Lessons take place through our secure online classroom powered by Zoom. Each lesson is 30 minutes long and conducted live with a certified native-speaking educator. Students need a device with a camera and microphone, and a stable internet connection.',
    },
    {
      id: 'lesson-2',
      title: 'How long are the lessons?',
      content: 'Each lesson is 30 minutes long. This duration is optimal for maintaining children\'s attention while ensuring effective learning. Lessons are scheduled at your preferred time slots.',
    },
    {
      id: 'lesson-3',
      title: 'What happens if we miss a lesson?',
      content: 'We understand that life happens! You can reschedule missed lessons with at least 24 hours notice. For last-minute cancellations, we offer make-up sessions based on availability.',
    },
    {
      id: 'lesson-4',
      title: 'Do you offer group lessons?',
      content: 'Yes! We offer both individual and group lessons. Group lessons are perfect for siblings or friends learning together, and we also offer special rates for schools and community organizations.',
    },
  ]

  const parentFaqs: AccordionItem[] = [
    {
      id: 'parent-1',
      title: 'Do I need to know the language to support my child?',
      content: 'Not at all! Many of our parents don\'t speak the language their child is learning. Our educators provide clear guidance during lessons, and we offer parent resources with basic phrases and pronunciation guides if you\'d like to learn alongside your child.',
    },
    {
      id: 'parent-2',
      title: 'How can I track my child\'s progress?',
      content: 'Parents receive regular progress reports and have access to our parent dashboard where you can see lesson summaries, homework assignments, and your child\'s achievements. Educators also provide feedback after each lesson.',
    },
    {
      id: 'parent-3',
      title: 'What materials does my child need?',
      content: 'Students need a device with internet connection, camera, and microphone. We recommend having a notebook and pencil for older children. All learning materials are provided digitally, and physical materials can be purchased from our Paji Shop.',
    },
    {
      id: 'parent-4',
      title: 'Can parents sit in on lessons?',
      content: 'Yes! Parents are welcome to observe lessons, especially for younger children. However, we encourage allowing children to engage independently as they become comfortable with their educator.',
    },
  ]

  const pricingFaqs: AccordionItem[] = [
    {
      id: 'pricing-1',
      title: 'How much do lessons cost?',
      content: 'Our pricing varies by program and frequency. Individual lessons start at $40 per lesson, with discounted rates for weekly and bi-weekly subscriptions. Visit our pricing page for detailed information.',
    },
    {
      id: 'pricing-2',
      title: 'Do you offer family discounts?',
      content: 'Yes! We offer a 15% discount when two or more children from the same family enroll. The discount is automatically applied to your subscription.',
    },
    {
      id: 'pricing-3',
      title: 'What is your cancellation policy?',
      content: 'You can cancel your subscription at any time with no cancellation fees. Cancellations take effect at the end of your current billing period, and you\'ll continue to have access to lessons until then.',
    },
    {
      id: 'pricing-4',
      title: 'Do you offer free trials?',
      content: 'We offer a discounted first lesson for new students to try our program. This allows you and your child to experience our teaching method before committing to a subscription.',
    },
  ]

  const technicalFaqs: AccordionItem[] = [
    {
      id: 'tech-1',
      title: 'What technology do I need?',
      content: 'You need a computer, tablet, or smartphone with a stable internet connection, working camera, and microphone. We recommend using a computer or tablet for the best learning experience.',
    },
    {
      id: 'tech-2',
      title: 'Which video platform do you use?',
      content: 'We use Zoom for all our lessons. It\'s free to download and easy to use. We\'ll send you a link before each lesson - just click to join!',
    },
    {
      id: 'tech-3',
      title: 'What if we have technical difficulties?',
      content: 'Our support team is available to help with any technical issues. We also provide a technical setup guide and offer a free tech check session before your first lesson.',
    },
    {
      id: 'tech-4',
      title: 'Can we use a phone for lessons?',
      content: 'While phones can work, we recommend using a tablet or computer for a better learning experience. The larger screen makes it easier for children to see visual materials and interact with the educator.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/90">
              Find answers to common questions about iSPEAK's language learning programs
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* General Questions */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                General Questions
              </h2>
              <Accordion items={generalFaqs} />
            </div>

            {/* Lessons & Learning */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                Lessons & Learning
              </h2>
              <Accordion items={lessonFaqs} />
            </div>

            {/* For Parents */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                For Parents
              </h2>
              <Accordion items={parentFaqs} />
            </div>

            {/* Pricing & Payments */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                Pricing & Payments
              </h2>
              <Accordion items={pricingFaqs} />
            </div>

            {/* Technical Requirements */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                Technical Requirements
              </h2>
              <Accordion items={technicalFaqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn btn-primary"
              >
                Contact Support
              </Link>
              <a
                href="mailto:info@ispeaklanguage.org"
                className="btn btn-outline"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}