"use client";
import { use, useEffect, useState } from "react";
import { UserProfileType } from "@/types/user.type";
import { ApiResponse } from "@/types/api.type";
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { authApiSlice } from '@/features/auth/authApiSlice'
import { setAccessToken, setRefreshToken } from "@/services/api";
import * as React from 'react'
// * DONOT DELETE THIS [DEBUG] - This is used to debug re-rendering issues
// if (process.env.NODE_ENV === 'development') {
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const whyDidYouRender = require('@welldone-software/why-did-you-render')
//     // @ts-ignore
//     whyDidYouRender(React, { trackAllPureComponents: true })
// }


export const InitializersData = ({ user, refreshToken, accessToken }: {
    user: ApiResponse<UserProfileType> | null,
    refreshToken: string | null,
    accessToken: string | null
}) => {
    useEffect(() => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    }, [refreshToken, accessToken])
    const { data: ddData, isLoading: isDDLoading } = useGetDropdownQuery();

    return null;
}