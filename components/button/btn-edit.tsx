import { Funnel, SquarePen } from "lucide-react";
import { Button } from "../common/Button";

interface BtnFilterProps {
    onClick: () => void;
    variant?: 'ghost' | 'black';
    text?: string | null;
    className?: string;
}
const BtnEdit = ({ onClick, variant = 'ghost', text = null, className }: BtnFilterProps) => {
    return (
        <Button variant={variant} onClick={onClick} className={className} >
            <SquarePen />{text}
        </Button >
    );
};

export default BtnEdit;
