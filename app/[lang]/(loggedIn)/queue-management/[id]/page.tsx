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
import { useCreateMutation } from "@/features/queueApiSlice";
import { useDebugLogForm } from "@/hooks/use-debug-log-form";
import { dialogAlert } from "@/components/common/dialog-alert";
import { useParams, useRouter } from 'next/navigation'
import { getErrorText } from "@/services/api";
import { CreateQueueSection, QueueInfoForm } from "../_components/create-queue";


export default function QueueManagementIDPage() {
    // const form = useForm<z.infer<typeof CreateQueue>>({
    //     resolver: zodResolver(CreateQueue),
    //     defaultValues: {
    //         queueName: '',
    //         queueDescription: '',
    //         queueUsers: [],
    //         queueUsersAdd: [],
    //         queueUsersDel: [],
    //         queueUsersAddObj: [],
    //         queueUsersDelObj: []
    //     }
    // })
    // const [isCreate, setIsCreate] = useState(true)
    // const seeData = form.watch()
    // const {
    //     fetchUsers,
    //     dataList,
    //     data,
    //     isLoading,
    //     isError,
    //     error,
    //     handleDeleteDataset,
    //     handleAddDataset,
    // } = useUsersFontend()

    // const [open, setOpen] = useState(false)
    // // const [currentDBUserDB, setCurrentDBUserDB] = useState<UserType[]>([])
    // const currentDBUserDBMemo = useMemo(() => {
    //     return []
    // }, [])
    const [queueUsersAddObj, setQueueUsersAddObj] = useState<UserType[]>([])
    const [queueUsersDelObj, setQueueUsersDelObj] = useState<UserType[]>([])

    // useEffect(() => {
    //     let queueUsers = []
    //     for (const element of queueUsersAddObj) {
    //         if (element.id) {
    //             queueUsers.push(element.id)
    //         }
    //     }
    //     form.setValue('queueUsers', queueUsers)
    // }, [queueUsersAddObj])

    // const handleDelUsers = (user: UserType) => {
    //     setQueueUsersAddObj((prev) => prev.filter(u => u.id !== user.id))
    //     setQueueUsersDelObj(prev => [...prev, user])
    //     handleDeleteDataset([user])
    // }
    const handleAddUsers = (users: UserType[]) => {
        // currentDBUserDBMemo
        setQueueUsersDelObj(
            (prev) => prev.filter(u => !users.find(uu => uu.id === u.id))
        )
        setQueueUsersAddObj(prev => [...prev, ...users])
        // handleAddDataset(users)
    }
    const columnHelper = createColumnHelper<UserType>()
    const appendColumns = [columnHelper.display({
        id: 'delete',
        enableHiding: false,
        size: 10,
        cell: info => {
            const user = info.row.original
            // const isActive = !!newUsersObjDraft[user.id]
            return (
                <BtnDel onClick={() => handleDelUsers(user)} />
            )
        },
        meta: {
            headerClass: 'w-[3rem]'
        }

    })]
    // useDebugLogForm({ form })
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
                    appendColumns={appendColumns}
                    MoreActions={
                        <>
                            <AddUser
                                afterSubmit={refetchUser}
                            />
                        </>
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
