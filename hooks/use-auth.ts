"use client";
import z from "zod";
import { useState } from "react";
import { useGetMeQuery, useLogoutMutation } from "@/features/authApiSlice";
import { LoginSchemas } from "@/schemas";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api, setAccessToken, setRefreshToken } from "@/services/api";
import { loginUser, setToken, SignInAPIResponse } from "@/actions/login";

export default function useAuth() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [
    logoutMutation,
    { isLoading: isLoadingLogout, isError: isLogoutError, error: logoutError },
  ] = useLogoutMutation();
  const { data: meApi, refetch: refetchMe } = useGetMeQuery();

  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const formLogin = useForm<z.infer<typeof LoginSchemas>>({
    resolver: zodResolver(LoginSchemas),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const login = async (value: z.infer<typeof LoginSchemas>) => {
    setIsLoadingLogin(true);
    setLoginError(null);
    try {
      const res = await api<{ data: SignInAPIResponse }>(`/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(`[action] loginUser() res:`, res);
      if (!res) {
        throw new Error("invalid token");
      }
      const { accessToken, refreshToken } = res.data;
      // const { accessToken, refreshToken, error } = await loginUser(value);
      // console.log(`useAuth() res-loginUser:`, {
      //   accessToken,
      //   refreshToken,
      //   error,
      // });
      setToken({ accessToken, refreshToken });

      // if (error) {
      //   throw new Error(error);
      // }
      if (!accessToken || !refreshToken) {
        await logoutMutation();
        throw new Error("Invalid login response");
      }
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      // TODO:[CHANGE THIS LOGIC CLEAR LOG WHEN LOGOUT]
      console.time("refetchMe");
      refetchMe();
      // let data = await refetchMe().unwrap();
      console.timeEnd("refetchMe");
      // console.log(`data :`, data);
      const initPath = "/th/dashboard";
      router.push(initPath); // ineed force push not waite load page ssr success
      // window.location.href = "/th/dashboard";
      // setIsLoadingLogin(false);
      setLoginError(null);
    } catch (error) {
      setIsLoadingLogin(false);
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };
  return {
    login: {
      login,
      isLoadingLogin,
      formLogin,
      loginError,
    },
    logout: {
      loading: isLoadingLogout,
      error: logoutError,
    },
  };
}
