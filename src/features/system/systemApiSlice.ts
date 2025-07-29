import { createApi } from '@reduxjs/toolkit/query/react';
import { JsonJoinDetails, UserProfileType, UserType } from '@/types/user.type';
import { baseQuery } from '@/services/api';
import { ApiResponse, ApiResponseSuccess } from '@/types/api.type'
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
export const systemApiSlice = createApi({
  reducerPath: 'systemApi',
  baseQuery,
  endpoints: (builder) => ({
    getDropdown: builder.query<GetDropdownResponse, void>({
      query: () => ({
        url: '/lookups',
        method: 'GET',
      }),
    })
  }),
});

export const {
  useGetDropdownQuery
} = systemApiSlice;