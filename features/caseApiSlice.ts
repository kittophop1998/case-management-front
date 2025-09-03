import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { NewCaseSchema } from "@/schemas";

export const caseApiSlice = createApi({
  reducerPath: "caseApi",
  baseQuery,
  endpoints: (builder) => ({
    createCaseInquiry: builder.mutation<
      void,
      {
        body: z.infer<typeof NewCaseSchema>;
      }
    >({
      query: ({ body }) => {
        return {
          url: `/cases/inquiry`,
          method: "POST",
          body,
        };
      },
    }),
    createCaseNoneInquiry: builder.mutation<
      void,
      {
        body: z.infer<typeof NewCaseSchema>;
      }
    >({
      query: ({ body }) => {
        return {
          url: `/cases`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateCaseInquiryMutation,
  useCreateCaseNoneInquiryMutation,
} = caseApiSlice;
// const [createCase, { error, isLoading }] = useCreateCaseInquiryMutation();
