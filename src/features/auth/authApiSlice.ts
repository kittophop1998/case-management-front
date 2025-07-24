import { createApi } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { generateRequestId } from '@/lib/utils/genterateIdUtils';
import { UserType } from '@/types/user.type';
import { baseQuery } from '@/services/api';

interface LoginResponse {
  user: UserType  
}
interface LoginRequest {
  user_data: string;
}

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    })
  }),
});

export const { useLoginMutation } = authApiSlice;