'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IListResponse, IFilterParam, IRegisterPayload } from '@/types/registration';
import { generateRequestId } from '@/lib/genterateIdUtils';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const mockData = {
    data: Array.from({ length: 15 }, (_, i) => ({
        cust_id: (1000000000000 + i).toString(),
        cust_name: `name${[i]}`,
        phone_no: `08${Math.floor(10000000 + Math.random() * 89999999)}`,
        event_address: `location${[i]}`,
        event_date: `2025-07-${(i + 1).toString().padStart(2, '0')}`,
    })),
    data_count: 15,
};

const fakeBaseQuery = async (args: any) => {
    const { url, method, body, params } = args;
    await new Promise(resolve => setTimeout(resolve, 500));

    if (url === '/reg' && method === 'POST') {
        return {
            data: {
                message: "Successfully Registered",
                reg_id: "REG-20250616-220343-001"
            }
        };
    }

    if (url === '/reg' && method === 'GET') {
        return { data: mockData };
    }

    return { error: { status: 404, data: 'Not Found' } };
};

const baseQuery = useMock
    ? fakeBaseQuery
    : fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
        prepareHeaders: (headers) => {
            const requestId = generateRequestId();
            if (requestId) headers.set('X-Request-ID', requestId);

            const getUsername = localStorage.getItem('auth_user');
            if (getUsername) {
                const username = JSON.parse(getUsername).username || '';
                headers.set('X-User-ID', username);
            } else {
                headers.set('Content-Type', 'application/json');
            }

            return headers;
        },
    });

export const registrationApiSlice = createApi({
    reducerPath: 'registrationApi',
    baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<{ message: string, reg_id: string }, IRegisterPayload>({
            query: (registerPayload) => ({
                url: '/reg',
                method: 'POST',
                body: registerPayload,
            }),
        }),
        getRegistList: builder.query<{ data: IListResponse[], data_count: number }, IFilterParam | void>({
            query: (params) => ({
                url: '/reg',
                method: 'GET',
                params: params || {},
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLazyGetRegistListQuery,
} = registrationApiSlice;