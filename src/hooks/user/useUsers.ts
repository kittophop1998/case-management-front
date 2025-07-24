// src/hooks/useUsers.ts
import {
  useGetUsersMutation,
  GetUsersRequest
} from '@/features/users/usersApiSlice'

export const useUsers = () => {
  const [fetchUsers, { data, isLoading, isError, error, isSuccess }] =
    useGetUsersMutation()

  const getUsers = async (params: GetUsersRequest = {}) => {
    try {
      const result = await fetchUsers(params).unwrap()
      return result
    } catch (err) {
      console.error('Failed to fetch users:', err)
      throw err
    }
  }
  // let usersTable ={
  //     data: [],
  //     page: 1,
  //     limit: 10,
  //     total: 0,
  //     totalPages: 0
  //   }
  // if(isError){
  // }else{
  // }
  const defaultData = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
  return {
    usersTable: isError ? defaultData : data || defaultData,
    getUsers,
    isLoading,
    isSuccess,
    isError,
    error
  }
}

// const data: UserType[] = []
// for (let i = 0; i < 110; i++) {
//   data.push({
//     id: `${i + 1}`,
//     name: `User ${i + 1}`,
//     role: i % 2 === 0 ? 'Admin' : 'User',
//     team: `Team ${(i % 3) + 1}`,
//     center: `Center ${(i % 2) + 1}`,
//     status: i % 2 === 0 ? 'Active' : 'Inactive'
//   })
// }
