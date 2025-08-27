'use client'

import { Button } from "@/components/common/Button";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import { UsersTable } from "@/components/user/user-table";
import { createColumnHelper } from "@tanstack/react-table";
import { UserType } from "@/types/user.type";
import BtnDel from "@/components/button/btn-del";
import { AddUser } from "./components/add-users";


const columnHelper = createColumnHelper<UserType>()
const prependColumns = [columnHelper.display({
    id: 'select',
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

const QueueInfoForm = () => {
    return <>
        <div className="flex justify-between">
            <Typography >Queue Name: </Typography>
            {/* <BtnSave onClick={() => { }} /> */}
            <Button >Save</Button>
        </div>
        <Typography >Description: </Typography>
    </>
}

export default function QueueManagementIDPage(
    // {
    // params
    // }
    // : Readonly<{
    // params: Promise<{ lang: 'en' | 'th' }>
    // }>
) {


    return (
        <>
            <CardPageWrapper className="mt-4" >
                <>
                    <QueueInfoForm />
                    <UsersTable
                        MoreActions={
                            <>
                                <AddUser />
                            </>
                        }
                        appendColumns={appendColumns}
                        prependColumns={prependColumns}
                    />
                </>
            </CardPageWrapper>
        </>
    )
}
