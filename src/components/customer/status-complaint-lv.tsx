import { cva } from "class-variance-authority"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

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

export const StatusComplaintLv = ({ lv = 1 }: { lv: 1 | 2 | 3 | 4 }) => {
    return <Badge className={cn(statusComplaintLvVariants({
        lv: `${lv}`

    }))}>Complaint Level: {lv}</Badge>
}