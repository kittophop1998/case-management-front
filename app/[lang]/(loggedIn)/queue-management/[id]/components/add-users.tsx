'use client'

import BtnApply from "@/components/button/btn-apply"
import { ButtonCancel } from "@/components/button/btn-cancle"
import { Button } from "@/components/common/Button"
import { Modal } from "@/components/common/Modal"
import { Checkbox } from "@/components/ui/checkbox"
import { UsersTable, useUsersBackend, useUsersFontend } from "@/components/user/user-table"
import { UserType } from "@/types/user.type"
import { retry } from "@reduxjs/toolkit/query"
import { createColumnHelper } from "@tanstack/react-table"
import { memo, useEffect, useMemo, useState } from "react"

interface AddUserProps {
    usersAdd: UserType[]
    userDelete: UserType[]
}

const useCombinedData = (addItems: UserType[], deleteItems: UserType[]) => {
    const {
        fetchUsers: fetchUsersB,
        dataList: dataListB,
        data: dataB,
        isLoading: isLoadingB,
        isError: isErrorB,
        error: errorB
    } = useUsersBackend()

    const initalData = useMemo(() => {
        let items = [...dataListB, ...addItems]
        items = items.filter(user => !deleteItems.includes(user.id))
        console.log(`initalData`, items)
        return items
    }, [dataListB, addItems, deleteItems])
    const {
        fetchUsers,
        dataList,
        data,
        isLoading,
        isError,
        error
    } = useUsersFontend(initalData)

    useEffect(() => {
        fetchUsersB(
            {
                page: 1,
                limit: 9999999999,
                status: true,
                role: null,
                section: null,
                center: null,
                sort: null,
                searchText: "",
                department: null,
                queueId: null,
                isNotInQueue: true,
            }
        )
    }, [])
    console.count(`useCombinedData`)
    return {
        fetchUsers,
        dataList,
        data,
        isLoading: isLoadingB || isLoading,
        isError,
        error
    }
}

export const AddUser = memo(({ usersAdd, userDelete, handleAddUsers }: AddUserProps) => {
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
    } = useCombinedData(
        userDelete,
        usersAdd
    )
    useEffect(() => {
        if (isOpenAddUser) {
            let initNewUsersObjDraft = {}
            // isSame(usersAdd, Object.values(newUsersObjDraft).filter(u => u !== undefined)) || setNewUsersObjDraft(
            for (const user of usersAdd) {
                initNewUsersObjDraft[user.id] = user
            }
            setNewUsersObjDraft(initNewUsersObjDraft)
        }
    }, [isOpenAddUser])
    console.log(`AddUser`)
    const close = () => {
        setIsOpenAddUser(false)
    }
    const save = () => {
        const users = Object.values(newUsersObjDraft)
        handleAddUsers(users)
        console.log(`newUsersObjDraft`, newUsersObjDraft)
        setIsOpenAddUser(false)
    }
    return (
        <>

            <Button variant='black' onClick={() => setIsOpenAddUser(true)} >
                Add user
            </Button>
            <Modal title='' isOpen={isOpenAddUser} className='w-[clamp(985px,100vw,300px)]'>
                <div>
                    {/* <div>usersAdd:{JSON.stringify(usersAdd)}</div> */}
                    {/* <div>userDelete:{JSON.stringify(userDelete)}</div> */}
                    {/* {dataList.length} */}
                    <UsersTable
                        fetchUsers={fetchUsers}
                        dataList={dataList}
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                        prependColumns={prependColumns}
                    />
                    <div className="flex justify-end gap-2">
                        <ButtonCancel onClick={close} />
                        <BtnApply onClick={save} />
                    </div>
                </div>
            </Modal>
        </>

    )
})