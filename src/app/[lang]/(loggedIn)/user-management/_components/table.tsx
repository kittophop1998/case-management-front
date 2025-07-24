'use client'
import { MainTable, SortableHeader } from '@/components/common/table'
import * as React from 'react'
import {
  ColumnDef,
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

interface TableUserManagementProps {
  isLoading: boolean
  usersTable: UsersTable
  openDialogEditUser: (user: UserType) => void
  setSort?: (sort: string | null) => void
  setOrder?: (order: 'asc' | 'desc' | null) => void
  // sort?: string | null
  // order?: 'asc' | 'desc' | null
}
export function TableUserManagement ({
  isLoading = false,
  usersTable,
  openDialogEditUser,
  setSort,
  setOrder
}: // sort,
// order
TableUserManagementProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  React.useEffect(() => {
    // console.log('sorting', sorting)
    if (setSort) {
      // console.log('setSort(:)', sorting?.[0]?.id ?? null)
      setSort(sorting?.[0]?.id ?? null)
    }
    if (setOrder) {
      // console.log(
      //   'setOrder(:)',
      //   sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : null
      // )
      setOrder(sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : null)
    }
  }, [sorting])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <SortableHeader column={column} label='Id' />,
      cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} label='Name' />,
      cell: ({ row }) => <div className='lowercase'>{row.getValue('name')}</div>
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <SortableHeader column={column} label='Role' />,
      cell: ({ row }) => <div className='lowercase'>{row.getValue('role')}</div>
    },
    {
      accessorKey: 'team',
      header: ({ column }) => <SortableHeader column={column} label='Team' />,
      cell: ({ row }) => <div className='lowercase'>{row.getValue('team')}</div>
    },
    {
      accessorKey: 'center',
      header: ({ column }) => <SortableHeader column={column} label='Center' />,
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('center')}</div>
      )
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <SortableHeader column={column} label='Status' />,
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('status')}</div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      size: 10,
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className='w-[1rem]'>
            <Button variant='ghost' onClick={() => openDialogEditUser(user)}>
              <SquarePen />
            </Button>
          </div>
        )
      }
    }
  ]
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
      {/* sorting:{JSON.stringify(sorting)} */}
      <MainTable
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
