// export const StatusCostomerFeeling = () => {
//     return <Badge>Sweetheart</Badge>
// }
import { cva } from "class-variance-authority"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

const statusCostomerFeelingVariants = cva(
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

export const StatusCostomerFeeling = ({ status }: { status: 'Sweetheart' }) => {
    return <Badge
        className={cn(statusCostomerFeelingVariants({
            status
        }))}
    >
        ICON {status}
    </Badge>
}