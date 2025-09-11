'use client'

import {
  Column,
  flexRender,
  Table as ReactTable,
  Row,
} from '@tanstack/react-table'
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'react-feather'
import { Button } from '@/components/ui/button'
import { Typography } from '../common/typography'
import { cn } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import Sort from '@/public/icons/Sort.svg'
import { Modal } from './Modal'
import BtnApply from '../button/btn-apply'
import { Checkbox } from '../form/checkbox-field'

export interface DataTableProps<T> {
  table: ReactTable<T>
  page: number
  limit: number
  total: number
  totalPages: number
  loading?: boolean
  emptyText?: React.ReactNode
  onRowClick?: (row: Row<T>) => void
  setPage?: React.Dispatch<React.SetStateAction<number>>
  setLimit?: React.Dispatch<React.SetStateAction<number>>
  renderEmpty?: boolean,
  defaultVisibleColumn?: Record<string, boolean>
}

interface HeaderProps {
  label: string
  column: Column<any, unknown>
  className?: string
  sortAble?: boolean
}

export const Header = ({ label, column, className, sortAble = false }: HeaderProps) => {
  const isSorted =
    typeof column.getIsSorted === 'function' ? column.getIsSorted() : false

  if (!sortAble) {
    return <span className={cn('flex items-center', className)}>{label}</span>
  }

  return (
    <span
      className={cn('flex items-center cursor-pointer', className)}
      onClick={() => column.toggleSorting(isSorted === 'asc')}
    >
      {label}
      {isSorted === 'asc' ? (
        <Sort fill="#00092e" className="size-4 -rotate-180 ml-1" />
      ) : (
        <Sort fill="#00092e" className="size-4 ml-1" />
      )}
    </span>
  )
}

// function EmptyRows<T>({ table }: { table: ReactTable<T> }) {
//   // getVisibleCells
//   const emptyRows = useMemo(
//     () => Array.from({ length: Math.max(0, 10 - table.getRowModel().rows.length) }),
//     [table.getRowModel().rows.length]
//   )

//   return (
//     <>
//       {emptyRows.map((_, rowIndex) => (
//         <tr key={`empty-${rowIndex}`}>
//           {table.getAllLeafColumns().map((col, colIndex) => (
//             <td
//               key={`empty-${rowIndex}-${colIndex}`}
//               className="p-2 text-sm text-[#6E7079] text-transparent"
//             >
//               -
//             </td>
//           ))}
//         </tr>
//       ))}
//     </>
//   )
// }
function EmptyRows<T>({ table }: { table: ReactTable<T> }) {
  const emptyRows = useMemo(
    () => Array.from({ length: Math.max(0, 10 - table.getRowModel().rows.length) }),
    [table.getRowModel().rows.length]
  )

  return (
    <>
      {emptyRows.map((_, rowIndex) => (
        <tr key={`empty-${rowIndex}`}>
          {table.getVisibleLeafColumns().map((col, colIndex) => (
            <td
              key={`empty-${rowIndex}-${colIndex}`}
              className="p-2 text-sm text-[#6E7079] text-transparent"
            >
              -
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}


export function DataTable<T>({
  table,
  page = 1,
  totalPages = 0,
  setPage,
  renderEmpty = true,
  onRowClick,
  statusConfigColumn = false,
  setStatusConfigColumn = (isOpen: boolean) => { },
  defaultVisibleColumn
}: DataTableProps<T>) {
  const [visibleColumnDraft, setVisibleColumnDraft] = useState<Record<string, boolean>>()

  const confirmVisibleColumn = () => {
    if (!visibleColumnDraft) return
    table.setColumnVisibility(visibleColumnDraft)
    setStatusConfigColumn(false)
  }
  useEffect(() => {
    if (defaultVisibleColumn) {
      table.setColumnVisibility(defaultVisibleColumn)
    }
  }, [])
  useEffect(() => {
    setVisibleColumnDraft(
      Object.fromEntries(
        table.getAllColumns().map((column) => [column.id, column.getIsVisible()])
      )
    )
  }, [statusConfigColumn]);

  return (
    <div>
      <div className="block max-w-full overflow-x-auto">
        <table className="w-full border-b border-[#e1e2e9]"
        // style={{ tableLayout: 'fixed' }}
        >
          <thead className="border-b border-t border-[#e1e2e9]">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={cn(
                      'px-2 py-3 text-sm font-normal',
                      // @ts-expect-error //TODO: fix type error
                      header.column.columnDef?.meta?.headerClass || '',
                    )}
                    style={{
                      width: header.column.columnDef?.meta?.width,
                      minWidth: header.column.columnDef?.meta?.minWidth,
                      maxWidth: header.column.columnDef?.meta?.maxWidth,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody >
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}
                className={cn(
                  { 'hover:bg-gray-200/15 hover:cursor-pointer': !!onRowClick }
                )}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    onClick={() => onRowClick?.(row.original)}
                    key={cell.id}
                    className={cn(
                      'p-2 text-sm text-[#6E7079]',
                      // @ts-expect-error //TODO: fix type error
                      cell?.column?.columnDef?.meta?.cellClass || '',
                    )}
                    style={{
                      width: cell.column.columnDef?.meta?.width,
                      minWidth: cell.column.columnDef?.meta?.minWidth,
                      maxWidth: cell.column.columnDef?.meta?.maxWidth,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {renderEmpty && <EmptyRows table={table} />}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end mt-1">
        <div className="flex items-center space-x-2">
          <Typography variant="caption">
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage?.((p: number) => p - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage?.((p: number) => p + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

        </div>
        <Modal title='Show Column' isOpen={statusConfigColumn} onClose={() => setStatusConfigColumn(false)} className='w-[20rem]' >
          <div>
            <Typography variant='caption'>Select Show Column</Typography>
            <div className='space-y-1 mt-4 px-3' >
              {/* {JSON.stringify(visibleColumnDraft)} */}
              {table.getAllColumns().map((column) => (
                <div>
                  <Checkbox
                    checked={
                      visibleColumnDraft?.[column.id] || false
                    }
                    onChange={
                      (isCheck) => {
                        setVisibleColumnDraft((prev) => ({
                          ...prev,
                          [column.id]: isCheck
                        }))
                      }
                    }
                    label={column.columnDef?.meta?.label ?? column.id}
                  />
                </div>
              ))}

            </div>
            <BtnApply onClick={confirmVisibleColumn} className='w-full mt-3' />
          </div>
        </Modal>
      </div >
    </div >
  )
}
