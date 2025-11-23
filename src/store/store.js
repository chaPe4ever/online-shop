import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { rootReducer } from './root-reducer';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // Whitelist specific reducers to persist
  whitelist: ['cart'], // Only cart and auth will be persisted
  // Blacklist reducers you don't want to persist
  // blacklist: ['someReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = import.meta.env.DEV ? [logger] : [];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleWares),
});

export const persistor = persistStore(store);
