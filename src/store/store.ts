import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { authApiSlice } from '@/features/auth/authApiSlice';
import { mediationApiSlice } from '@/features/mediation/mediationApiSlice';
import { registrationApiSlice } from '@/features/registration/registrationApiSlice';
import { eventApiSlice } from '@/features/event/eventApiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApiSlice.middleware)
        .concat(mediationApiSlice.middleware)
        .concat(registrationApiSlice.middleware)
        .concat(eventApiSlice.middleware)
  });
};

export const store = makeStore();

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
