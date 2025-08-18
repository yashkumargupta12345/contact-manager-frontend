import { api } from '../index.js';
import { contactEndpoints, favoriteEndpoints } from '../endpoints.js';

export const contactService = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      return await api.get(contactEndpoints.GET_ALL);
    } catch (error) {
      throw error;
    }
  },

  // Get single contact
  getContact: async (id) => {
    try {
      return await api.get(contactEndpoints.GET_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Create new contact
  createContact: async (contactData) => {
    try {
      return await api.post(contactEndpoints.CREATE, contactData);
    } catch (error) {
      throw error;
    }
  },

  // Update contact
  updateContact: async (id, contactData) => {
    try {
      return await api.put(contactEndpoints.UPDATE(id), contactData);
    } catch (error) {
      throw error;
    }
  },

  // Delete contact
  deleteContact: async (id) => {
    try {
      return await api.delete(contactEndpoints.DELETE(id));
    } catch (error) {
      throw error;
    }
  },

  // Get favorite contacts
  getFavoriteContacts: async () => {
    try {
      return await api.get(favoriteEndpoints.GET_ALL);
    } catch (error) {
      throw error;
    }
  },

  // Add contact to favorites
  addToFavorites: async (id) => {
    try {
      return await api.put(favoriteEndpoints.ADD_TO_FAVORITES(id));
    } catch (error) {
      throw error;
    }
  },

  // Remove contact from favorites
  removeFromFavorites: async (id) => {
    try {
      return await api.delete(favoriteEndpoints.REMOVE_FROM_FAVORITES(id));
    } catch (error) {
      throw error;
    }
  },

  // Search contacts (you can add search query as parameter)
  searchContacts: async (searchTerm) => {
    try {
      return await api.get(`${contactEndpoints.GET_ALL}?search=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      throw error;
    }
  }
};