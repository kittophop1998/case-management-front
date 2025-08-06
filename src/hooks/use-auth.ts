"use client";
import { useEffect, useRef, useState } from "react";
import {
  useLazyGetMeQuery,
  // useLoginMutation,
} from "@/features/auth/authApiSlice";
import { LoginSchemas } from "@/schemas";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setAccessToken, setRefreshToken } from "@/services/api";
import { loginUser } from "@/actions/login";
import getInitPathByRole from "@/lib/utils/get-init-path-by-role";
import { usePathname } from "next/navigation";

export default function useAuth() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const formLogin = useForm<z.infer<typeof LoginSchemas>>({
    resolver: zodResolver(LoginSchemas),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const [
    getMe,
    {
      data: me,
      currentData: currentMe,
      isLoading: isLoadingGetMe,
      isError: isGetMeError,
    },
  ] = useLazyGetMeQuery();
  const login = async (value: z.infer<typeof LoginSchemas>) => {
    setIsLoadingLogin(true);
    setLoginError(null);

    console.log("useAuth-Login", value);
    try {
      const { accessToken, refreshToken, error } = await loginUser(value);
      if (error) {
        console.log("useAuth-Login error", error);
        throw new Error(error);
      }
      if (!accessToken || !refreshToken) {
        throw new Error("Invalid login response");
      }
      await setAccessToken(accessToken);
      await setRefreshToken(refreshToken);
      getMe();
      setIsLoadingLogin(false);
      setLoginError(null);
    } catch (error) {
      setIsLoadingLogin(false);
      console.log("useAuth-Login failed", error);
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("An unexpected error occurred");
      }
    }
  };
  const isMutted = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isMutted.current) {
      isMutted.current = true;
      return;
    }
    if (me) {
      const cloneGetInitPathByRole = async () => {
        const initPath = await getInitPathByRole(
          pathname,
          me?.role?.name,
          "eeeeeeeeeeeeeee"
        );
        console.log("useAuth-getInitPathByRole", initPath, me?.role?.name);
        if (initPath) {
          router.push(initPath);
        }
      };
      cloneGetInitPathByRole();
    }
  }, [me?.role?.name]);

  return {
    login: {
      login,
      isLoadingLogin,
      formLogin,
      // isLoginError,
      loginError,
    },
    getMe: {
      me,
      isLoadingGetMe,
      isGetMeError,
    },
  };
}
