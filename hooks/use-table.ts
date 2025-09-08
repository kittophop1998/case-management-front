import { useEffect, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

interface UsePermissionTableProps {
  data: any[];
  columns: any[];
  mapSortingName?: Record<string, string>;
}

function useTableBase() {
  return;
}
export function useTable({
  data,
  columns,
  mapSortingName,
}: UsePermissionTableProps) {
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [sort, setSort] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  useEffect(() => {
    try {
      const queryName =
        mapSortingName?.[sorting?.[0]?.id] || sorting?.[0]?.id || null;
      if (queryName) {
        const queryDesc = sorting?.[0]?.desc ? "desc" : "asc";
        setSort(`${queryName} ${queryDesc}`);
      } else {
        setSort(null);
      }
    } catch (error) {
      console.error("Error updating sorting state:", error);
    }
  }, [sorting]);
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
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
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });
  return {
    table,
    sort,
    page,
    limit,
    setPage,
    setLimit,
    setColumnVisibility,
    columnVisibility,
  };
}
export function useTableFrontendBase({
  data,
  columns,
  mapSortingName,
}: UsePermissionTableProps) {
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [sort, setSort] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  useEffect(() => {
    try {
      const queryName =
        mapSortingName?.[sorting?.[0]?.id] || sorting?.[0]?.id || null;
      if (queryName) {
        const queryDesc = sorting?.[0]?.desc ? "desc" : "asc";
        setSort(`${queryName} ${queryDesc}`);
      } else {
        setSort(null);
      }
    } catch (error) {
      console.error("Error updating sorting state:", error);
    }
  }, [sorting]);
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
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
      rowSelection,
    },
  });

  return { table, sort, page, limit, setPage, setLimit };
}
