import { createApi } from "@reduxjs/toolkit/query/react";
import { UserType } from "@/types/user.type";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
import { DefaultReqTableType } from "@/types/table.type";
import { CreateEditUserSchema } from "@/schemas";
import z from "zod";
import { createSearchParams } from "@/lib/utils/create-search-params";

export interface GetUsersRequest extends DefaultReqTableType {
  status: boolean | null;
  role: string | null;
  section: string | null;
  center: string | null;
  searchText: string;
  department: string | null;
  queueId: string | null;
  isNotInQueue: boolean | null;
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
type CreateEditUserExtended = Omit<
  z.infer<typeof CreateEditUserSchema>,
  "id" | "isActive" | "staffId" | "operatorId"
> & {
  id?: string | null;
  isActive?: boolean;
  staffId: number;
  operatorId: number;
};
// z.infer<typeof CreateEditUserSchema> & {
//   id?: string;
//   staffId?: number;
//   operatorId?: number;
//   isActive?: boolean;
// };

export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  baseQuery,
  // tagTypes: ['User'], // สำคัญถ้าคุณใช้ cache tag
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<UserType[]>, GetUsersRequest>({
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
        queueId = null,
        isNotInQueue = null,
      }) => {
        const searchParams = createSearchParams({
          page,
          limit,
          isActive: status,
          roleId: role,
          sectionId: section,
          centerId: center,
          sort,
          keyword: searchText,
          departmentId: department,
          queueId,
          isNotInQueue,
        });
        return {
          url: `/users?${searchParams}`,
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
        let { staffId, operatorId, ...rest } = user;
        let staffIdNum = Number(staffId);
        let operatorIdNum = Number(operatorId);
        let body: CreateEditUserExtended = {
          ...rest,
          staffId: staffIdNum,
          operatorId: operatorIdNum,
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
  // useGetUsersMutation,
  useLazyGetUsersQuery,
  useGetUserMutation,
  useEditUserMutation,
  useCreateUserMutation,
} = usersApiSlice;
