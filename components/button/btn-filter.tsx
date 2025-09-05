import { Funnel } from "lucide-react";
import { Button } from "../common/Button";
import { Typography } from "../common/typography";

interface BtnFilterProps {
    onClick: () => void;
    text?: string;
    icon?: React.ReactNode;
}
const BtnFilter = ({ onClick, text = "filter", icon = <Funnel /> }: BtnFilterProps) => {
    return (
        <Button variant='outline-black' onClick={onClick} size="small" >
            {icon}
            <Typography variant="buttonSmall">{text}</Typography>
        </Button >
    );
};

export default BtnFilter;
// className = "h-[1.813rem] rounded-[4px]"