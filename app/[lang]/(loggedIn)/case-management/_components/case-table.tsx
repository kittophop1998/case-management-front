'use client'

import { useEffect, useMemo } from "react";
import { DataTable, Header } from "@/components/common/table";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";
import BtnEdit from "@/components/button/btn-edit";
import { useRouter } from "next/navigation";
import { useCreateCaseInquiryMutation, useLazyCaseByPermissionQuery } from "@/features/caseApiSlice";
import { format } from "date-fns";

type CaseProps = {
  tab: string;
}

type CaseType = {
  caseId: string;
  customerId: string;
  aeonId: string;
  customerName: string;
  caseGroup: string;
  caseType: string;
  createdBy: string;
  createdDate: string;
  status: string;
  currentQueue: string;
  currentUser: string;
  casePriority:string;
  slaDate: string;
  closedDate: string;
  receivedFrom: string
}

// ##### Mock Data #####
// const mockCaseTableData = [
//   {
//     customerId: 'CASE001',
//     customerName: 'John Doe',
//     status: 'Pending',
//     caseType: 'ChargeBack CM001',
//     currentQueue: 'Queue 1',
//     currentAssignee: 'Agent A',
//     slaDate: '12 Aug 2024 12:00',
//     closedDate: '25 Aug 2024 15:30',
//     receiveFrom: 'Fraud',
//   },
//   {
//     customerId: 'CASE002',
//     customerName: 'Jane Smith',
//     status: 'Closed',
//     caseType: 'ChargeBack CM002',
//     currentQueue: 'Queue 2',
//     currentAssignee: 'Agent B',
//     slaDate: '15 Aug 2024 14:00',
//     closedDate: '20 Aug 2024 10:30',
//     receiveFrom: 'Fraud',
//   },
// ];

const useCaseTable = () => {
  const [getData, { data: tableObj, isFetching: isFetchingTable }] = useLazyCaseByPermissionQuery();
  const dataListMemo = useMemo(() => tableObj?.data || [], [tableObj]);

  const columnHelper = createColumnHelper<CaseType & { action: any }>()
  const router = useRouter();
  const columns = useMemo(() => [
    columnHelper.accessor('action', {
      id: 'action',
      header: ({ column }) => <Header column={column} label='' />,
      cell: info => <BtnEdit
        onClick={() => {
          router.push(`/case-management/000`)
        }} />,
      meta: { headerClass: 'w-[3rem]' },
    }),
    columnHelper.accessor('caseId', {
      id: 'caseId',
      header: ({ column }) => <Header column={column} label='Case ID' sortAble />,
      cell: info => info.getValue(),
      // meta: { headerClass: 'min-w-[10rem]' },
    }),
    columnHelper.accessor('customerId', {
      id: 'customerId',
      header: ({ column }) => <Header column={column} label='Customer ID' sortAble />,
      cell: info => info.getValue(),
      // meta: { headerClass: 'min-w-[10rem]' },
    }),
    columnHelper.accessor('aeonId', {
      id: 'aeonId',
      header: ({ column }) => <Header column={column} label='Aeon ID' sortAble />,
      cell: info => info.getValue(),
      // meta: { headerClass: 'min-w-[10rem]' },
    }),
    columnHelper.accessor('customerName', {
      id: 'customerName',
      header: ({ column }) => <Header column={column} label='Customer Name' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('caseGroup', {
      id: 'caseGroup',
      header: ({ column }) => <Header column={column} label='Case Group' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('caseType', {
      id: 'caseType',
      header: ({ column }) => <Header column={column} label='Case Type' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('createdBy', {
      id: 'createdBy',
      header: ({ column }) => <Header column={column} label='Create By' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('createdDate', {
      id: 'createdDate',
      header: ({ column }) => <Header column={column} label='Created Date' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: ({ column }) => <Header column={column} label='Status' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('currentQueue', {
      id: 'currentQueue',
      header: ({ column }) => <Header column={column} label='Current Queue' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('currentUser', {
      id: 'currentUser',
      header: ({ column }) => <Header column={column} label='Current User' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('casePriority', {
      id: 'casePriority',
      header: ({ column }) => <Header column={column} label='Case Priority' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('slaDate', {
      id: 'slaDate',
      header: ({ column }) => <Header column={column} label='SLA Date' sortAble />,
      // cell: info => info.getValue(),
      cell: info => format(info.getValue(), "dd MMM yyyy HH:mm:ss"),
    }),
    columnHelper.accessor('closedDate', {
      id: 'closedDate',
      header: ({ column }) => <Header column={column} label='Closed Date' sortAble />,
      // cell: info => info.getValue(),
      cell: info => format(info.getValue(), "dd MMM yyyy HH:mm:ss"),

    }),
    columnHelper.accessor('receivedFrom', {
      id: 'receivedFrom',
      header: ({ column }) => <Header column={column} label='Receive From' sortAble />,
      cell: info => info.getValue(),
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
