"use client";
import { use, useEffect, useState } from "react";
import { UserProfileType } from "@/types/user.type";
import { ApiResponse } from "@/types/api.type";
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { authApiSlice } from '@/features/auth/authApiSlice'
export const InitializersData = ({ user }: { user: ApiResponse<UserProfileType> | null }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [number, setNumber] = useState(0);
    // useEffect(() => {
    // dispatch(
    //     authApiSlice.util.updateQueryData('getMe', undefined, (draft) => {
    //         console.log('✅ Updating getMe query data with user:', user)
    //         console.log('Before:', draft)
    //         Object.assign(draft, user)
    //     })
    // )
    // }, [number])
    useEffect(() => {
        // console.log('InitializersData useEffect', user)
        if (!user) return
        // const mock = JSON.stringify(JSON.parse({ ...user }))
        // mock.name = 'aaaaaaaaaaaa'
        // dispatch(
        //     authApiSlice.util.upsertQueryData('getMe', undefined, mock))
    }, [dispatch, number])
    const { data: ddData, isLoading: isDDLoading } = useGetDropdownQuery();
    // return <div className="bg-red w-screen h-screen flex items-center justify-center">
    //     <button onClick={() => setNumber(prev => prev + 1)}>
    //         aaaaaa
    //     </button>
    // </div>
    return null;
}