import config from '../config/config.js';

// Simple API client - no complexity!
class SimpleAPI {
    constructor() {
        this.baseURL = config.API_URL;
    }

    // Simple GET request
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(localStorage.getItem('token') && {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    })
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to server. Please check if the backend is running.');
            }
            throw error;
        }
    }

    // Simple POST request
    // In src/api/index.js, add logging to see what's being sent
async post(endpoint, data) {
    try {
        const token = localStorage.getItem('token');
        console.log('Sending request with token:', token ? 'Token exists' : 'No token');
        console.log('Request URL:', `${this.baseURL}${endpoint}`);
        console.log('Request data:', data);

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && {
                    'Authorization': `Bearer ${token}`
                })
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            throw new Error('Unable to connect to server. Please check if the backend is running.');
        }
        throw error;
    }
}


    // Simple PUT request
    async put(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(localStorage.getItem('token') && {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    })
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to server. Please check if the backend is running.');
            }
            throw error;
        }
    }

    // Simple DELETE request
    async delete(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(localStorage.getItem('token') && {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    })
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to server. Please check if the backend is running.');
            }
            throw error;
        }
    }
}

// Export single instance
export const api = new SimpleAPI();