import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { CreateNoteSchemas } from "@/schemas";
import { ApiResponse } from "@/types/api.type";
import { createSearchParams } from "@/lib/utils/create-search-params";

export const noteApiSlice = createApi({
  reducerPath: "noteApi",
  baseQuery,
  endpoints: (builder) => ({
    createNote: builder.mutation<
      void,
      {
        body: z.infer<typeof CreateNoteSchemas>;
      }
    >({
      query: ({ body }) => ({
        url: `/customers/note`,
        method: "POST",
        body,
      }),
    }),
    getCustomerNotes: builder.query<
      ApiResponse<any[]>,
      {
        customerId: string;
        page: number;
        limit: number;
        sort: string | null;
        keyword: string;
        createdDate: string;
      }
    >({
      query: ({ customerId, page, limit, sort, keyword, createdDate }) => {
        const searchParams = createSearchParams({
          page,
          limit,
          sort,
          keyword,
          createdDate,
        });
        return {
          url: `/customers/${customerId}/notes?${searchParams}`,
          method: "GET",
        };
      },
    }),
  }),
});
// customers/note/1234 GET

export const { useCreateNoteMutation, useLazyGetCustomerNotesQuery } =
  noteApiSlice;
// const [createNote, { error, isLoading }] = useCreateNoteMutation();
// const [getData, { data,isFetching }] = useLazyGetCustomerNotesQuery();
