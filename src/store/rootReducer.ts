import { combineReducers } from '@reduxjs/toolkit';
// Slice
import { authApiSlice } from '@/features/auth/authApiSlice';
import { usersApiSlice } from '@/features/users/usersApiSlice';

export const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
});