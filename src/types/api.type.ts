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
};
