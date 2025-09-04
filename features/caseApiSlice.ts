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
        let url = "";
        // switch (body.caseTypeText) {
        //   case "Inquiry":
        url = "/cases/inquiry";
        //     break;
        //   case "None Inquiry":
        //     url = "/cases";
        //     break;
        //   default:
        //     break;
        // }
        delete body.caseTypeText;
        return {
          url: url,
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
