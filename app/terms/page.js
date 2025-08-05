import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-600 mb-6">Effective Date: January 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the iSPEAK Language Learning Program website and services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
              <p>
                iSPEAK provides online African language learning services for children ages 3-14, including live virtual lessons with native speakers, educational resources, and cultural content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-semibold mb-2">3.1 Account Creation</h3>
              <p className="mb-4">
                Parents or legal guardians must create accounts on behalf of children. You must provide accurate and complete information during registration.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">3.2 Account Security</h3>
              <p className="mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
              <h3 className="text-xl font-semibold mb-2">4.1 Pricing</h3>
              <p className="mb-4">
                Current pricing is displayed on our website. We reserve the right to modify prices with 30 days' notice to existing customers.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">4.2 Payment Processing</h3>
              <p className="mb-4">
                Payments are processed securely through third-party payment processors. By providing payment information, you authorize us to charge the applicable fees.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">4.3 Refunds</h3>
              <p className="mb-4">
                Refund requests must be made within 7 days of purchase. Please see our Refund Policy for details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Lesson Policies</h2>
              <h3 className="text-xl font-semibold mb-2">5.1 Scheduling</h3>
              <p className="mb-4">
                Lessons must be scheduled in advance through our platform. Availability is subject to educator schedules.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">5.2 Cancellations</h3>
              <p className="mb-4">
                Cancellations must be made at least 24 hours before the scheduled lesson time to receive credit or rescheduling options.
              </p>
              
              <h3 className="text-xl font-semibold mb-2">5.3 No-Shows</h3>
              <p className="mb-4">
                Failure to attend a scheduled lesson without prior cancellation will result in forfeiture of that lesson.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Code of Conduct</h2>
              <p className="mb-4">Users must:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Treat educators and staff with respect</li>
                <li>Ensure children are supervised during lessons</li>
                <li>Not record lessons without permission</li>
                <li>Not share login credentials</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p>
                All content, including curricula, materials, logos, and trademarks, is the property of iSPEAK or its licensors. Users may not reproduce, distribute, or create derivative works without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Privacy</h2>
              <p>
                Your use of our Services is subject to our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Disclaimers</h2>
              <p>
                Our Services are provided "as is" without warranties of any kind. We do not guarantee specific learning outcomes or results.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, iSPEAK shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
              <p>
                We may terminate or suspend your account for violations of these Terms. You may cancel your account at any time by contacting us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Georgia, United States, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. Continued use of our Services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms, please contact us at:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold">iSPEAK Language Learning Program</p>
                <p>P.O. Box 4511</p>
                <p>Macon, Georgia 31213</p>
                <p>Email: privacy@ispeaklanguage.org</p>
                <p>Phone: +1 (478) 390-4040</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}