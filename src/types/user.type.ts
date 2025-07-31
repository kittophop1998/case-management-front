import { TableType } from "./table.type"

export type JsonJoinDetails = {
  id: string
  name: string
}
//date '2025-07-24T02:16:42.171159Z'
export type UserType = {
  id: number
  operatorId: number
  agentId: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  username: string
  name: string
  email: string
  team: JsonJoinDetails
  isActive: boolean
  center: JsonJoinDetails
  role: JsonJoinDetails
}

// export type UsersTable = {
//   data: UserType[]
//   page: number
//   limit: number
//   total: number
//   totalPages: number
// }

export type UsersTable = TableType<UserType>

export type UserProfileType = {
  center: JsonJoinDetails
  createdAt: string
  deletedAt: null
  email: string
  id: string
  isActive: boolean
  name: string
  role: JsonJoinDetails & { Permissions: any[] }
  team: JsonJoinDetails
  updatedAt: string
  username: string
}