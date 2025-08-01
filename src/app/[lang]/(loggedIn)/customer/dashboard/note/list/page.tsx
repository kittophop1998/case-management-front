'use client';
import { CheckIsActive } from "@/components/common/check-is-active";
import { DataTable, Header } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";


const NoteListPage = () => {
    const [data, setData] = useState<any[]>([]); // Replace with actual data fetching logic
    const columnHelper = createColumnHelper<any>()
    const columns = [
        columnHelper.accessor('type', {
            id: 'type',
            header: ({ column }) => <Header column={column} label='Type' sortAble />,
            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('note', {
            id: 'note',
            header: ({ column }) => <Header column={column} label='Note' sortAble />,
            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('createdBy', {
            id: 'createdBy',
            header: ({ column }) => <Header column={column} label='Created by' sortAble />,

            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('createdDate', {
            id: 'createdDate',
            header: ({ column }) => <Header column={column} label='Created Date' sortAble />,
            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('action', {
            id: 'action',
            header: ({ column }) => <></>,
            cell: info => <div>pen</div>
        }),
    ]
    const { table, sort, page, limit, setPage, setLimit } = useTable({
        data,
        columns: columns
    });
    return (
        <div>
            <DataTable
                loading={false}
                table={table}
                page={page}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
            />
        </div>
    )
}

export default NoteListPage;