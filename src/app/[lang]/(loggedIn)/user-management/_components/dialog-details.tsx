import Card from "@/components/common/card";
import { Typography } from "@/components/common/typography";
import { FormUserDetails } from "./form-user-details";

export const DialogDetails = () => {
    return (
        <Card className="max-w-lg p-6">
            <Typography variant="h3" as="h3" className="mb-4">
                Add Individual User
            </Typography>
            <Typography variant="body2" className="mb-4">
                Add Individual User
            </Typography>
            <FormUserDetails />
        </Card>
    );
};
