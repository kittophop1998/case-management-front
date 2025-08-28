'use client'
import { Button } from "@/components/common/Button";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import { UsersTable, useUsersBackend, useUsersFontend } from "@/components/user/user-table";
import { createColumnHelper } from "@tanstack/react-table";
import { UserType } from "@/types/user.type";
import BtnDel from "@/components/button/btn-del";
import { AddUser } from "./components/add-users";
import { CreateQueue } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form } from "@/components/ui/form";
import { use, useEffect, useMemo, useState } from "react";
import { TextField } from "@/components/form/text-field";
import { TextAreaField } from "@/components/form/textarea-field";
import BtnSave from "@/components/button/btn-save";
import { useCreateMutation } from "@/features/queueApiSlice";
import { useDebugLogForm } from "@/hooks/use-debug-log-form";
import { dialogAlert } from "@/components/common/dialog-alert";
import { useRouter } from 'next/navigation'
import { getErrorText } from "@/services/api";

const QueueInfoForm = ({ form, isCreate }: { form: any, isCreate: boolean }) => {
    const router = useRouter()
    const [create, { error: errorCreate, isLoading: isLoadingCreate }] = useCreateMutation()
    const onSubmit = async (values: z.infer<typeof CreateQueue>) => {
        try {
            await create(form.getValues()).unwrap()
            dialogAlert(true)
            router.push('/queue-management')
        } catch (error: unknown) {
            // console.log(`error`, getErrorText(error))
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
            // if (error instanceof Error) {
            //     dialogAlert(false,
            //         {
            //             title: '',
            //             message: getErrorText(error),
            //             confirmText: 'Try again',
            //             cancelText: 'Try again',
            //             onConfirm: () => { },
            //             onCancel: () => { }
            //         }
            //     )
            // }
        }
    }
    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <div className="flex justify-between">
                    <div className="w-[clamp(300px,100%,35rem)]">
                        <div className="flex items-start gap-2">
                            <Typography variant="body2" className="mt-1 w-[6rem]">Queue Name: </Typography>
                            <div className="flex-1">
                                <TextField
                                    loading={form.formState.isSubmitting}
                                    form={form}
                                    name='queueName'
                                    placeholder='Enter Queue Name'
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Typography variant="body2" className="mt-1 w-[6rem]">Description: </Typography>
                            <div className="flex-1">
                                <TextAreaField
                                    loading={form.formState.isSubmitting}
                                    form={form}
                                    name='queueDescription'
                                    placeholder='Enter Queue Description'
                                />
                            </div>
                        </div>
                    </div>
                    <BtnSave loading={form.formState.isSubmitting} />
                    {/* <Button >Save</Button> */}
                </div>
            </form>
        </Form>

    </>
}

export default function QueueManagementIDPage() {
    const form = useForm<z.infer<typeof CreateQueue>>({
        resolver: zodResolver(CreateQueue),
        defaultValues: {
            queueName: '',
            queueDescription: '',
            queueUsers: [],
            queueUsersAdd: [],
            queueUsersDel: [],
            queueUsersAddObj: [],
            queueUsersDelObj: []
        }
    })
    const [isCreate, setIsCreate] = useState(true)
    const seeData = form.watch()
    const {
        fetchUsers,
        dataList,
        data,
        isLoading,
        isError,
        error,
        setNewDataset,
        handleDeleteDataset,
        handleAddDataset,
        // setDeletedUsers,
        // deletedUsers,
    } = useUsersFontend()
    // const testAddUsers = (users: UserType[]) => {
    //     addUsers(users)
    // }
    const [open, setOpen] = useState(false)
    // const [currentDBUserDB, setCurrentDBUserDB] = useState<UserType[]>([])
    const currentDBUserDBMemo = useMemo(() => {
        return []
    }, [])
    const [queueUsersAddObj, setQueueUsersAddObj] = useState<UserType[]>([])
    const [queueUsersDelObj, setQueueUsersDelObj] = useState<UserType[]>([])

    useEffect(() => {
        let queueUsers = []
        for (const element of queueUsersAddObj) {
            queueUsers.push(element.id)
        }
        form.setValue('queueUsers', queueUsers)
    }, [queueUsersAddObj])

    const handleDelUsers = (user: UserType) => {
        setQueueUsersAddObj((prev) => prev.filter(u => u.id !== user.id))
        setQueueUsersDelObj(prev => [...prev, user])
        handleDeleteDataset([user])
    }
    const handleAddUsers = (users: UserType[]) => {
        // currentDBUserDBMemo
        setQueueUsersDelObj(
            (prev) => prev.filter(u => !users.find(uu => uu.id === u.id))
        )
        setQueueUsersAddObj(prev => [...prev, ...users])
        handleAddDataset(users)
        // setNewDataset(users)
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


    // 
    //
    //
    //
    //
    //

    useDebugLogForm({ form })
    return (
        <CardPageWrapper className="mt-4" >
            <>
                <QueueInfoForm form={form} isCreate={isCreate} />
                <UsersTable
                    useUsers={useUsersBackend}
                    fetchUsers={fetchUsers}
                    appendColumns={appendColumns}
                    MoreActions={
                        <>
                            <AddUser
                                usersAdd={queueUsersAddObj}
                                userDelete={queueUsersDelObj}
                                handleAddUsers={handleAddUsers}

                            />
                        </>
                    }
                    dataList={dataList}
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                />
                {/* {JSON.stringify(seeData)} */}
                <div>queueUsersAddObj:{JSON.stringify(queueUsersAddObj)}</div>
                <div>queueUsersDelObj:{JSON.stringify(queueUsersDelObj)}</div>
            </>
        </CardPageWrapper>
    )
}
