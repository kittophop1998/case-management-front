'use client';
import BtnNew from "@/components/button/btn-new";
import CardPageWrapper from "@/components/common/card-page-warpper";
import Container from "@/components/common/containter";
import { FloatingWidget } from "@/components/common/floating-widget";
import { DataTable, Header } from "@/components/common/table";
import { Typography } from "@/components/common/typography";
import { DateValueType } from "@/components/form/date-picker";
import { SearchFieldInput } from "@/components/form/search-field";
import { FormCreateNote } from "@/components/note/form-create-note";
import { useLazyGetCustomerNotesQuery } from "@/features/note/noteApiSlice";
import { useTable } from "@/hooks/use-table";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";


const useNoteTable = ({ customerId }: { customerId: string | null }) => {
    const [filterForm, setFilterForm] = useState<
        {
            text: string;
            date: DateValueType;
        }
    >({
        text: '',
        date: null,
    });
    const [getData, { data: dataApi, isFetching }] = useLazyGetCustomerNotesQuery();
    const dataTable = useMemo(() => dataApi?.data || [], [dataApi])
    const columnHelper = createColumnHelper<any>()
    const columns = useMemo(() => [
        columnHelper.accessor('noteType', {
            id: 'noteType',
            header: ({ column }) => <Header column={column} label='Type' sortAble />,
            cell: info => info.getValue(),
            meta: { headerClass: 'w-[13rem]' },


        }),
        columnHelper.accessor('noteDetail', {
            id: 'noteDetail',
            header: ({ column }) => <Header column={column} label='Note' sortAble />,
            cell: info =>
                <div className="truncate w-200">
                    {info.getValue()}
                </div>,
            meta: { cellClass: 'w-[30rem]' },
            // <div
            //     className="max-w-[30rem] break-words overflow-hidden text-ellipsis bg-red-300"
            //     style={{
            //         display: "-webkit-box",
            //         WebkitLineClamp: 1,
            //         WebkitBoxOrient: "vertical",
            //     }}
            // >
            //     {info.getValue()}
            // </div>
        }),
        columnHelper.accessor('createdBy', {
            id: 'createdBy',
            header: ({ column }) => <Header column={column} label='Created by' sortAble />,
            cell: info => info.getValue(),
            meta: { headerClass: 'w-[12rem]' },

        }),
        columnHelper.accessor('createdDate', {
            id: 'createdDate',
            header: ({ column }) => <Header column={column} label='Created Date' sortAble />,
            cell: info => format(info.getValue(), "dd MMM yyyy HH:mm:ss"),
            meta: { headerClass: 'w-[13rem]' },

        }),
        // columnHelper.accessor('action', {
        //     id: 'action',
        //     header: ({ column }) => <div className="w-[2.5rem]"></div>,
        //     cell: info =>
        //         <div className="w-[2.5rem]">
        //             <BtnEdit onClick={() => { }} />
        //         </div>
        // }),
    ], [])

    const { table, sort, page, limit, setPage, setLimit } = useTable({
        data: dataTable,
        columns: columns,
        mapSortingName: {
            noteType_name: "noteType",
        },
    });

    const refetch = () => {
        if (!customerId) return
        getData({
            customerId,
            page,
            limit,
            sort,
            keyword: filterForm.text,
            createdDate: filterForm.date ? format(filterForm.date, 'yyyy-MM-dd') : '',
        })
    }
    useEffect(() => {
        refetch()
    }, [customerId,
        filterForm, page,
        limit,
        sort])
    return {
        filterForm,
        setFilterForm,
        table,
        dataApi,
        page,
        limit,
        setPage,
        setLimit,
        refetch
    }
}

const NoteListPage = () => {
    const searchParams = useSearchParams()
    const customerId = searchParams.get('customerId')
    const [status, setStatus] = useState<boolean>(false);
    const {
        filterForm,
        setFilterForm,
        table,
        dataApi,
        page,
        limit,
        setPage,
        setLimit,
        refetch
    } = useNoteTable({
        customerId
    })
    console.count(`NoteListPage.rerender()`)
    if (!customerId) {
        return <></>
    }
    return (
        <div className="h-full flex flex-col">
            <Container className="flex justify-end py-3">
                <BtnNew onClick={() => setStatus(true)} />
            </Container>
            <CardPageWrapper className="pb-3">
                <div className="flex justify-between mb-3">
                    <Typography variant="h6" className="mb-2">
                        Note List
                    </Typography>
                    {/* <div className="flex items-center gap-2">
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
                    </div> */}
                </div>
                <DataTable
                    loading={false}
                    table={table}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={dataApi?.total || 0}
                    totalPages={dataApi?.totalPages || 1}
                />
                <FloatingWidget
                    title="New Customer Note"
                    status={status}
                    setStatus={setStatus}
                >
                    <FormCreateNote customerId={customerId} afterPost={refetch} />
                </FloatingWidget>
                {/* <FormCreateNote
                    customerId={customerId}
                /> */}
            </CardPageWrapper>

        </div >
    )
}

export default NoteListPage;