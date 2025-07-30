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
import { UsersTable, UserType } from '@/types/user.type'
import { ChipIsActive } from '@/components/common/chipIsActive'
import { useEffect, useMemo, useState } from 'react'

interface TableUserManagementProps {
  isLoading: boolean
  usersTable: UsersTable
  openDialogEditUser: (user: UserType) => void
  setSort?: (sort: string | null) => void
  setOrder?: (order: 'asc' | 'desc' | null) => void
  // sort?: string | null
  // order?: 'asc' | 'desc' | null
}

export function TableUserManagement({
  isLoading = false,
  usersTable,
  openDialogEditUser,
  setSort,
  setOrder
}: TableUserManagementProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    if (setSort) {
      setSort(sorting?.[0]?.id ?? null)
    }

    if (setOrder) {
      setOrder(sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : null)
    }
  }, [sorting])

  // Create columns for the table
  const columnHelper = createColumnHelper<UserType>()
  const columns = useMemo<ColumnDef<UserType, any>[]>(() => [
    columnHelper.accessor('agentId', {
      header: ({ column }) => <SortableHeader column={column} label='Id' />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('username', {
      header: ({ column }) => <SortableHeader column={column} label='Name' />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('email', {
      header: ({ column }) => <SortableHeader column={column} label='Domain Name' />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('role.name', {
      header: ({ column }) => <SortableHeader column={column} label='Role' />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('team.name', {
      header: ({ column }) => <SortableHeader column={column} label='Team' />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('center.name', {
      header: ({ column }) => <SortableHeader column={column} label='Center' />,
      cell: info => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('isActive', {
      header: ({ column }) => <SortableHeader column={column} label='Status' />,
      cell: info => (
        <div>
          <ChipIsActive isActive={info.getValue()} />
        </div>
      )
    }),
    columnHelper.display({
      id: 'actions',
      enableHiding: false,
      size: 10,
      cell: info => {
        const user = info.row.original
        return (
          <div className='w-[1rem]'>
            <Button variant='ghost' onClick={() => openDialogEditUser(user)}>
              <SquarePen />
            </Button>
          </div>
        )
      }
    }),
  ], [openDialogEditUser])

  const table = useReactTable({
    data: usersTable.data,
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
      rowSelection
    }
  })
  return (
    <>
      {/* sorting:{JSON.stringify(usersTable.data)} */}
      <DataTable
        loading={isLoading}
        table={table}
        page={usersTable.page}
        limit={usersTable.limit}
        total={usersTable.total}
        totalPages={usersTable.totalPages}
      />
    </>
  )
}
