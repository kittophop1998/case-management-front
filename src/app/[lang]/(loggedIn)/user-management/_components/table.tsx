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
  usersTable: UsersTable
  openDialogEditUser: (user: UserType) => void
}
export function TableUserManagement ({
  usersTable,
  openDialogEditUser
}: TableUserManagementProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
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
    <MainTable
      table={table}
      page={usersTable.page}
      limit={usersTable.limit}
      total={usersTable.total}
      totalPages={usersTable.totalPages}
    />
  )
}
