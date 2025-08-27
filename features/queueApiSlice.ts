import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/services/api";
import { DefaultReqTableType, TableType } from "@/types/table.type";
import { createSearchParams } from "@/lib/utils/create-search-params";
import { QueueType } from "@/types/queue.type";

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
  }),
});

export const { useLazyGetTableQuery } = queueApiSlice;
