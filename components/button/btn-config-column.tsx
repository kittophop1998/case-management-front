import { Eye } from "lucide-react";

import { Button } from "../common/Button";
import { Typography } from "../common/typography";

interface BtnConfigColumnProps {
    onClick: () => void;
    text?: string;
    icon?: React.ReactNode;
}
const BtnConfigColumn = ({ onClick, text = "Show Column", icon = <Eye className="size-5" /> }: BtnConfigColumnProps) => {
    return (
        <Button variant='outline-black' onClick={onClick} size="small" >
            {icon}
            <Typography variant="buttonSmall">{text}</Typography>
        </Button >
    );
};

export default BtnConfigColumn;
// className = "h-[1.813rem] rounded-[4px]"