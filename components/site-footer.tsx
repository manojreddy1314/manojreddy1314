import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-16">
      <div className="container px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center mr-3">
                <span className="text-gray-900 font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-light text-white">
                Elevate<span className="text-teal-400">Digital</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              We don't just provide services; we forge partnerships. Transforming brands through strategic digital
              marketing, branding, and innovative tech solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#hero" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#work" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/#careers" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-medium text-white text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Startup Solutions
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Branding Solutions
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-teal-400 transition-colors">
                  Tech Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-white text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">123 Innovation Drive, Tech City, TC 10101</li>
              <li>
                <Link href="tel:+15559876543" className="text-gray-400 hover:text-teal-400 transition-colors">
                  +1 (555) 987-6543
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:hello@elevatedigital.com"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                >
                  hello@elevatedigital.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Elevate Digital. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
