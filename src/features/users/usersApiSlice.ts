import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UsersTable, UserType } from "@/types/user.type";
import { baseQuery } from "@/services/api";
import { ApiResponse, ApiResponseSuccess } from "@/types/api.type";
import { number } from "zod";
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
  queueId?: string;
};

export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery,
  // tagTypes: ['User'], // สำคัญถ้าคุณใช้ cache tag
  endpoints: (builder) => ({
    getUsers: builder.mutation<ApiResponse<UsersTable>, GetUsersRequest>({
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
        if (!status) delete searchObj.is_active;
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
      ApiResponseSuccess,
      { id: string; data: EditUserBody }
    >({
      query: ({ id, data }) => {
        let body = {
          name: data.username,
          roleId: data.roleId,
          centerId: data.centerId,
          queueId: data.queueId,
          teamId: data.teamId,
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
    createUser: builder.mutation<ApiResponseSuccess, any>({
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
