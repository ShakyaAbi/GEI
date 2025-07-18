import axios from 'axios';
import toast from 'react-hot-toast';

// Ensure API URL is provided
const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl && import.meta.env.PROD) {
  throw new Error('API URL is not configured. Please set VITE_API_URL in your environment.');
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Don't show error toast for request errors in production
    if (!import.meta.env.PROD) {
      console.error('Request error:', error);
    }
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please log in again.');
    } 
    // Handle 403 Forbidden errors
    else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    }
    // Handle 404 Not Found errors
    else if (error.response?.status === 404) {
      toast.error('The requested resource was not found.');
    }
    // Handle 422 Validation errors
    else if (error.response?.status === 422) {
      const message = error.response.data?.message || 'Validation failed. Please check your input.';
      toast.error(message);
    }
    // Handle 429 Too Many Requests
    else if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.');
    }
    // Handle 500 and other server errors
    else if (error.response?.status >= 500) {
      toast.error('An unexpected server error occurred. Please try again later.');
    }
    // Handle network errors
    else if (error.message === 'Network Error') {
      toast.error('Unable to connect to the server. Please check your internet connection.');
    }
    // Handle other errors
    else {
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred.';
      toast.error(message);
    }

    // Only log errors in development
    if (!import.meta.env.PROD) {
      console.error('API Error:', error);
    }

    return Promise.reject(error);
  }
);

export default api;