import { Typography } from "@/components/common/typography"
import { cn } from "@/lib/utils"

export const DisplayValue = ({ title, value, className, classNameValue }: { title: string, value: any, className?: string, classNameValue?: string }) => {
    if (typeof value === 'string') {
        value = <Typography variant="body2" className={classNameValue}>{value}</Typography>
    }
    return (
        <div className={cn('pb-2', className)}>
            <Typography variant="caption">{title}</Typography>
            {value}
        </div>
    )
}