'use client'

import { useState } from 'react'

export default function ProductFAQ({ product }) {
  const [openQuestion, setOpenQuestion] = useState(0) // Start with first question open

  // Product-specific FAQ data
  const faqData = [
    {
      question: "What sizes are available and how do they fit?",
      answer: "Our t-shirts are available in sizes 3T through 12. They follow standard US sizing and are designed with a comfortable, relaxed fit. We recommend checking our size guide for specific measurements. If your child is between sizes, we suggest sizing up for optimal comfort and room to grow."
    },
    {
      question: "What materials are used and are they safe for children?",
      answer: "All our products are made from 100% premium cotton that's soft, breathable, and gentle on sensitive skin. The fabric is pre-shrunk to minimize shrinkage after washing. Our inks are water-based and non-toxic, meeting all safety standards for children's clothing. The shirts are also machine washable for easy care."
    },
    {
      question: "How does my purchase support language education?",
      answer: "15% of all proceeds from product sales go directly to funding free language lessons for underserved communities. Your purchase helps us provide access to African language education for children who might not otherwise have this opportunity. We partner with local organizations to ensure these funds make a real impact."
    },
    {
      question: "What is the return and exchange policy?",
      answer: "We offer a 30-day return policy for all unworn, unwashed items in their original condition with tags attached. If the size doesn't fit properly, we're happy to exchange it for free. Returns for refunds require the customer to pay return shipping, but exchanges for size or color (if available) include free return shipping."
    },
    {
      question: "How should I care for my iSPEAK products?",
      answer: "For best results, machine wash in cold water with like colors. Use mild detergent and avoid bleach. Tumble dry on low heat or hang dry to preserve the vibrant colors and prevent shrinkage. Iron on low heat if needed, avoiding direct contact with the printed design."
    },
    {
      question: "Can I track my order and how long does shipping take?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days. Orders over $50 qualify for free standard shipping. We also offer overnight shipping for urgent orders."
    },
    {
      question: "Are there bulk discounts for schools or organizations?",
      answer: "Absolutely! We offer special pricing for schools, language programs, and community organizations ordering 10 or more items. Contact us at info@ispeaklanguages.com with your requirements, and we'll provide a custom quote. We're always excited to support educational institutions and cultural programs."
    },
    {
      question: "What makes the Paji mascot special?",
      answer: "Paji is our beloved bird mascot who represents the joy of learning African languages. The name 'Paji' comes from Kiswahili and embodies the spirit of cultural connection and education. Each product featuring Paji helps children feel connected to African heritage while learning about different cultures and languages."
    }
  ]

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? -1 : index)
  }

  return (
    <div className="bg-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600">
          Got questions? We've got answers! Find everything you need to know about our products and services.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-lg pr-4">{faq.question}</span>
              <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                openQuestion === index 
                  ? 'bg-yellow-400 text-gray-900 rotate-180' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-6">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support CTA */}
      <div className="mt-12">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our friendly customer support team is here to help!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@ispeaklanguages.com"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-xl font-semibold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            
            <a
              href="tel:+14783904040"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}