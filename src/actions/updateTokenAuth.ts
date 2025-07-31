"use server";
// import { getMe } from "@/lib/auth-api";
import { api, setAccessToken, setRefreshToken } from "@/services/api";
import { ApiResponse } from "@/types/api.type";
import { UserProfileType, UserType } from "@/types/user.type";
// import { ActiveUser } from "@/types/user";
import { cookies } from "next/headers";
// import useUserStore from "@/stores/useUserStore";
// set/clear accessToken and refreshToken ssr Memory
// set/clear store.user.id ,store.user.charId ,...
// set/clear socket.token then reconnect

export const updateTokenAuth = async () => {
  let user: ApiResponse<UserProfileType> | null = null;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value || null;
  const refreshToken = cookieStore.get("refresh_token")?.value || null;
  if (!!accessToken && !!refreshToken && typeof accessToken === "string" && typeof refreshToken === "string") {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    try {
      user = await api<UserProfileType>(`/auth/profile`)
    } catch (error) {
      console.error("Error RootLayout.user", error);
    }
  } else {
    setAccessToken(null);
    setRefreshToken(null);
  }
  return { user, accessToken, refreshToken };
  // return user;
}


