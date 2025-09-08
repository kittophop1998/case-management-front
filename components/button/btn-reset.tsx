import { Save } from "lucide-react";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";

interface BtnResetProps {
    onClick: () => void;
    variant?: 'black';
    text?: string | null;
    className?: string;
    loading?: boolean;
}
const BtnReset = ({ onClick, variant = 'outline-primary', text = 'Reset', className, loading = false }: BtnResetProps) => {
    return (
        <Button variant={variant} onClick={onClick} className={cn('', className)} loading={loading} >
            {text}
        </Button >
    );
};

export default BtnReset;
