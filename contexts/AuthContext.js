'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { authenticateUser, logoutUser, getCurrentUser, isUserAuthenticated } from '../lib/auth';
import { apiUtils } from '../lib/api';

/**
 * Authentication Context
 * Manages user authentication state and provides auth methods
 */

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER',
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

/**
 * AuthProvider component
 * Provides authentication context to the app
 */
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const isAuth = isUserAuthenticated();
        const user = getCurrentUser();

        if (isAuth && user) {
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: { user },
          });
        } else {
          dispatch({
            type: AUTH_ACTIONS.SET_LOADING,
            payload: { isLoading: false },
          });
        }
      } catch (error) {
        // Auth initialization error
        dispatch({
          type: AUTH_ACTIONS.SET_LOADING,
          payload: { isLoading: false },
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      const result = await authenticateUser(email, password);
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user: result.user },
      });

      return { success: true, user: result.user };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: error.message },
      });

      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    
    // Clear all user data from localStorage
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    localStorage.removeItem('persist:root');
    
    // Clear user-specific data (in case there are any)
    if (state.user && state.user.id) {
      localStorage.removeItem(`cart_${state.user.id}`);
      localStorage.removeItem(`wishlist_${state.user.id}`);
    }
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Reload page to ensure clean state
    window.location.reload();
  };

  // Update user profile
  const updateUser = (userData) => {
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: { user: userData },
    });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user has specific role or permission
  const hasPermission = (permission) => {
    if (!state.user) return false;
    // In a real app, you might check user roles/permissions here
    return true;
  };

  // Check if user is admin
  const isAdmin = () => {
    return state.user?.role === 'admin' || state.user?.id === 1;
  };

  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    login,
    logout,
    updateUser,
    clearError,
    hasPermission,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @returns {Object} - Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

/**
 * Higher-order component for protected routes
 * @param {React.Component} WrappedComponent - Component to protect
 * @returns {React.Component} - Protected component
 */
export const withAuth = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthContext;
