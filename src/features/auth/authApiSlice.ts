import { createApi } from '@reduxjs/toolkit/query/react';
import { UserProfileType, UserType } from '@/types/user.type';
import { baseQuery } from '@/services/api';
import { LoginSchemas } from '@/schemas'
import { ApiResponse, ApiResponseSuccess } from '@/types/api.type'
import { log } from 'console';


// interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
//   error?: string;
// }
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
    getMe: builder.mutation<ApiResponse<UserProfileType>, null>({
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
  useGetMeMutation
} = authApiSlice;