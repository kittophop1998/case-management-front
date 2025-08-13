import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import { SettingAccessControlSchema } from "@/schemas";
import { DefaultReqTableType, TableType } from "@/types/table.type";
import z from "zod";

export const permissionApiSlice = createApi({
  reducerPath: "permissionApi",
  baseQuery,
  endpoints: (builder) => ({
    getTable: builder.query<
      TableType<{ label: string; roles: string[]; action: string }>,
      DefaultReqTableType
    >({
      query: ({ page, limit, sort = null, order = null }) => {
        let searchObj: {
          page?: string;
          limit?: string;
          sort?: string;
          order?: string;
        } = {
          page: String(page),
          limit: String(limit),
          sort: String(sort || ""),
          order: String(order || ""),
        };
        if (!page) delete searchObj.page;
        if (!limit) delete searchObj.limit;
        if (!sort) delete searchObj.sort;
        if (!order) delete searchObj.order;

        const searchParams = new URLSearchParams(searchObj);
        return {
          url: `/permissions?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),
    editTable: builder.mutation<
      void,
      z.infer<typeof SettingAccessControlSchema>
    >({
      query: (body) => ({
        url: "/permissions/update",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useLazyGetTableQuery, useEditTableMutation } =
  permissionApiSlice;
