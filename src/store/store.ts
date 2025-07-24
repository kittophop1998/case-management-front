import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
// Slice
import { authApiSlice } from '@/features/auth/authApiSlice';
import { usersApiSlice } from '@/features/users/usersApiSlice';

export const store =  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApiSlice.middleware)
        .concat(usersApiSlice.middleware)
  });


export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']; 
