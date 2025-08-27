import { Trash } from "lucide-react";
import { Button } from "../common/Button";

interface BtnDelProps {
    onClick: () => void;
    variant?: 'ghost' | 'black';
    text?: string | null;
    className?: string;
}
const BtnDel = ({ onClick, variant = 'ghost', text = null, className }: BtnDelProps) => {
    return (
        <Button variant={variant} onClick={onClick} className={className} >
            <Trash />{text}
        </Button >
    );
};

export default BtnDel;
