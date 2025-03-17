import React from 'react';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white mt-auto border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-indigo-600 hover:text-indigo-700 transition-colors duration-300" />
              <span className="ml-2 text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                HazarVejo
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Your Gateway to Smarter Email Campaigns!
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Developed by <a href="https://github.com/mdazfar2" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-300">Azfar Alam</a>
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#docs"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#privacy"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-base text-gray-500 hover:text-indigo-600 transition-colors duration-300"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} HazarVejo. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-600 transition-colors duration-300"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-600 transition-colors duration-300"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-600 transition-colors duration-300"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;