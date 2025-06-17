import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img 
              src="https://i.ibb.co/GQyxXsMB/ISPEAK.png" 
              alt="iSPEAK Logo" 
              className="h-12 md:h-16 mb-4"
            />
            <p className="text-gray-400 mb-6">Connecting children to heritage through language</p>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-gray-300 font-medium mr-2 w-24 inline-block">Owner:</span>
                <span className="text-gray-400">Daisy Ross</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-300 font-medium mr-2 w-24 inline-block">Phone:</span>
                <span className="text-gray-400">+1 (478) 390-4040</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-300 font-medium mr-2 w-24 inline-block">Email:</span>
                <span className="text-gray-400">info@ispeaklanguages.com</span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-300 font-medium mr-2 w-24 inline-block">Hours:</span>
                <span className="text-gray-400">Monday-Friday, 9am-5pm Eastern Time</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
              <li><Link href="/plans" className="text-gray-400 hover:text-white transition duration-300">Plans & Pricing</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition duration-300">Paji Shop</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-white transition duration-300">Free Registration</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white transition duration-300">Login</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/resources/free" className="text-gray-400 hover:text-white transition duration-300">Free Printables</Link></li>
              <li><Link href="/resources/articles" className="text-gray-400 hover:text-white transition duration-300">Articles</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition duration-300">FAQs</Link></li>
              <li><Link href="/educator-apply" className="text-gray-400 hover:text-white transition duration-300">Educator Applications</Link></li>
              <li><Link href="/loyalty" className="text-gray-400 hover:text-white transition duration-300">Loyalty Program</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Join our newsletter for language tips and cultural insights</p>
            <div className="flex flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 rounded-md sm:rounded-r-none w-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2 sm:mb-0"
              />
              <button className="bg-teal-500 text-white px-4 py-2 rounded-md sm:rounded-l-none hover:bg-teal-600 transition duration-300">
                Subscribe
              </button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg md:text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300">
                  <i className="fab fa-facebook-f text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300">
                  <i className="fab fa-instagram text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300">
                  <i className="fab fa-youtube text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300">
                  <i className="fab fa-twitter text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500">&copy; 2025 iSPEAK Language Learning Program. All Rights Reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center footer-links">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-400 mx-2 mb-2 md:mb-0">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-400 mx-2 mb-2 md:mb-0">Terms of Service</Link>
              <Link href="/child-safety" className="text-gray-500 hover:text-gray-400 mx-2 mb-2 md:mb-0">Child Safety Statement</Link>
              <Link href="/refund" className="text-gray-500 hover:text-gray-400 mx-2 mb-2 md:mb-0">Refund Policy</Link>
              <Link href="/accessibility" className="text-gray-500 hover:text-gray-400 mx-2 mb-2 md:mb-0">Accessibility Statement</Link>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-4">
            Proudly created in partnership with NyaEden.
          </div>
        </div>
      </div>
    </footer>
  )
}
