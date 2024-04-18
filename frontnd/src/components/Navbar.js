import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-2xl">
          <span className="text-yellow-500">Tek</span>World
        </div>

        {/* Navigation Links */}
        <div>
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link to="/home" className="text-white hover:text-yellow-500 transition duration-300">Home</Link>
        <Link to="/create-post" className="text-white hover:text-yellow-500 transition duration-300">Create Post</Link>
        <Link to="/" className="text-white hover:text-yellow-500 transition duration-300">All Posts</Link>
        {isLoggedIn ? (
          <button className="text-white hover:text-yellow-500 transition duration-300" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="text-white hover:text-yellow-500 transition duration-300">Login</Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button className="text-white hover:text-yellow-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
      </div>
    </nav>
  );
};

export default Navbar;