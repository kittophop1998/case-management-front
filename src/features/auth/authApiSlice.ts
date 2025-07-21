import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { User } from '@/types';
import { generateRequestId } from '@/lib/genterateIdUtils';

interface LoginResponse {
  user: {
    username: string;
    userMetrix: {
      role: string;
      create: boolean;
      update: boolean;
      delete: boolean;
    }
  }
}
interface LoginRequest {
  user_data: string;
}

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const fakeBaseQuery = async (args: any) => {
  const { url, method, body } = args;

  if (url === '/auth/login' && method === 'POST') {
    const { user_data } = body;
    await new Promise((r) => setTimeout(r, 500));

    if (!user_data) {
      return { error: { status: 400, data: { message: 'Invalid password' } } };
    } else {
      return {
        data: {
          user: {
            username: "janedoe",
            user_metrix: {
              role: "staff",
              create: true,
              update: true,
              delete: true,
            }
          }
        }
      }
    }
  }

  return { error: { status: 404, data: { message: 'Not Found' } } };
};

const baseQuery = useMock
  ? fakeBaseQuery
  : fetchBaseQuery({
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
