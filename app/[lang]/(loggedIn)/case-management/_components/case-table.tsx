'use client'

import { useEffect, useMemo } from "react";
import { DataTable, Header } from "@/components/common/table";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useLazyCaseByPermissionQuery } from "@/features/caseApiSlice";
import { format } from "date-fns";
import { CaseDataType } from "@/types/case.type";
import { caseStatusConfig, priorityStatusConfig } from "@/const/case";
import { Badge } from "@/components/ui/badge";

type CaseProps = {
  tab: string;
}

const useCaseTable = () => {
  const [getData, { data: tableObj, isFetching: isFetchingTable }] = useLazyCaseByPermissionQuery();
  const dataListMemo = useMemo(() => tableObj?.data || [], [tableObj]);

  const columnHelper = createColumnHelper<CaseDataType & { action: any }>()
  const router = useRouter();
  const columns = useMemo(() => [
    columnHelper.accessor('caseId', {
      id: 'caseId',
      header: ({ column }) => <Header column={column} label='Case ID' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem'
      }
    }),
    columnHelper.accessor('customerId', {
      id: 'customerId',
      header: ({ column }) => <Header column={column} label='Customer ID' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem'
      }
    }),
    columnHelper.accessor('aeonId', {
      id: 'aeonId',
      header: ({ column }) => <Header column={column} label='Aeon ID' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem'
      }
    }),
    columnHelper.accessor('customerName', {
      id: 'customerName',
      header: ({ column }) => <Header column={column} label='Customer Name' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '10rem'
      }
    }),
    columnHelper.accessor('caseGroup', {
      id: 'caseGroup',
      header: ({ column }) => <Header column={column} label='Case Group' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem'
      }
    }),
    columnHelper.accessor('caseType', {
      id: 'caseType',
      header: ({ column }) => <Header column={column} label='Case Type' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem'
      }
    }),
    columnHelper.accessor('createdBy', {
      id: 'createdBy',
      header: ({ column }) => <Header column={column} label='Create By' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '10rem'
      }
    }),
    columnHelper.accessor('createdDate', {
      id: 'createdDate',
      header: ({ column }) => <Header column={column} label='Created Date' sortAble />,
      cell: info => format(info.getValue(), "dd MMM yyyy"),
      meta: {
        width: 'fit-content',
        minWidth: '9rem'
      }

    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: ({ column }) => <Header column={column} label='Status' sortAble />,
      cell: info => {
        const statusValue = info.getValue()
        return (
          <Badge className={caseStatusConfig?.[statusValue]?.className || ''}>
            {caseStatusConfig?.[statusValue]?.text || '-'}
          </Badge>)
      }

      // info.getValue(),
    }),
    columnHelper.accessor('currentQueue', {
      id: 'currentQueue',
      header: ({ column }) => <Header column={column} label='Current Queue' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '9rem'
      }
    }),
    columnHelper.accessor('currentUser', {
      id: 'currentUser',
      header: ({ column }) => <Header column={column} label='Current User' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '9rem'
      }
    }),
    columnHelper.accessor('casePriority', {
      id: 'casePriority',
      header: ({ column }) => <Header column={column} label='Case Priority' sortAble />,
      // cell: info => info.getValue(),
      cell: info => {
        const statusValue = info.getValue()
        return (
          <Badge className={priorityStatusConfig?.[statusValue]?.className || ''}>
            {priorityStatusConfig?.[statusValue]?.text || statusValue}
          </Badge>)
      },
      meta: {
        width: 'fit-content',
        minWidth: '9rem'
      }
    }),
    columnHelper.accessor('slaDate', {
      id: 'slaDate',
      header: ({ column }) => <Header column={column} label='SLA Date' sortAble />,
      cell: info =>
        <Badge className="bg-[#EEF3F5] text-black">
          {format(info.getValue(), "dd MMM yyyy")}
        </Badge>
      ,
      meta: {
        width: 'fit-content',
        minWidth: '6rem',
      }
    }),
    columnHelper.accessor('closedDate', {
      id: 'closedDate',
      header: ({ column }) => <Header column={column} label='Closed Date' sortAble />,
      // cell: info => info.getValue(),
      cell: info => format(info.getValue(), "dd MMM yyyy"),
      meta: {
        width: 'fit-content',
        minWidth: '8rem',
      }

    }),
    columnHelper.accessor('receivedFrom', {
      id: 'receivedFrom',
      header: ({ column }) => <Header column={column} label='Receive From' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem',
      }
    }),
  ], [])

  const { table, sort, page, limit, setPage, setLimit } = useTable({
    data: dataListMemo,
    columns,
  })
  const triggerFetch = () => {
    getData({
      page,
      limit,
      sort,
      // order,
    });
  }
  useEffect(() => {
    triggerFetch()
  }, [
    page,
    limit,
    sort,
  ])
  return { table, sort, page, limit, setPage, setLimit, dataTable: dataListMemo }
}

const CaseTable = ({ tab }: CaseProps) => {
  const { table, setPage, setLimit, dataTable } = useCaseTable();

  const filteredData = useMemo(() => {
    if (tab === "allCase") return dataTable;
    return dataTable.filter(item => item.status.toLowerCase() === tab);
  }, [tab]);

  return (
    <div>
      <DataTable
        onRowClick={(data) => console.log(data)}
        loading={false}
        table={table}
        page={1}
        limit={10}
        total={filteredData.length}
        totalPages={Math.ceil(filteredData.length / 10)}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};

export default CaseTable;
