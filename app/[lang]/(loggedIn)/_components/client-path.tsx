'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { Typography } from "@/components/common/typography"
import { path2ClientPath } from "@/const/title-path"
import { useGetMeQuery } from "@/features/authApiSlice"
import { cn } from "@/lib/utils"
import getInitPathByRole from "@/lib/utils/get-init-path-by-role"
import HomeIcon from '@/public/icons/Home.svg'
import useGetRawPath from "@/hooks/use-get-raw-path"
import { useSelector } from "react-redux"

// Utility for resolving breadcrumb path
const resolveClientPath = (segments: string[]) => {
    return (
        path2ClientPath?.[`/${segments[2]}/${segments[3]}/${segments[4]}`] ||
        path2ClientPath?.[`/${segments[2]}/${segments[3]}`] ||
        path2ClientPath?.[`/${segments[2]}`] ||
        path2ClientPath['/']
    )
}

export function ClientPath() {
    const pathname = useGetRawPath()
    const router = useRouter()
    const searchParams = useSearchParams()

    const pathSegments = pathname.split('/')
    const clientPath = resolveClientPath(pathSegments)

    const { data: meApi } = useGetMeQuery()

    const handleHomeClick = () => {
        const role = meApi?.data?.role?.name
        if (!role) return

        const initPath = getInitPathByRole(pathname, role, { forceGo: true })
        router.push(initPath)
    }

    const handleBreadcrumbClick = (goto?: string) => {
        if (!goto) return
        const query = searchParams.toString()
        router.push(`${goto}${query ? `?${query}` : ''}`)
    }
    const { dinamicParams } = useSelector((state: RootState) => state.sysConfig);

    return (
        <div className="flex items-center gap-2">
            <span onClick={handleHomeClick} className="flex items-center">
                <HomeIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" />
            </span>

            {clientPath?.map(({ name, goto }, idx) => {
                return (
                    <div className="flex items-center gap-2" key={`${name}-${idx}`}>
                        <Typography variant="caption" as="span">
                            /
                        </Typography>
                        <span
                            className={cn(
                                goto ? 'text-blue-600 hover:underline cursor-pointer' : ''
                            )}
                            onClick={() => handleBreadcrumbClick(goto)}
                        >
                            <Typography
                                variant="caption"
                                as="span"
                            >
                                {name.startsWith(':') ? (dinamicParams?.[name?.slice(1)] || name?.slice(1) || '') : name}
                                {/* {JSON.stringify(dinamicParams)} */}
                            </Typography>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
