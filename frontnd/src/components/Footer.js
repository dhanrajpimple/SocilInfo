import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="text-white font-bold text-3xl mb-4 md:mb-0">
            <span className="text-yellow-500">Tek</span>World
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300 hover:scale-110"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;