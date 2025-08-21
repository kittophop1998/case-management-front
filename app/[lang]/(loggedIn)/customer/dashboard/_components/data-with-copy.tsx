import { Button } from "@/components/common/Button";
import { Typography } from "@/components/common/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Files } from "lucide-react";

interface DataWithCopyProps { value: string | undefined, title: string, showCopy?: boolean, loading?: boolean, minWidth?: string }

export const DataWithCopy = ({ title, value, showCopy = false, loading = false, minWidth = '100rem' }: DataWithCopyProps) => {


    return (
        <div className="flex items-center gap-1">
            <Typography variant="body2">{title}</Typography>
            {loading ?
                <Skeleton className="h-[1rem] w-[6rem] rounded-xl" /> :
                <Typography
                    variant="body2"
                    className={cn("text-gray-500 ")}
                >{value}</Typography>
            }
            {
                showCopy && (
                    loading ?
                        <Skeleton className="h-[1.5rem] w-[1.5rem] rounded-sm" /> :

                        <Button variant='ghost' size='sm' >
                            <Files color='#5570F1' />
                        </Button>)
            }
        </div>
    );
}