import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
import {
  CustomerResApiInfo,
  CustomerResApiProfile,
  CustomerCustsegment,
  CustomerSuggestion,
} from "@/types/customer.type";

interface ReqSearchCustomer {
  id: string;
}
export const customersApiSlice = createApi({
  reducerPath: "customersApi",
  baseQuery,
  endpoints: (builder) => ({
    customerCustinfo: builder.query<
      CustomerResApiInfo | undefined,
      ReqSearchCustomer
    >({
      query: ({ id }) => {
        return {
          url: `/dashboard/custinfo/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<CustomerResApiInfo>) =>
        response?.data,
    }),
    customerProfile: builder.query<
      CustomerResApiProfile | undefined,
      ReqSearchCustomer
    >({
      query: ({ id }) => {
        return {
          url: `/dashboard/custprofile/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<CustomerResApiProfile>) =>
        response?.data,
    }),
    customerCustsegment: builder.query<
      CustomerCustsegment | undefined,
      ReqSearchCustomer
    >({
      query: ({ id }) => {
        return {
          url: `/dashboard/custsegment/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<CustomerCustsegment>) =>
        response?.data,
    }),
    customerSuggestion: builder.query<
      CustomerSuggestion | undefined,
      ReqSearchCustomer
    >({
      query: ({ id }) => {
        return {
          url: `/dashboard/suggestion/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<CustomerSuggestion>) =>
        response?.data,
    }),
  }),
});

export const {
  useLazyCustomerCustinfoQuery,
  useLazyCustomerProfileQuery,
  useLazyCustomerCustsegmentQuery,
  useLazyCustomerSuggestionQuery,
} = customersApiSlice;

//
//
//
//
//
//
