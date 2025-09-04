import { memo, ReactNode } from "react";
import { Typography } from "../common/typography";
import { cn } from "@/lib/utils";

export const Info = memo(({ title, value, required = false, titleClass = "" }: { title: string; value: string | ReactNode; required?: boolean, titleClass?: string }) => {
    value = typeof value === 'string' ? <Typography variant="caption">{value}</Typography> : <>{value}</>
    return (
        <div className="flex items-center gap-3">
            <Typography variant="caption" className={cn('', titleClass)}>{title}{required && <span className="text-red-500">*</span>} :</Typography>
            {value}
        </div>
    )
})