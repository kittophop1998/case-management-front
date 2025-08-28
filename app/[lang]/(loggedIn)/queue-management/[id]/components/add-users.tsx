'use client'

import BtnApply from "@/components/button/btn-apply"
import { ButtonCancel } from "@/components/button/btn-cancle"
import { Button } from "@/components/common/Button"
import { Modal } from "@/components/common/Modal"
import { Checkbox } from "@/components/ui/checkbox"
import { UsersTable, useUsersBackend, useUsersFontend } from "@/components/user/user-table"
import { UserType } from "@/types/user.type"
import { createColumnHelper } from "@tanstack/react-table"
import { useState } from "react"

export const AddUser = () => {
    const [newUsersObjDraft, setNewUsersObjDraft] = useState({})
    const [isOpenAddUser, setIsOpenAddUser] = useState(false)
    const columnHelper = createColumnHelper<UserType>()
    const prependColumns = [columnHelper.display({
        id: 'delete',
        enableHiding: false,
        size: 10,
        cell: info => {
            const user = info.row.original
            const isActive = !!newUsersObjDraft[user.id]
            return (
                <Checkbox
                    checked={isActive}
                    onClick={
                        (e) => {
                            e.stopPropagation()
                            // setNewUsersDraft(prev => [...prev, user])
                            if (isActive) {
                                setNewUsersObjDraft(prev => ({ ...prev, [user.id]: undefined }))
                            } else {
                                setNewUsersObjDraft(prev => ({ ...prev, [user.id]: user }))
                            }
                        }
                    }
                />
            )
        },
        meta: {
            headerClass: 'w-[3rem]'
        }

    })]
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
            <Button variant='black' onClick={() => setIsOpenAddUser(true)} >
                Add user
            </Button>
            <Modal title='' isOpen={isOpenAddUser} className='w-[clamp(985px,100vw,300px)]'>
                <div>
                    <UsersTable
                        fetchUsers={fetchUsers}
                        dataList={dataList}
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                        prependColumns={prependColumns}
                    />
                    <div className="flex justify-end gap-2">
                        <ButtonCancel />
                        <BtnApply />
                    </div>
                </div>
            </Modal>
        </>

    )
}