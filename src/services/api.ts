// let accessToken: string | null = null;
// let refreshToken: string | null = null;

// export function setAccessToken(token: string | null) {
//   accessToken = token;
// }

// export function setRefreshToken(token: string | null) {
//   refreshToken = token;
// }

// export interface ResponseAPI<T> {
//   message?: T | string;
//   error?: string;
//   statusCode?: number;
// }

// async function api<T>(
//   url: string,
//   options: RequestInit = {}
// ): Promise<T | null> {
//   let res
//   try {
//     res = await fetch(`${BASE_URL}${url}`, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
//         ...(options?.headers ?? {}),
//       },
//       // cache: "no-store",
//     });
//   } catch (error) {
//     throw new Error("Network error or invalid URL");
//   }
//   const text = await res.text();
//   const data: ResponseAPI<T> = text ? JSON.parse(text) : {};
//   if (!res.ok) {
//     console.log("API Error 2:", { url, status: res.status, data });
//     throw new Error(
//       String(data.error || `Request failed with status ${res.status}`)
//     );
//   }
//   return (data.message ?? null) as T | null;
// }

// export default api;

// import { generateRequestId } from "@/lib/utils/genterateIdUtils";
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import Cookies from 'js-cookie';
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// const BASE_URL = 'http://localhost:5000/api';

// export const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:8000/api/v1'
// })

// const base = fetchBaseQuery({
//   baseUrl: 'http://localhost:8000/api/v1'
//   // prepareHeaders: (headers: Headers) => {
//   //   console.log('Preparing headers for:', headers);
//   //   const requestId = generateRequestId();
//   //   const token = Cookies.get('mock_auth_token');
//   //   headers.set('Content-Type', 'application/json');
//   //   headers.set('X-Request-ID', requestId);
//   //   if (token) {
//   //     headers.set('Authorization', `Bearer ${token}`);
//   //   }
//   //   return headers;
//   // }
// })
export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api/v1'
})
// export const baseQuery = async (args: any, api: any, extraOptions: any) => {
//   let result = await base(args, api, extraOptions)
//   if (result.error) {
//     console.log(`ERROR : `, result)
//     throw new Error(
//       `API Error: ${result.error.status} - ${
//         result.error.data.message || 'Unknown error'
//       }`
//     )
//   }
//   return result
// }
