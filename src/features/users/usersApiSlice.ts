import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UsersTable, UserType } from '@/types/user.type'
import { baseQuery } from '@/services/api'
import { ApiResponse, ApiResponseSuccess } from '@/types/api.type'

export interface GetUsersRequest {
  page?: number
  limit?: number
  status?: number
  role?: string
  team?: string | null
  center?: string | null
  sort?: string
  order?: 'asc' | 'desc'
}

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  endpoints: builder => ({
    getUsers: builder.mutation<ApiResponse<UsersTable>, GetUsersRequest>({
      query: ({
        page = 1,
        limit = 10,
        status = 1,
        role = 'admin',
        team = null,
        center = null
        // sort = 'createdAt',
        // order = 'desc'
      }) => {
        const searchParams = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          is_active: String(status),
          role,
          team: team ?? '',
          center: center ?? ''
          // sort,
          // order

          // ?limit=10&page=1&role=UserTest1&team=4&center=Center%20BB&is_active=true
        })
        return {
          url: `/users?${searchParams.toString()}`,
          method: 'GET'
        }
      }
    }),
    getUser: builder.mutation<ApiResponse<UserType>, number>({
      query: uID => ({
        url: `/users/${uID}`,
        method: 'GET'
      })
    }),
    editUser: builder.mutation<ApiResponseSuccess, UserType>({
      query: user => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user
      })
    }),
    createUser: builder.mutation<ApiResponseSuccess, UserType>({
      query: user => ({
        url: '/users',
        method: 'POST',
        body: user
      })
    })
  })
})

export const {
  useGetUsersMutation,
  useGetUserMutation,
  useEditUserMutation,
  useCreateUserMutation
} = usersApiSlice
