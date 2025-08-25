import { Funnel } from "lucide-react";
import { Button } from "../common/Button";
import { Typography } from "../common/typography";

interface BtnFilterProps {
    onClick: () => void;
}
const BtnFilter = ({ onClick }: BtnFilterProps) => {
    return (
        <Button variant='outline-black' onClick={onClick} size="small" >
            <Funnel />
            {/* filter */}
            <Typography variant="buttonSmall">filter</Typography>
        </Button >
    );
};

export default BtnFilter;
// className = "h-[1.813rem] rounded-[4px]"