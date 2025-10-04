import axios from 'axios';
import Cookies from 'js-cookie';

/**
 * API configuration and utility functions
 * Handles all HTTP requests to the JSON server backend
 */

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Simulate network delay for development
    if (process.env.NODE_ENV === 'development') {
      return new Promise(resolve => {
        setTimeout(() => resolve(config), 300);
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      Cookies.remove('auth-token');
      Cookies.remove('user-data');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Product API functions
 */
export const productAPI = {
  // Get all products with optional filtering
  getAll: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getByCategory: async (category) => {
    const response = await api.get(`/products?category=${category}`);
    return response.data;
  },

  // Search products
  search: async (query) => {
    const response = await api.get(`/products?q=${query}`);
    return response.data;
  },

  // Get product categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

/**
 * User authentication API functions
 */
export const authAPI = {
  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.patch('/auth/profile', userData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

/**
 * Cart API functions
 */
export const cartAPI = {
  // Get user's cart
  getCart: async (userId) => {
    const response = await api.get(`/carts/${userId}`);
    return response.data;
  },

  // Add item to cart
  addItem: async (userId, item) => {
    const response = await api.post(`/carts/${userId}/items`, item);
    return response.data;
  },

  // Update cart item quantity
  updateItem: async (userId, itemId, quantity) => {
    const response = await api.patch(`/carts/${userId}/items/${itemId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeItem: async (userId, itemId) => {
    const response = await api.delete(`/carts/${userId}/items/${itemId}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async (userId) => {
    const response = await api.delete(`/carts/${userId}`);
    return response.data;
  },
};

/**
 * Wishlist API functions
 */
export const wishlistAPI = {
  // Get user's wishlist
  getWishlist: async (userId) => {
    const response = await api.get(`/wishlists/${userId}`);
    return response.data;
  },

  // Add item to wishlist
  addItem: async (userId, productId) => {
    const response = await api.post(`/wishlists/${userId}/items`, { productId });
    return response.data;
  },

  // Remove item from wishlist
  removeItem: async (userId, productId) => {
    const response = await api.delete(`/wishlists/${userId}/items/${productId}`);
    return response.data;
  },

  // Clear entire wishlist
  clearWishlist: async (userId) => {
    const response = await api.delete(`/wishlists/${userId}`);
    return response.data;
  },
};

/**
 * Order API functions
 */
export const orderAPI = {
  // Get user's orders
  getOrders: async (userId) => {
    const response = await api.get(`/orders?userId=${userId}&_sort=date&_order=desc`);
    return response.data;
  },

  // Get single order
  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await api.patch(`/orders/${orderId}`, { status });
    return response.data;
  },
};

/**
 * Utility functions for API calls
 */
export const apiUtils = {
  // Handle API errors consistently
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message: 'Network error - please check your connection',
        status: 0,
        data: null,
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
        data: null,
      };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!Cookies.get('auth-token');
  },

  // Get current user data from cookies
  getCurrentUser: () => {
    const userData = Cookies.get('user-data');
    return userData ? JSON.parse(userData) : null;
  },

  // Set authentication data
  setAuthData: (token, user) => {
    Cookies.set('auth-token', token, { expires: 7 }); // 7 days
    Cookies.set('user-data', JSON.stringify(user), { expires: 7 });
  },

  // Clear authentication data
  clearAuthData: () => {
    Cookies.remove('auth-token');
    Cookies.remove('user-data');
  },
};

export default api;
