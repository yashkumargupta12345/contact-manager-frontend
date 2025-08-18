import React, { useState } from 'react';
import { authService } from '../../api/services/authService.js';
import { handleApiError } from '../../utils/errorHandler.js';

const Signup = ({ onSignup, onSwitchPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };

      // Call signup API but don't auto-login
      const result = await authService.signup(signupData);
      
      // Show success message
      setSuccessMessage('Account created successfully! Please sign in to continue.');
      
      // Clear form
      setFormData({ name: '', email: '', password: '' });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        onSwitchPage(); // This will switch to login page
      }, 2000);

    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Create Account</h1>
        <p className="text-gray-600">Get started with your contact manager</p>
      </div>

      {/* Show success message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

      {/* Show error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="John Doe"
            required
            disabled={loading || successMessage}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="you@example.com"
            required
            disabled={loading || successMessage}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="••••••••"
            required
            disabled={loading || successMessage}
          />
          <p className="mt-1 text-xs text-gray-500">Use 8+ characters with a mix of letters & numbers</p>
        </div>

        <button
          type="submit"
          disabled={loading || successMessage}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onSwitchPage}
          className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
          disabled={loading}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Signup;