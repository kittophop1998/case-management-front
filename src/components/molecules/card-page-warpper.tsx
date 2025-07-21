import Card from "../atoms/card";
import Container from "../atoms/containter";

interface CardPageWrapperProps {
    children: React.ReactNode;
}

const CardPageWrapper = ({ children }: CardPageWrapperProps) => {
    return (
        <Container className="mx-0 px-0 sm:px-0 lg:px-0">
            <Card className="p-6">
                {children}
            </Card>
        </Container>
    );
};
export default CardPageWrapper;