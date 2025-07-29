import { combineReducers } from '@reduxjs/toolkit';
// Slice
import { authApiSlice } from '@/features/auth/authApiSlice';
import { usersApiSlice } from '@/features/users/usersApiSlice';
import { systemApiSlice } from '@/features/system/systemApiSlice';

export const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [systemApiSlice.reducerPath]: systemApiSlice.reducer,
});