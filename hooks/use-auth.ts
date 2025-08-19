"use client";
import { useMemo, useRef, useState } from "react";
import {
  useLazyGetMeQuery,
  useLogoutMutation,
} from "@/features/auth/authApiSlice";
import { LoginSchemas } from "@/schemas";
import { useRouter } from "next/navigation";
import z, { set } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setAccessToken, setRefreshToken } from "@/services/api";
import { loginUser } from "@/actions/login";
import getInitPathByRole from "@/lib/utils/get-init-path-by-role";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const [
    getMe,
    { data: meApi, isLoading: isLoadingGetMe, isError: isGetMeError },
  ] = useLazyGetMeQuery();
  const me = useMemo(() => meApi?.data || {}, [meApi]);
  const login = async (value: z.infer<typeof LoginSchemas>) => {
    setIsLoadingLogin(true);
    setLoginError(null);

    console.log("useAuth-Login", value);
    try {
      console.log("1 clint login call action");
      const { accessToken, refreshToken, error } = await loginUser(value);
      console.log(
        "2 clint after call login  action",
        accessToken,
        refreshToken,
        error
      );

      if (error) {
        console.log("useAuth-Login error", error);
        throw new Error(error);
      }
      if (!accessToken || !refreshToken) {
        await logoutMutation();
        throw new Error("Invalid login response");
      }
      await setAccessToken(accessToken);
      await setRefreshToken(refreshToken);
      getMe()
        .unwrap()
        .then(async (resMe) => {
          const currentMe = resMe.data;
          console.log("useAuth-getMe success", currentMe);
          try {
            if (!currentMe) {
              throw new Error("User data not found");
            }
            const initPath = await getInitPathByRole(
              pathname,
              currentMe.role.name
            );
            console.log(
              "useAuth-getInitPathByRole",
              initPath,
              currentMe?.role?.name
            );
            if (initPath) {
              router.push(initPath);
            }
          } catch (error) {
            setLoginError(error.message);
          }
        })
        .catch((error) => {
          console.error("useAuth-getMe error", error);
          setLoginError("Failed to fetch user data");
        });
      setIsLoadingLogin(false);
      setLoginError(null);
    } catch (error) {
      console.log("useAuth-Login failed", error);
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
