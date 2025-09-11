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
        <Container className={cn(`mx-auto`, className)}>
            <Card className={cn("p-5 h-full shadow-none", classNameCard)}>
                {children}
            </Card>
        </Container>
    );
};
export const ContainerPage = ({ children, className }: {
    children: React.ReactNode;
    className?: string
}) => {
    return (
        <Container className={cn(`mx-auto`, className)}>
            {children}
        </Container>
    )
}
export const CardPage = ({ children, className }: {
    children: React.ReactNode;
    className?: string
}) => {
    return (
        <Card className={cn("p-5 shadow-none", className)}>
            {children}
        </Card>
    )
}
export default CardPageWrapper;