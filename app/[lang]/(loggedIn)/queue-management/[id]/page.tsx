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
import { useState } from "react";
import { TextField } from "@/components/form/text-field";
import { TextAreaField } from "@/components/form/textarea-field";
import BtnSave from "@/components/button/btn-save";
const columnHelper = createColumnHelper<UserType>()
const appendColumns = [columnHelper.display({
    id: 'delete',
    enableHiding: false,
    size: 10,
    cell: info => {
        const user = info.row.original
        return (
            <BtnDel onClick={() => { }} />
        )
    },
    meta: {
        headerClass: 'w-[3rem]'
    }

})]
const QueueInfoForm = ({ form, isCreate }: { form: any, isCreate: boolean }) => {
    const onSubmit = (values: z.infer<typeof CreateQueue>) => {
        console.log('Form submitted with values:', values);
    }
    // form.formState.isSubmitting
    // form.formState.isDirty
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
                    <BtnSave onClick={() => { }} />
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
        addUsers
    } = useUsersFontend()
    const testAddUsers = (users: UserType[]) => {
        addUsers(users)
    }

    return (
        <CardPageWrapper className="mt-4" >
            <>
                {/* <Button onClick={() => testAddUsers([{
                    id: '',
                    username: 'asdasdasdasddasd',
                    email: '',
                    name: '22222222',
                    role: {
                        id: '',
                        name: ''
                    },
                    section: {
                        id: '',
                        name: ''
                    },
                    department: {
                        id: '',
                        name: ''
                    },
                    center: {
                        id: '',
                        name: ''
                    },
                    isActive: true
                }, {
                    id: '',
                    username: '11111111',
                    email: '',
                    name: 'asdasdasd',
                    role: {
                        id: '',
                        name: ''
                    },
                    section: {
                        id: '',
                        name: ''
                    },
                    department: {
                        id: '',
                        name: ''
                    },
                    center: {
                        id: '',
                        name: ''
                    },
                    isActive: true
                }])}>asdasdas</Button>
                {JSON.stringify(seeData)} */}
                <QueueInfoForm form={form} isCreate={isCreate} />
                {/* <UsersTable
                    useUsers={useUsersFontend}
                    MoreActions={
                        <>
                            <AddUser />
                        </>
                    }
                    appendColumns={appendColumns}
                /> */}
                <UsersTable
                    useUsers={useUsersBackend}
                    fetchUsers={fetchUsers}
                    dataList={dataList}
                    data={data}
                    isLoading={isLoading}
                    isError={isError}
                />
            </>
        </CardPageWrapper>
    )
}
