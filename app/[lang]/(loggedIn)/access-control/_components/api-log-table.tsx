
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

// ใช้ mockData ในกรณีที่ API ยังไม่ได้ทำงาน
const useApiLogTable = ({ searchObj }) => {
  const [getData, { data: tableObj, isFetching: isFetchingTable, error }] = useLazyCaseByPermissionQuery();

  const mockData = [
    {
      id: '936b6ba7-f367-43e7-a78f-e53512e912d9',
      requestId: 'AQ123456789123456789',
      serviceName: 'Get Customer Info',
      endpoint: 'https://connectorapi.aeonth.com/Api/Common/GetCustomerInfo',
      reqDatetime: '12 Aug 2025 12:02:23',
      reqHeader: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer someAuthToken',
      },
      reqMessage: {
        AEONID: 'RGPSJ4350GH',
        Mode: 'S',
      },
      respDatetime: '12 Aug 2025 12:02:24',
      respHeader: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer someAuthToken',
      },
      respMessage: {
        AEONID: 'RGPSJ4350GH',
        CustomerNameENG: 'Somkid Phathai',
        CustomerNameTH: 'สมคิด พาไทย',
        Gender: '1',
        MobileNo: '00856000541',
        Email: '',
        Nationality: '1',
        Birthdate: '19291121',
        MemberStatus: '',
      },
      statusCode: 200,
      timeUsage: 30,
    },
    {
      id: '936b6ba7-f367-43e7-a78f-e53512e912d9',
      requestId: 'BQ123456789123456789',
      serviceName: 'Get Customer Info',
      endpoint: 'https://connectorapi.aeonth.com/Api/Common/GetCustomerInfo',
      reqDatetime: '12 Aug 2025 12:02:23',
      reqHeader: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer someAuthToken',
      },
      reqMessage: {
        AEONID: 'RGPSJ4350GH',
        Mode: 'S',
      },
      respDatetime: '12 Aug 2025 12:02:24',
      respHeader: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer someAuthToken',
      },
      respMessage: {
        AEONID: 'RGPSJ4350GH',
        CustomerNameENG: 'Somkid Phathai',
        CustomerNameTH: 'สมคิด พาไทย',
        Gender: '1',
        MobileNo: '00856000541',
        Email: '',
        Nationality: '1',
        Birthdate: '19291121',
        MemberStatus: '',
      },
      statusCode: 200,
      timeUsage: 30,
    },
    {
      id: '936b6ba7-f367-43e7-a78f-e53512e912d9',
      requestId: 'CQ123456789123456789',
      serviceName: 'Get Customer Info',
      endpoint: 'https://connectorapi.aeonth.com/Api/Common/GetCustomerInfo',
      reqDatetime: '12 Aug 2025 12:02:23',
      reqHeader: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer someAuthToken',
      },
      reqMessage: {
        AEONID: 'RGPSJ4350GH',
        Mode: 'S',
      },
      respDatetime: '12 Aug 2025 12:02:24',
      respHeader: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer someAuthToken',
      },
      respMessage: {
        AEONID: 'RGPSJ4350GH',
        CustomerNameENG: 'Somkid Phathai',
        CustomerNameTH: 'สมคิด พาไทย',
        Gender: '1',
        MobileNo: '00856000541',
        Email: '',
        Nationality: '1',
        Birthdate: '19291121',
        MemberStatus: '',
      },
      statusCode: 200,
      timeUsage: 30,
    },
  ];

  // ใช้ข้อมูลจาก API หรือ mockData
  const dataListMemo = useMemo(() => {
    if (tableObj?.data) {
      return tableObj.data; // ถ้ามีข้อมูลจาก API ให้ใช้ข้อมูลนั้น
    }
    return mockData; // ถ้าไม่มีข้อมูลจาก API ใช้ mockData
  }, [tableObj]);

  const columnHelper = createColumnHelper<any>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('requestId', {
        header: ({ column }) => <Header column={column} label='Request ID' sortAble />,
        cell: (info) => info.getValue(),
        meta: {
          width: 'fit-content',
          minWidth: '8rem',
          label: 'Request ID',
        },
      }),
      columnHelper.accessor('serviceName', {
        header: ({ column }) => <Header column={column} label='Service Name' sortAble />,
        cell: (info) => info.getValue(),
        meta: {
          width: 'fit-content',
          minWidth: '9rem',
          label: 'Service Name',
        },
      }),
      columnHelper.accessor('endpoint', {
        header: ({ column }) => <Header column={column} label='Endpoint' sortAble className="truncate max-w-[180px]" />,
        cell: (info) => <div className="truncate max-w-[180px]">{info.getValue()}</div>,
        meta: {
          width: 'fit-content',
          minWidth: '6rem',
          label: 'Endpoint',
        },
      }),
      columnHelper.accessor('reqDatetime', {
        header: ({ column }) => <Header column={column} label='Req. Datetime' sortAble />,
        cell: (info) => info.getValue(),
        meta: {
          width: 'fit-content',
          minWidth: '9rem',
          label: 'Req. Datetime',
        },
      }),
      columnHelper.accessor('reqHeader', {
        header: ({ column }) => <Header column={column} label='Req. Header' sortAble className="truncate max-w-[180px]" />,
        cell: (info) => (
          <div className="truncate max-w-[180px]">{JSON.stringify(info.getValue())}</div>
        ),
        meta: {
          width: 'fit-content',
          minWidth: '6rem',
          label: 'Req. Header',
        },
      }),
      columnHelper.accessor('reqMessage', {
        header: ({ column }) => <Header column={column} label='Req. Message' sortAble className="truncate max-w-[180px]" />,
        cell: (info) => (
          <div className="truncate max-w-[180px]">{JSON.stringify(info.getValue())}</div>
        ),
        meta: {
          width: 'fit-content',
          minWidth: '6rem',
          label: 'Req. Message',
        },
      }),
      columnHelper.accessor('respDatetime', {
        header: ({ column }) => <Header column={column} label='Resp. Datetime' sortAble />,
        cell: (info) => info.getValue(),
        meta: {
          width: 'fit-content',
          minWidth: '9rem',
          label: 'Resp. Datetime',
        },
      }),
      columnHelper.accessor('respHeader', {
        header: ({ column }) => <Header column={column} label='Resp. Header' sortAble className="truncate max-w-[180px]" />,
        cell: (info) => (
          <div className="truncate max-w-[180px]">{JSON.stringify(info.getValue())}</div>
        ),
        meta: {
          width: 'fit-content',
          minWidth: '6rem',
          label: 'Resp. Header',
        },
      }),
      columnHelper.accessor('respMessage', {
        header: ({ column }) => <Header column={column} label='Resp. Message' sortAble className="truncate max-w-[180px]" />,
        cell: (info) => (
          <div className="truncate max-w-[180px]">{JSON.stringify(info.getValue())}</div>
        ),
        meta: {
          width: 'fit-content',
          minWidth: '6rem',
          label: 'Resp. Message',
        },
      }),
      columnHelper.accessor('statusCode', {
        header: ({ column }) => <Header column={column} label='Status Code' sortAble />,
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
        meta: {
          width: 'fit-content',
          minWidth: '8rem',
          label: 'Status Code',
        },
      }),
      columnHelper.accessor('timeUsage', {
        header: ({ column }) => <Header column={column} label='Time Usage (ms)' sortAble />,
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
        meta: {
          width: 'fit-content',
          minWidth: '9rem',
          label: 'Time Usage (ms)',
        },
      })
    ],
    []
  );
  const {
    table, sort, page, limit, setPage, setLimit,
    setColumnVisibility, columnVisibility,
  } = useTable({
    data: dataListMemo, // ใช้ข้อมูลจาก API หรือ mockData
    columns,
    mapSortingName: {
      'code': 'code',
      'customerId': 'customer_id',
      'aeonId': 'aeon_id',
      'customerName': 'customer_name'
    }
  });

  // เรียกข้อมูลจาก API ถ้า getData พร้อม
  // const triggerFetch = () => {
  //   if (getData) { 
  //     getData({
  //       page,
  //       limit,
  //       sort,
  //       ...searchObj,
  //     });
  //   }
  // }

  // useEffect(() => {
  //   triggerFetch();
  // }, [page, limit, sort, searchObj]);

  return { table, sort, page, limit, setPage, setLimit, dataTable: dataListMemo };
};

const defaultVisibleColumn = {
  requestId: true,
  serviceName: true,
  endpoint: true,
  reqDatetime: true,
  reqHeader: true,
  reqMessage: true,
  respDatetime: true,
  respHeader: true,
  respMessage: true,
  statusCode: true,
  timeUsage: true,
};

const ApiLogTable = ({ searchObj, statusConfigColumn = false, setStatusConfigColumn }: { searchObj: Record<string, any> }) => {
  const router = useRouter();
  const { table, setPage, setLimit, dataTable } = useApiLogTable({ searchObj });

  const gotoChild = (data: any) => {
    console.log(data);
  }

  if (!searchObj) {
    return <></>;
  }

  return (
    <div>
      <DataTable
        defaultVisibleColumn={defaultVisibleColumn}
        statusConfigColumn={statusConfigColumn}
        setStatusConfigColumn={setStatusConfigColumn}
        onRowClick={gotoChild}
        loading={false} // คุณอาจจะใช้สถานะ loading จาก API ถ้าจำเป็น
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

export default ApiLogTable;
