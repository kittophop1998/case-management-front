import { Button } from "@/components/common/Button";
import { Typography } from "@/components/common/typography";
import { Files } from "lucide-react";

interface DataWithCopyProps { value: string | undefined, title: string, showCopy?: boolean, loading?: boolean }

export const DataWithCopy = ({ title, value, showCopy = false, loading }: DataWithCopyProps) => {
    return (
        <div className="flex items-center gap-1">
            <Typography variant="body2">{title}</Typography>
            <Typography variant="body2" className="text-gray-500">{value}</Typography>
            {showCopy &&
                <Button variant='ghost' size='sm' >
                    <Files color='#5570F1' />
                </Button>}
        </div>
    );
}