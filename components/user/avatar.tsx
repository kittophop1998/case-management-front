// import { CircleUserRound } from "lucide-react";
import CircleUserRound from '@/public/icons/Avatar.svg'

import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar"
import { cn } from "@/lib/utils";

interface AvatarUserProps {
    img?: string;
    size?: string
}
export const AvatarUser = ({ img, size = '2.5' }: AvatarUserProps) => {
    const avatarSize = cn(`size-[${size}rem] w-[${size}rem]`)
    return (
        // <Avatar className={cn(`h-[${size}rem] w-[${size}rem]`)}>
        <Avatar className={avatarSize}>
            <AvatarImage src={img} />
            <AvatarFallback className="bg-transparent">
                <CircleUserRound className={'w-full h-full'} />
            </AvatarFallback>
        </Avatar>
    )
}