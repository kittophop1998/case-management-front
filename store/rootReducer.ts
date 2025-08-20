import { combineReducers } from "@reduxjs/toolkit";
// Slice
import { authApiSlice } from "@/features/auth/authApiSlice";
import { usersApiSlice } from "@/features/users/usersApiSlice";
import { systemApiSlice } from "@/features/system/systemApiSlice";
import { permissionApiSlice } from "@/features/permission/permissionApiSlice";
import { customersApiSlice } from "@/features/customers/customersApiSlice";
import { caseApiSlice } from "@/features/case/caseApiSlice";
import { noteApiSlice } from "@/features/note/noteApiSlice";

export const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [systemApiSlice.reducerPath]: systemApiSlice.reducer,
  [permissionApiSlice.reducerPath]: permissionApiSlice.reducer,
  [customersApiSlice.reducerPath]: customersApiSlice.reducer,
  [caseApiSlice.reducerPath]: caseApiSlice.reducer,
  [noteApiSlice.reducerPath]: noteApiSlice.reducer,
});
