import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const DefaultDeleteButton = ({ onClick, className }: { onClick: () => void, className?: string }) => {
    return (
        <Button
            variant='ghost'
            type="button"
            size='icon'
            className={cn("text-red-500 hover:text-red-500 rounded-full bg:bg-red-500 h-6 w-6", className)}
            onClick={onClick}
        >
            <X />
        </Button>
    );
}
export { DefaultDeleteButton };