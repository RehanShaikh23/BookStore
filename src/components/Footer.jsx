import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyNewsletterSubscription from './LazyNewsletterSubscription';

const Footer = () => {
  return (
    <footer className="bg-coffee-800 text-coffee-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-coffee-300" />
              <span className="text-2xl font-serif font-bold text-coffee-100">BookHaven</span>
            </div>
            <p className="text-coffee-300 leading-relaxed">
              Your trusted online bookstore, bringing the world of literature to your doorstep. 
              Discover, explore, and collect books that inspire and transform.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-coffee-700 rounded-full flex items-center justify-center hover:bg-coffee-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-coffee-700 rounded-full flex items-center justify-center hover:bg-coffee-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-coffee-700 rounded-full flex items-center justify-center hover:bg-coffee-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-coffee-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-coffee-300 hover:text-coffee-100 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-coffee-300 hover:text-coffee-100 transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-coffee-300 hover:text-coffee-100 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-coffee-300 hover:text-coffee-100 transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-coffee-100">Customer Service</h3>
            <ul className="space-y-2">
              <li className="text-coffee-300">Help Center</li>
              <li className="text-coffee-300">Returns & Exchanges</li>
              <li className="text-coffee-300">Shipping Info</li>
              <li className="text-coffee-300">Track Your Order</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-coffee-100">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-coffee-400" />
                <span className="text-coffee-300">support@bookhaven.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-coffee-400" />
                <span className="text-coffee-300">1-800-BOOKS-24</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-coffee-400" />
                <span className="text-coffee-300">123 Library Street, Book City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-coffee-700 mt-12 pt-8">
          <LazyNewsletterSubscription />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-coffee-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-coffee-400 text-sm">
              © 2024 BookHaven. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-coffee-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for book lovers worldwide</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-coffee-400 hover:text-coffee-200 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-coffee-400 hover:text-coffee-200 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;