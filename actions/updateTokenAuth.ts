"use server";
import { api, setAccessToken, setRefreshToken } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
import { UserProfileType } from "@/types/user.type";
import { cookies } from "next/headers";

export const updateTokenAuth = async () => {
  let user: ApiResponse<UserProfileType> | null = null;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  if (
    !!accessToken &&
    !!refreshToken &&
    typeof accessToken === "string" &&
    typeof refreshToken === "string"
  ) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    try {
      user = await api<UserProfileType>(`/auth/profile`);
      // const permissionObj: Record<string, boolean> = {};
      // for (const { key } of user?.data?.permissions || []) {
      //   permissionObj[key] = true;
      // }
      // cookieStore.set("permissions", JSON.stringify(permissionObj));
    } catch (error) {
      console.error("Error RootLayout.user", error);
    }
  } else {
    setAccessToken(null);
    setRefreshToken(null);
  }
  return { user, accessToken, refreshToken };
  // return user;
};
