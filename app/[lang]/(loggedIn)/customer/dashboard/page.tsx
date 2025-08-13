'use client';
import Container from "@/components/common/containter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/common/typography";
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from "react";
import { FloatingWidget } from "@/components/common/floating-widget";
import { FormNewCase } from "@/components/case/form-new-case";
import { cn } from "@/lib/utils";
import { ClipboardPlus, Files, Phone } from "lucide-react";
import { NoteButtonNoti } from "@/components/note/note-button-noti";
import { StatusCustomerFeeling } from "@/components/customer/status-customer-feeling";
import { StatusComplaintLv } from "@/components/customer/status-complaint-lv";
import { StatusCustomer } from "@/components/customer/status-customer";
import { StatusPayment } from "@/components/customer/status-payment";
import { StatusMobileApp } from "@/components/customer/status-mobile-app";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BtnNew from "@/components/button/btn-new";
import { CreateNewNoteTemplate } from "@/components/note/form-create-note";
import { DialogSelectCaseType } from "@/components/case/dialog-select-case-type";
import { useLazySearchCustomerQuery } from "@/features/customers/customersApiSlice";
import { Customer } from "@/types/customer?.type";
import Lock from '@/public/icons/Lock.svg'
import VerifyPass from '@/public/icons/VerifyPass.svg'
import { ChartAreaDefault } from "@/components/chart/mockup";


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

