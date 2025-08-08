// export const StatusCustomerFeeling = () => {
//     return <Badge>Sweetheart</Badge>
// }
import { cva } from "class-variance-authority"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

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

export const StatusCustomerFeeling = ({ status }: { status: 'Sweetheart' }) => {
    return <Badge
        className={cn(statusCustomerFeelingVariants({
            status
        }))}
    >
        ICON {status}
    </Badge>
}