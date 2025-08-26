import { FileText } from "lucide-react";
// import { Button } from "../common/button";
import { Badge } from "../ui/badge";
import { Button } from "../common/Button";
import { useLazyGetCustomerNotesQuery } from "@/features/note/noteApiSlice";
import { useEffect } from "react";

interface NoteButtonNotiProps {
    onClick: () => void;
    // count?: number;
    size: "sm" | "lg" | "default" | "icon" | null | undefined
    n: number | null
}
export const NoteButtonNoti = ({ onClick, size = 'sm', n = 0 }: NoteButtonNotiProps) => {

    return (
        <Button variant='ghost' size={size} onClick={onClick} className="relative">
            <Badge
                onClick={onClick}
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-[#ffcc91] text-back absolute right-[-2px] top-[-2px] cursor-pointer text-xs"
                variant="destructive"
            >
                {/* {count} */}
                {n}
            </Badge>
            <FileText />
        </Button>
    );
}