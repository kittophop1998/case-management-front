'use client'

import BtnEdit from "@/components/button/btn-edit";
import { DataTable, Header } from "@/components/common/table";
import { useLazyGetTableQuery } from "@/features/queueApiSlice";
import { useTable } from "@/hooks/use-table";
import { QueueType } from "@/types/queue.type";
import { createColumnHelper } from "@tanstack/react-table";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
// 

const useQueueTable = (ref) => {
    const [getTable, { data: dataTable, isFetching, isError, error }] = useLazyGetTableQuery();
    const memoizedData = useMemo(() => dataTable?.data || [], [dataTable]);
    const columnHelper = createColumnHelper<QueueType & { action: any }>()
    const router = useRouter();
    const columns = useMemo(() => [
        columnHelper.accessor('queueName', {
            id: 'queueName',
            header: ({ column }) => <Header column={column} label='Queue Name' sortAble />,
            cell: info => info.getValue(),
            meta: {
                width: 'fit-content',
                minWidth: '10rem',
                cellClass: 'text-ellipsis overflow-hidden',
            },
        }),
        columnHelper.accessor('queueDescription', {
            id: 'queueDescription',
            header: ({ column }) => <Header column={column} label='Description' sortAble />,
            cell: info => info.getValue(),
            meta: {
                width: 'fit-content',
                minWidth: '10rem',
                cellClass: 'text-ellipsis overflow-hidden',
            },
        }),
        columnHelper.accessor('createdAt', {
            id: 'createdAt',
            header: ({ column }) => <Header column={column} label='Update Date' sortAble />,
            cell: info => format(info.getValue(), "dd MMM yyyy HH:mm:ss"),
            meta: {
                width: '11rem',
                maxWidth: '11rem',
                minWidth: '11rem',
            },

        }),
        columnHelper.accessor('createdBy', {
            id: 'createdBy',
            header: ({ column }) => <Header column={column} label='Updated By' sortAble />,
            cell: info => info.getValue(),
            meta: {
                width: '15rem',
                maxWidth: '15rem',
                minWidth: '15rem',
            },
        }),
        columnHelper.accessor('action', {
            id: 'action',
            header: ({ column }) => <Header column={column} label='' />,
            cell: info =>
                <div className="flex justify-end">
                    <BtnEdit
                        // queueId
                        onClick={() => {
                            router.push(`/queue-management/${info.row.original.queueId}`)
                        }} />
                </div>,
            meta: {
                width: '100%',
            },
        }),

    ], [])
    const { table, sort, page, limit, setPage, setLimit } = useTable({
        data: memoizedData,
        columns,
    })

    const fetchTable = () => {
        getTable({
            page,
            limit,
            sort,
        })
    }
    useImperativeHandle(ref, () => ({
        fetchTable: () => {
            fetchTable()
        }
    }), [
        page,
        limit,
        sort,
    ])
    useEffect(() => {
        fetchTable()
    }, [page, limit, sort])
    return { table, sort, page, limit, setPage, setLimit, dataTable }
};

export interface QueueTableRef { fetchTable: () => void }
const QueueTable = forwardRef<QueueTableRef, {}>(
    ({ }, ref) => {
        const { table, dataTable, setPage, setLimit } = useQueueTable(ref)

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
    })

export default QueueTable;