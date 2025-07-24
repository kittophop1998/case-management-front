import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UsersTable, UserType } from '@/types/user.type'
import { baseQuery } from '@/services/api'
import { ApiResponse, ApiResponseSuccess } from '@/types/api.type'

export interface GetUsersRequest {
  page: number
  limit: number
  status: boolean | null
  role: number | null
  team: string | null
  center: number | null
  sort: string | null
  order: 'asc' | 'desc' | null
  searchText: string
}

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  endpoints: builder => ({
    getUsers: builder.mutation<ApiResponse<UsersTable>, GetUsersRequest>({
      query: ({
        page,
        limit,
        status = true,
        role = null,
        team = null,
        center = null,
        sort = null,
        order = null,
        searchText = ''
      }) => {
        const searchParams = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          is_active: String(status),
          role: String(role || ''),
          team: String(team),
          center: String(center || ''),
          searchText: String(searchText || ''),
          sort: String(sort || ''),
          order: String(order || '')
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
