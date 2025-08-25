import { Save } from "lucide-react";
import { Button } from "../common/Button";

interface BtnSaveProps {
    onClick: () => void;
    variant?: 'black';
    text?: string | null;
    className?: string;
    loading?: boolean;
}
const BtnSave = ({ onClick, variant = 'black', text = 'Save', className, loading = false }: BtnSaveProps) => {
    return (
        <Button variant={variant} onClick={onClick} className={className} loading={loading} >
            <Save />{text}
        </Button >
    );
};

export default BtnSave;
