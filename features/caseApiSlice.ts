import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { CreateCaseSchema } from "@/schemas";
import { ApiResponse } from "@/types/api.type";
import { CaseDetailsType } from "@/types/case.type";

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
    getCaseDetails: builder.query<CaseDetailsType | undefined, void>({
      query: () => {
        const fixedId = "f52b23ae-3d09-4ed6-a6f2-85ba36ca145c"; // fix ไว้ก่อน
        return {
          url: `/cases/${fixedId}`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<CaseDetailsType>) => response?.data,
    }),
  }),
});

export const {
  useCreateCaseInquiryMutation,
  useCreateCaseNoneInquiryMutation,
  useGetCaseDetailsQuery,
} = caseApiSlice;
// const [createCase, { error, isLoading }] = useCreateCaseInquiryMutation();
