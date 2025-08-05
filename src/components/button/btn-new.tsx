import { ClipboardPlus } from "lucide-react";
import { Button } from "../ui/button";

interface BtnFilterProps {
    onClick: () => void;
}
const BtnNew = ({ onClick }: BtnFilterProps) => {
    return (
        <Button className="bg-[#5570f1] text-white hover:bg-[#5570f1]/90 hover:text-white" variant='outline' onClick={onClick} >
            <ClipboardPlus />  New
        </Button >
    );
};

export default BtnNew;
