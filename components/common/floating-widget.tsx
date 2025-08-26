'use client';
import { Typography } from "@/components/common/typography";
import { Maximize2, Minimize2, Minus, Square, X } from "lucide-react";
import { cloneElement, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
interface FloatingWidgetProps {
    status: boolean;
    setStatus: (status: boolean) => void;
    children: React.ReactElement;
    title: string;
}
export const FloatingWidget = ({ title, status, setStatus, children }: FloatingWidgetProps) => {
    const [isSmallMod, setIsMaximized] = useState(true);
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div className={
            cn('fixed z-50', (isSmallMod || isHidden) ? 'right-0 bottom-0 max-h-[70vh] w-[clamp(432px,40vw,300px)]' : 'inset-0  flex items-center justify-center bg-[#A3A3A3]/20 backdrop-blur-xs', status ? '' : 'hidden')
        }>
            <div className="bg-white rounded-sm overflow-hidden">
                <div className="flex items-center bg-primary/25 px-3">
                    <Typography>{title}</Typography>
                    <div className="flex-1" />

                    <Button variant='ghost'
                        onClick={() => setIsHidden((v) => !v)}
                    >
                        {isHidden ? <Square /> : <Minus />}
                    </Button>
                    {
                        isHidden ? null :
                            <Button variant='ghost' onClick={() => setIsMaximized((v) => !v)} className="ml-2">
                                {isSmallMod ? <Maximize2 /> : <Minimize2 />}
                            </Button>
                    }

                    <Button variant='ghost'
                        onClick={() => setStatus(false)}
                    >
                        <X />
                    </Button>
                </div>
                <span className={cn(isHidden ? "hidden" : '')}>
                    {cloneElement(children, { isSmallMod, setStatus } as { isSmallMod: boolean, setStatus: (status: boolean) => void })}
                </span>
            </div>
        </div >
    );
};
