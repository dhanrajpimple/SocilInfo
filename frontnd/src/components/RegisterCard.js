import React, { useState, useContext } from 'react';
import { register } from '../action/auth';
import { Link } from 'react-router-dom';

const RegisterCard = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await register(formData)
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const userId = data.user._id;
  
        // Store token and userId in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
  
     
        console.log('Registration successful!');
      } else {
        // Registration failed, handle the error response
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error registering:', error);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
        <Link to={'/'} > <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Register
          </button></Link>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <Link to={'/login'} className="text-blue-500 hover:text-blue-700">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
