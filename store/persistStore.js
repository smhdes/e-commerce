import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './index';

/**
 * Redux Persist Store Provider
 * Wraps the app with Redux store and persistence
 */

export const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export { store, persistor };
