export type ApiResponseError = {
  error?: string;
};
export type ApiResponse<T> = T & ApiResponseError;

export type ApiResponseSuccess = ApiResponse<null>;
