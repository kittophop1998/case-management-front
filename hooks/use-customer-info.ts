import {
  useLazyCustomerCustsegmentQuery,
  useLazyCustomerProfileQuery,
  useLazyCustomerSuggestionQuery,
  useLazyCustomerCustinfoQuery,
} from "@/features/customers/customersApiSlice";
import {
  CustomerCombine,
  CustomerCombineLoading,
  CustomerDataType,
} from "@/types/customer.type";
import { useMemo } from "react";

export function useCustomerInfo(customberId: string | null): {
  customer: CustomerCombine;
  loading: Record<CustomerDataType, boolean>;
  fetch: (customerDataType: CustomerDataType[]) => void;
} {
  const [
    handleGetCusInfo,
    { data: cusInfo, isFetching: isFetchingInfo, error: errorInfo },
  ] = useLazyCustomerCustinfoQuery();
  const [
    handleGetCusProfile,
    { data: cusProfile, isFetching: isFetchingProfile, error: errorProfile },
  ] = useLazyCustomerProfileQuery();
  const [
    handleGetCusCustsegment,
    {
      data: cusCustsegment,
      isFetching: isFetchingCusCustsegment,
      error: errorCusCustsegment,
    },
  ] = useLazyCustomerCustsegmentQuery();
  const [
    handleGetCusSuggestion,
    {
      data: cusSuggestion,
      isFetching: isFetchingCusSuggestion,
      error: errorCusSuggestion,
    },
  ] = useLazyCustomerSuggestionQuery();
  //
  const fetch = (customerDataType: CustomerDataType[]) => {
    if (!customberId) {
      console.log(`useCustomerInfo().fetch() invalid customberId`);
      return;
    }
    if (customerDataType.includes("custsegment")) {
      handleGetCusCustsegment({
        id: customberId,
      });
    }
    if (customerDataType.includes("info")) {
      handleGetCusInfo({
        id: customberId,
      });
    }
    if (customerDataType.includes("profile")) {
      handleGetCusProfile({
        id: customberId,
      });
    }
    if (customerDataType.includes("suggestion")) {
      handleGetCusSuggestion({
        id: customberId,
      });
    }
  };
  //
  const customer: CustomerCombine = useMemo(
    () => ({
      info: cusInfo,
      profile: cusProfile,
      custsegment: cusCustsegment,
      suggestion: cusSuggestion,
    }),
    [cusInfo, cusProfile, cusCustsegment, cusSuggestion]
  );
  const loading: CustomerCombineLoading = useMemo(
    () => ({
      profile: isFetchingProfile || (!cusProfile && !!customberId),
      info: isFetchingInfo || (!cusInfo && !!customberId),
      custsegment:
        isFetchingCusCustsegment || (!cusCustsegment && !!customberId),
      suggestion: isFetchingCusSuggestion || (!cusSuggestion && !!customberId),
    }),
    [
      cusInfo,
      cusProfile,
      cusCustsegment,
      cusSuggestion,
      isFetchingInfo,
      isFetchingProfile,
      isFetchingCusCustsegment,
      isFetchingCusSuggestion,
      customberId,
    ]
  );

  return {
    customer,
    loading,
    fetch,
  };
}
