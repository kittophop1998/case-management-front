'use client'

import { DataTable, SortableHeader } from '@/components/common/table'
import {
    ColumnDef,
    ColumnHelper,
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from '@tanstack/react-table'
import { SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { objTable, UserType } from '@/types/user.type'
import { ChipIsActive } from '@/components/common/chipIsActive'
import { useEffect, useMemo, useState } from 'react'
import { AccessControlTableType, RolesType } from '@/types/access-control.type'
import BtnEdit from '@/components/common/btn-edit'
import { CheckIsActive } from '@/components/common/check-is-active'
import { useTable } from '@/hooks/useTable'

interface TableUserManagementProps {
    isLoading: boolean
    objTable: AccessControlTableType
    openDialogEditUser: (obj: any) => void
    setSort?: (sort: string | null) => void
    setOrder?: (order: 'asc' | 'desc' | null) => void
    roles: {
        id: string
        name: string
    }[],
    onClickEdit: (obj: any) => void
    // sort?: string | null
    // order?: 'asc' | 'desc' | null
}

export function TableAccessControl({
    isLoading = false,
    roles,
    objTable,
    openDialogEditUser,
    setSort,
    setOrder,
    onClickEdit,
    setPage, setLimit, page, limit, total, totalPages
}: TableUserManagementProps) {

    // const [sorting, setSorting] = useState<SortingState>([])
    // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    // const [rowSelection, setRowSelection] = useState({})

    // useEffect(() => {
    //     if (setSort) {
    //         setSort(sorting?.[0]?.id ?? null)
    //     }

    //     if (setOrder) {
    //         setOrder(sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : null)
    //     }
    // }, [sorting])


    // Create columns for the table


    // const table = useReactTable({
    //     data: objTable?.data || [],
    //     columns,
    //     onSortingChange: setSorting,
    //     getCoreRowModel: getCoreRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     getSortedRowModel: getSortedRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     onColumnVisibilityChange: setColumnVisibility,
    //     onRowSelectionChange: setRowSelection,
    //     state: {
    //         sorting,
    //         columnVisibility,
    //         rowSelection
    //     }
    // })



    return (
        <>
            <DataTable
                loading={isLoading}
                table={table}
                page={objTable.page}
                limit={objTable.limit}
                total={objTable.total}
                totalPages={objTable.totalPages}
                setPage={setPage}
                setLimit={setLimit}
            />
        </>
    )
}
