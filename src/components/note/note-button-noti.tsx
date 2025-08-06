import { FileText } from "lucide-react";
// import { Button } from "../common/button";
import { Badge } from "../ui/badge";
import { Button } from "../common/button";

interface NoteButtonNotiProps {
    onClick: () => void;
    count?: number;
    size: "sm" | "lg" | "default" | "icon" | null | undefined
}
export const NoteButtonNoti = ({ onClick, count = 0, size = 'sm' }: NoteButtonNotiProps) => {
    return (
        <span>
            <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-[#ffcc91] text-back absolute right-0"
                variant="destructive"
            >
                {count}
            </Badge>
            <Button variant='ghost' size='sm' >
                <FileText />
            </Button>
            <Button variant='ghost' size={size} onClick={onClick}>
                <FileText />
            </Button>

        </span>
    );
}