import { useGetUserMutation } from "@/features/users/usersApiSlice";

export const useUser = () => {
  const [fetchUser, { data, isLoading, isError, error }] = useGetUserMutation();

  const getUser = async (userId: number) => {
    try {
      const result = await fetchUser(userId).unwrap();
      return result;
    } catch (err) {
      console.error("Failed to fetch user:", err);
      throw err;
    }
  };

  return {
    user: data?.user,
    getUser,
    isLoading,
    isError,
    error,
  };
};
