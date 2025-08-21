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
  ChevronLeft
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
              <ArrowUpWideNarrow
                // @ts-expect-error className is valid for lucide icon
                className='ml-2 h-4 w-4 cursor-pointer' />
            ) : (
              <ArrowDownWideNarrow
                // @ts-expect-error className is valid for lucide icon
                className='ml-2 h-4 w-4 cursor-pointer' />
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
  limit,
  total,
  totalPages = 0,
  loading = false,
  emptyText = 'No results.',
  onRowClick,
  setPage,
  setLimit
}: DataTableProps<T>) {
  const rows = table.getRowModel().rows
  return (
    <>
      <table className='w-full border-b border-[#e1e2e9]'>
        <thead className='border-b border-t border-[#e1e2e9]'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='p-2 text-sm font-normal'>
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
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={cn('p-2 text-sm text-[#6E7079]', cell.column.columnDef.meta?.cellClass || '')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className='flex items-center justify-end mt-1'>
        {/* <Typography variant='caption'>
          Showing {(page - 1) * limit + 1} -{' '}
          {Math.min(page * limit, total)} of {total} records
        </Typography> */}
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
    </>
  )
  return (
    <>
      <Table className='bg-red-300 overflow-hidden'>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className='text-[#6E7079]'>
          {loading ? (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length}>
                <div className='text-center py-8 text-muted-foreground'>Loading...</div>
              </TableCell>
            </TableRow>
          ) : rows?.length ? (

            rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={clsx(
                  'cursor-pointer hover:bg-accent',
                  onRowClick && 'hover:underline',
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className={clsx(
                    // 'border-2 border-red-600',
                    cell.column.columnDef.meta?.cellClass
                  )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )
            : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className='h-24 text-center text-muted-foreground'
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
      <Separator />

      <div className='flex items-center justify-end mt-4'>
        {/* <Typography variant='caption'>
          Showing {(page - 1) * limit + 1} -{' '}
          {Math.min(page * limit, total)} of {total} records
        </Typography> */}
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
    </>
  )
}

interface SearchInputProps {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
}

export const SearchInput = ({ globalFilter, setGlobalFilter }: SearchInputProps) => {
  return (
    <input
      type='text'
      placeholder='Search'
      value={globalFilter}
      onChange={e => setGlobalFilter(e.target.value)}
      className='max-w-sm border p-2 rounded'
    />
  )
}
