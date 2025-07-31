import { createApi } from '@reduxjs/toolkit/query/react';
import { JsonJoinDetails, UserProfileType, UserType } from '@/types/user.type';
import { baseQuery } from '@/services/api';
import { ApiResponse, ApiResponseSuccess } from '@/types/api.type'
import { SettingAccessControlSchema } from '@/schemas';
// centers
// permissions
// roles
// teams
type GetDropdownResponse = ApiResponse<{
  data: {
    centers: JsonJoinDetails[];
    permissions: JsonJoinDetails[];
    roles: JsonJoinDetails[];
    teams: JsonJoinDetails[];
  }
}>;
export const permissionApiSlice = createApi({
  reducerPath: 'permissionApi',
  baseQuery,
  endpoints: (builder) => ({
    // getDropdown: builder.query<GetDropdownResponse, void>({
    //   query: () => ({
    //     url: '/lookups',
    //     method: 'GET',
    //   }),
    // })
    getTable: builder.query<GetDropdownResponse, void>({
      query: (
        {
          page,
          limit,
          // status = true,
          // role = null,
          // team = null,
          // center = null,
          sort = null,
          order = null,
          // searchText = ''
        }
      ) => {
        let searchObj = {
          page: String(page),
          limit: String(limit),
          sort: String(sort || ''),
          order: String(order || '')
        }
        if (!page) delete searchObj.page
        if (!limit) delete searchObj.limit
        if (!sort) delete searchObj.sort
        if (!order) delete searchObj.order


        const searchParams = new URLSearchParams(searchObj)

        return {
          url: `/permissions?${searchParams.toString()}`,
          method: 'GET',
        }
      },
    }),
    editTable: builder.mutation<void, typeof SettingAccessControlSchema>({
      query: (body) => ({
        url: '/permissions/update',
        method: 'PATCH',
        body
      }),
    })

  }),
});

export const {
  useLazyGetTableQuery,
  useEditTableMutation
} = permissionApiSlice;