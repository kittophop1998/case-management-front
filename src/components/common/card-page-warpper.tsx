// "use server"
"use client"
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
        <Container className={`mx-auto sm:px-0 lg:px-0 h-full px-3 ${className}`}>
            <Card className="p-6 h-full">
                {children}
            </Card>
        </Container>
    );
};
export default CardPageWrapper;