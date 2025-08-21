import { cva } from "class-variance-authority"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

const statusComplaintLvVariants = cva(
    "font-bold rounded-sm",
    {
        variants: {
            lv: {
                '1': "bg-[#ffecb2] text-[#f79e1a]",
                '2': "",
                '3': "",
                '4': "",
            },
        },
        defaultVariants: {
            lv: "1",
        },
    }
)

export const StatusComplaintLv = ({ lv = 1, loading = false }: { lv: 1 | 2 | 3 | 4, loading?: boolean }) => {
    if (loading) return <Skeleton className="w-[7rem] rounded-sm text-transparent" > {'-'}</Skeleton>
    return <Badge className={cn(statusComplaintLvVariants({
        lv: `${lv}`

    }))}>Complaint Level: {lv}</Badge>
}