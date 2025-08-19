import Card from "@/components/common/card";
import { Typography } from "@/components/common/typography";
import { cn } from "@/lib/utils";

export const SectionCard = ({ title, children, TopRight = null, className }: { title: string, children: React.ReactNode, TopRight: React.ReactNode, className?: string }) => {
    return (
        <Card className={cn("p-4 shadow-none rounded-sm outline-0 border-0 gap-3", className)}>
            <div className="flex items-center justify-between ">
                <Typography className="line-clamp-1 font-medium">{title}</Typography>
                {TopRight}
            </div>
            {children}
        </Card>
    );
}