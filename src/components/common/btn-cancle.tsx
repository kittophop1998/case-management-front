import { Button } from "../ui/button";

interface ButtonCancelProps {
    onClick: () => void;
}
export const ButtonCancel = ({ onClick }: ButtonCancelProps) => {
    return (
        <Button variant="outline" type="button" onClick={onClick}>Cancel</Button>
    );
}