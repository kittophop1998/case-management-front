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
        return {
          url: `/dashboard/custinfo/${id}`,
          method: "GET",
        };
      },
    }),
    customerDashboard: builder.query<ApiResponse<Customer>, ReqSearchCustomer>({
      query: ({ id }) => {
        let query = {
          id: String(id),
          datamock: JSON.stringify({
            lastCardApplyDate: "25 Aug 2023",
            customerSentiment: "",
            phoneNoLastUpdateDate: "01 Aug 2024",
            lastIncreaseCreditLimitUpdate: "",
            lastReduceCreditLimitUpdate: "",
            lastIncomeUpdate: "29 Aug 2023",
            suggestedAction: "Update salary slip",
            typeOfJob: "PRIVATE COMPANY",
            maritalStatus: "Single",
            gender: "Female",
            lastEStatementSentDate: "",
            eStatementSentStatus: "",
            statementChannel: "Paper",
            consentForDisclose: "Incomplete",
            blockMedia: "No blocked",
            consentForCollectUse: "Incomplete",
            //
            nationalId: "1102001313257",
            customerNameEng: "ARUNEE TESTCDP",
            customerNameTh: "อรุณี TESTCDP",
            mobileNO: "00913589211",
            mailToAddress: "40 ม.1 ต.สวนแตง อ.ละแม จ.ชุมพร 86170",
            mailTo: "Home",
          }),
          // isError: "true",
        };
        const searchParams = new URLSearchParams(query);
        return {
          url: `/mock/dashboard/custprofile/${id}?${searchParams.toString()}`,
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

export const { useLazySearchCustomerQuery, useLazyCustomerDashboardQuery } =
  customersApiSlice;
