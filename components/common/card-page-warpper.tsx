// "use server"
"use client"
import { cn } from "@/lib/utils";
import Card from "../common/card";
import Container from "../common/containter";

interface CardPageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const CardPageWrapper = ({ children, className }: CardPageWrapperProps) => {
    // 
    // 
    // 
    // 
    return (
        <Container className={cn(`mx-auto h-[95%] `, className)}>
            <Card className="p-6 h-full">
                {children}
            </Card>
        </Container>
    );
};
export default CardPageWrapper;