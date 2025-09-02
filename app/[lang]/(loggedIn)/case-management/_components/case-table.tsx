'use client'

import { useMemo } from "react";
import { DataTable, Header } from "@/components/common/table";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";

type CaseProps = {
  tab: string;
}

type CaseType = {
  customerId: string;
  customerName: string;
  status: string;
  caseType: string;
  currentQueue: string;
  currentAssignee: string;
  slaDate: string;
  closedDate: string;
  receiveFrom: string;
}

// ##### Mock Data #####
const mockCaseTableData = [
  {
    customerId: 'CASE001',
    customerName: 'John Doe',
    status: 'Pending',
    caseType: 'ChargeBack CM001',
    currentQueue: 'Queue 1',
    currentAssignee: 'Agent A',
    slaDate: '12 Aug 2024 12:00',
    closedDate: '25 Aug 2024 15:30',
    receiveFrom: 'Fraud',
  },
  {
    customerId: 'CASE002',
    customerName: 'Jane Smith',
    status: 'Closed',
    caseType: 'ChargeBack CM002',
    currentQueue: 'Queue 2',
    currentAssignee: 'Agent B',
    slaDate: '15 Aug 2024 14:00',
    closedDate: '20 Aug 2024 10:30',
    receiveFrom: 'Fraud',
  },
];

const useCaseTable = () => {
  const columnHelper = createColumnHelper<CaseType & { action: any }>()
  const columns = useMemo(() => [
    columnHelper.accessor('customerId', {
      id: 'customerId',
      header: ({ column }) => <Header column={column} label='Case ID' sortAble />,
      cell: info => info.getValue(),
      meta: { headerClass: 'min-w-[10rem]' },

    }),
    columnHelper.accessor('customerName', {
      id: 'customerName',
      header: ({ column }) => <Header column={column} label='Customer Name' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: ({ column }) => <Header column={column} label='Status' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('caseType', {
      id: 'caseType',
      header: ({ column }) => <Header column={column} label='Case Type' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('currentQueue', {
      id: 'currentQueue',
      header: ({ column }) => <Header column={column} label='Current Queue' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('currentAssignee', {
      id: 'currentAssignee',
      header: ({ column }) => <Header column={column} label='Current Assignee' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('slaDate', {
      id: 'slaDate',
      header: ({ column }) => <Header column={column} label='SLA Date' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('closedDate', {
      id: 'closedDate',
      header: ({ column }) => <Header column={column} label='Closed Date' sortAble />,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('receiveFrom', {
      id: 'receiveFrom',
      header: ({ column }) => <Header column={column} label='Receive From' sortAble />,
      cell: info => info.getValue(),
    }),
  ], [])

  const { table, sort, page, limit, setPage, setLimit } = useTable({
    data: mockCaseTableData,
    columns,
  })

  return { table, sort, page, limit, setPage, setLimit, dataTable: mockCaseTableData }
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
