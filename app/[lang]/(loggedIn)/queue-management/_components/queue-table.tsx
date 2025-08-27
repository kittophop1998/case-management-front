'use client'

import BtnEdit from "@/components/button/btn-edit";
import { DataTable, Header } from "@/components/common/table";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

const dataTable = {
    data: [
        {
            queueName: 'queueName 1',
            description: 'description 1',
            updateDate: '2023-01-01 20:20:20',
            updatedBy: 'user1',
        },
        {
            queueName: 'queueName 2',
            description: 'description 2',
            updateDate: '2023-01-02 20:20:20',
            updatedBy: 'user2',
        },
        {
            queueName: 'queueName 3',
            description: 'description 3',
            updateDate: '2023-01-03 20:20:20',
            updatedBy: 'user3',
        },
        {
            queueName: 'queueName 4',
            description: 'description 4',
            updateDate: '2023-01-04 20:20:20',
            updatedBy: 'user4',
        },
        {
            queueName: 'queueName 5',
            description: 'description 5',
            updateDate: '2023-01-05 20:20:20',
            updatedBy: 'user5',
        }
    ],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
}

const useQueueTable = () => {
    const columnHelper = createColumnHelper<any>()
    const columns = useMemo(() => [
        columnHelper.accessor('queueName', {
            id: 'queueName',
            header: ({ column }) => <Header column={column} label='Queue Name' sortAble />,
            cell: info => info.getValue(),
            meta: { headerClass: 'w-[20rem]' },
        }),
        columnHelper.accessor('description', {
            id: 'description',
            header: ({ column }) => <Header column={column} label='Description' sortAble />,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('updateDate', {
            id: 'updateDate',
            header: ({ column }) => <Header column={column} label='Update Date' sortAble />,
            cell: info => info.getValue(),
            meta: { headerClass: 'w-[13rem]' },
        }),
        columnHelper.accessor('updatedBy', {
            id: 'updatedBy',
            header: ({ column }) => <Header column={column} label='Updated By' sortAble />,
            cell: info => info.getValue(),
            meta: { headerClass: 'w-[13rem]' },
        }),
        columnHelper.accessor('action', {
            id: 'action',
            header: ({ column }) => <Header column={column} label='' />,
            cell: info => <BtnEdit onClick={() => { }} />,
            meta: { headerClass: 'w-[3rem]' },
        }),

    ], [])
    const memoizedData = useMemo(() => dataTable?.data || [], [dataTable]);
    const { table, sort, page, limit, setPage, setLimit } = useTable({
        data: memoizedData,
        columns: columns,
        mapSortingName: {
            noteType_name: "noteType",
        },
    });
    return { table, sort, page, limit, setPage, setLimit, dataTable }
};

export default function QueueTable({
}) {
    const { table, dataTable, setPage, setLimit } = useQueueTable()

    return <>
        <DataTable
            loading={false}
            table={table}
            page={dataTable?.page ?? 1}
            limit={dataTable?.limit ?? 10}
            total={dataTable?.total ?? 0}
            totalPages={dataTable?.totalPages ?? 0}
            setPage={setPage}
            setLimit={setLimit}
        />
    </>
}