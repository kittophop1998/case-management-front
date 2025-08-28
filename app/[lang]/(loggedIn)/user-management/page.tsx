'use client'
import { UsersTable, useUsersBackend } from "@/components/user/user-table";
export default function UserManagementPage() {


  return (
    <>
      <UsersTable addUser editUser useUsers={useUsersBackend} />
    </>
  )
}
