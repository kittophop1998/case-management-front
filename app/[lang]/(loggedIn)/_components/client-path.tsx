'use client'
import { Typography } from "@/components/common/typography"
import { path2clientpath } from "@/const/title-path"
import { cn } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"
import HomeIcon from '@/public/icons/Home.svg'
import { useGetMeQuery, useLazyGetMeQuery } from "@/features/auth/authApiSlice"
import { useMemo } from "react"
import getInitPathByRole from "@/lib/utils/get-init-path-by-role"
import { useRouter } from "next/navigation";

const getClientPath = (pathArr: string[]) => {
    return path2clientpath?.[`/${pathArr[2]}/${pathArr[3]}/${pathArr[4]}`] || path2clientpath?.[`/${pathArr[2]}/${pathArr[3]}`] || path2clientpath?.[`/${pathArr[2]}`] || path2clientpath['/']
}
export function ClientPath() {
    const pathname = usePathname()
    const router = useRouter();
    const pathArr = pathname.split('/')
    const clientPath = getClientPath(pathArr)
    const { data: meApi } = useGetMeQuery()
    const goToHome = () => {
        if (!meApi?.data?.role?.name) return
        const initPath = getInitPathByRole(
            pathname,
            meApi?.data?.role?.name,
            {
                forceGo: true
            }
        );
        router.push(initPath)
    }
    const searchParams = useSearchParams();
    const goToLink = (goto: string) => {
        if (!goto) return;
        router.push(`${goto}?${searchParams.toString()}`);
    };

    return <>
        <span onClick={goToHome} className="flex items-center">
            <HomeIcon className='inline-block w-4 h-4 cursor-pointer hover:opacity-75' />
        </span>
        {clientPath?.map((item, index) => (
            <div className='flex gap-2 items-center ' key={index}>
                <Typography variant='caption' as='p'>
                    /
                </Typography>
                <Typography key={'title' + index} variant='caption' as='p'>
                    <span className={cn(!item.goto ? '' : 'text-blue-600 hover:underline cursor-pointer', '')}
                        onClick={() => goToLink(item.goto)}
                    >{item.name}</span>
                </Typography>

            </div>
        ))}
    </>
}