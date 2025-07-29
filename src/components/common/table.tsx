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

export interface DataTableProps<T> {
  table: ReactTable<T>;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  loading?: boolean;
  emptyText?: React.ReactNode;
  onRowClick?: (row: Row<T>) => void;
}

export const SortableHeader = ({
  column,
  label
}: {
  column: Column<any, unknown>
  label: string
}) => {
  return (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {label}
      {column.getIsSorted() === 'asc' ? (
        <ArrowUpWideNarrow className='ml-2 h-4 w-4' />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowDownWideNarrow className='ml-2 h-4 w-4' />
      ) : null}
    </Button>
  )
}

export function DataTable<T>({
  table,
  page,
  limit,
  total,
  totalPages,
  loading = false,
  emptyText = 'No results.',
  onRowClick
}: DataTableProps<T>) {
  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
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
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
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
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
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

      {/* Pagination controls */}
      <div className='flex items-center justify-between mt-4'>
        <Typography variant='caption'>
          Showing {(page - 1) * limit + 1} -{' '}
          {Math.min(page * limit, total)} of {total} records
        </Typography>
        <div className='flex items-center space-x-2'>
          <Typography variant='caption'>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className='h-4 w-4' />
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
  // const [globalFilter, setGlobalFilter] = useState("");
  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     globalFilter,
  //   },
  //   onGlobalFilterChange: setGlobalFilter,
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   globalFilterFn: "includesString", // หรือ custom ได้
  // });
  return (
    <input
      type='text'
      placeholder='Search...'
      value={globalFilter}
      onChange={e => setGlobalFilter(e.target.value)}
      className='max-w-sm border p-2 rounded'
    />
  )
}
// <Input
//     placeholder="Filter emails..."
//     value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
//     onChange={(event) =>
//         table.getColumn("email")?.setFilterValue(event.target.value)
//     }
//     className="max-w-sm"
// />
