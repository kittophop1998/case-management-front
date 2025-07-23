import { createApi } from '@reduxjs/toolkit/query/react';
import { UserType } from '@/types/user.type';
import { baseQuery } from '@/services/api';
import { ApiResponse, ApiResponseSuccess } from '@/types/api.type';

interface LoginResponse {
  user: UserType  
}

export interface GetUsersRequest {
  page?: number;
  limit?: number;
  status?: number;
  role?: string;
  team?: string | null;
  center?: string | null;
  sort?: string;
  order?: 'asc' | 'desc';
}
export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.mutation<ApiResponse<UserType[]>, GetUsersRequest>({
      query: ({
      page = 1,
      limit = 10,
      status = 1,
      role = 'admin',
      team = null,
      center = null,
      sort = 'createdAt',
      order = 'desc',
    }) =>{ 
     const searchParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      status: String(status),
      role,
      team: team ?? '',
      center: center ?? '',
      sort,
      order,
    });
     return {
        url: `/users?${searchParams.toString()}`,
        method: 'GET',
      }},
    }),
    getUser: builder.mutation<ApiResponse<UserType>, number>({
      query: (uID) => ({
        url: `/users/${uID}`,
        method: 'GET',
      }),
    }),
    editUser: builder.mutation<ApiResponseSuccess, UserType>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    createUser: builder.mutation<ApiResponseSuccess, UserType>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    })
  }),
});

export const { 
  useGetUsersMutation,
  useGetUserMutation,
  useEditUserMutation,
  useCreateUserMutation
 } = usersApiSlice;