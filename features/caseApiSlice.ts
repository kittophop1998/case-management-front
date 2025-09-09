import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { CreateCaseSchema, UpdateCaseSchema } from "@/schemas";
import { ApiResponse } from "@/types/api.type";
import { CaseDetailsType } from "@/types/case.type";
import { DefaultReqTableType, TableType } from "@/types/table.type";
import { createSearchParams } from "@/lib/utils/create-search-params";

// ---------- Helper Function ----------
const sanitizeCaseBody = (
  body: Omit<z.infer<typeof CreateCaseSchema>, "caseTypeText"> & {
    caseTypeText?: string;
  }
) => {
  const newBody = { ...body };
  if (newBody.caseTypeText === "None Inquiry") {
    const removableFields: (keyof typeof newBody | string)[] = [
      "emails",
      "form",
      "to",
      "cc",
      "bcc",
      "subject",
      "template",
      "mailText",
      "files",
    ];
    removableFields.forEach((field) => {
      delete newBody[field as keyof typeof newBody];
    });
  }
  delete newBody.caseTypeText;
  return newBody;
};

// ---------- API Slice ----------
export const caseApiSlice = createApi({
  reducerPath: "caseApi",
  baseQuery,
  endpoints: (builder) => ({
    createCaseInquiry: builder.mutation<
      void,
      { body: z.infer<typeof CreateCaseSchema> }
    >({
      query: ({ body }) => ({
        url: "/cases",
        method: "POST",
        body: sanitizeCaseBody(body),
      }),
    }),

    createCaseNoneInquiry: builder.mutation<
      void,
      { body: z.infer<typeof CreateCaseSchema> }
    >({
      query: ({ body }) => ({
        url: "/cases",
        method: "POST",
        body,
      }),
    }),

    caseByPermission: builder.query<TableType<any>, DefaultReqTableType>({
      query: ({
        page,
        limit,
        sort = null,
        order = null,
        category = null,
        ...other
      }) => {
        const searchParams = createSearchParams({
          ...other,
          page,
          limit,
          sort,
          order,
          category,
        });
        return {
          url: `/cases?${searchParams}`,
          method: "GET",
        };
      },
    }),
    getCaseDetails: builder.query<CaseDetailsType | undefined, { id: string }>({
      query: ({ id }) => ({
        url: `/cases/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<CaseDetailsType>) => response?.data,
    }),
    updateCaseByID: builder.mutation<void, { id: string; body: z.infer<typeof UpdateCaseSchema> }>({
      query: ({ id, body }) => ({
        url: `/cases/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useCreateCaseInquiryMutation,
  useCreateCaseNoneInquiryMutation,
  useGetCaseDetailsQuery,
  useLazyCaseByPermissionQuery,
  useUpdateCaseByIDMutation
} = caseApiSlice;
