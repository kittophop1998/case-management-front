"use client";
import { useEffect } from "react";
import { UserProfileType } from "@/types/user.type";
import { ApiResponse } from "@/types/api.type";
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { authApiSlice } from '@/features/auth/authApiSlice'
export const InitializersData = ({ user }: { user: ApiResponse<UserProfileType> | null }) => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        console.log('InitializersData', user)
        dispatch(
            authApiSlice.util.updateQueryData('getMe', undefined, (draft) => {
                draft = user
            })
        )
    }, [dispatch])
    const { data: ddData, isLoading: isDDLoading } = useGetDropdownQuery();
    return null;
}