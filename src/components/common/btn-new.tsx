import { Funnel } from "lucide-react";
import { Button } from "../ui/button";

interface BtnFilterProps {
    onClick: () => void;
}
const BtnNew = ({ onClick }: BtnFilterProps) => {
    return (
        <Button variant='outline' onClick={onClick} >
            <Funnel />  New
        </Button >
    );
};

export default BtnNew;
