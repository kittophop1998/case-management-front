import { InitializersData } from './../../app/[lang]/_components/initializers-data';
import { createApi } from '@reduxjs/toolkit/query/react';
import { UserProfileType, UserType } from '@/types/user.type';
import { baseQuery } from '@/services/api';
import { LoginSchemas } from '@/schemas'
import { ApiResponse } from '@/types/api.type'


export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<ApiResponse<UserProfileType>, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
    }),
    login: builder.mutation<ApiResponse<UserProfileType>, typeof LoginSchemas>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<ApiResponse<any>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery
} = authApiSlice;