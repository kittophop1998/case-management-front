import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
// Slice
import { authApiSlice } from "@/features/authApiSlice";
import { usersApiSlice } from "@/features/usersApiSlice";
import { systemApiSlice } from "@/features/systemApiSlice";
import { permissionApiSlice } from "@/features/permissionApiSlice";
import { customersApiSlice } from "@/features/customersApiSlice";
import { caseApiSlice } from "@/features/caseApiSlice";
import { noteApiSlice } from "@/features/noteApiSlice";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(usersApiSlice.middleware)
      .concat(systemApiSlice.middleware)
      .concat(permissionApiSlice.middleware)
      .concat(customersApiSlice.middleware)
      .concat(caseApiSlice.middleware)
      .concat(noteApiSlice.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
