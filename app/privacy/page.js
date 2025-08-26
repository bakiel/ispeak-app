import ModernNavigation from '@/components/ModernNavigation'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <>
      <ModernNavigation />
      
      <div className="min-h-screen bg-white py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-600 mb-6">Last updated: January 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p>
                At iSPEAK Language Learning Program ("iSPEAK," "we," "us," or "our"), we are committed to protecting the privacy and security of our users' personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
              <p className="mb-4">We may collect the following personal information:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Parent/Guardian name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing information</li>
                <li>Child's first name and age</li>
                <li>Language preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Usage Information</h3>
              <p className="mb-4">We automatically collect certain information when you use our services:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited</li>
                <li>Time spent on pages</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use collected information for:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Providing and improving our language learning services</li>
                <li>Processing payments and transactions</li>
                <li>Communicating with you about lessons and updates</li>
                <li>Sending educational content and newsletters (with consent)</li>
                <li>Analyzing usage patterns to improve user experience</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Child Privacy</h2>
              <p className="mb-4">
                We take children's privacy seriously. We do not knowingly collect personal information from children under 13 without parental consent. All accounts must be created and managed by parents or legal guardians.
              </p>
              <p className="mb-4">
                During lessons, educators may see and hear children but do not have access to personal information beyond the child's first name and age.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Sharing and Disclosure</h2>
              <p className="mb-4">We do not sell, trade, or rent your personal information. We may share information with:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Service providers who assist in operating our platform</li>
                <li>Payment processors for transaction handling</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
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