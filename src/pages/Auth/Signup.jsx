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
  const [validationErrors, setValidationErrors] = useState({});

  // Validation functions
  const validateName = (name) => {
    const errors = [];

    if (!name || name.trim().length === 0) {
      errors.push('Name is required');
    } else if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (name.trim().length > 50) {
      errors.push('Name must be less than 50 characters');
    } else if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
      errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }

    return errors;
  };

  const validateEmail = (email) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!emailRegex.test(email.trim())) {
      errors.push('Please enter a valid email address');
    } else if (email.length > 100) {
      errors.push('Email must be less than 100 characters');
    }

    return errors;
  };

  const validatePassword = (password) => {
    const errors = [];

    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (password.length > 128) {
        errors.push('Password must be less than 128 characters');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
      if (/\s/.test(password)) {
        errors.push('Password cannot contain spaces');
      }
    }

    return errors;
  };

  // Real-time validation
  const validateField = (name, value) => {
    let fieldErrors = [];

    switch (name) {
      case 'name':
        fieldErrors = validateName(value);
        break;
      case 'email':
        fieldErrors = validateEmail(value);
        break;
      case 'password':
        fieldErrors = validatePassword(value);
        break;
      default:
        break;
    }

    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldErrors
    }));

    return fieldErrors.length === 0;
  };

  // Validate all fields
  const validateAllFields = () => {
    const nameErrors = validateName(formData.name);
    const emailErrors = validateEmail(formData.email);
    const passwordErrors = validatePassword(formData.password);

    const errors = {
      name: nameErrors,
      email: emailErrors,
      password: passwordErrors
    };

    setValidationErrors(errors);

    // Return true if no errors
    return nameErrors.length === 0 && emailErrors.length === 0 && passwordErrors.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear general error when user starts typing
    if (error) setError('');

    // Validate field on change (with debounce for better UX)
    setTimeout(() => {
      validateField(name, value);
    }, 300);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    // Validate all fields before submission
    const isValid = validateAllFields();

    if (!isValid) {
      setError('Please fix the validation errors before submitting');
      setLoading(false);
      return;
    }

    try {
      const signupData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };

      // Call signup API
      const result = await authService.signup(signupData);

      // Show success message
      setSuccessMessage('Account created successfully! Please sign in to continue.');

      // Clear form
      setFormData({ name: '', email: '', password: '' });
      setValidationErrors({});

      // Redirect to login after 2 seconds
      setTimeout(() => {
        onSwitchPage();
      }, 2000);

    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = () => {
    if (!formData.password) return 0;

    let strength = 0;
    if (formData.password.length >= 8) strength += 20;
    if (/[A-Z]/.test(formData.password)) strength += 20;
    if (/[a-z]/.test(formData.password)) strength += 20;
    if (/[0-9]/.test(formData.password)) strength += 20;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) strength += 20;

    return strength;
  };

  const passwordStrength = calculatePasswordStrength();
  const strengthColor =
    passwordStrength >= 80 ? 'bg-green-500' :
      passwordStrength >= 60 ? 'bg-blue-500' :
        passwordStrength >= 40 ? 'bg-yellow-500' :
          passwordStrength >= 20 ? 'bg-orange-500' : 'bg-red-500';

  const strengthText =
    passwordStrength >= 80 ? 'Very Strong' :
      passwordStrength >= 60 ? 'Strong' :
        passwordStrength >= 40 ? 'Moderate' :
          passwordStrength >= 20 ? 'Weak' : 'Very Weak';

  // Check if form is valid
  const isFormValid = () => {
    return formData.name.trim() &&
      formData.email.trim() &&
      formData.password &&
      Object.values(validationErrors).every(errors => errors.length === 0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-indigo-100">Get started with your contact manager</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Show success message */}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg text-sm flex items-start animate-fade-in">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Show error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-sm flex items-start animate-fade-in">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border transition duration-200 ${validationErrors.name?.length > 0
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  }`}
                placeholder="John Doe"
                required
                disabled={loading || successMessage}
              />
              {validationErrors.name?.length > 0 && (
                <div className="mt-1">
                  {validationErrors.name.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs">{error}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border transition duration-200 ${validationErrors.email?.length > 0
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  }`}
                placeholder="you@example.com"
                required
                disabled={loading || successMessage}
              />
              {validationErrors.email?.length > 0 && (
                <div className="mt-1">
                  {validationErrors.email.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs">{error}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border transition duration-200 ${validationErrors.password?.length > 0
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  }`}
                placeholder="••••••••"
                required
                disabled={loading || successMessage}
              />

              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Password strength:</span>
                    <span className={`text-xs font-medium ${passwordStrength >= 80 ? 'text-green-600' :
                        passwordStrength >= 60 ? 'text-blue-600' :
                          passwordStrength >= 40 ? 'text-yellow-600' :
                            passwordStrength >= 20 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                      {strengthText}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${strengthColor} transition-all duration-300`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {validationErrors.password?.length > 0 && (
                <div className="mt-2">
                  {validationErrors.password.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs">{error}</p>
                  ))}
                </div>
              )}

              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 font-medium mb-1">Password requirements:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li className={`flex items-center ${formData.password?.length >= 8 ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{formData.password?.length >= 8 ? '✓' : '•'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{/[A-Z]/.test(formData.password) ? '✓' : '•'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{/[a-z]/.test(formData.password) ? '✓' : '•'}</span>
                    One lowercase letter
                  </li>
                  <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{/[0-9]/.test(formData.password) ? '✓' : '•'}</span>
                    One number
                  </li>
                  <li className={`flex items-center ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className="mr-2">{/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? '✓' : '•'}</span>
                    One special character
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || successMessage || !isFormValid()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-md flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
            Already have an account?{' '}
            <button
              onClick={onSwitchPage}
              className="font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer transition-colors duration-200 hover:underline"
              disabled={loading}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Signup;

