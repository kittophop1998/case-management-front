'use client'

import { Button } from "@/components/common/Button"
import { Modal } from "@/components/common/Modal"
import { UsersTable, useUsersBackend } from "@/components/user/user-table"
import { useState } from "react"

export const AddUser = () => {
    const [newUsers, setNewUsers] = useState([])
    const [isOpenAddUser, setIsOpenAddUser] = useState(false)


    return (
        <>
            <Button variant='black' onClick={() => setIsOpenAddUser(true)} >
                Add user
            </Button>
            <Modal title='' isOpen={isOpenAddUser}>
                <UsersTable
                    useUsers={useUsersBackend}
                />
            </Modal>
        </>

    )
}