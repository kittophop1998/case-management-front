// "use server"
"use client"
import { cn } from "@/lib/utils";
import Card from "../common/card";
import Container from "../common/containter";

interface CardPageWrapperProps {
    children: React.ReactNode;
    className?: string;
    classNameCard?: string;
}

const CardPageWrapper = ({ children, className, classNameCard }: CardPageWrapperProps) => {
    return (
        <Container className={cn(`mx-auto h-[95%] `, className)}>
            <Card className={cn("p-5 h-full shadow-none", classNameCard)}>
                {children}
            </Card>
        </Container>
    );
};
export default CardPageWrapper;