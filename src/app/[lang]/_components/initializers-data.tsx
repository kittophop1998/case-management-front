"use client";
// import { useGetMeMutation } from "@/features/auth/authApiSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { useGetMeQuery } from "@/features/auth/authApiSlice";

export const InitializersData = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { data: ddData, isLoading: isDDLoading } = useGetDropdownQuery()
    const { data: me, isLoading: isUserLoading } = useGetMeQuery()

    useEffect(() => {

        if (isUserLoading) {
            console.log('Loading user data...');
            return;
        }

        const autoDirect = async () => {
            const isLoginPage = ['/eng/login', '/th/login'].includes(pathname);
            console.log('autoDirect me:', me, 'isLoginPage:', isLoginPage);
            if (isLoginPage && !me) {
                return;
            }
            if (isLoginPage && me) {
                switch (me?.role?.name) {
                    case 'Admin':
                        console.log('Redirecting to user-management');
                        router.push('/user-management');
                        break;
                    case 'User':
                        console.log('Redirecting to case-management');
                        router.push('/case-management');
                        break;
                    default:
                        console.log('Redirecting to login');
                        router.push('/login');
                }
            }
            if (!isLoginPage && !me) {
                router.push('/login');
            }

        }
        autoDirect()
    }, [me?.role?.name, isUserLoading]);
    return null;
}