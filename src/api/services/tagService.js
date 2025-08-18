import { api } from '../index.js';
import { tagEndpoints } from '../endpoints.js';

export const tagService = {
  // Get all tags
  getAllTags: async () => {
    try {
      return await api.get(tagEndpoints.GET_ALL);
    } catch (error) {
      throw error;
    }
  },

  // Get single tag
  getTag: async (id) => {
    try {
      return await api.get(tagEndpoints.GET_BY_ID(id));
    } catch (error) {
      throw error;
    }
  },

  // Create new tag
  createTag: async (tagData) => {
    try {
      return await api.post(tagEndpoints.CREATE, tagData);
    } catch (error) {
      throw error;
    }
  },

  // Update tag
  updateTag: async (id, tagData) => {
    try {
      return await api.put(tagEndpoints.UPDATE(id), tagData);
    } catch (error) {
      throw error;
    }
  },

  // Delete tag
  deleteTag: async (id) => {
    try {
      return await api.delete(tagEndpoints.DELETE(id));
    } catch (error) {
      throw error;
    }
  },

  // Get contacts with specific tag
  getTagContacts: async (tagId) => {
    try {
      return await api.get(tagEndpoints.GET_TAG_CONTACTS(tagId));
    } catch (error) {
      throw error;
    }
  },

  // Add single contact to tag
  addContactToTag: async (tagId, contactId) => {
    try {
      return await api.post(tagEndpoints.ADD_CONTACT_TO_TAG(tagId), { contactId });
    } catch (error) {
      throw error;
    }
  },

  // Add multiple contacts to tag
  addBulkContactsToTag: async (tagId, contactIds) => {
    try {
      return await api.post(tagEndpoints.ADD_BULK_CONTACTS_TO_TAG(tagId), { contactIds });
    } catch (error) {
      throw error;
    }
  },

  // Remove contact from tag
  removeContactFromTag: async (tagId, contactId) => {
    try {
      return await api.delete(tagEndpoints.REMOVE_CONTACT_FROM_TAG(tagId, contactId));
    } catch (error) {
      throw error;
    }
  },

  // Get available contacts (not in this tag)
  getAvailableContacts: async (tagId) => {
    try {
      return await api.get(tagEndpoints.GET_AVAILABLE_CONTACTS(tagId));
    } catch (error) {
      throw error;
    }
  }
};

