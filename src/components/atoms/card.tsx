import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card = ({ children, className }: CardProps) => {
    return (
        <div className={cn("bg-white shadow rounded-lg overflow-hidden", className)}>
            {children}
        </div>
    );
};
export default Card;