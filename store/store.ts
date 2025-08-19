import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
// Slice
import { authApiSlice } from "@/features/auth/authApiSlice";
import { usersApiSlice } from "@/features/users/usersApiSlice";
import { systemApiSlice } from "@/features/system/systemApiSlice";
import { permissionApiSlice } from "@/features/permission/permissionApiSlice";
import { customersApiSlice } from "@/features/customers/customersApiSlice";
import { caseApiSlice } from "@/features/case/caseApiSlice";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(usersApiSlice.middleware)
      .concat(systemApiSlice.middleware)
      .concat(permissionApiSlice.middleware)
      .concat(customersApiSlice.middleware)
      .concat(caseApiSlice.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
