'use client'
import { Typography } from "@/components/common/typography"
import { path2clientpath } from "@/const/title-path"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import HomeIcon from '@/public/icons/Home.svg'

const getClientPath = (pathArr: string[]) => {
    return path2clientpath?.[`/${pathArr[2]}/${pathArr[3]}/${pathArr[4]}`] || path2clientpath?.[`/${pathArr[2]}/${pathArr[3]}`] || path2clientpath?.[`/${pathArr[2]}`] || path2clientpath['/']
}
export function ClientPath() {
    const pathname = usePathname()
    const pathArr = pathname.split('/')
    const clientPath = getClientPath(pathArr)
    return <>
        <HomeIcon className='inline-block w-4 h-4' />
        {clientPath?.map((item, index) => (
            <div className='flex gap-2' key={index}>
                <Typography variant='caption' as='p'>
                    /
                </Typography>
                <Typography key={'title' + index} variant='caption' as='p'>
                    <span className={cn(!item.goto ? '' : 'text-blue-600 hover:underline cursor-pointer', '')}>{item.name}</span>
                </Typography>
            </div>
        ))}
    </>
}