'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useLazyGetMeQuery, useLoginMutation } from '@/features/auth/authApiSlice';
import z from 'zod';
import { LoginSchemas } from '@/schemas';
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


export default function useAuth() {
  const formLogin = useForm<z.infer<typeof LoginSchemas>>({
    resolver: zodResolver(LoginSchemas),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const router = useRouter()
  const [loginMutation, { isLoading: isLoadingLogin, isError: isLoginError, error: loginError }] = useLoginMutation();
  // const [shouldFetchMe, setShouldFetchMe] = useState(false);
  // const { data: me, isLoading: isLoadingGetMe, refetch: refetchMe, isError: isGetMeError } = useGetMeQuery(undefined, {
  //   skip: !shouldFetchMe,
  // })
  const [getMe, { data: me, currentData: currentMe, isLoading: isLoadingGetMe, isError: isGetMeError }] = useLazyGetMeQuery();
  const login = async (value: z.infer<typeof LoginSchemas>) => {
    try {
      await loginMutation(value).unwrap();
      getMe()
    } catch (error) {
      console.log('useAuth-Login failed', error);
    }
  };
  useEffect(() => {
    console.log('useAuth-me changed:', me);
  }, [me]);

  const isMutted = useRef(false);
  useEffect(() => {
    if (!isMutted.current) {
      isMutted.current = true;
      return;
    }
    console.log('USE-AUTH autoDirect me:', me);
    if (me) {
      switch (me?.role?.name) {
        case 'Admin':
          router.push('/user-management');
          break;
        case 'User':
          router.push('/case-management');
          break;
        default:
          router.push('/login');
      }
    }
  }, [me?.role?.name]);

  return {
    login: {
      login,
      isLoadingLogin,
      formLogin,
      isLoginError,
      loginError
    },
    getMe: {
      me,
      isLoadingGetMe,
      isGetMeError,
      // loginGetMe
    }
  };
}

