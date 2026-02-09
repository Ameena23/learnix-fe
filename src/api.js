import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request Interceptor - Attach token to every request
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Get user data
    const userId = localStorage.getItem('userId');
    if (userId) {
      config.headers['X-User-Id'] = userId;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle responses and errors globally
API.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth data and redirect to login
          console.error('Unauthorized access - redirecting to login');
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userData');
          window.location.href = '/login';
          break;

        case 403:
          console.error('Forbidden - insufficient permissions');
          break;

        case 404:
          console.error('Resource not found:', error.config.url);
          break;

        case 500:
          console.error('Server error - please try again later');
          break;

        default:
          console.error(`Error ${status}:`, data?.message || data?.error);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error - No response from server');
    } else {
      // Error in request setup
      console.error('Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default API;
