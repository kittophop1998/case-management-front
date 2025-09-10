'use client';

import { useMemo } from 'react';
import { useTable } from '@/hooks/use-table';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable, Header } from '@/components/common/table';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const mockData = [
	{
		id: '936b6ba7-f367-43e7-a78f-e53512e912d9',
		requestId: 'RQ123456789123456789',
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
		requestId: 'RQ123456789123456789',
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
		requestId: 'RQ123456789123456789',
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

const columnHelper = createColumnHelper<any>();

const ApiLogTable = () => {
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
					minWidth: '8rem',
					label: 'Time Usage (ms)',
				},
			}),

			columnHelper.display({
				id: 'actions',
				header: () => (
					<div className="sticky right-0 bg-white z-10 flex justify-center min-w-[70px]">
						<Eye className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer" />
					</div>
				),
				meta: {
					headerClass: 'sticky right-0 bg-white z-10 min-w-[70px]',
					cellClass: 'sticky right-0 bg-white z-10 min-w-[70px]',
				},
			}),
		],
		[]
	);

	const { table, page, limit, setPage, setLimit } = useTable({
		data: mockData,
		columns,
	});

	return (
		<div className="overflow-x-auto">
			<DataTable
				table={table}
				loading={false}
				page={page}
				limit={limit}
				total={mockData.length}
				totalPages={1}
				setPage={setPage}
				setLimit={setLimit}
			/>
		</div>
	);
};

export default ApiLogTable;
