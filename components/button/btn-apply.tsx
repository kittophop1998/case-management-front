import { Save } from "lucide-react";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";

interface BtnApplyProps {
    onClick: () => void;
    variant?: 'black';
    text?: string | null;
    className?: string;
    loading?: boolean;
}
const BtnApply = ({ onClick, variant = 'black', text = 'Save', className, loading = false }: BtnApplyProps) => {
    return (
        <Button variant={variant} onClick={onClick} className={cn('bg-primary', className)} loading={loading} >
            Apply
        </Button >
    );
};

export default BtnApply;
