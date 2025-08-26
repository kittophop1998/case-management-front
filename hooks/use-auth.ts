"use client";
import z from "zod";
import { useState } from "react";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { LoginSchemas } from "@/schemas";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setAccessToken, setRefreshToken } from "@/services/api";
import { loginUser } from "@/actions/login";

export default function useAuth() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [
    logoutMutation,
    { isLoading: isLoadingLogout, isError: isLogoutError, error: logoutError },
  ] = useLogoutMutation();

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
      const { accessToken, refreshToken, error } = await loginUser(value);
      console.log(`useAuth() res-loginUser:`, {
        accessToken,
        refreshToken,
        error,
      });
      if (error) {
        throw new Error(error);
      }
      if (!accessToken || !refreshToken) {
        await logoutMutation();
        throw new Error("Invalid login response");
      }
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      const initPath = "/th/dashboard";
      router.replace(initPath); // ineed force push not waite load page ssr success
      setIsLoadingLogin(false);
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
