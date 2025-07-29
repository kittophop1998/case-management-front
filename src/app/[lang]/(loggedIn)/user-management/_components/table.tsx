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

import { JsonJoinDetails, UsersTable, UserType } from '@/types/user.type'
import { ChipIsActive } from '@/components/common/chipIsActive'

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
      // cell: ({ row }) => <div className='lowercase'>{row.getValue('role.name')}</div>
      cell: ({ row }) => {
        const role = row.getValue('role') as JsonJoinDetails
        return <div className='lowercase'>{role?.name}</div>;
      }
    },
    {
      accessorKey: 'team',
      header: ({ column }) => <SortableHeader column={column} label='Team' />,
      cell: ({ row }) => <div className='lowercase'>{row.getValue('team')}</div>
    },
    {
      accessorKey: 'center',
      header: ({ column }) => <SortableHeader column={column} label='Center' />,
      // cell: ({ row }) => (
      //   <div className='lowercase'>{"row.getValue('center')"}</div>
      // )
      cell: ({ row }) => {
        const center = row.getValue('center') as JsonJoinDetails
        return <div className='lowercase'>{center?.name}</div>;
      }
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => <SortableHeader column={column} label='isActive' />,
      cell: ({ row }) => (
        <div className='capitalize'>{
          <ChipIsActive isActive={row.getValue('isActive')} />
        }</div>
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
  // return <div>111111</div>
  return (
    <>
      {/* sorting:{JSON.stringify(usersTable.data)} */}
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
