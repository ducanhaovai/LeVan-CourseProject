/* eslint-disable react/no-unescaped-entities */
import { Send, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" pt-6 bg-gray-100 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Company Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B00] rounded text-white flex items-center justify-center font-bold">
              U
            </div>
            <span className="text-sm font-bold">UpSkill</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 text-sm ">
              <Phone className="w-5 h-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <Mail className="w-5 h-5" />
              <span>support@upskill.com</span>
            </div>
            <div className="flex items-start gap-3 text-gray-600 text-sm">
              <MapPin className="w-5 h-5 mt-1" />
              <span>58 Howard Street #2 San Francisco</span>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-6 ">Company</h3>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Instructor
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Become a teacher
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-6">Useful Links</h3>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Sitemap
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Privacy
              </a>
            </li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-6">Popular Categories</h3>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Design
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Development
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Marketing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Personal Development
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Business
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                IT and Software
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm ">
                Photography
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                Music
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
          <p className="text-gray-600 mb-6 text-sm">
            2000+ Our students are subscribe Around the World. Don't be shy introduce yourself!
          </p>

          <div className="flex gap-2 mb-8">
            <input
              type="email"
              placeholder="Your e-mail"
              className="flex-1 px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
            <button className="px-4 py-2 text-white rounded hover:bg-orange-600">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
