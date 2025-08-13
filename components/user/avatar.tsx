import { CircleUserRound } from "lucide-react";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar"
import { cn } from "@/lib/utils";

interface AvatarUserProps {
    img?: string;
    size?: string
}
export const AvatarUser = ({ img, size = '2.5' }: AvatarUserProps) => {
    return (
        <Avatar className={cn(`h-[${size}rem] w-[${size}rem]`)}>
            <AvatarImage src={img} />
            <AvatarFallback className="bg-white">
                {/* {name?.[0] ?? ''}
                {name?.[1] ?? ''} */}
                <CircleUserRound size={cn(`${size}rem`)} />
            </AvatarFallback>
        </Avatar>
    )
}