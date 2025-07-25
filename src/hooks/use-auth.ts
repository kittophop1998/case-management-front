'use client';

import { useEffect, useCallback } from 'react';
import { useGetMeMutation, useLoginMutation } from '@/features/auth/authApiSlice';
import { UserType } from '@/types/user.type';
import { convertKeysToCamelCase } from '@/lib/utils/formatKeyUtils';
import z from 'zod';
import { LoginSchemas } from '@/schemas';
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useAuth() {
  const router = useRouter()
  const [loginMutation, { isLoading: isLoadingLogin, isError: isLoginError, error: loginError }] = useLoginMutation();
  const [getMeMutation, { data: me, isLoading: isLoadingGetMe, isError: isGetMeError, error: loginGetMe }] = useGetMeMutation();
  // 
  const formLogin = useForm<z.infer<typeof LoginSchemas>>({
    resolver: zodResolver(LoginSchemas),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const getMe = useCallback(async () => {
    try {
      const response = await getMeMutation(null).unwrap();
      console.log('useAuth-getMe response', response);
      return convertKeysToCamelCase(response) as UserType;
    } catch (error: any) {
      console.log('useAuth-getMe failed', error);
      if (error.status === 401) {
        // try refresh token
      }
    }
  }, [getMeMutation]);

  const login = async (value: z.infer<typeof LoginSchemas>) => {
    try {
      await loginMutation(value).unwrap();
      await getMe();
    } catch (error) {
      console.log('useAuth-Login failed', error);
    }
  };
  const logout = useCallback(() => {
    throw new Error('Logout functionality is not implemented yet');
    // post /logout endpoint
    // set user null
    // clear
  }, []);
  // 
  // 

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
    try {
      getMe()
    } catch (error) {
      console.log('&&&&& useAuth-getMe failed', error);
    }
  }, [getMeMutation]);
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
