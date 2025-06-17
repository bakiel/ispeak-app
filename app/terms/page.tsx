import React from 'react'
import Link from 'next/link'
import { FileText, Scale, Users, CreditCard, AlertTriangle, BookOpen, Shield, Ban, Clock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function TermsOfServicePage() {
  const lastUpdated = 'January 15, 2025'
  const effectiveDate = 'January 1, 2025'

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'services', title: 'Services Description' },
    { id: 'account-registration', title: 'Account Registration' },
    { id: 'user-conduct', title: 'User Conduct' },
    { id: 'payment-terms', title: 'Payment Terms' },
    { id: 'content-ownership', title: 'Content Ownership' },
    { id: 'privacy', title: 'Privacy' },
    { id: 'disclaimers', title: 'Disclaimers' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'termination', title: 'Termination' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'contact', title: 'Contact Information' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Scale className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-white/90">
              Please read these terms carefully before using our services.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2" />
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
                    Welcome to iSPEAK Language Learning Program. These Terms of Service ("Terms") govern your use of 
                    our website, mobile applications, and services (collectively, the "Services"). By accessing or 
                    using our Services, you agree to be bound by these Terms.
                  </p>
                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-amber-900">
                          <strong>Important:</strong> If you are under 18 years of age, you may only use our Services 
                          with the involvement and consent of a parent or legal guardian.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Acceptance of Terms */}
                <div id="acceptance">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-secondary" />
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-gray-700 mb-4">
                    By creating an account, accessing, or using our Services, you acknowledge that you have read, 
                    understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree 
                    to these Terms, you must not use our Services.
                  </p>
                  <p className="text-gray-700">
                    We may modify these Terms at any time. Continued use of our Services after changes constitutes 
                    acceptance of the modified Terms.
                  </p>
                </div>

                {/* Services Description */}
                <div id="services">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-secondary" />
                    2. Services Description
                  </h2>
                  <p className="text-gray-700 mb-4">
                    iSPEAK provides online language learning services including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Live online lessons with qualified educators</li>
                    <li>Educational resources and materials</li>
                    <li>Progress tracking and reporting</li>
                    <li>Cultural education content</li>
                    <li>E-commerce platform for educational products</li>
                    <li>Community features for learners and families</li>
                  </ul>
                </div>

                {/* Account Registration */}
                <div id="account-registration">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-secondary" />
                    3. Account Registration
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">3.1 Account Requirements</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>You must provide accurate and complete information</li>
                        <li>You must be 18+ to create a parent/guardian account</li>
                        <li>Student accounts for children under 13 must be created by parents</li>
                        <li>You are responsible for maintaining account security</li>
                        <li>You must notify us immediately of unauthorized access</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">3.2 Educator Requirements</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Must pass background checks and verification</li>
                        <li>Must provide accurate qualifications and experience</li>
                        <li>Must maintain professional standards</li>
                        <li>Must comply with child safety protocols</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* User Conduct */}
                <div id="user-conduct">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-secondary" />
                    4. User Conduct
                  </h2>
                  <p className="text-gray-700 mb-4">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Use the Services for any unlawful purpose</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Share inappropriate content during lessons</li>
                    <li>Impersonate others or provide false information</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use the Services to collect information about others</li>
                    <li>Interfere with or disrupt the Services</li>
                    <li>Violate any applicable laws or regulations</li>
                  </ul>
                </div>

                {/* Payment Terms */}
                <div id="payment-terms">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-secondary" />
                    5. Payment Terms
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">5.1 Subscription Plans</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Subscription fees are billed in advance</li>
                        <li>Automatic renewal unless cancelled 24 hours before renewal</li>
                        <li>No refunds for partial months</li>
                        <li>Price changes with 30 days notice</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">5.2 Cancellation Policy</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Lessons must be cancelled 24 hours in advance</li>
                        <li>Late cancellations may forfeit the lesson</li>
                        <li>Educator cancellations will be rescheduled or refunded</li>
                        <li>Subscription cancellations effective at end of billing period</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">5.3 Refund Policy</h3>
                      <p className="text-gray-700">
                        Please see our separate <Link href="/refund-policy" className="text-secondary hover:underline">Refund Policy</Link> for 
                        detailed information about refunds and our satisfaction guarantee.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Ownership */}
                <div id="content-ownership">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-secondary" />
                    6. Content Ownership
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">6.1 Our Content</h3>
                      <p className="text-gray-700">
                        All content provided through our Services, including curricula, lesson materials, videos, 
                        and assessments, is owned by iSPEAK or licensed to us. You may not reproduce, distribute, 
                        or create derivative works without our written permission.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">6.2 User Content</h3>
                      <p className="text-gray-700">
                        You retain ownership of content you submit but grant us a license to use it for providing 
                        and improving our Services. This includes homework submissions, recordings of lessons for 
                        quality purposes, and feedback.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">6.3 Recording Policy</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Lessons may be recorded for quality and safety purposes</li>
                        <li>Recordings are kept confidential and secure</li>
                        <li>Parents may request access to their child's lesson recordings</li>
                        <li>Users may not record lessons without consent</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <div id="privacy">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-secondary" />
                    7. Privacy
                  </h2>
                  <p className="text-gray-700">
                    Your use of our Services is also governed by our <Link href="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>, 
                    which is incorporated into these Terms by reference. We are committed to protecting your privacy 
                    and the privacy of children using our Services.
                  </p>
                </div>

                {/* Disclaimers */}
                <div id="disclaimers">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-secondary" />
                    8. Disclaimers
                  </h2>
                  <Card className="bg-gray-100 mb-4">
                    <CardContent className="p-6">
                      <p className="text-gray-900 uppercase font-bold mb-2">
                        The Services are provided "AS IS" and "AS AVAILABLE"
                      </p>
                      <p className="text-gray-700">
                        We make no warranties, express or implied, regarding the Services, including but not limited to 
                        warranties of merchantability, fitness for a particular purpose, or non-infringement.
                      </p>
                    </CardContent>
                  </Card>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>We do not guarantee specific learning outcomes</li>
                    <li>We are not responsible for technical issues beyond our control</li>
                    <li>We do not warrant uninterrupted or error-free service</li>
                    <li>We are not liable for user-generated content</li>
                  </ul>
                </div>

                {/* Limitation of Liability */}
                <div id="limitation-liability">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Ban className="w-6 h-6 mr-3 text-secondary" />
                    9. Limitation of Liability
                  </h2>
                  <p className="text-gray-700 mb-4">
                    To the maximum extent permitted by law:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Our liability is limited to the amount paid for Services in the past 12 months</li>
                    <li>We are not liable for indirect, incidental, or consequential damages</li>
                    <li>We are not liable for loss of data or profits</li>
                    <li>These limitations apply even if we knew of possible damages</li>
                  </ul>
                </div>

                {/* Termination */}
                <div id="termination">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Ban className="w-6 h-6 mr-3 text-secondary" />
                    10. Termination
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We may terminate or suspend your account immediately, without prior notice, for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Breach of these Terms</li>
                      <li>Violation of child safety policies</li>
                      <li>Fraudulent or illegal activities</li>
                      <li>Non-payment of fees</li>
                      <li>Behavior harmful to other users</li>
                    </ul>
                    <p className="text-gray-700">
                      You may terminate your account at any time through your account settings or by contacting support.
                    </p>
                  </div>
                </div>

                {/* Governing Law */}
                <div id="governing-law">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Scale className="w-6 h-6 mr-3 text-secondary" />
                    11. Governing Law
                  </h2>
                  <p className="text-gray-700 mb-4">
                    These Terms are governed by the laws of the State of Delaware, United States, without regard 
                    to conflict of law provisions. Any disputes shall be resolved in the courts of Delaware.
                  </p>
                  <p className="text-gray-700">
                    You agree to first attempt to resolve disputes informally by contacting us. If informal 
                    resolution fails, disputes will be resolved through binding arbitration, except where 
                    prohibited by law.
                  </p>
                </div>

                {/* General Provisions */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-heading font-bold mb-4">12. General Provisions</h2>
                  <div>
                    <h3 className="font-bold text-lg mb-2">12.1 Entire Agreement</h3>
                    <p className="text-gray-700">
                      These Terms, along with our Privacy Policy and other policies, constitute the entire 
                      agreement between you and iSPEAK.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">12.2 Severability</h3>
                    <p className="text-gray-700">
                      If any provision is found unenforceable, the remaining provisions will continue in effect.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">12.3 Assignment</h3>
                    <p className="text-gray-700">
                      You may not assign these Terms. We may assign our rights and obligations without restriction.
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div id="contact">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-secondary" />
                    13. Contact Information
                  </h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-4">
                        For questions about these Terms of Service, please contact us:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-3 text-gray-600" />
                          <a href="mailto:legal@ispeaklanguage.org" className="text-secondary hover:underline">
                            legal@ispeaklanguage.org
                          </a>
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 mr-3 text-gray-600" />
                          <a href="mailto:support@ispeaklanguage.org" className="text-secondary hover:underline">
                            support@ispeaklanguage.org
                          </a>
                        </div>
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 mr-3 text-gray-600 mt-0.5" />
                          <div>
                            <p className="font-medium">iSPEAK Language Learning Program</p>
                            <p className="text-gray-600">Legal Department</p>
                            <p className="text-gray-600">123 Education Boulevard</p>
                            <p className="text-gray-600">Washington, DC 20001</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Acknowledgment */}
                <div className="mt-12 p-6 bg-secondary/10 rounded-lg">
                  <h3 className="font-heading font-bold mb-3">Acknowledgment</h3>
                  <p className="text-gray-700">
                    By using our Services, you acknowledge that you have read and understood these Terms of Service 
                    and agree to be bound by them. If you are accepting these Terms on behalf of a child, you 
                    represent that you are the child's parent or legal guardian.
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
            <h2 className="text-2xl font-heading font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of families learning African languages with iSPEAK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/register" variant="secondary">
                Create Account
              </Button>
              <Button href="/contact" variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}