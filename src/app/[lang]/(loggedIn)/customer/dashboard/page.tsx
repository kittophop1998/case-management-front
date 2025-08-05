'use client';
import Container from "@/components/common/containter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/common/typography";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { FloatingWidget } from "@/components/common/floating-widget";
import { FormNewCase } from "@/components/case/form-new-case";

const SectionCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <Card className="flex flex-col items-center justify-center p-4 shadow-none rounded-sm outline-0">
            <h3 className="text-lg font-semibold">{title}</h3>
            {children}
        </Card>
    );
}

const CustomerDashboard = () => {
    const router = useRouter()

    const customerId = "9712333456234";
    const costumerType = "Individual";
    const customerSince = "2023-10-01";
    const [status, setStatus] = useState<boolean>(false);
    return (
        <>
            <Container className="space-y-4 my-3">
                <div className="flex gap-3">
                    <div>Aeon ID</div>
                    <div>Customer ID {customerId}</div>
                    <div>Costomer Since</div>
                    <div className="flex-1"></div>
                    <Button
                        type="button"
                        onClick={() => setStatus((v) => !v)}
                    >New</Button>

                    <Button>End call</Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <SectionCard title="Customer Profile" >
                        <>
                            <Typography className="text-lg font-semibold">Customer ID: {customerId}</Typography>
                            <Typography className="text-lg font-semibold">Customer Type: {costumerType}</Typography>
                            <Button className="mt-2"

                                onClick={() => router.push('/customer/dashboard/note/list?')}>Note</Button>
                        </>
                    </SectionCard>
                    <SectionCard title="Customer Profile" >
                        <div>
                            aaaaa
                        </div>
                    </SectionCard>
                    <SectionCard title="Customer Profile" >
                        <div>
                            aaaaa
                        </div>
                    </SectionCard>
                    <SectionCard title="Customer Profile" >
                        <div>
                            aaaaa
                        </div>
                    </SectionCard>
                    <SectionCard title="Customer Profile" >
                        <div>
                            aaaaa
                        </div>
                    </SectionCard>
                    <SectionCard title="Customer Profile" >
                        <div>
                            aaaaa
                        </div>
                    </SectionCard>
                    <FloatingWidget
                        status={status}
                        setStatus={setStatus}
                    >
                        <FormNewCase />
                    </FloatingWidget>
                </div>
            </Container>
        </>
    );
};

export default CustomerDashboard;
