/**
 * Utility functions for the e-commerce application
 * Common helper functions for formatting, validation, and data manipulation
 */

import { Star } from 'lucide-react';

/**
 * Format price with currency symbol
 * @param {number} price - Price to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = 'USD') => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj);
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} - Relative time string
 */
export const formatRelativeTime = (date) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return formatDate(dateObj);
    }
  } catch (error) {
    return 'Unknown time';
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Generate unique ID
 * @param {string} prefix - ID prefix
 * @returns {string} - Unique ID
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with score and message
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let score = 0;
  let message = '';

  if (password.length >= minLength) score++;
  if (hasUpperCase) score++;
  if (hasLowerCase) score++;
  if (hasNumbers) score++;
  if (hasSpecialChar) score++;

  if (score < 2) {
    message = 'Weak password';
  } else if (score < 4) {
    message = 'Medium password';
  } else {
    message = 'Strong password';
  }

  return { score, message, isValid: score >= 3 };
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Calculate cart total
 * @param {Array} items - Cart items
 * @returns {Object} - Total calculation result
 */
export const calculateCartTotal = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return { subtotal: 0, tax: 0, total: 0, itemCount: 0 };
  }

  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
    itemCount
  };
};

/**
 * Get product rating stars as JSX elements
 * @param {number} rating - Product rating (0-5)
 * @returns {JSX.Element} - Star rating component
 */
export const getRatingStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
      );
    } else {
      stars.push(
        <Star key={i} className="w-4 h-4 text-gray-300" />
      );
    }
  }

  return <div className="flex items-center">{stars}</div>;
};

/**
 * Sort products by various criteria
 * @param {Array} products - Products to sort
 * @param {string} sortBy - Sort criteria
 * @returns {Array} - Sorted products
 */
export const sortProducts = (products, sortBy = 'name') => {
  if (!Array.isArray(products)) return [];

  const sortedProducts = [...products];

  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name':
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    case 'rating':
      return sortedProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    default:
      return sortedProducts;
  }
};

/**
 * Filter products by search query
 * @param {Array} products - Products to filter
 * @param {string} query - Search query
 * @returns {Array} - Filtered products
 */
export const filterProducts = (products, query) => {
  if (!query || !Array.isArray(products)) return products;

  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Get order status color
 * @param {string} status - Order status
 * @returns {string} - Tailwind color class
 */
export const getOrderStatusColor = (status) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Check if device is mobile
 * @returns {boolean} - Whether device is mobile
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Get responsive image sizes
 * @param {string} size - Size variant
 * @returns {string} - Responsive sizes string
 */
export const getResponsiveImageSizes = (size = 'default') => {
  const sizes = {
    small: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw',
    medium: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
    large: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
    default: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw'
  };

  return sizes[size] || sizes.default;
};
