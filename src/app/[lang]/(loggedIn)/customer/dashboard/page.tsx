import Container from "@/components/common/containter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NewCaseForm } from "./_components/new-case-form";
import { DialogNewCase } from "./_components/dialog-new-case";

// query 
const SectionCard = ({ title }: { title: string }) => {
    return (
        <Card className="flex flex-col items-center justify-center p-4 shadow-none rounded-sm outline-0">
            <h3 className="text-lg font-semibold">{title}</h3>
        </Card>
    );
}
const CustomerDashboard = () => {
    const customerId = "9712333456234";
    const costumerType = "Individual";
    const customerSince = "2023-10-01";
    return (
        <>
            <Container className="space-y-4 my-3">
                <div className="flex gap-3">
                    <div>Aeon ID</div>
                    <div>Customer ID {customerId}</div>
                    <div>Costomer Since</div>
                    <div className="flex-1"></div>
                    {/* <Button>New</Button> */}
                    <NewCaseForm />
                    <Button>End call</Button>
                </div>
                {/* <NewCaseForm /> */}
                {/* <DialogNewCase /> */}
                <div className="grid grid-cols-3 gap-4">
                    <SectionCard title="Customer Profile" />
                    <SectionCard title="Customer History" />
                    <SectionCard title="Customer Settings" />
                    <SectionCard title="Customer Documents" />
                    <SectionCard title="Customer Notifications" />
                    <SectionCard title="Customer Preferences" />
                </div>
            </Container>
        </>
    );
};

export default CustomerDashboard;
