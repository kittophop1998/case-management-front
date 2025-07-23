import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { generateRequestId } from '@/lib/utils/genterateIdUtils';
import { UserType } from '@/types/user.type';

interface LoginResponse {
  user: UserType  
}
interface LoginRequest {
  user_data: string;
}
const baseQuery =  fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    prepareHeaders: (headers) => {
      const requestId = generateRequestId();
      const token = Cookies.get('mock_auth_token');
      headers.set('Content-Type', 'application/json');
      headers.set('X-Request-ID', requestId);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

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