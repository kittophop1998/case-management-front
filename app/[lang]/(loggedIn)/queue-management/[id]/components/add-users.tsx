'use client'

import BtnApply from "@/components/button/btn-apply"
import { ButtonCancel } from "@/components/button/btn-cancle"
import { Button } from "@/components/common/Button"
import { Modal } from "@/components/common/Modal"
import { Checkbox } from "@/components/ui/checkbox"
import { UsersTable, useUsersBackend, useUsersFontend } from "@/components/user/user-table"
import { useAddUsersMutation } from "@/features/queueApiSlice"
import { UserType } from "@/types/user.type"
import { retry } from "@reduxjs/toolkit/query"
import { createColumnHelper } from "@tanstack/react-table"
import { memo, useEffect, useMemo, useState } from "react"
import { useParams } from 'next/navigation'
import { getErrorText } from "@/services/api"
import { dialogAlert } from "@/components/common/dialog-alert"
import { UserPlus } from "lucide-react"
interface AddUserProps {
    afterSubmit: () => void
    size?: 'small' | 'medium' | 'large'
}



export const AddUser = memo(({ afterSubmit, size }: AddUserProps) => {

    const params = useParams<{ id: string }>()
    const {
        fetchUsers,
        dataList,
        data,
        isLoading,
        isError,
        error
    } = useUsersBackend()

    const [addUsers, { error: errorAddUsers, isLoading: isLoadingAddUsers }] = useAddUsersMutation()

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

    const close = () => {
        setIsOpenAddUser(false)
    }
    const save = async () => {
        try {
            const users = Object.keys(newUsersObjDraft)
            await addUsers({
                id: params.id,
                users
            })?.unwrap()
            setIsOpenAddUser(false)
            afterSubmit()
            setNewUsersObjDraft({})
            dialogAlert(true)

        } catch (error) {
            dialogAlert(false,
                {
                    title: '',
                    message: getErrorText(error),
                    confirmText: 'Try again',
                    cancelText: 'Try again',
                    onConfirm: () => { },
                    onCancel: () => { }
                }
            )
        }
    }
    return (
        <>
            <Button variant='black' size={size} onClick={() => setIsOpenAddUser(true)} >
                <UserPlus />    Add user
            </Button>
            <Modal title='' isOpen={isOpenAddUser} className='w-[clamp(985px,100vw,300px)]'>
                <div>
                    <UsersTable
                        defaultFilter={{
                            queueId: params.id,
                            isNotInQueue: true
                        }}
                        useUsers={useUsersBackend}
                        fetchUsers={fetchUsers}
                        dataList={dataList}
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                        prependColumns={prependColumns}
                        hidden={{ status: true }}
                    />
                    <div className="flex justify-end gap-2">
                        <ButtonCancel onClick={close} />
                        <BtnApply onClick={save} loading={isLoadingAddUsers} />
                    </div>
                </div>
            </Modal>
        </>

    )
})