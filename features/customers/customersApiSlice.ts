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
            code: id,
            name: `${id}`,
            since: "2020-01-01",
            img: "",
            phone: "+66 0656506331",
            email: "surapong.Lert@gmail.com",
            status: "Normal",
            type: "VP",
            group: "Nomal-VIP",
            paymentStatus: "On-Time",
            segment: "Existing Customer - Active",
            mobileAppStatus: "Active",
            gender: "Men",
            note: {
              count: 3,
            },
          }),
          // isError: "true",
        };
        const searchParams = new URLSearchParams(searchObj);
        return {
          url: `/mock/customers/search/${id}?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),
    //  searchCustomer: builder.query<ApiResponse<Customer>, ReqSearchCustomer>({
    //   query: ({ id }) => {
    // let searchObj = {
    //   id: String(id),
    //   datamock: JSON.stringify({
    //     id: id,
    //     name: `${id}`,
    //     since: "2020-01-01",
    //     img: "",
    //     phone: "+66 0656506331",
    //     email: "surapong.Lert@gmail.com",
    //     status: "Normal",
    //     type: "VP",
    //     group: "Nomal-VIP",
    //     paymentStatus: "On-Time",
    //     segment: "Existing Customer - Active",
    //     mobileAppStatus: "Active",
    //     gender: "Men",
    //     note: {
    //       count: 3,
    //     },
    //   }),
    //   // isError: "true",
    // };
    //     const searchParams = new URLSearchParams(searchObj);
    //     return {
    //       url: `/mock/customer?${searchParams.toString()}`,
    //       method: "GET",
    //     };
    //   },
    // }),
  }),
});

export const { useLazySearchCustomerQuery } = customersApiSlice;
