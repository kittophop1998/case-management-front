import { cn } from "@/lib/utils";


interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full", className)}>
            {children}
        </div>
    );
};
export default Container;