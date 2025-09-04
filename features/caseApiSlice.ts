import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { CreateCaseSchema } from "@/schemas";
import { DefaultReqTableType, TableType } from "@/types/table.type";
import { createSearchParams } from "@/lib/utils/create-search-params";
import { ApiResponse } from "@/types/api.type";

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
          // url: "/cases/inquiry",
          url: "/cases",
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
    caseByPermission: builder.query<TableType<any>, DefaultReqTableType>({
      query: ({ page, limit, sort = null, order = null }) => {
        const searchParams = createSearchParams({
          page,
          limit,
          sort,
          order,
        });
        return {
          url: `/cases?${searchParams}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateCaseInquiryMutation,
  useCreateCaseNoneInquiryMutation,
  useLazyCaseByPermissionQuery,
} = caseApiSlice;
// const [createCase, { error, isLoading }] = useCreateCaseInquiryMutation();
// const [getData, { data: tableNotes, isFetching: isFetchingTableNotes }] = useLazyCaseByPermissionQuery();
