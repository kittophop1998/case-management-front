import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import { ApiResponse, RawApiLogType } from "@/types/api.type";
import { ApiLogType } from "@/types/api.type";
import { createSearchParams } from "@/lib/utils/create-search-params";

// ---------- ฟังก์ชันแปลง key camelCase → snake_case ----------
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function keysToSnake(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToSnake(v));
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[toSnakeCase(key)] = keysToSnake(value);
      return acc;
    }, {} as any);
  }
  return obj;
}

// ---------- ฟังก์ชันแปลง key snake_case → camelCase ----------
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function keysToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => keysToCamel(v));
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[toCamelCase(key)] = keysToCamel(value);
      return acc;
    }, {} as any);
  }
  return obj;
}

// ---------- Query Parameter Type ----------
export type ApiLogQueryParams = {
  requestId?: string;
  serviceName?: string;
  endpoint?: string;
  reqDatetime?: string;
  reqHeader?: string;
  reqMessage?: string;
  respDatetime?: string;
  respHeader?: string;
  respMessage?: string;
  statusCode?: string;
  timeUsage?: string;
  sortingField?: string;
  sortingOrder?: string;
  page?: number;
  limit?: number;
};

// ---------- API Response Type ----------
export type ApiLogResponse = {
  data: ApiLogType[];
  total: number;
  page: number;
  limit: number;
};

// ---------- API Slice ----------
export const apilogApiSlice = createApi({
  reducerPath: "apilogApi",
  baseQuery,
  endpoints: (builder) => ({
    getApiLogs: builder.query<ApiLogResponse, ApiLogQueryParams>({
      query: (params) => {
        const snakeParams = keysToSnake(params);
        const searchParams = createSearchParams(snakeParams);
        return {
          url: `/logs?${searchParams}`,
          method: "GET",
        };
      },
      transformResponse: (response: ApiResponse<RawApiLogType[]>): ApiLogResponse => {
        const camelCaseData = (response.data ? keysToCamel(response.data) : []) as ApiLogType[];
        return {
          data: camelCaseData,
          total: response.total || 0,
          page: response.page || 1,
          limit: response.limit || 10,
        };
      },
    }),
  }),
});

// ---------- Hooks ----------
export const {
  useGetApiLogsQuery,
  useLazyGetApiLogsQuery,
} = apilogApiSlice;
