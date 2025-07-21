"use client"

import * as React from "react"
import {
    Column,
    flexRender,
} from "@tanstack/react-table"
import { ArrowDownWideNarrow, ArrowUpWideNarrow, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Typography } from "../common/typography"
import { ChevronRight } from "react-feather"
export const SortableHeader = ({ column, label }: { column: Column<any, unknown>; label: string }) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {label}
            {
                column.getIsSorted() === "asc" ? (
                    <ArrowUpWideNarrow className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "desc" ? (
                    <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
                ) : null
            }
        </Button>
    );
}

export const MainTable = ({
    table
}) => {
    return (
        <>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="text-[#6E7079]">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={table.getAllColumns().length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2">
                <Typography variant="caption">
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} page(s)
                </Typography>
                <Button
                    variant='ghost'
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant='ghost'

                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight />
                </Button>
            </div>
        </>
    )
}

export const SearchInput = ({
    globalFilter, setGlobalFilter
}) => {
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
            type="text"
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm border p-2 rounded"
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
