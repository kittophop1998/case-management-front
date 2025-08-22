import { createApi } from "@reduxjs/toolkit/query/react";
import { UserType } from "@/types/user.type";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
import { DefaultReqTableType } from "@/types/table.type";
import { CreateEditUserSchema } from "@/schemas";
import z from "zod";

export interface GetUsersRequest extends DefaultReqTableType {
  status: boolean | null;
  role: string | null;
  section: string | null;
  center: string | null;
  searchText: string;
  department: string | null;
}
type EditUserBody = {
  name: string;
  roleId: number;
  centerId: number;
  sectionId: number;
  isActive: boolean;
  // queueId: string;
  departmentId: string;
};

export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery,
  // tagTypes: ['User'], // สำคัญถ้าคุณใช้ cache tag
  endpoints: (builder) => ({
    getUsers: builder.mutation<ApiResponse<UserType[]>, GetUsersRequest>({
      query: ({
        page,
        limit,
        status = true,
        role = null,
        section = null,
        center = null,
        sort = null,
        searchText = "",
        department = null,
      }) => {
        let searchObj: {
          page?: string;
          limit?: string;
          isActive?: string;
          roleId?: string;
          sectionId?: string;
          centerId?: string;
          keyword?: string;
          sort?: string;
          departmentId?: string;
        } = {
          page: String(page),
          limit: String(limit),
          isActive: String(status),
          roleId: String(role || ""),
          sectionId: String(section || ""),
          centerId: String(center || ""),
          keyword: String(searchText || ""),
          departmentId: String(department || ""),
          sort: String(sort),
        };

        if (!page) delete searchObj.page;
        if (!limit) delete searchObj.limit;
        if (!status && status !== false) delete searchObj.isActive;
        if (!role) delete searchObj.roleId;
        if (!section) delete searchObj.sectionId;
        if (!center) delete searchObj.centerId;
        if (!sort) delete searchObj.sort;
        if (!searchText) delete searchObj.keyword;
        if (!department) delete searchObj.departmentId;

        const searchParams = new URLSearchParams(searchObj);

        return {
          url: `/users?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getUser: builder.mutation<ApiResponse<UserType>, string>({
      query: (uID) => ({
        url: `/users/${uID}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation<
      ApiResponse<{}>,
      { id: string; data: z.infer<typeof CreateEditUserSchema> }
    >({
      query: ({ id, data }) => {
        let body = {
          ...data,
          staffId: Number(data.staffId),
          operatorId: Number(data.operatorId),
        };
        return {
          url: `/users/${id}`,
          method: "PUT",
          body,
        };
      },
      // invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<
      ApiResponse<undefined>,
      z.infer<typeof CreateEditUserSchema>
    >({
      query: (user) => {
        let body = {
          ...user,
          staffId: Number(user.staffId),
          operatorId: Number(user.operatorId),
        };
        delete body.id;
        delete body.isActive;
        return {
          url: "/users",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetUsersMutation,
  useGetUserMutation,
  useEditUserMutation,
  useCreateUserMutation,
} = usersApiSlice;
