"use client";
import { useGetMeMutation } from "@/features/auth/authApiSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export const InitializersData = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [getMeMutation, { isLoading, isError, error }] = useGetMeMutation();

    // TODO: data form ssr-props
    const getMe = async () => {
        try {
            const me = await getMeMutation(null).unwrap()
            console.log("['/eng/login', '/th/login'].includes(pathname)", ['/eng/login', '/th/login'].includes(pathname), me);
            if (['/eng/login', '/th/login'].includes(pathname)) {
                if (me) {
                    switch (me?.role?.name) {
                        case 'Admin':
                            router.push('/user-management');
                            break;
                        case 'User':
                            router.push('/case-management');
                            break;
                        default:
                            router.push('/login');
                    }
                }
            } else {
                if (!me) {
                    router.push('/login');
                }
            }
        } catch (error) {
            // TODO: move this to a global error handler
            if (error?.data?.status === 401 || error?.data?.error === 'invalid token') {
                router.push('/login');
            }

        }

    }
    useEffect(() => {
        getMe();
    }, [getMeMutation]);
    // useEffect(() => {
    //     console.log("['/eng/login', '/th/login'].includes(pathname)", ['/eng/login', '/th/login'].includes(pathname), me);
    //     if (['/eng/login', '/th/login'].includes(pathname)) {
    //         if (me) {
    //             switch (me?.role?.name) {
    //                 case 'Admin':
    //                     router.push('/user-management');
    //                     break;
    //                 case 'User':
    //                     router.push('/case-management');
    //                     break;
    //                 default:
    //                     router.push('/login');
    //             }
    //         }
    //     } else {
    //         if (!me) {
    //             router.push('/login');
    //         }
    //     }
    // }, [me?.role?.name]);
    return null;
    // TODO: use this to check auth and logined user
}