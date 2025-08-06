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
import { ClipboardPlus, Files } from "lucide-react";
import { NoteButtonNoti } from "@/components/note/note-button-noti";
import { StatusCostomerFeeling } from "@/components/customer/status-customer-feeling";
import { StatusComplaintLv } from "@/components/customer/status-complaint-lv";
import { StatusCostomer } from "@/components/customer/status-customer";
import { StatusPayment } from "@/components/customer/status-payment";
import { StatusMobileApp } from "@/components/customer/status-mobile-app";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BtnNew from "@/components/button/btn-new";
import { CreateNewNoteTemplate } from "@/components/note/form-create-note";

const DisplayDerivedValue = ({ title, value, className, classNameValue }: { title: string, value: any, className?: string, classNameValue?: string }) => {
    if (typeof value === 'string') {
        value = <Typography variant="body2" className={classNameValue}>{value}</Typography>
    }
    return (
        <div className={cn('pb-2', className)}>
            <Typography variant="caption">{title}</Typography>
            {value}
        </div>
    )
}
const SectionCard = ({ title, children, TopRight = null, className }: { title: string, children: React.ReactNode, TopRight: React.ReactNode, className?: string }) => {
    return (
        <Card className={cn("p-4 shadow-none rounded-sm outline-0 border-0 gap-3", className)}>
            <div className="flex items-center justify-between ">
                <Typography variant="h4">{title}</Typography>
                {TopRight}
            </div>
            {children}
        </Card>
    );
}

const DataWithCopy = ({ title, value, showCopy = false }: { value: string, title: string, showCopy?: boolean }) => {
    return (
        <div className="flex items-center gap-1">
            <Typography variant="body2">{title}</Typography>
            <Typography variant="body2" className="text-gray-500">{value}</Typography>
            {showCopy &&
                <Button variant='ghost' size='sm' >
                    <Files color='#5570F1' />
                </Button>}
        </div>
    );
}
const CustomerDashboard = () => {
    const router = useRouter()
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
    const [statusNote, setStatusNote] = useState<boolean>(false);
    return (
        <>
            <Tabs defaultValue="account">
                <TabsList className="bg-white w-full flex justify-start rounded-none pb-0">
                    <Container >
                        <TabsTrigger value="account" className="cursor-pointer data-[state=active]:cursor-default my-0 w-[200px] max-w-[300px] data-[state=active]:shadow-none  rounded-none border-0 data-[state=active]:border-b-4  border-[#5570f1]">Overview</TabsTrigger>
                        <TabsTrigger value="password" className="cursor-pointer data-[state=active]:cursor-default my-0 w-[200px] max-w-[300px] data-[state=active]:shadow-none  rounded-none border-0 data-[state=active]:border-b-4  border-[#5570f1]">Product</TabsTrigger>
                    </Container>
                </TabsList>
                <Container className="space-y-4 my-3">
                    <div className="flex gap-3">
                        <DataWithCopy title='Aeon ID' value='#47378877' showCopy />
                        <DataWithCopy title='Customer ID/Passport' value='9712333456234' showCopy />
                        <DataWithCopy title='Customer Since' value='2024-02-02' />
                        <div className="flex-1" />
                        <BtnNew
                            // onClick={() => setStatus((v) => !v)}
                            onClick={() => {
                                setStatusNote(false)
                                setStatus(true)
                            }
                            }
                        />

                        <Button>End call</Button>
                    </div>
                    <TabsContent value="account" className="max-w-none">
                        <div className="grid grid-cols-12 gap-4">
                            <SectionCard title={customerName} TopRight={<>ICON</>} className="col-span-4" >
                                <>
                                    <div className="flex gap-3  mt-0">
                                        <StatusComplaintLv lv={1} />
                                        <StatusCostomerFeeling status='Sweetheart' />
                                    </div>
                                    <div className="grid grid-cols-6 gap-4">
                                        <DisplayDerivedValue title="Phone" value={
                                            <div className="flex gap-1">
                                                <Typography variant="body2">+66</Typography>
                                                <Typography variant="body2" className="text-[#FA541C]">0656506331</Typography>
                                            </div>
                                        } className="col-span-3" />
                                        <DisplayDerivedValue title="Email" value={customer.email} className="col-span-3" />
                                        <DisplayDerivedValue title="Status" value={<StatusCostomer status={customer.status} />} className="col-span-2" />
                                        <DisplayDerivedValue title="Type" value={customer.type} className="col-span-2" />
                                        <DisplayDerivedValue title="Group" value={customer.group} className="col-span-2" />
                                        <DisplayDerivedValue title="Payment Status" value={<StatusPayment status={customer.paymentStatus} />} className="col-span-2" />
                                        <DisplayDerivedValue title="Segment" value={customer.segment} className="col-span-4" />
                                        <DisplayDerivedValue title="Mobile App Status" value={<StatusMobileApp status={customer.mobileAppStatus} />} className="col-span-2" />
                                        <DisplayDerivedValue title="Notes"
                                            value={
                                                <div className="flex items-center gap-1">
                                                    <NoteButtonNoti
                                                        onClick={() => router.push('/customer/dashboard/note/list?')}
                                                        count={customer.note.count}
                                                        size='sm'
                                                    />
                                                    <Button variant='ghost' size='sm' >
                                                        <ClipboardPlus />
                                                    </Button>
                                                    <Button className=" bg-black white-text" size='sm'
                                                        onClick={() => {
                                                            setStatus(false)
                                                            setStatusNote(true)
                                                        }

                                                        }
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

                        </div>
                    </TabsContent>
                    <TabsContent value="password" className="w-full max-w-none">
                        <div className="w-full bg-white px-3 h-[50vh]">Change your password here.</div>
                    </TabsContent>
                </Container>

            </Tabs>
            <FloatingWidget
                title="New Case"
                status={status}
                setStatus={setStatus}
            >
                <FormNewCase />
            </FloatingWidget>
            <FloatingWidget
                title="Create Note"
                status={statusNote}
                setStatus={setStatusNote}
            >
                <CreateNewNoteTemplate />
            </FloatingWidget>
        </>
    );
};

export default CustomerDashboard;
// 
// 
// 
