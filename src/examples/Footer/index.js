import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Le Van Academy</h2>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">GET HELP</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Latest Articles
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">PROGRAMS</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Art & Design
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                Business
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                IT & Software
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Languages
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Programming
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
          <p className="text-sm text-gray-600 mb-2">
            Address: 2321 New Design St, Lorem Ipsum10 Hudson Yards, USA
          </p>
          <p className="text-sm text-gray-600 mb-2">Tel: + (123) 2500-567-8988</p>
          <p className="text-sm text-gray-600 mb-4">Mail: support@mail.com</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
