export type JsonJoinDetails = {
  id: number
  name: string
}
//date '2025-07-24T02:16:42.171159Z'
export type UserType = {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  userName: string
  name: string
  email: string
  team: string
  isActive: true
  center: JsonJoinDetails
  role: JsonJoinDetails
}
export type UsersTable = {
  data: UserType[]
  page: number
  limit: number
  total: number
  totalPages: number
}
