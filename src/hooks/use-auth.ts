'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useGetMeQuery, useLoginMutation } from '@/features/auth/authApiSlice';
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
  const [shouldFetchMe, setShouldFetchMe] = useState(false);
  const { data: me, isLoading: isLoadingGetMe, refetch: refetchMe, isError: isGetMeError } = useGetMeQuery(undefined, {
    // skip: true,
    skip: !shouldFetchMe,
  })
  const login = async (value: z.infer<typeof LoginSchemas>) => {
    try {
      await loginMutation(value).unwrap();
      setShouldFetchMe(true);
      // refetchMe();
    } catch (error) {
      console.log('useAuth-Login failed', error);
    }
  };
  useEffect(() => {
    console.log('useAuth-me changed:', me);
  }, [me]);
  const logout = useCallback(() => {
    throw new Error('Logout functionality is not implemented yet');
    // post /logout endpoint
    // set user null
    // clear
  }, []);
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
    }, logout: {
      logout,
    },
    getMe: {
      me,
      isLoadingGetMe,
      isGetMeError,
      // loginGetMe
    }
  };
}

