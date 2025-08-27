"use server";

import { cookies } from "next/headers";
import { api, setAccessToken, setRefreshToken } from "@/services/api";
import { LoginSchemas } from "@/schemas";
import * as z from "zod";

export type SignInAPIResponse = {
  refreshToken: string;
  accessToken: string;
};
type ResponseLogin = {
  accessToken?: string;
  refreshToken?: string;
  error?: string;
};
export async function loginUser({
  username,
  password,
}: z.infer<typeof LoginSchemas>): Promise<ResponseLogin> {
  try {
    const res = await api<SignInAPIResponse>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`[action] loginUser() res:`, res);
    if (!res) {
      throw new Error("invalid token");
    }
    const { accessToken, refreshToken } = res;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Use secure cookies in production https or localhost only
      path: "/",
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return { accessToken, refreshToken };
  } catch (error: unknown) {
    console.log(`[action] loginUser() error:`, error);
    if (error instanceof Error) {
      return { error: error?.message || "An unexpected error occurred" };
    }
    return { error: "An unexpected error occurred" };
  }
}
export async function setToken({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): Promise<ResponseLogin> {
  try {
    // const res = await api<SignInAPIResponse>(`/auth/login`, {
    //   method: "POST",
    //   body: JSON.stringify({ username, password }),
    //   headers: { "Content-Type": "application/json" },
    // });
    // console.log(`[action] loginUser() res:`, res);
    // if (!res) {
    //   throw new Error("invalid token");
    // }
    // const { accessToken, refreshToken } = res;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Use secure cookies in production https or localhost only
      path: "/",
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return { accessToken, refreshToken };
  } catch (error: unknown) {
    // console.log(`[action] loginUser() error:`, error);
    if (error instanceof Error) {
      return { error: error?.message || "An unexpected error occurred" };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    setAccessToken("");
    setRefreshToken("");
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
