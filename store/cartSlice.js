import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux slice for cart management
 * Provides persistent cart state with Redux Persist
 */

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Load cart from storage
    loadCart: (state, action) => {
      const { items, total, itemCount, lastUpdated } = action.payload;
      state.items = items || [];
      state.total = total || 0;
      state.itemCount = itemCount || 0;
      state.lastUpdated = lastUpdated || new Date().toISOString();
    },

    // Add item to cart
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === newItem.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Add new item
        state.items.push(newItem);
      }

      // Recalculate totals
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.lastUpdated = new Date().toISOString();
    },

    // Update item quantity
    updateItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.items.splice(itemIndex, 1);
        } else {
          // Update quantity
          state.items[itemIndex].quantity = quantity;
        }

        // Recalculate totals
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        state.lastUpdated = new Date().toISOString();
      }
    },

    // Remove item from cart
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      
      // Recalculate totals
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.lastUpdated = new Date().toISOString();
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      state.lastUpdated = new Date().toISOString();
    },

    // Sync cart with server data
    syncCart: (state, action) => {
      const { items, total, itemCount } = action.payload;
      state.items = items || [];
      state.total = total || 0;
      state.itemCount = itemCount || 0;
      state.lastUpdated = new Date().toISOString();
    },

    // Update cart totals (utility action)
    updateTotals: (state) => {
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      state.lastUpdated = new Date().toISOString();
    },
  },
});

// Export actions
export const {
  loadCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  syncCart,
  updateTotals,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectCartLastUpdated = (state) => state.cart.lastUpdated;

// Selector to check if item is in cart
export const selectIsInCart = (productId) => (state) => 
  state.cart.items.some(item => item.id === productId);

// Selector to get item quantity in cart
export const selectItemQuantity = (productId) => (state) => {
  const item = state.cart.items.find(item => item.id === productId);
  return item ? item.quantity : 0;
};

// Selector to get cart item by product ID
export const selectCartItem = (productId) => (state) => 
  state.cart.items.find(item => item.id === productId);

// Selector to get cart summary
export const selectCartSummary = (state) => ({
  items: state.cart.items,
  total: state.cart.total,
  itemCount: state.cart.itemCount,
  lastUpdated: state.cart.lastUpdated,
});

export default cartSlice.reducer;
