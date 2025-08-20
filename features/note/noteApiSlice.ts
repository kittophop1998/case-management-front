import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { CreateNoteSchemas } from "@/schemas";

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
  }),
});
// customers/note/1234 GET

export const { useCreateNoteMutation } = noteApiSlice;
// const [createNote, { error, isLoading }] = useCreateNoteMutation();
