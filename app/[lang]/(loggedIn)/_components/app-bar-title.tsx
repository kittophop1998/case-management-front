'use client'
import { Typography } from "@/components/common/typography"
import { path2name } from "@/const/title-path"
import useGetRawPath from "@/hooks/use-get-raw-path"

const getTitle = (pathArr: string[]) => {
    return path2name?.[`/${pathArr[2]}/${pathArr[3]}/${pathArr[4]}`] || path2name?.[`/${pathArr[2]}/${pathArr[3]}`] || path2name?.[`/${pathArr[2]}`] || path2name['/']
}
export function AppBarTitle() {
    const pathname = useGetRawPath()
    const pathArr = pathname.split('/')
    const title = getTitle(pathArr)
    return <Typography variant='subH3Medium' as='p' textStyle='poppins'>
        {title}
    </Typography>
}