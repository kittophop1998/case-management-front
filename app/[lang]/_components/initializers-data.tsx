"use client";
import { useEffect } from "react";
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { setAccessToken, setRefreshToken } from "@/services/api";

export const InitializersData = ({ refreshToken, accessToken }: {
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