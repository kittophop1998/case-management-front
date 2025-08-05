import { createApi } from "@reduxjs/toolkit/query/react";
import { UserProfileType } from "@/types/user.type";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<ApiResponse<UserProfileType>, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
    logout: builder.mutation<ApiResponse<any>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLogoutMutation, useGetMeQuery, useLazyGetMeQuery } =
  authApiSlice;
