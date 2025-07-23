'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import Cookies from 'js-cookie';
import { UserType } from '@/types/user.type';
import { convertKeysToCamelCase } from '@/lib/utils/formatKeyUtils';

export default function useAuth() {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loginMutation, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const savedToken = Cookies.get('mock_auth_token') || null;
    const savedUserJson = localStorage.getItem('auth_user');
    if (savedToken && savedUserJson) {
      setToken(savedToken);
      setUser(JSON.parse(savedUserJson));
    }
  }, []);

  const login = useCallback(
    async (user_data: string) => {
      try {
        const result = await loginMutation({ user_data }).unwrap();
        const formatResult = convertKeysToCamelCase(result)
        setUser(formatResult.user);
        setToken(user_data);
        Cookies.set('mock_auth_token', user_data, { expires: 1 });
        localStorage.setItem('auth_user', JSON.stringify(formatResult.user));

        return { success: true, error: null };
      } catch (err) {
        console.error('Login failed', err);
        return { success: false, error: err };
      }
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    Cookies.remove('mock_auth_token');
    localStorage.removeItem('auth_user');
  }, []);

  return {
    user,
    token,
    isLoggedIn: !!user,
    login,
    logout,
    isLoading,
  };
}