const DataWithCopy = ({ title, value, showCopy = false, loading }: { value: string, title: string, showCopy?: boolean }) => {
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
    const [searchCustomer, { data, isFetching, isError, error }] = useLazySearchCustomerQuery();
    const customer: Customer | undefined = useMemo(() => data?.data, [data]);
    const router = useRouter()
    useEffect(() => {
        searchCustomer({
            id: 'aaaaaa'
        })
    }, []);
    const [openSelectCase, setOpenSelectCase] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [statusNote, setStatusNote] = useState<boolean>(false);
    const onSelectCase = (value: string) => {
        console.log("Selected case type:", value);
        setOpenSelectCase(false);
        setStatus(true)
    }
    const handleOpenSelectCase = () => {
        setOpenSelectCase(true);
        setStatus(false);
        setStatusNote(false);
    }
    if (isFetching) return <></>
    // if (!customer) return <>ERROR</>
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
                    <DialogSelectCaseType
                        open={openSelectCase}
                        setOpen={setOpenSelectCase}
                        onSelect={onSelectCase}
                    />
                    <div className="flex gap-3">
                        <DataWithCopy title='Aeon ID' value='#47378877' showCopy />
                        <DataWithCopy title='Customer ID/Passport' value='9712333456234' showCopy />
                        <DataWithCopy title='Customer Since' value='2024-02-02' />
                        <div className="flex-1" />
                        <BtnNew
                            // onClick={() => setStatus((v) => !v)}
                            onClick={handleOpenSelectCase}
                        />

                        <Button className="bg-[#FA541C]">

                            <Phone />
                            End call</Button>
                    </div>
                    <TabsContent value="account" className="max-w-none">
                        <div className="grid grid-cols-12 gap-4">
                            <SectionCard title={customer?.name} TopRight={
                                <>
                                    <VerifyPass className='size-7' />
                                </>
                            } className={cn("col-span-4")} >
                                <>
                                    <div className="flex gap-3  mt-0">
                                        <StatusComplaintLv lv={1} />
                                        <StatusCustomerFeeling status='Sweetheart' />
                                    </div>
                                    <div className="grid grid-cols-6 gap-4 ">
                                        <DisplayDerivedValue title="Phone" value={
                                            <div className="flex gap-1">
                                                <Typography variant="body2">{customer?.status ? '+66' : ''}</Typography>
                                                <Typography variant="body2" className="text-[#FA541C]">{customer?.status ? '0656506331' : ''}</Typography>
                                            </div>
                                        } className="col-span-3" />
                                        <DisplayDerivedValue title="Email" value={customer?.email} className="col-span-3 " />
                                        <DisplayDerivedValue title="Status" value={<StatusCustomer status={customer?.status} />} className="col-span-2" />
                                        <DisplayDerivedValue title="Customer Type:" value={customer?.type} className="col-span-2" />
                                        <DisplayDerivedValue title="Customer Group" value={customer?.group} className="col-span-2" />
                                        <DisplayDerivedValue title="Payment Status" value={<StatusPayment status={customer?.paymentStatus} />} className="col-span-2" />
                                        <DisplayDerivedValue title="Segment" value={customer?.segment} className={cn("col-span-4")} />
                                        <DisplayDerivedValue title="Mobile App Status" value={<StatusMobileApp status={customer?.mobileAppStatus} />} className="col-span-2" />
                                        <DisplayDerivedValue title="Gender" value={customer?.status ? 'Men' : ''} className="col-span-2" />
                                        {/* Gender */}
                                        <DisplayDerivedValue title="Notes"
                                            value={
                                                <div className="flex items-center gap-1">
                                                    <NoteButtonNoti
                                                        onClick={() => router.push('/customer/dashboard/note/list?')}
                                                        count={customer?.note.count}
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
                            <SectionCard title="Suggested Promotion" TopRight={null} className={cn("col-span-4")}>
                                <>

                                    <Typography >BIC CAMERA Coupon with Aeon Credit Card</Typography>
                                    <Typography variant="caption">Period: 01 Apr 2025 - 30 Dec 2025</Typography>
                                    <Typography variant="caption">Eligible Card:  BIG C WORLD MASTERCARD</Typography>
                                    <div className="bg-[#D5A3F926] p-3 rounded-md">
                                        <Typography>ซื้อสินค้าปลอดภาษี สูงสุด 10% และ รับส่วนลด สูงสุด 7% เมื่อซื้อสินค้า ที่ร้าน BicCamera ประเทศญี่ปุ่น, ร้าน Air BicCamera และ ร้าน KOJIMA ด้วย บัตรเครดิตอิออนทุกประเภท โยกเว้นบัตรเครดิต เพื่อองค์กร ซึ่ง BicCamera เป็นห้างสรรพสินจำหน่ายสินค้าหลากหลายประเภท เช่นเครื่องใช้ไฟฟ้า ยา เครื่องสำอาง และของใช้ใน ชีวิตประจำวัน  โปรดแสดง ภาพบาร์โค้ดบนสื่อ ประชาสัมพันธ์นี้ ที่แคชเชียร์</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography>1/9 results</Typography>
                                        <div className="gap-3 flex">
                                            <Button disabled>Previous</Button>
                                            <Button>Next</Button>
                                        </div>
                                    </div>
                                </>
                            </SectionCard>
                            <SectionCard title="Case History" TopRight={null} className={cn("col-span-4")}>
                                <>
                                    <div className="grid grid-cols-3 gap-3">
                                        {
                                            [
                                                {
                                                    name: 'Open Case',
                                                    value: 5
                                                }, {
                                                    name: 'Open Case',
                                                    value: 5
                                                }, {
                                                    name: 'Open Case',
                                                    value: 5
                                                },
                                            ].map((item, index) => (
                                                <div key={index} className="">
                                                    <Typography >{item.name}</Typography>
                                                    <Typography >{item.value}</Typography>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <ChartAreaDefault />
                                    <div className="flex justify-end">
                                        <Typography variant="caption">
                                            See all
                                        </Typography>
                                    </div>
                                </>
                            </SectionCard>
                            <SectionCard title="Top Purchased Categories" TopRight={null} className={cn("col-span-4 min-h-[20rem]")}>
                                <>

                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                </>
                            </SectionCard>
                            <SectionCard title="Suggested Card" TopRight={null} className={cn("col-span-3")} >
                                <>

                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                </>
                            </SectionCard>
                            <SectionCard title="Last Activity" TopRight={null} className={cn("col-span-5")}>
                                <>

                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                </>
                            </SectionCard>

                        </div>
                    </TabsContent>
                    <TabsContent value="password" className="w-full max-w-none h-[70vh]">
                        {/* <div className="w-full bg-white px-3 h-[50vh]"></div> */}
                        <div className="flex gap-3 h-full">
                            <div className="bg-white">
                                <div className="w-[500px]"></div>
                            </div>
                            <div className="flex-1 flex flex-col gap-3 h-full">
                                <div className="flex w-full gap-3">
                                    <div className="bg-white flex-1 h-[200px]"></div>
                                    <div className="bg-white flex-1 h-[200px]"></div>
                                    <div className="bg-white flex-1  h-[200px]"></div>
                                </div>
                                <div className="bg-white flex-1"></div>
                            </div>
                        </div>
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