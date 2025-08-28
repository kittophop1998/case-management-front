import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import { DefaultReqTableType, TableType } from "@/types/table.type";
import { createSearchParams } from "@/lib/utils/create-search-params";
import { QueueType } from "@/types/queue.type";
import z from "zod";
import { CreateQueue } from "@/schemas";

export const queueApiSlice = createApi({
  reducerPath: "queueApi",
  baseQuery,
  endpoints: (builder) => ({
    getTable: builder.query<TableType<QueueType>, DefaultReqTableType>({
      query: ({ page, limit, sort = null, order = null }) => {
        const searchParams = createSearchParams({
          page,
          limit,
          sort,
          order,
        });
        return {
          url: `/queues?${searchParams}`,
          method: "GET",
        };
      },
    }),
    //
    create: builder.mutation<void, z.infer<typeof CreateQueue>>({
      query: (body) => {
        return {
          url: `/queues`,
          method: "POST",
          body: {
            queueName: body.queueName,
            queueDescription: body.queueDescription,
            queueUsers: body.queueUsers,
          },
        };
      },
    }),
  }),
});

export const { useLazyGetTableQuery, useCreateMutation } = queueApiSlice;
// const [create, { error, isLoading }] = useCreateMutation()
