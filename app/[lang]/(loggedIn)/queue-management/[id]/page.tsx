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
import { TextFieldInput } from "@/components/form/text-field";
import { TextAreaField, TextAreaFieldInput } from "@/components/form/textarea-field";
import { Value } from "@radix-ui/react-select";
import { Typography } from "@/components/common/typography";
import BtnDel from "@/components/button/btn-del";
import { myConfirm } from "@/components/common/dialog-confirm";


// const BtnDelUsers = ({ disabled, clearDraft, users, queueID, isActive, setIsActive, afterSubmit }) => {
//     const [delUsers, { error: errorDelUsers, isLoading: isLoadingDelUsers }] = useDelUsersMutation()
//     const handleDeleteUser = async () => {
//         try {
//             const password = await checkPassword()
//             if (!password) return // กดยกเลิก หรือกรอกผิด
//             await delUsers(
//                 { users, id: queueID }
//             ).unwrap()
//             afterSubmit()
//             setIsActive(false)
//             dialogAlert(true)

//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 await dialogAlert(false,
//                     {
//                         title: '',
//                         message: error.message,
//                         confirmText: 'Try again',
//                         cancelText: 'Try again',
//                         onConfirm: () => { },
//                         onCancel: () => { }
//                     }
//                 )
//             }
//         }
//     }

//     const length = users.length
//     if (length === 0 && isActive) return <Button className="bg-black white-text" onClick={() => setIsActive(false)}>Cancel</Button>
//     if (!isActive) {
//         return (
//             <Button className={cn("white-text", isActive ? 'bg-red-500' : 'bg-black')}
//                 onClick={() => { setIsActive(true) }}
//             >
//                 Delete Users
//             </Button>)
//     }
//     return (
//         <>
//             <Button className={cn("white-text", isActive ? 'bg-red-500' : 'bg-black')}
//                 onClick={handleDeleteUser}
//             >
//                 Delete Users {length}
//             </Button>
//         </>)
// }


const QueueInfo = ({ id }) => {
    const [getData, { data: queueInfo, isFetching }] = useLazyGetQueueInfoQuery();
    const refetchQueue = () => {
        getData({ id })
    }
    useEffect(() => {
        refetchQueue()
    }, [])
    return (
        <div className="flex items-start justify-between  gap-3 bg-white">
            <div className="flex-1 space-y-3 max-w-[50rem] pointer-events-none">
                <div className="flex gap-2 items-start">
                    <Typography className="min-w-[7rem]">Queue Name :</Typography>
                    <div className="flex-1">
                        <TextFieldInput field={{
                            value: queueInfo?.queueName || '-'
                        }} />
                    </div>
                </div>
                <div className="flex gap-2 items-start">
                    <Typography className="min-w-[7rem]">Description :</Typography>
                    <div className="flex-1">
                        <TextAreaFieldInput
                            field={{
                                value: queueInfo?.queueDescription
                            }}
                        />
                    </div>
                    {/* {queueInfo?.queueDescription || '-'} */}
                </div>
            </div>
            <CreateQueueSection fetchTable={refetchQueue} queue={queueInfo} />
        </div>
    )
}

export default function QueueManagementIDPage() {
    const params = useParams<{ id: string }>()
    const { id } = params
    const columnHelper = createColumnHelper<UserType>()
    const [isActiveDelete, setIsActiveDelete] = useState(false)
    const [delUsersDraft, setDelUsersDraft] = useState([])
    const [delUsers, { error: errorDelUsers, isLoading: isLoadingDelUsers }] = useDelUsersMutation()

    // const prependColumns = [columnHelper.display({
    //     id: 'delete',
    //     enableHiding: false,
    //     size: 10,
    //     cell: info => {
    //         const user = info.row.original
    //         // const isActive = !!delUsersObjDraft[user.id]
    //         const isActive = delUsersDraft.includes(user.id)
    //         return (
    //             <Checkbox
    //                 checked={isActive}
    //                 onClick={
    //                     (e) => {
    //                         e.stopPropagation()
    //                         if (isActive) {
    //                             setDelUsersDraft(prev => prev.filter(id => id !== user.id))
    //                         } else {
    //                             setDelUsersDraft(prev => ([...prev, user.id]))
    //                         }
    //                     }
    //                 }
    //             />
    //         )
    //     },
    //     meta: {
    //         headerClass: 'w-[3rem]'
    //     }

    // })]
    const handleDelete = async (uId: string) => {
        try {
            if (
                await myConfirm({ text: 'Are you sure you want to delete this user?', title: 'Confirm Deletion' })
            ) {
                await delUsers(
                    { users: [uId], id }
                ).unwrap()
                refetchUser()
                dialogAlert(true)
            }
        } catch (error) {
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
    const appendColumns = [columnHelper.display({
        id: 'delete',
        enableHiding: false,
        size: 10,
        cell: info => {
            const user = info.row.original
            // const isActive = !!delUsersObjDraft[user.id]
            // const isActive = delUsersDraft.includes(user.id)
            return (
                // <Checkbox
                //     checked={isActive}
                //     onClick={
                //         (e) => {
                //             e.stopPropagation()
                //             if (isActive) {
                //                 setDelUsersDraft(prev => prev.filter(id => id !== user.id))
                //             } else {
                //                 setDelUsersDraft(prev => ([...prev, user.id]))
                //             }
                //         }
                //     }
                // />
                <BtnDel onClick={() => handleDelete(user.id)} />
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
        <>
            <CardPageWrapper className="mt-4 h-fit" >
                <QueueInfo id={id} />
            </CardPageWrapper>
            <CardPageWrapper className="mt-4" >
                <>
                    <UsersTable
                        hidden={{ status: true }}
                        ref={usersTableRef}
                        defaultFilter={{ queueId: id }}
                        useUsers={useUsersBackend}
                        fetchUsers={fetchUsers}
                        // prependColumns={isActiveDelete ? prependColumns : []}
                        appendColumns={appendColumns}
                        MoreActions={
                            <div className="flex gap-3">
                                <AddUser
                                    afterSubmit={refetchUser}
                                />
                                {/* <BtnDelUsers
                                    clearDraft={() => { setDelUsersDraft([]) }} users={delUsersDraft} queueID={id} isActive={isActiveDelete} setIsActive={setIsActiveDelete}
                                    afterSubmit={refetchUser}
                                /> */}
                            </div>
                        }
                        dataList={dataList}
                        data={data}
                        isLoading={isLoading}
                        isError={isError}
                    />
                </>
            </CardPageWrapper>
        </>
    )
}
