'use client'
import { UsersTable, useUsersBackend } from "@/components/user/user-table";
export default function UserManagementPageClient() {
    const {
        fetchUsers,
        dataList,
        data,
        isLoading,
        isError,
        error
    } = useUsersBackend()
    return (
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
    )
}
