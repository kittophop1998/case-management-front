import { TableType } from "@/types/table.type";
import sleep from "./sleep";

export const getMockupData = async (
  data: any[],
  page: number = 1,
  limit: number = 10
): Promise<TableType<any[]>> => {
  await sleep(2000);
  return {
    data,
    page,
    limit,
    total: data.length,
    totalPages: 1,
  };
};
