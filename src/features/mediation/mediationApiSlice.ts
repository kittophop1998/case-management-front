'use client'
import { createApi } from '@reduxjs/toolkit/query/react';
import { IResposeData, IFilterParam } from '@/types/list';
import { generateRequestId } from '@/lib/utils/genterateIdUtils';
import { pdfBase64, excelBase64 } from './mockData';
import { IFormPayload } from '@/types/form';
import { baseQuery } from '@/services/api';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const mockData = {
    search: {
        filter: {
            debtor_name: "สม"
        },
        sorting: {
            sorting_field: "debt_amount",
            sorting_order: "ASC"
        }
    },
    data: [
        {
            form_id: "F001",
            debtor_name: "สมชาย ใจดี",
            case_id: "C1001",
            case_date: "2023-11-01",
            debt_amount: 50000,
            form_date: "2023-11-10",
            agreement_result: "pending",
            mediation_debt: 50000,
            payment_type: "ชำระปิดบัญชีงวดเดียว",
            remark: ""
        },
        {
            form_id: "F002",
            debtor_name: "สมหญิง สุขใจ",
            case_id: "C1002",
            case_date: "2023-11-02",
            debt_amount: 75000,
            form_date: "2023-11-11",
            agreement_result: "completed",
            mediation_debt: 50000,
            payment_type: "ชำระปิดบัญชีงวดเดียว",
            remark: ""
        }
    ]
};

const fakeBaseQuery = async (args: any) => {
    const { url, method, body, params } = args;
    await new Promise(resolve => setTimeout(resolve, 500));

    if (url === '/debt-form' && method === 'GET') {
        return { data: mockData };
    }

    if (url.startsWith('/debt-form/') && method === 'DELETE') {
        return {
            data: {
                message: "Form has been deleted",
                form_id: "FORM-20250616-220343-001"
            }
        };
    }

    if (url.match(/^\/debt-form\/[^/]+\/pdf$/) && method === 'GET') {
        return {
            data: {
                fileName: 'mediation-form.pdf',
                base64Content: pdfBase64
            }
        };
    }

    if (url === '/debt-form/export/excel' && method === 'GET') {
        return {
            data: {
                fileName: 'mediation-form.xlsx',
                base64Content: excelBase64
            }
        };
    }

    if (url === '/debt-form' && method === 'POST') {
        return {
            data: {
                message: "Form has been created",
                form_id: "FORM-20250616-220343-001"
            }
        };
    }

    if (url === '/debt-form' && method === 'PUT') {
        return {
            data: {
                message: "Form has been updated",
                form_id: "FORM-20250616-220343-001"
            }
        };
    }

    if (url.startsWith('/debt-form/') && method === 'GET') {
        return {
            data: {
                data: {
                    form_id: "FORM-20250616-220343-001",
                    cust_id: "1234567891234",
                    title: "นาย",
                    cust_name: "สมชาย ใจดี",
                    cust_type: "ผู้รับมอบอำนาจ",
                    phone_no: "0812345678",
                    address: "123 ถนนสุขุมวิท, กรุงเทพฯ",
                    form_date: "2023-11-10",
                    debtor_id: "1234567891234",
                    debtor_title: "นาง",
                    debtor_name: "สมหญิง สุขใจ",
                    case_id: "CASE5001",
                    case_date: "2023-11-01",
                    court: "ศาลแพ่งกรุงเทพใต้",
                    debt_amount: 500000,
                    outsource_id: "OUT1001",
                    aeon_name: "บริษัท อิออน จำกัด",
                    aeon_phone: "022345678",
                    mediator: "นางสาว mediator_example",
                    witness: "นางสาว witness_example",
                    agreement_result: "สามารถตกลงกันได้",
                    disagree_reason: "",
                    mediation_debt: 45000,
                    payment_type: "ผ่อนชำระ",
                    onetime_amount: null,
                    onetime_date: null,
                    installment_type: "ผ่อนชำระปกติ",
                    installment_amount: 5000,
                    pause_interest: true,
                    installment_first_amount: 5000,
                    installment_first_date: "2023-12-01",
                    min_amount_per_installment: 5000,
                    installment_due_day: 5,
                    installment_count: 9,
                    stage_installment: [
                        {
                            sequence_no: 1,
                            from_stage_installment: 1,
                            to_stage_installment: 3,
                            min_amount_per_stage_installment: 5000,
                            stage_installment_amount: 5000
                        },
                        {
                            sequence_no: 2,
                            from_stage_installment: 4,
                            to_stage_installment: 6,
                            min_amount_per_stage_installment: 6000,
                            stage_installment_amount: 6000
                        }
                    ],
                    stage_installment_first_date: "2023-12-01",
                    stage_installment_due_day: 5,
                    stage_installment_count: 6,
                    enforcement_pause: true,
                    enforcement_pause_year: 1,
                    enforcement_pause_month: 6,
                    remark: "ลูกหนี้แสดงความจำนงชำระหนี้ตามความสามารถ"
                },
                metadata: {
                    create_datetime: "2023-11-10T09:00:00Z",
                    update_datetime: "2023-11-15T14:30:00Z",
                    create_by: "admin01",
                    update_by: "admin02"
                }
            }

        };
    }

    return { error: { status: 404, data: 'Not Found' } };
};

export const mediationApiSlice = createApi({
    reducerPath: 'mediationApi',
    baseQuery,
    endpoints: (builder) => ({
        getFormList: builder.query<IResposeData, IFilterParam | void>({
            query: (params) => ({
                url: '/debt-form',
                method: 'GET',
                params: params || {},
            }),
        }),
        deleteForm: builder.mutation<{ message: string; form_id: string }, { formId: string }>(
            {
                query: ({ formId }) => ({
                    url: `/debt-form/${formId}`,
                    method: 'DELETE',
                }),
            }
        ),
        getFormPdf: builder.mutation<{ file_name: string; base64Content: string }, { formId: string }>(
            {
                query: ({ formId }) => ({
                    url: `/debt-form/${formId}/pdf`,
                    method: 'GET',
                }),
            }
        ),
        getFormExcel: builder.query<{ file_name: string; base64Content: string }, { form_date_from: string, form_date_to: string }>(
            {
                query: (params) => ({
                    url: '/debt-form/export/excel',
                    method: 'GET',
                    params: params || {},
                }),
            }),
        createForm: builder.mutation<{ message: string; form_id: string }, IFormPayload>(
            {
                query: (formPayload) => ({
                    url: `/debt-form`,
                    method: 'POST',
                    body: formPayload,
                }),
            }),
        updateForm: builder.mutation<{ message: string; form_id: string }, IFormPayload>(
            {
                query: (formPayload) => ({
                    url: `/debt-form`,
                    method: 'PUT',
                    body: formPayload,
                }),
            }),
        getFormInfo: builder.mutation<{ data: IFormPayload; metadata: any }, { formId: string }>(
            {
                query: ({ formId }) => ({
                    url: `/debt-form/${formId}`,
                    method: 'GET',
                }),
            }
        ),
    }),
});

export const {
    useLazyGetFormListQuery,
    useDeleteFormMutation,
    useGetFormPdfMutation,
    useLazyGetFormExcelQuery,
    useCreateFormMutation,
    useUpdateFormMutation,
    useGetFormInfoMutation
} = mediationApiSlice;