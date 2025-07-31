import { combineReducers } from '@reduxjs/toolkit';
// Slice
import { authApiSlice } from '@/features/auth/authApiSlice';
import { usersApiSlice } from '@/features/users/usersApiSlice';
import { systemApiSlice } from '@/features/system/systemApiSlice';
import { permissionApiSlice } from '@/features/permission/permissionApiSlice';

export const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [systemApiSlice.reducerPath]: systemApiSlice.reducer,
  [permissionApiSlice.reducerPath]: permissionApiSlice.reducer,
});