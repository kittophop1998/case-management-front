import { use, useEffect } from 'react';
import { useTable } from "./use-table";

export function useTableRTK({
    columns,
    useLazyGetTableQuery,
}) {
    const [getTable, { data, isLoading }] = useLazyGetTableQuery();
    const { table, sort, order, page, limit, setPage, setLimit } = useTable({
        data: data,
        columns: columns,
    })
    return {
        table,
        isLoading,
        // 
        getTable,
        // 
        sort,
        order,
        page,
        limit,
        data,
    }
}

// useEffect(() => {
//     getTable({
//         sort, order, page, limit
//     });
// }, []);



//   useEffect(() => {
//     getTable({
//       page,
//       limit,
//       sort,
//       order,
//     })
//   }, [page, limit, sort, order])

//    <DataTable
//           loading={false}
//           table={table}
//           page={permissionTableData?.page ?? 1}
//           limit={permissionTableData?.limit ?? 10}
//           total={permissionTableData?.total ?? 0}
//           totalPages={permissionTableData?.totalPages ?? 0}
//           setPage={setPage}
//           setLimit={setLimit}
//         />