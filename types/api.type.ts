export type ApiResponseError = {
  statusCode: number;
  error: string;
  message: {
    th: string;
    en: string;
  };
  timestamp: string;
  path: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ApiResponseError;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  count?: number;
};

export type ApiLogType = {
  requestId: string;
  serviceName: string;
  endpoint: string;
  reqDatetime: string;
  reqHeader: string;
  reqMessage: string;
  respDatetime: string;
  respHeader: string;
  respMessage: string;
  statusCode: string;
  timeUsage: string;
};

export type RawApiLogType = {
  id: string;
  request_id: string;
  service_name: string;
  endpoint: string;
  req_datetime: string;
  req_header: string;
  req_message: string;
  resp_datetime: string;
  resp_header: string;
  resp_message: string;
  status_code: number;
  time_usage: number;
  created_at: string;
};
