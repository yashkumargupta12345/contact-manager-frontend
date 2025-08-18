import { api } from '../index.js';
import { authEndpoints } from '../endpoints.js';

export const authService = {
  // Login function - accepts credentials object
  login: async (credentials) => {
    try {
      const result = await api.post(authEndpoints.LOGIN, credentials);
      console.log('Login API Response:', result);
      
      if (result && result.success && result.data) {
        const { user, token } = result.data;
        
        if (user && token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          return { user, token };
        } else {
          console.error('Missing user or token in response:', result.data);
          throw new Error('Invalid login response - missing user or token');
        }
      } else {
        console.error('Invalid login response structure:', result);
        throw new Error('Login failed - invalid response from server');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Signup function - just register, don't auto-login
  signup: async (userData) => {
    try {
      const result = await api.post(authEndpoints.REGISTER, userData);
      console.log('Signup API Response:', result);
      
      if (result && result.success && result.data) {
        const user = result.data;
        
        if (user && user._id) {
          // Just return the user data without logging in
          return { user, success: true };
        } else {
          console.error('Invalid user data in signup response:', result.data);
          throw new Error('Registration failed - invalid user data');
        }
      } else {
        console.error('Invalid signup response structure:', result);
        throw new Error('Registration failed - invalid response from server');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },

  // Rest of the methods remain the same...
  logout: async () => {
    try {
      await api.post(authEndpoints.LOGOUT);
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  isLoggedIn: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user && user !== 'undefined');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  }
};