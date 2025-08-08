import { Badge } from "@/components/ui/badge"
interface ChipIsActiveProps {
    isActive: boolean;
}

export const ChipIsActive = ({ isActive }: ChipIsActiveProps) => {
    return (
        <Badge className={`${isActive ? 'bg-[#deeee9] text-[#519c66]' : 'bg-[#f5e2e1] text-[#cd5e5e]'}`}>
            {isActive ? 'Active' : 'Disable'}
        </Badge>
    )
}
