'use client'

import {
  Column,
  flexRender,
  Table as ReactTable,
  Row
} from '@tanstack/react-table'
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ChevronLeft,
  Divide
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Typography } from '../common/typography'
import { ChevronRight } from 'react-feather'
import clsx from 'clsx'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { useEffect, useMemo } from 'react'
import Sort from '@/public/icons/Sort.svg'

export interface DataTableProps<T> {
  table: ReactTable<T>;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  loading?: boolean;
  emptyText?: React.ReactNode;
  onRowClick?: (row: Row<T>) => void;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
  renderEmpty?: boolean;
}


interface HeaderProps {
  label: string;
  column: Column<any, unknown>;
  className?: string;
  sortAble?: boolean;
}

export const Header = ({
  label,
  column,
  className,
  sortAble = false,

}: HeaderProps) => {
  const isSorted = typeof column.getIsSorted === 'function' ? column.getIsSorted() : false;

  return (
    <span className={cn('flex items-center', className)}>
      <span className={cn('flex items-center', className)}>
        {label}
        {sortAble ? (
          <span onClick={() => column.toggleSorting(isSorted === 'asc')}>
            {isSorted === 'asc' ? (
              // <ArrowUpWideNarrow
              //   // @ts-expect-error className is valid for lucide icon
              //   className='ml-2 h-4 w-4 cursor-pointer' />
              <Sort fill={'#00092e'} className='size-4 cursor-pointer -rotate-180' />
            ) : (
              <Sort fill={'#00092e'} className='size-4 cursor-pointer' />
            )}
          </span>
        ) : null}
      </span>
    </span>
  );
}

export function DataTable<T>({
  table,
  page = 1,
  totalPages = 0,
  // loading = false,
  // emptyText = 'No results.',
  // onRowClick,
  setPage,
  renderEmpty = true
  // setLimit
}: DataTableProps<T>) {
  // const rows = table.getRowModel().rows
  return (
    <div>
      {/* {loading ?
        <div className="w-full h-[2px] bg-gray-200 overflow-hidden opacity-70">
          <div className="h-full bg-blue-500 animate-progress"></div>
        </div>
        : <div className='h-[2px]'></div>
      } */}
      <div className='block max-w-full overflow-x-scroll overflow-y-hidden'>
        <table className='w-full border-b border-[#e1e2e9]'>
          <thead className='border-b border-t border-[#e1e2e9]'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}
                    className={cn('px-2 py-3 text-sm font-normal',
                      //  @ts-expect-error //TODO: fix type error
                      header.column.columnDef?.meta?.headerClass || '')}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className=''>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={cn('p-2 text-sm text-[#6E7079]',
                    //  @ts-expect-error //TODO: fix type error
                    cell.column.columnDef?.meta?.cellClass || '')}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {renderEmpty &&
              <>
                {Array.from({ length: Math.max(0, 10 - table.getRowModel().rows.length) }).map((_, rowIndex) => (
                  <tr key={`empty-${rowIndex}`}>
                    {table.getAllLeafColumns().map((col, colIndex) => (
                      <td key={`empty-${rowIndex}-${colIndex}`} className="p-2 text-sm text-[#6E7079] text-transparent">
                        -
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            }
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-end mt-1'>
        <div className='flex items-center space-x-2'>
          <Typography variant='caption'>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setPage && setPage((p: number) => p - 1)}
            disabled={page === 1}
          >
            <ChevronLeft
              // @ts-expect-error className is valid for lucide icon
              className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setPage && setPage((p) => p + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight
              // @ts-expect-error className is valid for lucide icon
              className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div >
  )

}

// interface SearchInputProps {
//   globalFilter: string;
//   setGlobalFilter: (filter: string) => void;
// }

// export const SearchInput = ({ globalFilter, setGlobalFilter }: SearchInputProps) => {
//   return (
//     <input
//       type='text'
//       placeholder='Search'
//       value={globalFilter}
//       onChange={e => setGlobalFilter(e.target.value)}
//       className='max-w-sm border p-2 rounded'
//     />
//   )
// }
