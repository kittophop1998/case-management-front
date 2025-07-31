import { Funnel, SquarePen } from "lucide-react";
import { Button } from "../ui/button";

interface BtnFilterProps {
    onClick: () => void;
}
const BtnEdit = ({ onClick }: BtnFilterProps) => {
    return (
        <Button variant='ghost' onClick={onClick} >
            <SquarePen />
        </Button >
    );
};

export default BtnEdit;
