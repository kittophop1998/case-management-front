'use client';
import Container from "@/components/common/containter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/common/typography";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { FloatingWidget } from "@/components/common/floating-widget";
import { FormNewCase } from "@/components/case/form-new-case";
import { cn } from "@/lib/utils";
import { ClipboardPlus, FileText } from "lucide-react";
import { NoteButtonNoti } from "@/components/note/note-button-noti";

const DisplayDerivedValue = ({ title, value, className, classNameValue }: { title: string, value: any, className?: string, classNameValue?: string }) => {
    return (
        <div className={cn('pb-2', className)}>
            <Typography variant="caption">{title}</Typography>
            <Typography variant="body2" className={classNameValue}>{value}</Typography>
        </div>
    )
}
const SectionCard = ({ title, children, TopRight = null, className }: { title: string, children: React.ReactNode, TopRight: React.ReactNode, className?: string }) => {
    return (
        <Card className={cn("p-4 shadow-none rounded-sm outline-0 border-0", className)}>
            <div className="flex items-center justify-between">
                <Typography variant="h4">{title}</Typography>
                {TopRight}
            </div>
            {children}
        </Card>
    );
}

const CustomerDashboard = () => {
    const router = useRouter()

    const customerId = "9712333456234";
    const costumerType = "Individual";
    const customerSince = "2023-10-01";
    const customer = {
        phone: "+66 0656506331",
        email: "surapong.Lert@gmail.com",
        status: "Normal",
        type: "VP",
        group: "Nomal-VIP",
        'paymentStatus': 'On-Time',
        segment: 'Existing Customer - Active',
        mobileAppStatus: 'Active',
        gender: 'Men',
        note: {
            count: 3,
        }

    }
    const customerName = "Surapong Lertprayapat";
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
                <div className="grid grid-cols-12 gap-4">
                    <SectionCard title={customerName} TopRight={null} className="col-span-4" >
                        <>
                            <div className="grid grid-cols-6 gap-4">
                                <DisplayDerivedValue title="Phone" value={customer.phone} className="col-span-3" />
                                <DisplayDerivedValue title="Email" value={customer.email} className="col-span-3" />
                                <DisplayDerivedValue title="Status" value={customer.status} className="col-span-2" />
                                <DisplayDerivedValue title="Type" value={customer.type} className="col-span-2" />
                                <DisplayDerivedValue title="Group" value={customer.group} className="col-span-2" />
                                <DisplayDerivedValue title="Payment Status" value={customer.paymentStatus} className="col-span-2" />
                                <DisplayDerivedValue title="Segment" value={customer.segment} className="col-span-2" />
                                <DisplayDerivedValue title="Mobile App Status" value={customer.mobileAppStatus} className="col-span-2" />
                                <DisplayDerivedValue title="Mobile App Status"
                                    value={
                                        <div className="flex items-center gap-2">
                                            {/* <Button className="mt-2" variant='ghost' size='sm' onClick={() => router.push('/customer/dashboard/note/list?')}>
                                                <FileText />
                                            </Button> */}
                                            <NoteButtonNoti
                                                onClick={() => router.push('/customer/dashboard/note/list?')}
                                                count={customer.note.count}
                                                size='sm'
                                            />

                                            <Button variant='ghost' size='sm' >
                                                <ClipboardPlus />
                                            </Button>
                                            <Button className=" bg-black white-text" size='sm'
                                                onClick={() => setStatus((v) => !v)}
                                            >New Note</Button>
                                        </div>
                                    } className="col-span-6 flex items-center gap-3" classNameValue='flex-1' />
                            </div>
                        </>
                    </SectionCard>
                    <SectionCard title="Customer Profile" TopRight={null} className="col-span-4">
                        <>
                            <Typography >Customer Since: {customerSince}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                        </>
                    </SectionCard>
                    <SectionCard title="Customer Profile" TopRight={null} className="col-span-4">
                        <>
                            <Typography >Customer Since: {customerSince}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                        </>
                    </SectionCard>
                    <SectionCard title="Customer Profile" TopRight={null} className="col-span-4">
                        <>
                            <Typography >Customer Since: {customerSince}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                        </>
                    </SectionCard>
                    <SectionCard title="Customer Profile" TopRight={null} className="col-span-3" >
                        <>
                            <Typography >Customer Since: {customerSince}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                        </>
                    </SectionCard>
                    <SectionCard title="Customer Profile" TopRight={null} className="col-span-5" >
                        <>
                            <Typography >Customer Since: {customerSince}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                            <Typography >Customer Type: {costumerType}</Typography>
                        </>
                    </SectionCard>
                    <FloatingWidget
                        title="New Case"
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
