'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { calculateCartTotal } from '../lib/utils';
import { useAuth } from './AuthContext';

/**
 * Cart Context
 * Manages shopping cart state and provides cart methods
 * Integrates with Redux for persistence
 */

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
  error: null,
};

// Action types
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOAD_CART: 'LOAD_CART',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  SYNC_CART: 'SYNC_CART',
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };

    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CART_ACTIONS.LOAD_CART:
      const loadedItems = action.payload.items || [];
      const loadedTotal = calculateCartTotal(loadedItems);
      
      return {
        ...state,
        items: loadedItems,
        total: loadedTotal.total,
        itemCount: loadedTotal.itemCount,
        isLoading: false,
        error: null,
      };

    case CART_ACTIONS.ADD_ITEM:
      const newItem = action.payload.item;
      const existingItemIndex = state.items.findIndex(
        item => item.id === newItem.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // Add new item
        updatedItems = [...state.items, newItem];
      }

      const newTotal = calculateCartTotal(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        total: newTotal.total,
        itemCount: newTotal.itemCount,
        error: null,
      };

    case CART_ACTIONS.UPDATE_ITEM:
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const filteredItems = state.items.filter(item => item.id !== itemId);
        const filteredTotal = calculateCartTotal(filteredItems);
        
        return {
          ...state,
          items: filteredItems,
          total: filteredTotal.total,
          itemCount: filteredTotal.itemCount,
        };
      }

      const updatedItemsForUpdate = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const updatedTotal = calculateCartTotal(updatedItemsForUpdate);
      
      return {
        ...state,
        items: updatedItemsForUpdate,
        total: updatedTotal.total,
        itemCount: updatedTotal.itemCount,
      };

    case CART_ACTIONS.REMOVE_ITEM:
      const filteredItemsForRemove = state.items.filter(
        item => item.id !== action.payload.itemId
      );
      const filteredTotalForRemove = calculateCartTotal(filteredItemsForRemove);
      
      return {
        ...state,
        items: filteredItemsForRemove,
        total: filteredTotalForRemove.total,
        itemCount: filteredTotalForRemove.itemCount,
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        error: null,
      };

    case CART_ACTIONS.SYNC_CART:
      const syncedItems = action.payload.items || [];
      const syncedTotal = calculateCartTotal(syncedItems);
      
      return {
        ...state,
        items: syncedItems,
        total: syncedTotal.total,
        itemCount: syncedTotal.itemCount,
        isLoading: false,
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

/**
 * CartProvider component
 * Provides cart context to the app
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load cart from localStorage on mount and when user changes
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        if (user && user.id) {
          // Load user-specific cart
          const userCartKey = `cart_${user.id}`;
          const savedCart = localStorage.getItem(userCartKey);
          if (savedCart) {
            const cartData = JSON.parse(savedCart);
            dispatch({
              type: CART_ACTIONS.LOAD_CART,
              payload: { items: cartData.items || [] },
            });
          } else {
            // No saved cart for this user, start with empty cart
            dispatch({
              type: CART_ACTIONS.LOAD_CART,
              payload: { items: [] },
            });
          }
        } else {
          // No user logged in, clear cart
          dispatch({
            type: CART_ACTIONS.CLEAR_CART,
          });
        }
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        dispatch({
          type: CART_ACTIONS.SET_ERROR,
          payload: { error: 'Failed to load cart' },
        });
      }
    };

    loadCartFromStorage();
  }, [user]);

  // Clear cart when user changes or logs out
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    }
  }, [isAuthenticated]);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    const saveCartToStorage = () => {
      try {
        if (user && user.id) {
          // Save user-specific cart
          const userCartKey = `cart_${user.id}`;
          localStorage.setItem(userCartKey, JSON.stringify({
            items: state.items,
            total: state.total,
            itemCount: state.itemCount,
            lastUpdated: new Date().toISOString(),
            userId: user.id,
          }));
        }
      } catch (error) {
        console.error('Error saving cart to storage:', error);
      }
    };

    if (state.items.length > 0 && user && user.id) {
      saveCartToStorage();
    }
  }, [state.items, state.total, state.itemCount, user]);

  // Add item to cart
  const addItem = (product, quantity = 1) => {
    try {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        category: product.category,
        rating: product.rating,
      };

      dispatch({
        type: CART_ACTIONS.ADD_ITEM,
        payload: { item: cartItem },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Update item quantity
  const updateItemQuantity = (itemId, quantity) => {
    try {
      dispatch({
        type: CART_ACTIONS.UPDATE_ITEM,
        payload: { itemId, quantity },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    try {
      dispatch({
        type: CART_ACTIONS.REMOVE_ITEM,
        payload: { itemId },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Clear entire cart
  const clearCart = () => {
    try {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      localStorage.removeItem('cart');
      return { success: true };
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Sync cart with server (for authenticated users)
  const syncCart = async (userId) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: { isLoading: true } });

    try {
      // In a real app, you would sync with the server here
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({
        type: CART_ACTIONS.SYNC_CART,
        payload: { items: state.items },
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: CART_ACTIONS.SET_ERROR,
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // State
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    isInCart,
    getItemQuantity,
    syncCart,
    clearError,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to use cart context
 * @returns {Object} - Cart context value
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

export default CartContext;
