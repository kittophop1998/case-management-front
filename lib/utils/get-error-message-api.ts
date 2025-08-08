import { lang } from "@/services/api";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
export const getErrorMessageAPI = (
  response: FetchBaseQueryError | SerializedError | undefined,
  defaultMessage: string = "An unexpected error occurred. Please try again later."
): string => response?.data?.error?.error?.message?.[lang] || defaultMessage;
// response?.data?.message?.[lang] || defaultMessage;
