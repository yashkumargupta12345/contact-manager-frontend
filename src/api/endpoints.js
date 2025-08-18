export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  
  // User contacts endpoints
  CONTACTS: {
    GET_ALL: '/user/contacts',
    CREATE: '/user/contacts',
    GET_BY_ID: (id) => `/user/contacts/${id}`,
    UPDATE: (id) => `/user/contacts/${id}`,
    DELETE: (id) => `/user/contacts/${id}`,
  },
  
  // Favorites endpoints
  FAVORITES: {
    GET_ALL: '/user/favorites',
    ADD_TO_FAVORITES: (id) => `/user/favorites/${id}`,
    REMOVE_FROM_FAVORITES: (id) => `/user/favorites/${id}`,
  },
  
  // Tags endpoints
  TAGS: {
    GET_ALL: '/user/tags',
    CREATE: '/user/tags',
    GET_BY_ID: (id) => `/user/tags/${id}`,
    UPDATE: (id) => `/user/tags/${id}`,
    DELETE: (id) => `/user/tags/${id}`,
    
    // Tag-Contact relationships
    GET_TAG_CONTACTS: (tagId) => `/user/tags/${tagId}/contacts`,
    ADD_CONTACT_TO_TAG: (tagId) => `/user/tags/${tagId}/contacts`,
    ADD_BULK_CONTACTS_TO_TAG: (tagId) => `/user/tags/${tagId}/contacts/bulk`,
    REMOVE_CONTACT_FROM_TAG: (tagId, contactId) => `/user/tags/${tagId}/contacts/${contactId}`,
    GET_AVAILABLE_CONTACTS: (tagId) => `/user/tags/${tagId}/available-contacts`,
  },
  
  // General API info
  API_INFO: '/',
};

// Helper function to build endpoint URLs with parameters
export const buildEndpoint = (endpoint, params = {}) => {
  let url = endpoint;
  
  // Replace parameters in the URL
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
};

// Export individual endpoint categories for easier imports
export const authEndpoints = API_ENDPOINTS.AUTH;
export const contactEndpoints = API_ENDPOINTS.CONTACTS;
export const favoriteEndpoints = API_ENDPOINTS.FAVORITES;
export const tagEndpoints = API_ENDPOINTS.TAGS;
