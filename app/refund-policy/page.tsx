import React from 'react'
import Link from 'next/link'
import { CreditCard, Clock, AlertTriangle, CheckCircle, Mail, Phone, FileText, Calendar, Info, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function RefundPolicyPage() {
  const lastUpdated = 'January 15, 2025'
  const effectiveDate = 'January 1, 2025'

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'trial-period', title: 'Free Trial Period' },
    { id: 'refund-eligibility', title: 'Refund Eligibility' },
    { id: 'how-to-request', title: 'How to Request a Refund' },
    { id: 'processing-time', title: 'Processing Time' },
    { id: 'subscription-plans', title: 'Subscription Plans' },
    { id: 'single-sessions', title: 'Single Sessions' },
    { id: 'shop-purchases', title: 'Shop Purchases' },
    { id: 'exceptions', title: 'Exceptions' },
    { id: 'contact', title: 'Contact Information' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <CreditCard className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Refund Policy
            </h1>
            <p className="text-lg text-white/90">
              Your satisfaction is our priority. Learn about our fair and transparent refund process.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <div className="flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Effective: {effectiveDate}</span>
              </div>
              <div className="flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-4">
                    <h3 className="font-heading font-bold mb-4">Quick Navigation</h3>
                    <nav className="space-y-2">
                      {sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Introduction */}
                <div>
                  <p className="text-lg text-gray-700 mb-6">
                    At iSPEAK Language Learning Program, we are committed to providing high-quality language 
                    education that meets your family's needs. We understand that sometimes circumstances change, 
                    and we want you to feel confident in your purchase decisions. This refund policy outlines 
                    the conditions under which refunds are available.
                  </p>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-green-900 font-medium mb-2">
                            30-Day Satisfaction Guarantee
                          </p>
                          <p className="text-green-800">
                            We offer a 30-day satisfaction guarantee on most of our language learning programs. 
                            If you're not satisfied with your child's progress or our services, we'll work with 
                            you to find a solution or provide a refund.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Overview */}
                <div id="overview">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-3 text-secondary" />
                    1. Overview
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Our refund policy is designed to be fair to both our families and our educators. We offer:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Free trial lessons to ensure our program is the right fit</li>
                      <li>30-day satisfaction guarantee on subscription plans</li>
                      <li>Flexible rescheduling options to minimize the need for refunds</li>
                      <li>Clear guidelines on what qualifies for a refund</li>
                      <li>Prompt processing of approved refund requests</li>
                    </ul>
                  </div>
                </div>

                {/* Free Trial Period */}
                <div id="trial-period">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-secondary" />
                    2. Free Trial Period
                  </h2>
                  <Card className="bg-blue-50 border-blue-200 mb-4">
                    <CardContent className="p-6">
                      <p className="text-blue-900">
                        <strong>Try Before You Buy:</strong> We offer a free 15-minute trial lesson for new families. 
                        This allows you to experience our teaching method, meet an educator, and ensure the program 
                        is suitable for your child before making any financial commitment.
                      </p>
                    </CardContent>
                  </Card>
                  <p className="text-gray-700">
                    The trial lesson is completely free with no obligation to purchase. We recommend taking 
                    advantage of this opportunity to make an informed decision about enrolling in our programs.
                  </p>
                </div>

                {/* Refund Eligibility */}
                <div id="refund-eligibility">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                    3. Refund Eligibility
                  </h2>
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-2">3.1 Eligible for Refund</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Subscription plans within the first 30 days if less than 25% of lessons have been used</li>
                      <li>Technical issues on our end that prevent lesson delivery</li>
                      <li>Educator cancellations that cannot be rescheduled within a reasonable timeframe</li>
                      <li>Duplicate charges or billing errors</li>
                      <li>Unused portions of 3-month intensive plans (prorated)</li>
                    </ul>

                    <h3 className="font-bold text-lg mb-2 mt-6">3.2 Not Eligible for Refund</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Lessons cancelled with less than 24 hours notice</li>
                      <li>No-shows to scheduled lessons</li>
                      <li>Change of mind after 30 days or after using 25% or more of purchased lessons</li>
                      <li>Technical issues on the student's end (internet, device problems)</li>
                      <li>Dissatisfaction with educator teaching style (we offer educator changes instead)</li>
                    </ul>
                  </div>
                </div>

                {/* How to Request a Refund */}
                <div id="how-to-request">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-secondary" />
                    4. How to Request a Refund
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      To request a refund, please follow these steps:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                      <li>
                        <strong>Contact Support:</strong> Email us at{' '}
                        <a href="mailto:refunds@ispeaklanguage.org" className="text-secondary hover:underline">
                          refunds@ispeaklanguage.org
                        </a>{' '}
                        with your order number and reason for the refund request
                      </li>
                      <li>
                        <strong>Provide Details:</strong> Include your account email, child's name, purchase date, 
                        and a brief explanation of why you're requesting a refund
                      </li>
                      <li>
                        <strong>Wait for Review:</strong> Our team will review your request within 2 business days
                      </li>
                      <li>
                        <strong>Receive Decision:</strong> You'll receive an email with our decision and next steps
                      </li>
                    </ol>

                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3">What to Include in Your Request:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Order/Transaction number</li>
                          <li>• Date of purchase</li>
                          <li>• Program or product purchased</li>
                          <li>• Reason for refund request</li>
                          <li>• Number of lessons used (for subscriptions)</li>
                          <li>• Any relevant screenshots or documentation</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Processing Time */}
                <div id="processing-time">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-secondary" />
                    5. Processing Time
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold mb-2">Review Time</h3>
                          <p className="text-gray-700">2-3 business days</p>
                          <p className="text-sm text-gray-600 mt-2">
                            We'll review your request and notify you of our decision via email
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold mb-2">Refund Processing</h3>
                          <p className="text-gray-700">5-10 business days</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Once approved, refunds are processed to your original payment method
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <p className="text-gray-700">
                      <strong>Note:</strong> While we process refunds promptly, the time it takes for the refund 
                      to appear in your account depends on your bank or credit card company's policies.
                    </p>
                  </div>
                </div>

                {/* Subscription Plans */}
                <div id="subscription-plans">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-secondary" />
                    6. Subscription Plans
                  </h2>
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-2">6.1 Monthly Plans (Basic & Premium)</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Full refund within first 30 days if less than 25% of lessons used</li>
                      <li>No refund after 30 days, but you can cancel future billing</li>
                      <li>Unused lessons expire at the end of each billing month</li>
                      <li>Cancellation takes effect at the end of the current billing period</li>
                    </ul>

                    <h3 className="font-bold text-lg mb-2 mt-6">6.2 3-Month Intensive Plans</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Full refund within first 30 days if less than 10 lessons used</li>
                      <li>Prorated refund for unused lessons after 30 days (case-by-case basis)</li>
                      <li>Lessons can be shared among family members</li>
                      <li>All 40 lessons must be used within the 3-month period</li>
                    </ul>

                    <Card className="bg-yellow-50 border-yellow-200 mt-4">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                          <p className="text-yellow-900">
                            <strong>Important:</strong> For subscription plans, we recommend pausing your 
                            subscription instead of cancelling if you need a temporary break. This preserves 
                            your rate and educator assignment.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Single Sessions */}
                <div id="single-sessions">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-secondary" />
                    7. Single Sessions (NOW Plans)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Single session purchases are subject to the following refund conditions:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Full refund if cancelled more than 24 hours before the scheduled lesson</li>
                      <li>No refund for cancellations within 24 hours of the lesson</li>
                      <li>Full refund if educator cancels and cannot reschedule within 7 days</li>
                      <li>Full refund for technical issues on our platform</li>
                    </ul>
                  </div>
                </div>

                {/* Shop Purchases */}
                <div id="shop-purchases">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-secondary" />
                    8. Paji Shop Purchases
                  </h2>
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-2">8.1 Digital Products</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>7-day refund period for digital downloads if not accessed</li>
                      <li>No refund once digital content has been downloaded or accessed</li>
                      <li>Refund for defective or incorrectly delivered digital products</li>
                    </ul>

                    <h3 className="font-bold text-lg mb-2 mt-6">8.2 Physical Products</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>30-day return period for unopened items in original condition</li>
                      <li>Customer pays return shipping unless item is defective</li>
                      <li>Refund processed after item is received and inspected</li>
                      <li>Custom or personalized items are non-refundable</li>
                    </ul>

                    <p className="text-gray-700 mt-4">
                      For more details on shop purchases, please see our{' '}
                      <Link href="/shipping-policy" className="text-secondary hover:underline">
                        Shipping Policy
                      </Link>.
                    </p>
                  </div>
                </div>

                {/* Exceptions */}
                <div id="exceptions">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-secondary" />
                    9. Exceptions
                  </h2>
                  <Card className="bg-red-50 border-red-200 mb-4">
                    <CardContent className="p-6">
                      <p className="text-red-900 font-medium mb-2">
                        No Refunds Will Be Issued For:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-red-800 ml-4">
                        <li>Violation of our Terms of Service or Code of Conduct</li>
                        <li>Abusive behavior toward educators or staff</li>
                        <li>Fraudulent activity or chargebacks</li>
                        <li>Services purchased more than 90 days ago</li>
                        <li>Group discounts or promotional offers (specific terms apply)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-2">Special Circumstances</h3>
                    <p className="text-gray-700">
                      We understand that exceptional situations may arise. In cases of:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Medical emergencies (documentation required)</li>
                      <li>Extended technical outages on our platform</li>
                      <li>Natural disasters affecting service delivery</li>
                      <li>Other extraordinary circumstances</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                      Please contact us to discuss your situation. We will review these on a case-by-case 
                      basis and work to find a fair solution.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div id="contact">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-secondary" />
                    10. Contact Information
                  </h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-4">
                        For refund requests or questions about this policy, please contact us:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-3 text-gray-600" />
                          <div>
                            <p className="font-medium">Refund Requests:</p>
                            <a href="mailto:refunds@ispeaklanguage.org" className="text-secondary hover:underline">
                              refunds@ispeaklanguage.org
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-3 text-gray-600" />
                          <div>
                            <p className="font-medium">General Support:</p>
                            <a href="mailto:support@ispeaklanguage.org" className="text-secondary hover:underline">
                              support@ispeaklanguage.org
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 mr-3 text-gray-600" />
                          <div>
                            <p className="font-medium">Phone Support:</p>
                            <a href="tel:+14783904040" className="text-secondary hover:underline">
                              (478) 390-4040
                            </a>
                            <p className="text-sm text-gray-600">Monday-Friday, 9am-5pm EST</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 mr-3 text-gray-600 mt-0.5" />
                          <div>
                            <p className="font-medium">Mailing Address:</p>
                            <p className="text-gray-600">iSPEAK Language Learning Program</p>
                            <p className="text-gray-600">Attn: Refunds Department</p>
                            <p className="text-gray-600">123 Education Boulevard</p>
                            <p className="text-gray-600">Washington, DC 20001</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Customer Commitment */}
                <div className="mt-12 p-6 bg-secondary/10 rounded-lg">
                  <h3 className="font-heading font-bold mb-3 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-secondary" />
                    Our Commitment to You
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We stand behind the quality of our language learning programs. Our goal is to help 
                    children connect with their heritage through language, and we want every family to 
                    have a positive experience with iSPEAK.
                  </p>
                  <p className="text-gray-700">
                    If you're not completely satisfied, please reach out to us. We're always happy to 
                    discuss your concerns and find a solution that works for your family. Your feedback 
                    helps us improve our services for all learners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              We're here to help you understand our policies and ensure your satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary">
                Contact Support
              </Button>
              <Button href="/register" variant="outline">
                Try a Free Lesson
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}