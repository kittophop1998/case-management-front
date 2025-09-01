'use client'
import { Button } from "@/components/common/Button";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { UsersTable, UsersTableRef, useUsersBackend, useUsersFontend } from "@/components/user/user-table";
import { createColumnHelper } from "@tanstack/react-table";
import { UserType } from "@/types/user.type";
import { AddUser } from "./components/add-users";
import { useEffect, useRef, useState } from "react";
import { useDelUsersMutation, useLazyGetQueueInfoQuery } from "@/features/queueApiSlice";
import { dialogAlert } from "@/components/common/dialog-alert";
import { useParams } from 'next/navigation'
import { CreateQueueSection } from "../_components/create-queue";
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


const QueueInfo = ({ id }) => {
    const [getData, { data: queueInfo, isFetching }] = useLazyGetQueueInfoQuery();
    const refetchQueue = () => {
        getData({ id })
    }
    useEffect(() => {
        refetchQueue()
    }, [])
    return (
        <div className="flex items-center  gap-3">
            <div>
                <div>Queue Name : {queueInfo?.queueName || '-'}</div>
                <div>Description : {queueInfo?.queueDescription || '-'}</div>
            </div>
            <CreateQueueSection fetchTable={refetchQueue} queue={queueInfo} />
        </div>
    )
}

export default function QueueManagementIDPage() {
    const columnHelper = createColumnHelper<UserType>()
    const [isActiveDelete, setIsActiveDelete] = useState(false)
    const [delUsersDraft, setDelUsersDraft] = useState([])
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

    const refetchUsersQueue = () => {
        usersTableRef.current?.refetch()
    }
    const refetchnewUsers = () => { }
    const refetchUser = () => {
        refetchnewUsers()
        refetchUsersQueue()
    }

    return (
        <CardPageWrapper className="mt-4" >
            <>
                <QueueInfo id={id} />
                <UsersTable
                    ref={usersTableRef}
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
