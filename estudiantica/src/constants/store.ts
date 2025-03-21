import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Importamos el slice del usuario

const store = configureStore({
  reducer: {
    user: userReducer, // Registramos el reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
