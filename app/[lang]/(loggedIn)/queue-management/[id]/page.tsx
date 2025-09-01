'use client'
import { Button } from "@/components/common/Button";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import { UsersTable, UsersTableRef, useUsersBackend, useUsersFontend } from "@/components/user/user-table";
import { createColumnHelper } from "@tanstack/react-table";
import { UserType } from "@/types/user.type";
import BtnDel from "@/components/button/btn-del";
import { AddUser } from "./components/add-users";
import { CreateQueue } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form } from "@/components/ui/form";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { TextField } from "@/components/form/text-field";
import { TextAreaField } from "@/components/form/textarea-field";
import BtnSave from "@/components/button/btn-save";
import { useCreateMutation, useDelUsersMutation } from "@/features/queueApiSlice";
import { useDebugLogForm } from "@/hooks/use-debug-log-form";
import { dialogAlert } from "@/components/common/dialog-alert";
import { useParams, useRouter } from 'next/navigation'
import { getErrorText } from "@/services/api";
import { CreateQueueSection, QueueInfoForm } from "../_components/create-queue";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { checkPassword } from "@/components/common/dialog-check-password";


const BtnDelUsers = ({ disabled, clearDraft, users, queueID, isActive, setIsActive, afterSubmit }) => {
    const [delUsers, { error: errorDelUsers, isLoading: isLoadingDelUsers }] = useDelUsersMutation()
    const handleDeleteUser = async () => {
        try {
            const password = await checkPassword()
            if (!password) return // กดยกเลิก หรือกรอกผิด
            await delUsers(
                { users, id: queueID }
            ).unwrap()
            afterSubmit()
            setIsActive(false)
            dialogAlert(true)

        } catch (error: unknown) {
            if (error instanceof Error) {
                await dialogAlert(false,
                    {
                        title: '',
                        message: error.message,
                        confirmText: 'Try again',
                        cancelText: 'Try again',
                        onConfirm: () => { },
                        onCancel: () => { }
                    }
                )
            }
        }
    }

    const length = users.length
    if (length === 0 && isActive) return <Button className="bg-black white-text" onClick={() => setIsActive(false)}>Cancel</Button>
    if (!isActive) {
        return (
            <Button className={cn("white-text", isActive ? 'bg-red-500' : 'bg-black')}
                onClick={() => { setIsActive(true) }}
            >
                Delete Users
            </Button>)
    }
    return (
        <>
            <Button className={cn("white-text", isActive ? 'bg-red-500' : 'bg-black')}
                onClick={handleDeleteUser}
            >
                Delete Users {length}
            </Button>
        </>)
}

export default function QueueManagementIDPage() {
    const columnHelper = createColumnHelper<UserType>()
    const [isActiveDelete, setIsActiveDelete] = useState(false)

    // const appendColumns = [columnHelper.display({
    //     id: 'delete',
    //     enableHiding: false,
    //     size: 10,
    //     cell: info => {
    //         const user = info.row.original
    //         // const isActive = !!newUsersObjDraft[user.id]
    //         return (
    //             <BtnDel onClick={() => handleDelUsers(user)} />
    //         )
    //     },
    //     meta: {
    //         headerClass: 'w-[3rem]'
    //     }
    // })]
    const [delUsersObjDraft, setDelUsersObjDraft] = useState({})
    const [delUsersDraft, setDelUsersDraft] = useState([])
    // const [delUsersArrDraft, setDelUsersObjDraft] = useState({})
    const prependColumns = [columnHelper.display({
        id: 'delete',
        enableHiding: false,
        size: 10,
        cell: info => {
            const user = info.row.original
            // const isActive = !!delUsersObjDraft[user.id]
            const isActive = delUsersDraft.includes(user.id)

            return (
                <Checkbox
                    checked={isActive}
                    onClick={
                        (e) => {
                            e.stopPropagation()
                            if (isActive) {
                                // setDelUsersObjDraft(prev =>
                                //     ({ ...prev, [user.id]: undefined })
                                // )
                                setDelUsersDraft(prev => prev.filter(id => id !== user.id))
                            } else {
                                setDelUsersDraft(prev => ([...prev, user.id]))
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
    const params = useParams<{ id: string }>()
    const { id } = params
    const usersTableRef = useRef<UsersTableRef>(null)

    const refetchQueue = () => { }
    const refetchUsersQueue = () => {
        usersTableRef.current?.refetch()
    }
    const refetchnewUsers = () => { }
    const refetchUser = () => {
        refetchnewUsers()
        refetchUsersQueue()
    }



    useEffect(() => {
        const users = Object.values(delUsersObjDraft).filter(user => user !== undefined)
        console.log(`users`, users.length, users)

    }, [delUsersObjDraft])
    const clearDraftDelete = () => {
        setDelUsersObjDraft({})
    }
    return (
        <CardPageWrapper className="mt-4" >
            <>
                <div className="flex items-center  gap-3">
                    <div>
                        <div>Queue Name:----------------</div>
                        <div>Description:---------------</div>
                    </div>
                    <CreateQueueSection fetchTable={refetchQueue} />
                </div>
                <UsersTable
                    defaultFilter={{ queueId: id }}
                    useUsers={useUsersBackend}
                    fetchUsers={fetchUsers}
                    prependColumns={isActiveDelete ? prependColumns : []}

                    MoreActions={
                        <div className="flex gap-3">
                            <AddUser
                                afterSubmit={refetchUser}
                            />
                            <BtnDelUsers
                                clearDraft={() => { setDelUsersDraft([]) }} users={delUsersDraft} queueID={id} isActive={isActiveDelete} setIsActive={setIsActiveDelete}
                                afterSubmit={refetchUser}
                            />
                        </div>
                    }
                    dataList={dataList}
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                />
            </>
        </CardPageWrapper>
    )
}
