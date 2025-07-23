// src/hooks/useEditUser.ts
import { useEditUserMutation } from '@/features/users/usersApiSlice';
import { UserType } from '@/types/user.type';

export const useEditUser = () => {
  const [editUser, { isLoading, isSuccess, isError, error }] =
    useEditUserMutation();

  const submitEditUser = async (user: UserType) => {
    try {
      const result = await editUser(user).unwrap();
      return result;
    } catch (err) {
      console.error('Edit user failed:', err);
      throw err;
    }
  };

  return {
    submitEditUser,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
