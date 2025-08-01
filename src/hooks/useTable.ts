import { useEffect, useState } from 'react'
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable, ColumnDef } from '@tanstack/react-table'

type RolesType = 'Agent' | 'Supervisor' | 'Manager' | 'Admin'

interface Role {
    name: RolesType
}

interface RowData {
    label: string
    roles: RolesType[]
    action?: string
}

interface UsePermissionTableProps {
    data: RowData[]
    columns: ColumnDef<RowData, any>[]
}

export function useTable({
    data,
    columns,
}: UsePermissionTableProps) {
    const [sorting, setSorting] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [sort, setSort] = useState<string | null>(null)
    const [order, setOrder] = useState<'asc' | 'desc' | null>(null)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    useEffect(() => {
        if (setSort) {
            setSort(sorting?.[0]?.id ?? null)
        }

        if (setOrder) {
            setOrder(sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : null)
        }
    }, [sorting])
    const table = useReactTable({
        data: data || [],
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    })

    return { table, sort, order, page, limit, setPage, setLimit }
}
