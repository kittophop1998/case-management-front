import { createApi } from "@reduxjs/toolkit/query/react";
import { JsonJoinDetails, UserProfileType, UserType } from "@/types/user.type";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
// centers
// permissions
// roles
// sections
type GetDropdownResponse = ApiResponse<{
  data: {
    centers: JsonJoinDetails[];
    permissions: JsonJoinDetails[];
    roles: JsonJoinDetails[];
    sections: JsonJoinDetails[];
    departments: JsonJoinDetails[];
  };
}>;
export const systemApiSlice = createApi({
  reducerPath: "systemApi",
  baseQuery,
  endpoints: (builder) => ({
    getDropdown: builder.query<GetDropdownResponse, void>({
      query: () => ({
        // url: "/lookups",
        url: "/master-data/lookups",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDropdownQuery } = systemApiSlice;
