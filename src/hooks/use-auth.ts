"use client";
import { useEffect, useRef } from "react";
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

export default function useAuth() {
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
    try {
      const { accessToken, refreshToken, error } = await loginUser(value);
      if (error) {
        throw new Error(error);
      }
      if (!accessToken || !refreshToken) {
        throw new Error("Invalid login response");
      }
      await setAccessToken(accessToken);
      await setRefreshToken(refreshToken);
      // getMe();
    } catch (error) {
      console.log("useAuth-Login failed", error);
    }
  };
  const isMutted = useRef(false);
  useEffect(() => {
    if (!isMutted.current) {
      isMutted.current = true;
      return;
    }
    console.log("USE-AUTH autoDirect me:", me);
    if (me) {
      const initPath = getInitPathByRole(router.pathname, me?.role?.name);
      if (initPath) {
        router.push(initPath);
      }
    }
  }, [me?.role?.name]);

  return {
    login: {
      login,
      // isLoadingLogin,
      formLogin,
      // isLoginError,
      // loginError,
    },
    getMe: {
      me,
      isLoadingGetMe,
      isGetMeError,
    },
  };
}
