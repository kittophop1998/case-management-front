import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { CreateCaseSchema } from "@/schemas";

export const caseApiSlice = createApi({
  reducerPath: "caseApi",
  baseQuery,
  endpoints: (builder) => ({
    createCaseInquiry: builder.mutation<
      void,
      {
        body: z.infer<typeof CreateCaseSchema>;
      }
    >({
      query: ({ body }) => {
        if (body.caseTypeText === "None Inquiry") {
          delete body.emails;
          delete body.form;
          delete body.to;
          delete body.cc;
          delete body.bcc;
          delete body.subject;
          delete body.template;
          delete body.mailText;
          delete body.files;
        }
        delete body.caseTypeText;
        return {
          url: "/cases/inquiry",
          method: "POST",
          body,
        };
      },
    }),
    createCaseNoneInquiry: builder.mutation<
      void,
      {
        body: z.infer<typeof CreateCaseSchema>;
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
