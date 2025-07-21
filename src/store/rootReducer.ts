import { combineReducers } from '@reduxjs/toolkit';
import { authApiSlice } from '@/features/auth/authApiSlice';
import { mediationApiSlice } from '@/features/mediation/mediationApiSlice';
import { registrationApiSlice } from '@/features/registration/registrationApiSlice';
import { eventApiSlice } from '@/features/event/eventApiSlice';

export const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [mediationApiSlice.reducerPath]: mediationApiSlice.reducer,
  [registrationApiSlice.reducerPath]: registrationApiSlice.reducer,
  [eventApiSlice.reducerPath]: eventApiSlice.reducer,
});