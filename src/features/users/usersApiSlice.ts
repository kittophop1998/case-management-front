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
        let searchObj = {
          page: String(page),
          limit: String(limit),
          is_active: String(status),
          role: String(role || ''),
          team: String(team),
          center: String(center || ''),
          searchText: String(searchText || ''),
          sort: String(sort || ''),
          order: String(order || '')
        }

        if (!page) delete searchObj.page
        if (!limit) delete searchObj.limit
        if (!status) delete searchObj.is_active
        if (!role) delete searchObj.role
        if (!team) delete searchObj.team
        if (!center) delete searchObj.center
        if (!sort) delete searchObj.sort
        if (!order) delete searchObj.order
        if (!searchText) delete searchObj.searchText


        const searchParams = new URLSearchParams(searchObj)

        return {
          url: `/users?${searchParams.toString()}`,
          method: 'GET'
        }
      }
    }),
    getUser: builder.mutation<ApiResponse<{ data: UserType }>, number>({
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
