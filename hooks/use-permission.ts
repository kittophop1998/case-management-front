"use client";
import { useMemo } from "react";
import { useGetMeQuery } from "@/features/auth/authApiSlice";
import { PermissionKeyType } from "@/types/permission.type";

export default function usePermission() {
  const { data: meApi, isLoading } = useGetMeQuery();
  const myPermission: Partial<Record<PermissionKeyType, boolean>> =
    useMemo(() => {
      const value: Partial<Record<PermissionKeyType, boolean>> = {};
      if (!meApi?.data?.permissions?.length) {
        return value;
      }
      for (const { key } of meApi?.data?.permissions || []) {
        value[key as PermissionKeyType] = true;
      }
      return value;
    }, [meApi]);
  return { myPermission };
}
