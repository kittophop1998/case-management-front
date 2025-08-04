// "use server"
"use client"
import Card from "../common/card";
import Container from "../common/containter";

interface CardPageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const CardPageWrapper = ({ children, className }: CardPageWrapperProps) => {
    return (
        <Container className={`mx-0 px-0 sm:px-0 lg:px-0 ${className}`}>
            <Card className="p-6">
                {children}
            </Card>
        </Container>
    );
};
export default CardPageWrapper;