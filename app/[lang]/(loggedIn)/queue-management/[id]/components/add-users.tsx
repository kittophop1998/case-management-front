'use client'

import { Button } from "@/components/common/Button"
import { Modal } from "@/components/common/Modal"
import { UsersTable, useUsersBackend, useUsersFontend } from "@/components/user/user-table"
import { useState } from "react"

export const AddUser = () => {
    const [newUsers, setNewUsers] = useState([])
    const [isOpenAddUser, setIsOpenAddUser] = useState(false)

    const {
        fetchUsers,
        dataList,
        data,
        isLoading,
        isError,
        error
    } = useUsersFontend()
    return (
        <>
            <Button variant='black' onClick={() => setIsOpenAddUser(true)} >
                Add user
            </Button>
            <Modal title='' isOpen={isOpenAddUser}>
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
            </Modal>
        </>

    )
}