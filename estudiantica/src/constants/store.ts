import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './userSlice'; // Importamos el slice del usuario
import classReducer from './classSlice';
import assignmentReducer from './assignmentSlice';

import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, 
  PURGE, REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root', 
  storage,
  whilelist:['user', 'assignments', 'clases'],
};

const rootReducer = combineReducers({
  user: userReducer,
  clases: classReducer,
  assignments: assignmentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const pertsistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store};
