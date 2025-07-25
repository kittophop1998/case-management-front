'use client';

import { useState, useEffect, useCallback } from 'react';
import { useGetMeMutation, useLoginMutation } from '@/features/auth/authApiSlice';
import Cookies from 'js-cookie';
import { UserType } from '@/types/user.type';
import { convertKeysToCamelCase } from '@/lib/utils/formatKeyUtils';
import z from 'zod';
import { LoginSchemas } from '@/schemas';
import { useRouter } from 'next/navigation'
import { log } from 'console';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { th } from 'date-fns/locale';

export default function useAuth() {
  const router = useRouter()
  const formLogin = useForm<z.infer<typeof LoginSchemas>>({
    resolver: zodResolver(LoginSchemas),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const [loginMutation, { isLoading: isLoadingLogin, isError: isLoginError, error: loginError }] = useLoginMutation();
  const [getMeMutation, { data: me, isLoading: isLoadingGetMe, isError: isGetMeError, error: loginGetMe }] = useGetMeMutation();
  // useEffect(() => {
  //   const savedToken = Cookies.get('mock_auth_token') || null;
  //   const savedUserJson = localStorage.getItem('auth_user');
  //   if (savedToken && savedUserJson) {
  //     setToken(savedToken);
  //     setUser(JSON.parse(savedUserJson));
  //   }
  // }, []);

  // const login = useCallback(
  //   async (user_data: string) => {
  //     try {
  //       const result = await loginMutation({ user_data }).unwrap();
  //       const formatResult = convertKeysToCamelCase(result)
  //       setUser(formatResult.user);
  //       setToken(user_data);
  //       Cookies.set('mock_auth_token', user_data, { expires: 1 });
  //       localStorage.setItem('auth_user', JSON.stringify(formatResult.user));

  //       return { success: true, error: null };
  //     } catch (err) {
  //       console.error('Login failed', err);
  //       return { success: false, error: err };
  //     }
  //   },
  //   [loginMutation]
  // );
  // useEffect(() => {
  //   const fetchMe = async () => {
  //     try {
  //       const response = await getMeMutation(null).unwrap();
  //       const formatResponse = convertKeysToCamelCase(response);
  //       console.log('useAuth-getMe', formatResponse);
  //       // setUser(formatResponse.user);
  //     } catch (error) {
  //       console.error('useAuth-getMe failed', error);
  //     }
  //   };
  //   fetchMe();
  // }, [getMeMutation]);

  // useEffect(() => {
  //   switch (me?.role?.id) {
  //     case 1:
  //       // Admin role
  //       break;
  //     case 2:
  //       // User role
  //       break;
  //     default:
  //       // Unknown role
  //   }
  // }, [me?.role?.id]);


  // const login = async (value: z.infer<typeof LoginSchemas>) => {
  //   try {
  //     const response = await loginMutation(value).unwrap();
  //     console.log("response", response);
  //     break;
  //   }
  // }, [me?.role?.id]);

  useEffect(() => {
    if (me) {
      switch (me?.role?.id) {
        case 1:
          router.push('/user-management');
          break;
        case 2:
          router.push('/case-management');
          break;
        default:
          router.push('/login');
      }
    }
  }, [me?.role?.id]);
  useEffect(() => {
    getMeMutation(null).unwrap();
  }, [getMeMutation]);
  const login = async (value: z.infer<typeof LoginSchemas>) => {
    try {
      const response = await loginMutation(value).unwrap();
      console.log("response", response);
      await getMeMutation(null).unwrap();
    } catch (error) {
      console.log('useAuth-Login failed', error);
      // console.error('useAuth-Login failed', error);
    }
  };
  const logout = useCallback(() => {
    throw new Error('Logout functionality is not implemented yet');
    // post /logout endpoint
    // set user null
    // clear
  }, []);
  return {
    login: {
      login,
      isLoadingLogin,
      formLogin,
      isLoginError,
      loginError
    }, logout: {
      logout,
    },
    getMe: {
      me,
      isLoadingGetMe,
      isGetMeError,
      loginGetMe
    }
  };
}
