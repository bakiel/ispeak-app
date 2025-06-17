import React from 'react'
import Link from 'next/link'
import { Package, Truck, Globe, Clock, Mail, Phone, FileText, Calendar, Info, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function ShippingPolicyPage() {
  const lastUpdated = 'January 15, 2025'
  const effectiveDate = 'January 1, 2025'

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'shipping-rates', title: 'Shipping Rates & Methods' },
    { id: 'processing-time', title: 'Processing Time' },
    { id: 'domestic-shipping', title: 'Domestic Shipping (US)' },
    { id: 'international-shipping', title: 'International Shipping' },
    { id: 'tracking', title: 'Order Tracking' },
    { id: 'customs', title: 'Customs & Import Duties' },
    { id: 'damaged-lost', title: 'Damaged or Lost Packages' },
    { id: 'returns', title: 'Returns & Exchanges' },
    { id: 'contact', title: 'Contact Information' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Package className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Shipping Policy
            </h1>
            <p className="text-lg text-white/90">
              Learn about our shipping methods, rates, and delivery timeframes for Paji Shop orders.
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
                    This shipping policy applies to all physical products purchased through the iSPEAK Paji Shop. 
                    We strive to process and ship orders promptly while ensuring safe delivery of your educational 
                    materials and cultural items.
                  </p>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <Info className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-blue-900 font-medium mb-2">
                            Digital Products Available
                          </p>
                          <p className="text-blue-800">
                            Many of our educational resources are available as instant digital downloads. 
                            Consider digital options to receive your materials immediately without shipping costs.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Overview */}
                <div id="overview">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Package className="w-6 h-6 mr-3 text-secondary" />
                    1. Overview
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We ship educational materials, books, cultural items, and learning resources to families 
                      worldwide. Our shipping partners ensure reliable delivery while keeping costs reasonable.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2">Shipping Partners</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• USPS (US Postal Service)</li>
                            <li>• UPS</li>
                            <li>• FedEx</li>
                            <li>• DHL (International)</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2">Product Types</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Educational books & workbooks</li>
                            <li>• Cultural artifacts & toys</li>
                            <li>• Learning materials & flashcards</li>
                            <li>• Apparel & accessories</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Shipping Rates & Methods */}
                <div id="shipping-rates">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Truck className="w-6 h-6 mr-3 text-secondary" />
                    2. Shipping Rates & Methods
                  </h2>
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-2">2.1 Domestic Shipping (United States)</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Shipping Method</th>
                            <th className="border p-3 text-left">Delivery Time</th>
                            <th className="border p-3 text-left">Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3">Standard Shipping</td>
                            <td className="border p-3">5-7 business days</td>
                            <td className="border p-3">$4.99 (Free over $50)</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border p-3">Priority Shipping</td>
                            <td className="border p-3">2-3 business days</td>
                            <td className="border p-3">$9.99</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Express Shipping</td>
                            <td className="border p-3">1-2 business days</td>
                            <td className="border p-3">$19.99</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <Card className="bg-green-50 border-green-200 mt-4">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-green-900 font-medium mb-2">
                              Free Shipping Promotion
                            </p>
                            <p className="text-green-800">
                              Orders over $50 qualify for free standard shipping within the United States. 
                              This promotion applies automatically at checkout.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <h3 className="font-bold text-lg mb-2 mt-6">2.2 Bundled Savings</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Multiple items ship together when possible to reduce costs</li>
                      <li>Book sets and learning bundles often include shipping savings</li>
                      <li>Digital + physical bundles available for immediate access plus physical backup</li>
                    </ul>
                  </div>
                </div>

                {/* Processing Time */}
                <div id="processing-time">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-secondary" />
                    3. Processing Time
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Orders are typically processed within 1-2 business days. Processing time may vary 
                      during peak seasons or for custom/personalized items.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2">Standard Items</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Processed within 1-2 business days</li>
                            <li>• Ships from our warehouse in Georgia</li>
                            <li>• Tracking provided via email</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2">Custom/Personalized Items</h4>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Processed within 3-5 business days</li>
                            <li>• Additional time for personalization</li>
                            <li>• Email updates on production status</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> Processing time is separate from shipping time. Total delivery 
                      time = Processing time + Shipping time.
                    </p>
                  </div>
                </div>

                {/* Domestic Shipping */}
                <div id="domestic-shipping">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Truck className="w-6 h-6 mr-3 text-secondary" />
                    4. Domestic Shipping (US)
                  </h2>
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-2">4.1 Shipping to All 50 States</h3>
                    <p className="text-gray-700">
                      We ship to all 50 states, including Alaska and Hawaii. Additional charges may apply for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Alaska and Hawaii - Additional $5 for standard shipping</li>
                      <li>US Territories (Puerto Rico, Guam, etc.) - Calculated at checkout</li>
                      <li>APO/FPO addresses - Standard USPS rates apply</li>
                    </ul>

                    <h3 className="font-bold text-lg mb-2 mt-6">4.2 PO Box Deliveries</h3>
                    <p className="text-gray-700">
                      USPS is the only carrier that delivers to PO Boxes. If you have a PO Box address, 
                      please select Standard Shipping at checkout.
                    </p>
                  </div>
                </div>

                {/* International Shipping */}
                <div id="international-shipping">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-3 text-secondary" />
                    5. International Shipping
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We ship to most countries worldwide. International shipping rates and delivery times 
                      vary by destination.
                    </p>
                    
                    <h3 className="font-bold text-lg mb-2">5.1 Available Countries</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        'Canada', 'United Kingdom', 'Nigeria',
                        'Ghana', 'Kenya', 'South Africa',
                        'Ethiopia', 'Tanzania', 'Uganda',
                        'Australia', 'Germany', 'France'
                      ].map((country) => (
                        <div key={country} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {country}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      And many more! Shipping rates calculated at checkout based on destination.
                    </p>

                    <h3 className="font-bold text-lg mb-2 mt-6">5.2 International Shipping Rates</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Region</th>
                            <th className="border p-3 text-left">Delivery Time</th>
                            <th className="border p-3 text-left">Starting Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3">Canada</td>
                            <td className="border p-3">7-14 business days</td>
                            <td className="border p-3">From $12.99</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border p-3">Europe</td>
                            <td className="border p-3">10-20 business days</td>
                            <td className="border p-3">From $18.99</td>
                          </tr>
                          <tr>
                            <td className="border p-3">Africa</td>
                            <td className="border p-3">14-28 business days</td>
                            <td className="border p-3">From $24.99</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border p-3">Rest of World</td>
                            <td className="border p-3">14-30 business days</td>
                            <td className="border p-3">From $22.99</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <Card className="bg-yellow-50 border-yellow-200 mt-4">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-yellow-900 font-medium mb-2">
                              International Shipping Notice
                            </p>
                            <p className="text-yellow-800">
                              Delivery times are estimates and may vary due to customs processing. We are 
                              not responsible for delays caused by customs or local postal services.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Order Tracking */}
                <div id="tracking">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Package className="w-6 h-6 mr-3 text-secondary" />
                    6. Order Tracking
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      All orders include tracking information for your peace of mind:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Tracking number emailed when order ships</li>
                      <li>Real-time tracking updates available online</li>
                      <li>SMS notifications available for US orders</li>
                      <li>Track your order through your account dashboard</li>
                    </ul>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3">How to Track Your Order</h4>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                          <li>Check your email for shipping confirmation</li>
                          <li>Click the tracking link in the email, or</li>
                          <li>Log into your iSPEAK account and view order status</li>
                          <li>Enter tracking number on carrier's website if needed</li>
                        </ol>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Customs & Import Duties */}
                <div id="customs">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-3 text-secondary" />
                    7. Customs & Import Duties
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      For international orders, please note:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Customers are responsible for all customs fees, import duties, and taxes</li>
                      <li>These charges are NOT included in our shipping rates</li>
                      <li>Fees vary by country and are determined by local customs offices</li>
                      <li>We mark all packages accurately as "Educational Materials"</li>
                      <li>We cannot mark items as "gifts" or declare false values</li>
                    </ul>
                    
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-6">
                        <p className="text-blue-900">
                          <strong>Tip:</strong> Contact your local customs office before ordering to 
                          understand potential import fees for educational materials in your country.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Damaged or Lost Packages */}
                <div id="damaged-lost">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-secondary" />
                    8. Damaged or Lost Packages
                  </h2>
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg mb-2">8.1 Damaged Items</h3>
                    <p className="text-gray-700">
                      If your order arrives damaged:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                      <li>Take photos of the damaged packaging and items</li>
                      <li>Contact us within 48 hours of delivery</li>
                      <li>Email photos to support@ispeaklanguage.org</li>
                      <li>We'll arrange a replacement or refund</li>
                    </ol>

                    <h3 className="font-bold text-lg mb-2 mt-6">8.2 Lost Packages</h3>
                    <p className="text-gray-700">
                      If tracking shows delivered but you haven't received your package:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                      <li>Check with neighbors and building management</li>
                      <li>Verify the shipping address was correct</li>
                      <li>Contact the carrier with your tracking number</li>
                      <li>If still not found, contact us for assistance</li>
                    </ol>
                    
                    <p className="text-gray-700 mt-4">
                      We will file a claim with the carrier and work to resolve the issue promptly. 
                      Resolution may include reshipping the order or issuing a refund.
                    </p>
                  </div>
                </div>

                {/* Returns & Exchanges */}
                <div id="returns">
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                    <Package className="w-6 h-6 mr-3 text-secondary" />
                    9. Returns & Exchanges
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      For information about returning items, please see our{' '}
                      <Link href="/refund-policy" className="text-secondary hover:underline">
                        Refund Policy
                      </Link>. Key points include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>30-day return window for unopened items</li>
                      <li>Original packaging required for returns</li>
                      <li>Customer pays return shipping unless item is defective</li>
                      <li>Exchanges available for different sizes or damaged items</li>
                      <li>Custom/personalized items are final sale</li>
                    </ul>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3">Return Address</h4>
                        <p className="text-gray-700">
                          iSPEAK Language Learning Program<br />
                          Returns Department<br />
                          123 Education Boulevard<br />
                          Warner Robins, GA 31088<br />
                          United States
                        </p>
                      </CardContent>
                    </Card>
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
                        For questions about shipping, tracking, or your order:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-3 text-gray-600" />
                          <div>
                            <p className="font-medium">Email Support:</p>
                            <a href="mailto:orders@ispeaklanguage.org" className="text-secondary hover:underline">
                              orders@ispeaklanguage.org
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
                            <p className="font-medium">Order Inquiries:</p>
                            <p className="text-gray-600">Please have your order number ready</p>
                            <p className="text-gray-600">Response within 1 business day</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Shipping Tips */}
                <div className="mt-12 p-6 bg-secondary/10 rounded-lg">
                  <h3 className="font-heading font-bold mb-3 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-secondary" />
                    Shipping Tips & Reminders
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Double-check your shipping address before completing your order</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Consider digital downloads for immediate access to educational materials</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Bundle multiple items to save on shipping costs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sign up for order notifications to track your package</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Contact us immediately if you have any shipping concerns</span>
                    </li>
                  </ul>
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
            <h2 className="text-2xl font-heading font-bold mb-4">Ready to Shop?</h2>
            <p className="text-gray-600 mb-6">
              Browse our collection of educational materials and cultural items in the Paji Shop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/shop" variant="secondary">
                Visit Paji Shop
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