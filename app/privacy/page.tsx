import React from 'react'
import Link from 'next/link'
import { Shield, Lock, Eye, Database, Globe, Mail, Phone, FileText, Users, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 15, 2025'
  const effectiveDate = 'January 1, 2025'

  const sections = [
    { id: 'information-we-collect', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Your Information' },
    { id: 'data-sharing', title: 'Data Sharing and Disclosure' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'childrens-privacy', title: "Children's Privacy" },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'contact', title: 'Contact Information' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/90">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                    iSPEAK Language Learning Program ("we," "us," or "our") is committed to protecting the privacy 
                    of our users, especially children. This Privacy Policy explains how we collect, use, disclose, 
                    and safeguard your information when you use our website, mobile application, and services.
                  </p>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <p className="text-blue-900">
                        <strong>Note:</strong> We are COPPA compliant and take special care to protect the privacy 
                        of children under 13. Parental consent is required for all student accounts.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Information We Collect */}
                <div id="information-we-collect">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-3 text-secondary" />
                    Information We Collect
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Parent/Guardian Information: Name, email address, phone number, billing address</li>
                        <li>Student Information: First name, age, grade level (no email addresses for children under 13)</li>
                        <li>Educator Information: Name, email, phone number, qualifications, background check results</li>
                        <li>Payment Information: Credit card details (processed securely through Stripe)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Usage Information</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Learning progress and assessment data</li>
                        <li>Lesson attendance and participation</li>
                        <li>Communication logs between educators and parents</li>
                        <li>Device information and IP addresses</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How We Use Information */}
                <div id="how-we-use">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-secondary" />
                    How We Use Your Information
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Provide and improve our language learning services</li>
                    <li>Match students with appropriate educators</li>
                    <li>Track learning progress and provide reports to parents</li>
                    <li>Process payments and manage subscriptions</li>
                    <li>Communicate about lessons, updates, and promotions</li>
                    <li>Ensure safety through background checks for educators</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                {/* Data Sharing */}
                <div id="data-sharing">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-secondary" />
                    Data Sharing and Disclosure
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We do not sell, trade, or rent your personal information. We may share information only:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>With educators assigned to your child (limited to necessary information)</li>
                    <li>With service providers who help us operate our platform (under strict confidentiality)</li>
                    <li>When required by law or to protect rights and safety</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>

                {/* Data Security */}
                <div id="data-security">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-3 text-secondary" />
                    Data Security
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We implement industry-standard security measures including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure servers with regular security updates</li>
                    <li>Limited access to personal information (need-to-know basis)</li>
                    <li>Regular security audits and monitoring</li>
                    <li>PCI DSS compliance for payment processing</li>
                  </ul>
                </div>

                {/* Children's Privacy */}
                <div id="childrens-privacy">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-secondary" />
                    Children's Privacy
                  </h2>
                  <Card className="bg-green-50 border-green-200 mb-4">
                    <CardContent className="p-6">
                      <p className="text-green-900 font-medium mb-2">
                        COPPA Compliance Statement
                      </p>
                      <p className="text-green-800">
                        We comply with the Children's Online Privacy Protection Act (COPPA) and do not knowingly 
                        collect personal information from children under 13 without parental consent.
                      </p>
                    </CardContent>
                  </Card>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Parents must create and manage accounts for children under 13</li>
                    <li>We collect minimal information about children (first name and age only)</li>
                    <li>Parents have full access to their child's information and progress</li>
                    <li>Parents can request deletion of their child's data at any time</li>
                    <li>We do not display behavioral advertising to children</li>
                  </ul>
                </div>

                {/* Your Rights */}
                <div id="your-rights">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-secondary" />
                    Your Rights
                  </h2>
                  <p className="text-gray-700 mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent for data processing</li>
                    <li>Data portability (receive your data in a structured format)</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    To exercise these rights, contact us at privacy@ispeaklanguage.org
                  </p>
                </div>

                {/* Cookies */}
                <div id="cookies">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-3 text-secondary" />
                    Cookies and Tracking
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Remember your preferences and settings</li>
                    <li>Authenticate users and prevent fraud</li>
                    <li>Analyze site traffic and usage patterns</li>
                    <li>Improve user experience</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    You can control cookies through your browser settings. Disabling cookies may limit some features.
                  </p>
                </div>

                {/* Third-Party Services */}
                <div id="third-party">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-3 text-secondary" />
                    Third-Party Services
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We use trusted third-party services including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li><strong>Stripe:</strong> Payment processing (PCI compliant)</li>
                    <li><strong>Zoom:</strong> Video lessons (end-to-end encrypted)</li>
                    <li><strong>SendGrid:</strong> Email communications</li>
                    <li><strong>Google Analytics:</strong> Website analytics (anonymized)</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    These services have their own privacy policies and security measures.
                  </p>
                </div>

                {/* Data Retention */}
                <div id="data-retention">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-secondary" />
                    Data Retention
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We retain personal information for as long as necessary to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Provide our services</li>
                    <li>Comply with legal obligations</li>
                    <li>Resolve disputes</li>
                    <li>Enforce our agreements</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Learning progress data is retained for 3 years after account closure. 
                    Financial records are retained for 7 years as required by law.
                  </p>
                </div>

                {/* Contact Information */}
                <div id="contact">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-secondary" />
                    Contact Information
                  </h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-4">
                        If you have questions or concerns about this Privacy Policy or our data practices, contact us:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-3 text-gray-600" />
                          <a href="mailto:privacy@ispeaklanguage.org" className="text-secondary hover:underline">
                            privacy@ispeaklanguage.org
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 mr-3 text-gray-600" />
                          <a href="tel:+12025550123" className="text-secondary hover:underline">
                            (202) 555-0123
                          </a>
                        </div>
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 mr-3 text-gray-600 mt-0.5" />
                          <div>
                            <p className="font-medium">iSPEAK Language Learning Program</p>
                            <p className="text-gray-600">123 Education Boulevard</p>
                            <p className="text-gray-600">Washington, DC 20001</p>
                            <p className="text-gray-600">United States</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Updates */}
                <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                  <h3 className="font-heading font-bold mb-3">Updates to This Policy</h3>
                  <p className="text-gray-700">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes 
                    by posting the new policy on this page and updating the "Last Updated" date. For significant changes 
                    affecting children's data, we will obtain parental consent before implementing changes.
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
              We're here to help you understand how we protect your family's privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary">
                Contact Privacy Team
              </Button>
              <Button href="/terms" variant="outline">
                View Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}