import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';

/**
 * Redux store configuration
 * Includes Redux Persist for cart persistence
 */

// Persist configuration for cart
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items', 'total', 'itemCount', 'lastUpdated'], // Only persist these fields
};

// Persist configuration for root reducer
const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // Only persist cart state
};

// Root reducer
const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Store types are available for TypeScript projects
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
