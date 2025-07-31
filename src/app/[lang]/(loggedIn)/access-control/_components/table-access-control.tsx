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

    const rolesType: RolesType[] = [
        'Agent',
        'Supervisor',
        'Manager',
        'Admin',
    ]
    // Create columns for the table
    const columnHelper = createColumnHelper<any>()
    const columns = useMemo<ColumnDef<any, any>[]>(() => [
        columnHelper.accessor('label', {
            header: ({ column }) => <SortableHeader column={column} label='Permission' />,
            cell: info => <div>{info.getValue()}</div>
        }),
        ...(roles.map(role =>
            columnHelper.accessor(`roles.${role.name}`, {
                header: ({ column }) => <SortableHeader column={column} label={role.name} />,
                cell: info => {
                    // const value = info.getValue()
                    const isActive = info.row.original.roles.includes(role.name)
                    return (
                        <div>
                            <CheckIsActive isActive={isActive} />
                            {/* {value ? (
                                <span className='text-green-500'>Enabled</span>
                            ) : (
                                <span className='text-red-500'>Disabled</span>
                            )} */}
                        </div>
                    )
                }
            })
        )),
        columnHelper.accessor('action', {
            header: ({ column }) => <SortableHeader column={column} label='Permission Key' className='w-[3rem]' />,
            cell: info =>
                <div className='w-[3rem]'>
                    <BtnEdit onClick={() => onClickEdit(info.row.original)} />
                </div>
        }),


        // columnHelper.accessor('agentId', {
        //     header: ({ column }) => <SortableHeader column={column} label='Id' />,
        //     cell: info => <div>{info.getValue()}</div>
        // }),
        // columnHelper.accessor('username', {
        //     header: ({ column }) => <SortableHeader column={column} label='Name' />,
        //     cell: info => <div>{info.getValue()}</div>
        // }),
        // columnHelper.accessor('email', {
        //     header: ({ column }) => <SortableHeader column={column} label='Domain Name' />,
        //     cell: info => <div>{info.getValue()}</div>
        // }),
        // columnHelper.accessor('role.name', {
        //     header: ({ column }) => <SortableHeader column={column} label='Role' />,
        //     cell: info => <div>{info.getValue()}</div>
        // }),
        // columnHelper.accessor('team.name', {
        //     header: ({ column }) => <SortableHeader column={column} label='Team' />,
        //     cell: info => <div>{info.getValue()}</div>
        // }),
        // columnHelper.accessor('center.name', {
        //     header: ({ column }) => <SortableHeader column={column} label='Center' />,
        //     cell: info => <div>{info.getValue()}</div>,
        // }),
        // columnHelper.accessor('isActive', {
        //     header: ({ column }) => <SortableHeader column={column} label='Status' />,
        //     cell: info => (
        //         <div>
        //             <ChipIsActive isActive={info.getValue()} />
        //         </div>
        //     )
        // }),
        // columnHelper.display({
        //     id: 'actions',
        //     enableHiding: false,
        //     size: 10,
        //     cell: info => {
        //         const user = info.row.original
        //         return (
        //             <div className='w-[1rem]'>
        //                 <Button variant='ghost' onClick={() => openDialogEditUser(user)}>
        //                     <SquarePen />
        //                 </Button>
        //             </div>
        //         )
        //     }
        // }),
    ], [openDialogEditUser])

    const table = useReactTable({
        data: objTable?.data || [],
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
