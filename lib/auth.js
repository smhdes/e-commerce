import Cookies from 'js-cookie';
import { apiUtils } from './api';

export const authenticateUser = async (email, password) => {
  try {
    const users = [
      { id: 1, email: 'user@example.com', password: 'pass123', name: 'John Doe' },
      { id: 2, email: 'jane@example.com', password: 'pass123', name: 'Jane Smith' }
    ];

    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = btoa(`${user.id}:${Date.now()}`);
    
    apiUtils.setAuthData(token, user);
    
    return {
      user: { id: user.id, email: user.email, name: user.name },
      token
    };
  } catch (error) {
    throw new Error(error.message || 'Authentication failed');
  }
};

export const logoutUser = () => {
  apiUtils.clearAuthData();
  
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

/**
 * Check if user is currently authenticated
 * @returns {boolean} - Authentication status
 */
export const isUserAuthenticated = () => {
  return apiUtils.isAuthenticated();
};

/**
 * Get current authenticated user
 * @returns {Object|null} - User data or null
 */
export const getCurrentUser = () => {
  return apiUtils.getCurrentUser();
};

/**
 * Get authentication token
 * @returns {string|null} - Token or null
 */
export const getAuthToken = () => {
  return Cookies.get('auth-token');
};

/**
 * Validate session and refresh if needed
 * @returns {boolean} - Whether session is valid
 */
export const validateSession = () => {
  const token = getAuthToken();
  const user = getCurrentUser();
  
  if (!token || !user) {
    return false;
  }
  
  // In a real app, you might validate token expiration here
  return true;
};

/**
 * Require authentication for protected routes
 * @param {Function} callback - Function to call if authenticated
 * @param {Function} redirectCallback - Function to call if not authenticated
 */
export const requireAuth = (callback, redirectCallback) => {
  if (isUserAuthenticated() && validateSession()) {
    callback();
  } else {
    redirectCallback();
  }
};

/**
 * Get redirect URL after login
 * @param {string} defaultPath - Default redirect path
 * @returns {string} - Redirect URL
 */
export const getRedirectUrl = (defaultPath = '/') => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('returnTo') || defaultPath;
  }
  return defaultPath;
};

/**
 * Set redirect URL for after login
 * @param {string} path - Path to redirect to after login
 */
export const setRedirectUrl = (path) => {
  if (typeof window !== 'undefined') {
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('returnTo', path);
    window.history.replaceState({}, '', currentUrl);
  }
};
