// src/hooks/useUsers.ts
import { useGetUsersMutation,GetUsersRequest } from '@/features/users/usersApiSlice';

export const useUsers = () => {
  const [fetchUsers, { data, isLoading, isError, error, isSuccess }] =
    useGetUsersMutation();

  const getUsers = async (params: GetUsersRequest = {}) => {
    try {
      const result = await fetchUsers(params).unwrap();
      return result;
    } catch (err) {
      console.error('Failed to fetch users:', err);
      throw err;
    }
  };

  return {
    users: data||[],
    getUsers,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
