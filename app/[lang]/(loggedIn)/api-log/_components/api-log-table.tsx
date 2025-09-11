'use client'

import { useEffect, useMemo, useState } from "react";
import { DataTable, Header } from "@/components/common/table";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useLazyGetApiLogsQuery } from "@/features/apilogApiSlice";
import DialogApiDetails from "./dialog-api-details";

// แปลง camelCase เป็น snake_case ด้วย map
const camelToSnake = (obj: Record<string, any>) => {
  const mapKey: Record<string, string> = {
    requestId: "request_id",
    serviceName: "service_name",
    endpoint: "endpoint",
    reqDatetime: "req_datetime",
    respDatetime: "resp_datetime",
    reqHeader: "req_header",
    reqMessage: "req_message",
    respHeader: "resp_header",
    respMessage: "resp_message",
    statusCode: "status_code",
    timeUsage: "time_usage",
    sortingField: "sorting_field",
    sortingOrder: "sorting_order",
    page: "page",
    limit: "limit",
  };

  const newObj: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    const snakeKey = mapKey[key] || key;
    newObj[snakeKey] = value;
  });

  return newObj;
};

const mapSortingName: Record<string, string> = {
  requestId: "request_id",
  serviceName: "service_name",
  endpoint: "endpoint",
  reqDatetime: "req_datetime",
  respDatetime: "resp_datetime",
  reqHeader: "req_header",
  reqMessage: "req_message",
  respHeader: "resp_header",
  respMessage: "resp_message",
  statusCode: "status_code",
  timeUsage: "time_usage",
};

