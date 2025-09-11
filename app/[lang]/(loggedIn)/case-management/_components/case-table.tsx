'use client'

import { useEffect, useMemo } from "react";
import { DataTable, Header } from "@/components/common/table";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useLazyCaseByPermissionQuery } from "@/features/caseApiSlice";
import { CaseDataType } from "@/types/case.type";
import { caseStatusConfig, priorityStatusConfig } from "@/const/case";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/common/Button";
import { format, isAfter, isBefore, subDays } from "date-fns";
import { lang } from "@/services/api";

type CaseProps = {
  tab: string;
}
const now = new Date();
const textColor = (value) => {
  // if (isAfter(now, value)) {
  //   return "bg-[#feebee] text-red-500"; // future
  // }
  console.log(
    "subDays(value, 5) :", subDays(value, 5),
    ", now:", now, '= isAfter(subDays(value, 5), now) :', isAfter(subDays(value, 5), now),
  )

  if (!value) {
    return 'bg-gray-200/10 text-gray-200'; // no date
  }
  if (isAfter(now, subDays(value, 5))) {
    return "bg-red-500/10 text-red-500"; // within last 1 day
  }

  if (isAfter(now, subDays(value, 10))) {
    return "bg-yellow-500/10 text-yellow-500"; // within last 1 day
  }
  return "bg-blue-500/10 text-blue-500"; // within last 1 day
};

const BadgeDateColor = ({ date }) => {
  const value = new Date(date);
  const className = textColor(value)
  return <Badge className={className}>
    {format(date, "dd MMM yyyy")}
  </Badge>
}
const useCaseTable = ({ searchObj }) => {
  const [getData, { data: tableObj, isFetching: isFetchingTable }] = useLazyCaseByPermissionQuery();
  const dataListMemo = useMemo(() => tableObj?.data || [], [tableObj]);

  const columnHelper = createColumnHelper<CaseDataType & { action: any }>()
  const columns = useMemo(() => [
    columnHelper.accessor('code', {
      id: 'code',
      header: ({ column }) => <Header column={column} label='Case ID' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem',
        label: 'Case ID'
      }
    }),
    columnHelper.accessor('customerId', {
      id: 'customerId',
      header: ({ column }) => <Header column={column} label='Customer ID' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem',
        label: 'Customer ID'
      }
    }),
    columnHelper.accessor('aeonId', {
      id: 'aeonId',
      header: ({ column }) => <Header column={column} label='Aeon ID' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem',
        label: 'Aeon ID'
      }
    }),
    columnHelper.accessor('customerName', {
      id: 'customerName',
      header: ({ column }) => <Header column={column} label='Customer Name' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '10rem',
        label: 'Customer Name'
      }
    }),
    columnHelper.accessor('caseGroup', {
      id: 'caseGroup',
      header: ({ column }) => <Header column={column} label='Case Group' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem',
        label: 'Case Group'
      }
    }),
    columnHelper.accessor('caseType', {
      id: 'caseType',
      header: ({ column }) => <Header column={column} label='Case Type' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem',
        label: 'Case Type'
      }
    }),
    columnHelper.accessor('createdBy', {
      id: 'createdBy',
      header: ({ column }) => <Header column={column} label='Create By' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '10rem',
        label: 'Create By'
      }
    }),
    columnHelper.accessor('createdDate', {
      id: 'createdDate',
      header: ({ column }) => <Header column={column} label='Created Date' sortAble />,
      cell: info => format(info.getValue(), "dd MMM yyyy"),
      meta: {
        width: 'fit-content',
        minWidth: '9rem',
        label: 'Created Date'
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
      },
      meta: {
        label: 'Status'
      }

      // info.getValue(),
    }),
    columnHelper.accessor('currentQueue', {
      id: 'currentQueue',
      header: ({ column }) => <Header column={column} label='Current Queue' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '9rem',
        label: 'Current Queue'
      }
    }),
    columnHelper.accessor('currentUser', {
      id: 'currentUser',
      header: ({ column }) => <Header column={column} label='Current User' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '9rem',
        label: 'Current User'
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
        minWidth: '9rem',
        label: 'Case Priority'
      }
    }),
    columnHelper.accessor('slaDate', {
      id: 'slaDate',
      header: ({ column }) => <Header column={column} label='SLA Date' sortAble />,
      cell: info => <BadgeDateColor date={info.getValue()} />,
      meta: {
        width: 'fit-content',
        minWidth: '6rem',
        label: 'SLA Date'
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
        label: 'Closed Date'
      }

    }),
    columnHelper.accessor('receivedFrom', {
      id: 'receivedFrom',
      header: ({ column }) => <Header column={column} label='Receive From' sortAble />,
      cell: info => info.getValue(),
      meta: {
        width: 'fit-content',
        minWidth: '8rem',
        label: 'Receive From'
      }
    }),
  ], [])

  const {
    table, sort, page, limit, setPage, setLimit
    ,
    setColumnVisibility,
    columnVisibility,
  } = useTable({
    data: dataListMemo,
    columns,
    mapSortingName: {
      'code': 'code',
      'customerId': 'customer_id',
      'aeonId': 'aeon_id',
      'customerName': 'customer_name',
      //   createdDate: 'created_date',
      //   customerId: 'customer_id',
      //   caseType: 'case_type',
      //   currentQueue: 'current_queue',
      //   currentUser: 'current_user',
      //   slaDate: 'sla_date',
      //   closedDate: 'closed_date',
      //   receivedFrom: 'received_from',
      //   casePriority: 'case_priority',
    }
  })
  const triggerFetch = () => {
    getData({
      page,
      limit,
      sort,
      ...searchObj,
      // order,
    });
  }
  useEffect(() => {
    triggerFetch()
  }, [
    page,
    limit,
    sort,
    searchObj
    ,
    setColumnVisibility,
    columnVisibility,
  ])
  return { table, sort, page, limit, setPage, setLimit, dataTable: dataListMemo }
}
const defaultVisibleColumn = {
  customerId: true,
  customerName: true,
  caseType: true,
  createdDate: true,
  currentQueue: true,
  currentUser: true,
  slaDate: true,
  // 
  code: false,
  caseGroup: false,
  aeonId: false,
  createdBy: false,
  status: true,
  casePriority: false,
  closedDate: false,
  receivedFrom: false,
}
const CaseTable = ({ searchObj, statusConfigColumn = false, setStatusConfigColumn }: { searchObj: Record<string, any> }) => {
  const router = useRouter();
  const { table, setPage, setLimit, dataTable
  } = useCaseTable({ searchObj });
  const gotoChild = (data: any) => {
    router.push(`${lang}/case-management/${data?.caseId || '-'}`);
  }

  if (!searchObj) {
    return <></>
  }
  return (
    <div>
      {/* <Button onClick={() => {
        setColumnVisibility({
          customerId: false,
          aeonId: true
        })
      }}>Test</Button>
      {JSON.stringify(columnVisibility)} */}
      <DataTable
        defaultVisibleColumn={defaultVisibleColumn}
        statusConfigColumn={statusConfigColumn}
        setStatusConfigColumn={setStatusConfigColumn}
        onRowClick={gotoChild}
        loading={false}
        table={table}
        page={1}
        limit={10}
        total={dataTable.length}
        totalPages={Math.ceil(dataTable.length / 10)}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};

export default CaseTable;
