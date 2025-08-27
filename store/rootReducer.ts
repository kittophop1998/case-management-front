import { combineReducers } from "@reduxjs/toolkit";
// Slice
import { authApiSlice } from "@/features/authApiSlice";
import { usersApiSlice } from "@/features/usersApiSlice";
import { systemApiSlice } from "@/features/systemApiSlice";
import { permissionApiSlice } from "@/features/permissionApiSlice";
import { customersApiSlice } from "@/features/customersApiSlice";
import { caseApiSlice } from "@/features/caseApiSlice";
import { noteApiSlice } from "@/features/noteApiSlice";
import { queueApiSlice } from "@/features/queueApiSlice";

export const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [systemApiSlice.reducerPath]: systemApiSlice.reducer,
  [permissionApiSlice.reducerPath]: permissionApiSlice.reducer,
  [customersApiSlice.reducerPath]: customersApiSlice.reducer,
  [caseApiSlice.reducerPath]: caseApiSlice.reducer,
  [noteApiSlice.reducerPath]: noteApiSlice.reducer,
  [queueApiSlice.reducerPath]: queueApiSlice.reducer,
});
