
export type ApiResponseError = {
  error?: string;
};
export type ApiResponse<T> = T | ApiResponseError; 