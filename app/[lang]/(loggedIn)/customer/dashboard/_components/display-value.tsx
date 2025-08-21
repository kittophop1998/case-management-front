import { Typography } from "@/components/common/typography"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export const DisplayValue = ({ title, value, className, classNameValue, loading = false }: { title: string, value: any, className?: string, classNameValue?: string, loading?: boolean }) => {
    if (typeof value === 'string') {
        value = <Typography variant="body2" className={classNameValue}>{value}</Typography>
    }
    return (
        <div className={cn('pb-2', className)}>
            <Typography variant="caption">{title}</Typography>
            {loading ?
                <Skeleton className="w-[6rem] text-transparent" >-</Skeleton> :
                value
            }
        </div>
    )
}