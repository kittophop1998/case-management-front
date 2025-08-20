'use client';
import BtnEdit from "@/components/button/btn-edit";
import BtnExport from "@/components/button/btn-export";
import BtnFilter from "@/components/button/btn-filter";
import BtnNew from "@/components/button/btn-new";
import CardPageWrapper from "@/components/common/card-page-warpper";
import Container from "@/components/common/containter";
import { FloatingWidget } from "@/components/common/floating-widget";
import { DataTable, Header } from "@/components/common/table";
import { Typography } from "@/components/common/typography";
import { DatePickerFieldInput, DateValueType } from "@/components/form/date-picker";
import { SearchFieldInput } from "@/components/form/search-field";
import { FormCreateNote } from "@/components/note/form-create-note";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { useMemo, useState } from "react";

const NoteListPage = () => {
    const [data, setData] = useState<any[]>([{
        type: 'General',
        note: 'This is a sample note',
        createdBy: 'John Doe',
        createdDate: new Date().toISOString(),
        action: ''
    }, {
        type: 'Follow-up',
        note: 'Follow up on the previous note',
        createdBy: 'Jane Smith',
        createdDate: new Date().toISOString(),
        action: ''
    }]); // Replace with actual data fetching logic
    const [status, setStatus] = useState<boolean>(false);
    const columnHelper = createColumnHelper<any>()
    const columns = useMemo(() => [
        columnHelper.accessor('type', {
            id: 'type',
            header: ({ column }) => <Header column={column} label='Type' sortAble />,
            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('note', {
            id: 'note',
            header: ({ column }) => <Header column={column} label='Note' sortAble />,
            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('createdBy', {
            id: 'createdBy',
            header: ({ column }) => <Header column={column} label='Created by' sortAble />,

            cell: info => <div>{info.getValue()}</div>
        }),
        columnHelper.accessor('createdDate', {
            id: 'createdDate',
            header: ({ column }) => <Header column={column} label='Created Date' sortAble />,
            cell: info => <div>{
                format(info.getValue(), "PPP")
            }</div>
        }),
        columnHelper.accessor('action', {
            id: 'action',
            header: ({ column }) => <div className="w-[2.5rem]"></div>,
            cell: info =>
                <div className="w-[2.5rem]">
                    <BtnEdit onClick={() => { }} />
                </div>
        }),
    ], [])

    const { table, sort, page, limit, setPage, setLimit } = useTable({
        data,
        columns: columns
    });

    const [filterForm, setFilterForm] = useState<
        {
            text: string;
            date: DateValueType;
        }
    >({
        text: '',
        date: null,
    });
    return (
        <div className="h-full flex flex-col">
            <Container className="flex justify-end py-3">
                <BtnNew onClick={() => setStatus(true)} />
            </Container>
            <CardPageWrapper className="pb-3">
                <div className="flex justify-between mb-3">
                    <Typography variant="h4" className="mb-4">
                        Note List
                    </Typography>
                    <div className="flex items-center gap-2">
                        <SearchFieldInput placeholder='Search by Cust. Reference'
                            field={
                                {
                                    value: filterForm.text,
                                    onChange: (e: {
                                        target: { value: string }
                                    }) => setFilterForm((pv) => ({ ...pv, text: e.target.value }))
                                }
                            }
                        />
                        <BtnFilter onClick={() => console.log('Filter clicked', filterForm)} />

                        <DatePickerFieldInput
                            value={filterForm.date}
                            onChange={(date) => {
                                console.log('Selected date:', date);
                                setFilterForm(pv => ({ ...pv, date }));
                            }}
                        />
                        <BtnExport onClick={() => console.log('Export clicked')} />
                    </div>
                </div>
                <DataTable
                    loading={false}
                    table={table}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={data.length}
                    totalPages={1}
                />
                <FloatingWidget
                    title="New Customer Note"
                    status={status}
                    setStatus={setStatus}
                >
                    <FormCreateNote customerId="" />
                </FloatingWidget>
            </CardPageWrapper>

        </div >
    )
}

export default NoteListPage;