const useApiLogTable = ({ searchObj }: { searchObj: Record<string, any> }) => {
  const [getData, { data: tableObj, isFetching }] = useLazyGetApiLogsQuery();
  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(() => [
    columnHelper.accessor('requestId', {
      header: ({ column }) => <Header column={column} label='Request ID' sortAble />,
      cell: (info) => info.getValue(),
      meta: { width: 'fit-content', minWidth: '8rem', label: 'Request ID' },
    }),
    columnHelper.accessor('serviceName', {
      header: ({ column }) => <Header column={column} label='Service Name' sortAble />,
      cell: (info) => info.getValue(),
      meta: { width: 'fit-content', minWidth: '9rem', label: 'Service Name' },
    }),
    columnHelper.accessor('endpoint', {
      header: ({ column }) => <Header column={column} label='Endpoint' sortAble className="truncate max-w-[180px]" />,
      cell: (info) => <div className="truncate max-w-[180px]">{info.getValue()}</div>,
      meta: { width: 'fit-content', minWidth: '6rem', label: 'Endpoint' },
    }),
    columnHelper.accessor('reqDatetime', {
      header: ({ column }) => <Header column={column} label='Req. Datetime' sortAble />,
      cell: (info) => info.getValue(),
      meta: { width: 'fit-content', minWidth: '9rem', label: 'Req. Datetime' },
    }),
    columnHelper.accessor('reqHeader', {
      header: ({ column }) => <Header column={column} label='Req. Header' sortAble className="truncate max-w-[180px]" />,
      cell: (info) => <div className="truncate max-w-[180px]">{JSON.stringify(info.getValue())}</div>,
      meta: { width: 'fit-content', minWidth: '6rem', label: 'Req. Header' },
    }),
    columnHelper.accessor('reqMessage', {
      header: ({ column }) => <Header column={column} label='Req. Message' sortAble className="truncate max-w-[180px]" />,
      cell: (info) => <div className="truncate max-w-[180px]">{JSON.stringify(info.getValue())}</div>,
      meta: { width: 'fit-content', minWidth: '6rem', label: 'Req. Message' },
    }),
    columnHelper.accessor('respDatetime', {
      header: ({ column }) => <Header column={column} label='Resp. Datetime' sortAble />,
      cell: (info) => info.getValue(),
      meta: { width: 'fit-content', minWidth: '9rem', label: 'Resp. Datetime' },
    }),
    columnHelper.accessor('respHeader', {
      header: ({ column }) => <Header column={column} label='Resp. Header' sortAble className="truncate max-w-[180px]" />,
      cell: (info) => <div className="truncate max-w-[180px]">{JSON.stringify(info.getValue())}</div>,
      meta: { width: 'fit-content', minWidth: '6rem', label: 'Resp. Header' },
    }),
    columnHelper.accessor('respMessage', {
      header: ({ column }) => <Header column={column} label='Resp. Message' sortAble className="truncate max-w-[180px]" />,
      cell: (info) => <div className="truncate max-w-[180px]">{JSON.stringify(info.getValue())}</div>,
      meta: { width: 'fit-content', minWidth: '6rem', label: 'Resp. Message' },
    }),
    columnHelper.accessor('statusCode', {
      header: ({ column }) => <Header column={column} label='Status Code' sortAble />,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      meta: { width: 'fit-content', minWidth: '8rem', label: 'Status Code' },
    }),
    columnHelper.accessor('timeUsage', {
      header: ({ column }) => <Header column={column} label='Time Usage (ms)' sortAble />,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      meta: { width: 'fit-content', minWidth: '9rem', label: 'Time Usage (ms)' },
    }),
  ], []);

  const {
    table, sort, page, limit, setPage, setLimit,
  } = useTable({
    data: tableObj?.data || [],
    columns,
    mapSortingName,
  });

  useEffect(() => {
    const sortFieldCamel = sort?.field || "";
    const sortOrder = sort?.order || "";

    const reqDatetime = searchObj.dateStart ? new Date(searchObj.dateStart).toISOString() : "";
    const respDatetime = searchObj.dateEnd ? new Date(searchObj.dateEnd).toISOString() : "";

    // เตรียม params แบบ camelCase ก่อนแปลง
    const paramsCamel = {
      requestId: searchObj.requestId || "",
      serviceName: searchObj.serviceName || "",
      endpoint: searchObj.endpoint || "",
      reqHeader: searchObj.reqHeader || "",
      reqMessage: searchObj.reqMessage || "",
      respHeader: searchObj.respHeader || "",
      respMessage: searchObj.respMessage || "",
      reqDatetime,
      respDatetime,
      statusCode: searchObj.statusCode || "",
      timeUsage: searchObj.timeUsage || "",
      sortingField: sortFieldCamel,
      sortingOrder: sortOrder,
      page,
      limit,
    };

    const paramsSnake = camelToSnake(paramsCamel);

    getData(paramsSnake);
  }, [searchObj, page, limit, sort, getData]);

  return {
    table,
    sort,
    page,
    limit,
    setPage,
    setLimit,
    dataTable: tableObj?.data || [],
    total: tableObj?.total || 0,
    isFetching,
  };
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

const ApiLogTable = ({
  searchObj,
  statusConfigColumn = false,
  setStatusConfigColumn,
}: {
  searchObj: Record<string, any>,
  statusConfigColumn: boolean,
  setStatusConfigColumn: (val: boolean) => void
}) => {
  const router = useRouter();
  const {
    table,
    setPage,
    setLimit,
    dataTable,
    total,
    isFetching,
    page,
    limit,
  } = useApiLogTable({ searchObj });

  const [open, setOpen] = useState(false);
  const [selectedApi, setSelectedApi] = useState(null);
  const gotoChild = (data: any) => {
    console.log("Selected row:", data);
    setSelectedApi(data);
    setOpen(true);
  };

  if (!searchObj) return null;

  return (
    <div>
      <DataTable
        defaultVisibleColumn={defaultVisibleColumn}
        statusConfigColumn={statusConfigColumn}
        setStatusConfigColumn={setStatusConfigColumn}
        onRowClick={gotoChild}
        loading={isFetching}
        table={table}
        page={page}
        limit={limit}
        total={total}
        totalPages={Math.ceil(total / limit)}
        setPage={setPage}
        setLimit={setLimit}
      />

      <DialogApiDetails
        open={open}
        onClose={() => setOpen(false)}
        apiDetails={selectedApi}
      />
    </div>
  );
};

export default ApiLogTable;
