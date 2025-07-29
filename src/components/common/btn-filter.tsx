import { Funnel } from "lucide-react";
import { Button } from "../ui/button";

interface BtnFilterProps {
    onClick: () => void;
}
const BtnFilter = ({ onClick }: BtnFilterProps) => {
    return (
        <Button variant='outline' onClick={onClick} >
            <Funnel />  Filter
        </Button >
    );
};

export default BtnFilter;
