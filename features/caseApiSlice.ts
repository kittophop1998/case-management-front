import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import z from "zod";
import { CreateCaseSchema, UpdateCaseSchema } from "@/schemas";
import { ApiResponse } from "@/types/api.type";
import { CaseDetailsType } from "@/types/case.type";
import { DefaultReqTableType, TableType } from "@/types/table.type";
import { createSearchParams } from "@/lib/utils/create-search-params";
import { FilterAll } from "@/app/[lang]/(loggedIn)/case-management/page";

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

    caseByPermission: builder.query<
      TableType<any>,
      DefaultReqTableType & FilterAll
    >({
      query: ({
        page,
        limit,
        sort = null,
        order = null,
        category = null,
        ...other
      }) => {
        const searchParams = createSearchParams({
          dateEnd: other.dateEnd,
          dateStart: other.dateStart,
          statusId: other.statuses,
          priority: other.priorities,
          slaDate: other.slaDate,
          queue: other.queue,
          keyword: other.keyword,
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
      transformResponse: (response: ApiResponse<CaseDetailsType>) =>
        response?.data,
    }),
    updateCaseByID: builder.mutation<
      void,
      { id: string; body: z.infer<typeof UpdateCaseSchema> }
    >({
      query: ({ id, body }) => ({
        url: `/cases/${id}`,
        method: "PUT",
        body,
      }),
    }),
    //
    getCaseNotes: builder.query<any[], { id: string }>({
      query: ({ id }) => {
        // const data = JSON.stringify([
        //   {
        //     noteId: "",
        //     name: "Nong Gaitod", //users.full_name (mapped with user id)
        //     center: "HY", //center.name (mapped with user id)
        //     createdAt: "", //note.created_at
        //     noteContent: "", //note.content
        //   },
        // ]);
        // // const datamock = encodeURIComponent(JSON.stringify(data));
        // const datamock = JSON.stringify(data);

        return {
          url: `/cases/${id}/notes`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<any[]>) => response?.data || [],
    }),
    addCaseNote: builder.mutation<void, { id: string; message: string }>({
      query: ({ id, message }) => ({
        url: `/cases/${id}/note`,
        method: "POST",
        body: { content: message },
      }),
    }),
  }),
});

export const {
  useCreateCaseInquiryMutation,
  useCreateCaseNoneInquiryMutation,
  useLazyGetCaseDetailsQuery,
  useLazyCaseByPermissionQuery,
  useUpdateCaseByIDMutation,
  // case note
  useLazyGetCaseNotesQuery,
  useAddCaseNoteMutation,
  //
} = caseApiSlice;
