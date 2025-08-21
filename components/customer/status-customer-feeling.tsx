// export const StatusCustomerFeeling = () => {
//     return <Badge>Sweetheart</Badge>
// }
import { cva } from "class-variance-authority"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

const statusCustomerFeelingVariants = cva(
    "font-bold rounded-sm text-back",
    {
        variants: {
            status: {
                'Sweetheart': "bg-[#ffd8c0]",
            },
        },
        defaultVariants: {
            status: "Sweetheart",
        },
    }
)

export const StatusCustomerFeeling = ({ status, loading = false }: { status: 'Sweetheart', loading?: boolean }) => {
    if (loading) return <Skeleton className="w-[7rem] rounded-sm text-transparent"> {'-'}</Skeleton>
    return <Badge
        className={cn(statusCustomerFeelingVariants({
            status: 'Sweetheart'
        }))}
    >
        {/* ICON {status} */}
        Sweetheart
    </Badge>
}