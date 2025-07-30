// interface ErrorResponse {
//     data: {
//         message?: string;
//     }

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// }
export const getErrorMessageAPI = (err: FetchBaseQueryError | SerializedError | undefined, 
    defaultMessage: string = 'An unexpected error occurred. Please try again later.'): string => err?.data?.message || defaultMessage;

