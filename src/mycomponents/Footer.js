import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 border-t border-t-stone-400 border-solid">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            <h2 className="text-lg font-bold">About Quizinaut</h2>
            <p className="mt-1">Your go-to app for fun and engaging quizzes on a variety of topics. Join our community and challenge your friends!</p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="/about" className="text-white hover:text-blue-400 transition duration-300">About Us</Link>
            <Link to="/contact" className="text-white hover:text-blue-400 transition duration-300">Contact</Link>
            <Link to="/privacy" className="text-white hover:text-blue-400 transition duration-300">Privacy Policy</Link>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-white hover:text-blue-500 transition duration-300">
              <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
              <span>Facebook</span>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-white hover:text-blue-400 transition duration-300">
              <FontAwesomeIcon icon={faTwitter} className="h-5 w-5" />
              <span>Twitter</span>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-white hover:text-pink-500 transition duration-300">
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
          <p className="text-sm">Stay updated with the latest quizzes and features.</p>
          <form className="flex mt-2">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="flex-1 max-w-[250px] px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300" type="submit">Subscribe</button>
          </form>
        </div>

        <div className="mt-4 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Quizinaut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
