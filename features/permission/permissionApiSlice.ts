import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import { SettingAccessControlSchema } from "@/schemas";
import { DefaultReqTableType, TableType } from "@/types/table.type";
import z from "zod";
import { DataAccessControl } from "@/app/[lang]/(loggedIn)/access-control/page";

export const permissionApiSlice = createApi({
  reducerPath: "permissionApi",
  baseQuery,
  endpoints: (builder) => ({
    getTable: builder.query<
      TableType<{ label: string; roles: string[]; action: string }>,
      DefaultReqTableType & {
        department?: string;
        section?: string;
        text?: string;
      }
    >({
      query: ({
        page,
        limit,
        sort = null,
        order = null,
        department,
        section,
        text,
      }) => {
        let searchObj: {
          page?: string;
          limit?: string;
          sort?: string;
          order?: string;
          departmentId?: string;
          sectionId?: string;
          keyword?: string;
        } = {
          page: String(page),
          limit: String(limit),
          sort: String(sort || ""),
          order: String(order || ""),
          departmentId: department || "",
          sectionId: section || "",
          keyword: text || "",
        };

        if (!page) delete searchObj.page;
        if (!limit) delete searchObj.limit;
        if (!sort) delete searchObj.sort;
        if (!order) delete searchObj.order;
        if (!department) delete searchObj.departmentId;
        if (!section) delete searchObj.sectionId;
        if (!text) delete searchObj.keyword;
        const searchParams = new URLSearchParams(searchObj);
        return {
          url: `/permissions?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),
    editTable: builder.mutation<
      void,
      {
        body: DataAccessControl[];
        department: string;
        section: string;
      }
    >({
      query: ({ body, department, section }) => ({
        url: `/permissions/update?departmnetId=${department}&sectionId=${section}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useLazyGetTableQuery, useEditTableMutation } =
  permissionApiSlice;
