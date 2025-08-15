import { Badge } from "@/components/ui/badge"
import { SquareCheck } from "lucide-react";
interface ChipIsActiveProps {
    isActive: boolean;
    className?: string;
}

export const CheckIsActive = ({ isActive, className }: ChipIsActiveProps) => {
    return (
        // TODO: use tailwind color
        <SquareCheck
            size={16}
            color={isActive ? '#22c55e' : '#e4e4e7'}
            className={className}

        />
    )
}
