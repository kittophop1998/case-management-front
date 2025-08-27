import { createApi } from "@reduxjs/toolkit/query/react";
import {
  JsonJoinDetails,
  UserProfileType,
  UserRolesType,
  UserType,
} from "@/types/user.type";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
import { Note } from "@/types/note.type";

export type DropdownSystemType = {
  centers: JsonJoinDetails[];
  permissions: JsonJoinDetails[];
  roles: {
    id: string;
    name: UserRolesType;
  }[];
  sections: JsonJoinDetails[];
  departments: JsonJoinDetails[];
  caseTypes: {
    description: string;
    group: string;
    id: string;
    name: string;
  }[];
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
    getInquiry: builder.query<ApiResponse<any[]>, void>({
      query: () => ({
        url: "/cases/disposition",
        method: "GET",
      }),
    }),
    getNoteType: builder.query<Note[], void>({
      query: () => ({
        url: "/customers/note-types",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Note[]>) =>
        response?.data ?? [],
    }),
    // customer/note-type
  }),
});

export const { useGetDropdownQuery, useGetInquiryQuery, useGetNoteTypeQuery } =
  systemApiSlice;
// const { data: ddData } = useGetDropdownQuery();
// const { data: ddData } = useGetInquiryQuery();
// const { data: ddData } = useGetNoteTypeQuery();
// const noteTypes = useMemo(() => noteTypesApi?.data || [], [noteTypesApi])
