import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
import { DefaultReqTableType } from "@/types/table.type";
import { Customer } from "@/types/customer.type";

interface ReqSearchCustomer {
  id: string;
}
export const customersApiSlice = createApi({
  reducerPath: "customersApi",
  baseQuery,
  endpoints: (builder) => ({
    searchCustomer: builder.query<ApiResponse<Customer>, ReqSearchCustomer>({
      query: ({ id }) => {
        let searchObj = {
          id: String(id),
          datamock: JSON.stringify({
            id: id,
            name: `name-${id}`,
            img: "",
          }),
          // isError: "true",
        };
        const searchParams = new URLSearchParams(searchObj);
        return {
          url: `/mock/customer?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLazySearchCustomerQuery } = customersApiSlice;
