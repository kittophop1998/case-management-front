import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { NewCaseSchema } from "@/schemas";

export const caseApiSlice = createApi({
  reducerPath: "caseApi",
  baseQuery,
  endpoints: (builder) => ({
    createCase: builder.mutation<
      void,
      {
        body: z.infer<typeof NewCaseSchema>;
      }
    >({
      query: ({ body }) => ({
        url: `/cases`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateCaseMutation } = caseApiSlice;
// const [createCase, { error, isLoading }] = useCreateCaseMutation();
