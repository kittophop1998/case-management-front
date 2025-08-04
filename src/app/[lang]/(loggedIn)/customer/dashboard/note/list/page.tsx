'use client';
import BtnExport from "@/components/common/btn-export";
import BtnFilter from "@/components/common/btn-filter";
import BtnNew from "@/components/common/btn-new";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { CheckIsActive } from "@/components/common/check-is-active";
import { DataTable, Header } from "@/components/common/table";
import { Typography } from "@/components/common/typography";
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
            <div className="flex justify-end my-3">
                <BtnNew onClick={() => console.log('New clicked')} />
            </div>
            <CardPageWrapper>
                <div className="flex justify-between mb-3">
                    <Typography variant="h4" className="mb-4">
                        Note List
                    </Typography>
                    <div className="flex items-center gap-2">
                        <div>INPUT-FILTER</div>
                        <BtnFilter onClick={() => console.log('Filter clicked')} />
                        <div>INPUT-date-create</div>
                        <BtnExport onClick={() => console.log('Export clicked')} />
                    </div>
                </div>
                <DataTable
                    loading={false}
                    table={table}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                />
            </CardPageWrapper>
        </div>
    )
}

export default NoteListPage;