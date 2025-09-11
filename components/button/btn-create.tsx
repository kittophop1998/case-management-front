import { Plus, SquarePen } from "lucide-react";
import { Button } from "../common/Button";

interface BtnCreateProps {
    onClick: () => void;
    variant?: 'ghost' | 'black';
    text?: string | null;
    className?: string;
    icon?: React.ReactNode;
}
const BtnCreate = ({ onClick, variant = 'black', text = 'create', icon = <Plus />, className }: BtnCreateProps) => {
    return (
        <Button variant={variant} onClick={onClick} className={className} >
            {icon}
            {text}
        </Button >
    );
};

export default BtnCreate;
