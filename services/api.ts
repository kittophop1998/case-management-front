import { ApiResponse } from "@/types/api.type";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://case-management-backend-new-production.up.railway.app/api/v1";

export let lang: "th" | "en" = "th";
let accessToken: string | null = null;
let refreshToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function setRefreshToken(token: string | null) {
  refreshToken = token;
}

export const getErrorText = (
  response: ApiResponse<undefined>,
  defaultMessage = "An unexpected error occurred. Please try again later."
): string => {
  // TODO: error response on rtk is response: { data: ApiResponse<undefined>; status: number } change it to ApiResponse<undefined>
  if (!response.error && response.data) {
    response = response.data;
  }

  return response?.error?.message?.[lang] || defaultMessage;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  timeout: 5000,
  prepareHeaders: (headers) => {
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// SSR-only
export async function api<T>(
  url: string,
  options: RequestInit = {}
): Promise<T | null> {
  let res;
  try {
    console.log(`apiSSR.call()${BASE_URL}${url}`);
    res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...(options?.headers ?? {}),
      },
    });
    console.log(`apiSSR.res()${BASE_URL}${url}`, res);
  } catch (error) {
    throw new Error("Network error or invalid URL");
  }
  const text: string = await res.text();
  const data: ApiResponse<T> = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(getErrorText(data as ApiResponse<undefined>));
  }
  return (data || null) as T | null;
}
