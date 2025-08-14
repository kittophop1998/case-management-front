import { Funnel } from "lucide-react";
import { Button } from "../common/Button";

interface BtnFilterProps {
    onClick: () => void;
}
const BtnFilter = ({ onClick }: BtnFilterProps) => {
    return (
        <Button variant='outline-black' onClick={onClick} >
            <Funnel />  Filter
        </Button >
    );
};

export default BtnFilter;
