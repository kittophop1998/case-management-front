import { Skeleton } from "../ui/skeleton"
import VerifyPass from '@/public/icons/VerifyPass.svg'

export const StatusVerify = ({ status, loading = false }: { status: string, loading?: boolean }) => {
    if (loading) return <Skeleton className="size-7 rounded-sm " />
    return <VerifyPass className='size-7' />

}