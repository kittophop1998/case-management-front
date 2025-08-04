"use server";

import { cookies } from "next/headers";
import { setAccessToken, setRefreshToken } from "@/services/api";
import { LoginSchemas } from "@/schemas";
import * as z from "zod";

type SignInAPIResponse = {
  refreshToken: string;
  accessToken: string;
};

export async function loginUser({
  username,
  password,
}: z.infer<typeof LoginSchemas> & { error?: string }) {
  try {
    // const res = await api<SignInAPIResponse>(`/auth/sign-in`, {
    //   method: "POST",
    //   body: JSON.stringify({ username, password }),
    //   headers: { "Content-Type": "application/json" },
    // });
    const res = {
      accessToken: "mocked_access_token",
      refreshToken: "mocked_refresh_token",
    }
    // console.log("loginUser res", res);

    if (!res) {
      throw new Error("invalid token");
    }
    const { accessToken, refreshToken } = res;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    const cookieStore = await cookies();
    await cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: true,// Use secure cookies in production https or localhost only
      path: "/",
    });
    await cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",

    });
    return { accessToken, refreshToken };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    setAccessToken("");
    setRefreshToken("");
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
