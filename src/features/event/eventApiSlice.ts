'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IListPayload } from '@/types/event';
import { generateRequestId } from '@/lib/genterateIdUtils';

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

const mockData = {
    data: Array.from({ length: 5 }, (_, i) => ({
        event_id: (1000000000000 + i).toString(),
        event_date: `2025-07-${(i + 1).toString().padStart(2, '0')}`,
        event_address: `location${[i]}`,
    })),
};

const fakeBaseQuery = async (args: any) => {
    const { url, method, body, params } = args;
    await new Promise(resolve => setTimeout(resolve, 500));

    if (url === '/event' && method === 'GET') {
        return { data: mockData };
    }

    if (url.startsWith('/event/') && method === 'DELETE') {
        return {
            data: {
                message: "Event has been deleted",
                form_id: "EV-20250616-220343-001"
            }
        };
    }

    if (url === '/event' && method === 'POST') {
        return {
            data: {
                message: "Event has been created",
                form_id: "EV-20250616-220343-001"
            }
        };
    }

    if (url === '/event' && method === 'PUT') {
        return {
            data: {
                message: "Event has been updated",
                form_id: "EV-20250616-220343-001"
            }
        };
    }

    if (url.startsWith('/event/') && method === 'GET') {
        return {
            data: {
                event_id: "EV-20250616-220343-001",
                event_date: "2025-07-07",
                event_address: "location test"
            }
        };
    }

    if (url === '/geteventdetail' && method === 'GET') {
        return {
            data: {
                event_id: "EV-20250616-220343-001",
                event_date: "2025-07-07",
                event_address: "อาคาร 25 ปี ชั้น 1 กรมบังคับคดี บางขุนนนท์"
            }
        };
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
            }

            return headers;
        },
    });

export const eventApiSlice = createApi({
    reducerPath: 'eventApi',
    baseQuery,
    endpoints: (builder) => ({
        getEventList: builder.mutation<{ data: IListPayload[], data_count: number }, void>({
            query: () => ({
                url: '/event',
                method: 'GET',
            }),
        }),
        deleteEvent: builder.mutation<{ message: string; event_id: string }, { eventId: string }>(
            {
                query: ({ eventId }) => ({
                    url: `/event/${eventId}`,
                    method: 'DELETE',
                }),
            }
        ),
        createEvent: builder.mutation<{ message: string; event_id: string }, IListPayload>(
            {
                query: (formPayload) => ({
                    url: `/event`,
                    method: 'POST',
                    body: formPayload,
                }),
            }),
        updateEvent: builder.mutation<{ message: string; event_id: string }, IListPayload>(
            {
                query: (formPayload) => ({
                    url: `/event`,
                    method: 'PUT',
                    body: formPayload,
                }),
            }),
        getEventInfo: builder.mutation<IListPayload, { eventId: string }>(
            {
                query: ({ eventId }) => ({
                    url: `/event/${eventId}`,
                    method: 'GET',
                }),
            }
        ),
        getEventDetail: builder.mutation<IListPayload, void>(
            {
                query: () => ({
                    url: `/geteventdetail`,
                    method: 'GET',
                }),
            }
        ),
    }),
});

export const {
    useGetEventListMutation,
    useDeleteEventMutation,
    useCreateEventMutation,
    useUpdateEventMutation,
    useGetEventInfoMutation,
    useGetEventDetailMutation
} = eventApiSlice;