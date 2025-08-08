import { Funnel } from "lucide-react";
import { Button } from "../ui/button";

interface BtnExportProps {
    onClick: () => void;
}
const BtnExport = ({ onClick }: BtnExportProps) => {
    return (
        <Button variant='outline' onClick={onClick} >
            Export
        </Button >
    );
};

export default BtnExport;
