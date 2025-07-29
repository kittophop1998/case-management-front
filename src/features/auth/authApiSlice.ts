import { createApi } from '@reduxjs/toolkit/query/react';
import { UserProfileType, UserType } from '@/types/user.type';
import { baseQuery } from '@/services/api';
import { LoginSchemas } from '@/schemas'
import { ApiResponse } from '@/types/api.type'


export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<UserProfileType>, typeof LoginSchemas>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<ApiResponse<null>, null>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getMe: builder.query<ApiResponse<UserProfileType>, null>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  // useGetMeMutation
  useGetMeQuery
} = authApiSlice;