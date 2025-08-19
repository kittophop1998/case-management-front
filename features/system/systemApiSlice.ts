import { createApi } from "@reduxjs/toolkit/query/react";
import { JsonJoinDetails, UserProfileType, UserType } from "@/types/user.type";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
// centers
// permissions
// roles
// sections
export type DropdownSystemType = {
  centers: JsonJoinDetails[];
  permissions: JsonJoinDetails[];
  roles: JsonJoinDetails[];
  sections: JsonJoinDetails[];
  departments: JsonJoinDetails[];
};
export type GetDropdownResponse = ApiResponse<DropdownSystemType>;

export const systemApiSlice = createApi({
  reducerPath: "systemApi",
  baseQuery,
  endpoints: (builder) => ({
    getDropdown: builder.query<GetDropdownResponse, void>({
      query: () => ({
        url: "/master-data/lookups",
        method: "GET",
      }),
    }),
    getInquiry: builder.query<GetDropdownResponse, void>({
      query: () => ({
        url: "/cases/disposition",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDropdownQuery, useGetInquiryQuery } = systemApiSlice;
// const { data: ddData } = useGetDropdownQuery();
// const { data: ddData } = useGetInquiryQuery();
