'use client'
import { ContainerPage } from "@/components/common/card-page-warpper";
import { UsersTable, useUsersBackend } from "@/components/user/user-table";
export default function UserManagementPage() {
  const {
    fetchUsers,
    dataList,
    data,
    isLoading,
    isError,
    error
  } = useUsersBackend()
  return (
    <>
      <ContainerPage>
        <UsersTable
          addUser
          editUser
          useUsers={useUsersBackend}
          fetchUsers={fetchUsers}
          dataList={dataList}
          data={data}
          isLoading={isLoading}
          isError={isError}
        />
      </ContainerPage>
    </>
  )
}
