export type TableType<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  permCount?: number;
};

export type DefaultReqTableType = {
  page?: number;
  limit?: number;
  sort?: string | null;
  order?: "asc" | "desc" | null;
};
