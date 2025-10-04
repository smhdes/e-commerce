'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

/**
 * Wishlist Context
 * Manages wishlist state and provides wishlist methods
 */

// Initial state
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

// Action types
const WISHLIST_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOAD_WISHLIST: 'LOAD_WISHLIST',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST',
  SYNC_WISHLIST: 'SYNC_WISHLIST',
};

// Reducer function
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case WISHLIST_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case WISHLIST_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    case WISHLIST_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return {
        ...state,
        items: action.payload.items || [],
        isLoading: false,
        error: null,
      };

    case WISHLIST_ACTIONS.ADD_ITEM:
      const newItem = action.payload.item;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        return state; // Item already exists
      }

      return {
        ...state,
        items: [...state.items, newItem],
        error: null,
      };

    case WISHLIST_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.itemId),
      };

    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return {
        ...state,
        items: [],
        error: null,
      };

    case WISHLIST_ACTIONS.SYNC_WISHLIST:
      return {
        ...state,
        items: action.payload.items || [],
        isLoading: false,
      };

    default:
      return state;
  }
};

// Create context
const WishlistContext = createContext();

/**
 * WishlistProvider component
 * Provides wishlist context to the app
 */
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load wishlist from localStorage on mount and when user changes
  useEffect(() => {
    const loadWishlistFromStorage = () => {
      try {
        if (user && user.id) {
          // Load user-specific wishlist
          const userWishlistKey = `wishlist_${user.id}`;
          const savedWishlist = localStorage.getItem(userWishlistKey);
          if (savedWishlist) {
            const wishlistData = JSON.parse(savedWishlist);
            dispatch({
              type: WISHLIST_ACTIONS.LOAD_WISHLIST,
              payload: { items: wishlistData.items || [] },
            });
          } else {
            // No saved wishlist for this user, start with empty wishlist
            dispatch({
              type: WISHLIST_ACTIONS.LOAD_WISHLIST,
              payload: { items: [] },
            });
          }
        } else {
          // No user logged in, clear wishlist
          dispatch({
            type: WISHLIST_ACTIONS.CLEAR_WISHLIST,
          });
        }
      } catch (error) {
        console.error('Error loading wishlist from storage:', error);
        dispatch({
          type: WISHLIST_ACTIONS.SET_ERROR,
          payload: { error: 'Failed to load wishlist' },
        });
      }
    };

    loadWishlistFromStorage();
  }, [user]);

  // Clear wishlist when user changes or logs out
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
    }
  }, [isAuthenticated]);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    const saveWishlistToStorage = () => {
      try {
        if (user && user.id) {
          // Save user-specific wishlist
          const userWishlistKey = `wishlist_${user.id}`;
          localStorage.setItem(userWishlistKey, JSON.stringify({
            items: state.items,
            lastUpdated: new Date().toISOString(),
            userId: user.id,
          }));
        }
      } catch (error) {
        console.error('Error saving wishlist to storage:', error);
      }
    };

    if (state.items.length > 0 && user && user.id) {
      saveWishlistToStorage();
    }
  }, [state.items, user]);

  // Add item to wishlist
  const addItem = (product) => {
    try {
      const wishlistItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        addedAt: new Date().toISOString(),
      };

      dispatch({
        type: WISHLIST_ACTIONS.ADD_ITEM,
        payload: { item: wishlistItem },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: WISHLIST_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Remove item from wishlist
  const removeItem = (itemId) => {
    try {
      dispatch({
        type: WISHLIST_ACTIONS.REMOVE_ITEM,
        payload: { itemId },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: WISHLIST_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Toggle item in wishlist (add if not present, remove if present)
  const toggleItem = (product) => {
    if (isInWishlist(product.id)) {
      return removeItem(product.id);
    } else {
      return addItem(product);
    }
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    try {
      dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
      localStorage.removeItem('wishlist');
      return { success: true };
    } catch (error) {
      dispatch({
        type: WISHLIST_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Get wishlist item count
  const getItemCount = () => {
    return state.items.length;
  };

  // Sync wishlist with server (for authenticated users)
  const syncWishlist = async (userId) => {
    dispatch({ type: WISHLIST_ACTIONS.SET_LOADING, payload: { isLoading: true } });

    try {
      // In a real app, you would sync with the server here
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({
        type: WISHLIST_ACTIONS.SYNC_WISHLIST,
        payload: { items: state.items },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: WISHLIST_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: WISHLIST_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // State
    items: state.items,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isInWishlist,
    getItemCount,
    syncWishlist,
    clearError,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

/**
 * Custom hook to use wishlist context
 * @returns {Object} - Wishlist context value
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  
  return context;
};

export default WishlistContext;
