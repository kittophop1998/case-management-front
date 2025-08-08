import { createApi } from "@reduxjs/toolkit/query/react";
import { UserType } from "@/types/user.type";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
import { DefaultReqTableType } from "@/types/table.type";

export interface GetUsersRequest extends DefaultReqTableType {
  status: boolean | null;
  role: string | null;
  team: string | null;
  center: string | null;
  searchText: string;
}
type EditUserBody = {
  username: string;
  roleId: number;
  centerId: number;
  teamId: number;
  isActive: boolean;
  queueId: string;
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
        team = null,
        center = null,
        sort = null,
        searchText = "",
      }) => {
        let searchObj: {
          page?: string;
          limit?: string;
          is_active?: string;
          roleId?: string;
          teamId?: string;
          centerId?: string;
          keyword?: string;
          sort?: string;
        } = {
          page: String(page),
          limit: String(limit),
          is_active: String(status),
          roleId: String(role || ""),
          teamId: String(team || ""),
          centerId: String(center || ""),
          keyword: String(searchText || ""),
          sort: String(sort),
        };

        if (!page) delete searchObj.page;
        if (!limit) delete searchObj.limit;
        if (!status && status !== false) delete searchObj.is_active;
        if (!role) delete searchObj.roleId;
        if (!team) delete searchObj.teamId;
        if (!center) delete searchObj.centerId;
        if (!sort) delete searchObj.sort;
        if (!searchText) delete searchObj.keyword;

        const searchParams = new URLSearchParams(searchObj);

        return {
          url: `/users?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),
    getUser: builder.mutation<ApiResponse<{ data: UserType }>, number>({
      query: (uID) => ({
        url: `/users/${uID}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation<
      ApiResponse<{}>,
      { id: string; data: EditUserBody }
    >({
      query: ({ id, data }) => {
        let body = {
          name: data.username,
          roleId: data.roleId,
          centerId: data.centerId,
          queueId: data.queueId,
          teamId: data.teamId,
          departmentId: data.departmentId,
          isActive: data.isActive,
        };
        return {
          url: `/users/${id}`,
          method: "PUT",
          body,
        };
      },
      // invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<ApiResponse<undefined>, any>({
      query: (user) => {
        let body = {
          ...user,
          agentId: Number(user.agentId),
          operatorId: Number(user.operatorId),
        };
        delete body.id; // Ensure id is not sent in the request
        // }
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
