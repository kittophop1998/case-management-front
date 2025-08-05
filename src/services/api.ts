import { ApiResponse } from "@/types/api.type";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let accessToken: string | null = null;
let refreshToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}
export function setRefreshToken(token: string | null) {
  refreshToken = token;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";
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
  // credentials: "include",
});

// SSR-only
export async function api<T>(
  url: string,
  options: RequestInit = {}
): Promise<T | null> {
  let res;
  try {
    const isServer = typeof window === "undefined";
    res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...(options?.headers ?? {}),
      },
    });
  } catch (error) {
    throw new Error("Network error or invalid URL");
  }
  const text = await res.text();
  const data: ApiResponse<T> = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(
      String(data.error || `Request failed with status ${res.status}`)
    );
  }
  return (data || null) as T | null;
}
