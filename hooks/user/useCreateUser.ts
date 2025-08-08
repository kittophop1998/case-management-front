import { useCreateUserMutation } from "@/features/users/usersApiSlice";
import { UserType } from "@/types/user.type";

export const useCreateUser = () => {
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();

  const submitCreateUser = async (user: UserType) => {
    try {
      const result = await createUser(user).unwrap();
      return result;
    } catch (err) {
      console.error("Create user failed:", err);
      throw err;
    }
  };

  return {
    submitCreateUser,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
