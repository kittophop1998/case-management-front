// src/hooks/useUsers.ts
import {
  useGetUsersMutation,
  GetUsersRequest
} from '@/features/users/usersApiSlice'
import { useEffect, useState } from 'react'

export const useUsers = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [status, setStatus] = useState<boolean | null>(null)
  const [role, setRole] = useState<number | null>(null)
  const [team, setTeam] = useState<string | null>(null)
  const [center, setCenter] = useState<number | null>(null)
  const [sort, setSort] = useState<string | null>(null)
  const [order, setOrder] = useState<'asc' | 'desc' | null>(null)
  const [searchText, setSearchText] = useState('')
  const [numberTrickerFetch, setNumberTrickerFetch] = useState<number>(1)
  const [fetchUsers, { data, isLoading, isError, error, isSuccess }] =
    useGetUsersMutation()

  const getUsers = async (params: GetUsersRequest) => {
    try {
      const result = await fetchUsers(params).unwrap()
      return result
    } catch (err) {
      console.error('Failed to fetch users:', err)
      throw err
    }
  }
  const triggerFetch = () => {
    setNumberTrickerFetch(prev => prev + 1)
  }
  useEffect(() => {
    getUsers({
      page,
      limit,
      status,
      role,
      team,
      center,
      sort,
      order,
      searchText
    })
  }, [page, limit, status, role, team, center, sort, order, searchText, numberTrickerFetch])

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
    error,
    triggerFetch,
    state: {
      page,
      limit,
      status,
      role,
      team,
      center,
      sort,
      order,
      searchText
    },
    setSate: {
      setPage,
      setLimit,
      setStatus,
      setRole,
      setTeam,
      setCenter,
      setSort,
      setOrder,
      setSearchText
    }
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
