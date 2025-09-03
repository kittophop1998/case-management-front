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
  products: JsonJoinDetails[];
};
export type GetDropdownResponse = ApiResponse<DropdownSystemType>;

export type DispositionInfo = {
  en: string;
  th: string;
  id: string;
};

export type Disposition = {
  dispositionMain: DispositionInfo;
  dispositionSubs: DispositionInfo[] | null;
};
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
    getInquiry: builder.query<Disposition[], void>({
      query: () => ({
        url: "/cases/disposition",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Disposition[]>) =>
        response?.data ?? [],
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
