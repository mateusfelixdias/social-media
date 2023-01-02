import React from 'react';
import { App } from './App';
import { reducer } from './state';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  REHYDRATE,
  persistStore,
  persistReducer,
  PURGE,
} from 'redux-persist';

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE],
      },
    });
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
