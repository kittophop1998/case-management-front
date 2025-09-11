'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ClipboardPlus } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation'
import usePermission from "@/hooks/use-permission";
// 
import { FormNewCase, FormNewCaseRef } from "@/components/case/form-new-case-inquiry";
import BtnNew from "@/components/button/btn-new";
import { DialogSelectCaseType } from "@/components/case/dialog-select-case-type";
import Container from "@/components/common/containter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/common/typography";
import { FloatingWidget } from "@/components/common/floating-widget";
// 
import { NoteButtonNoti } from "@/components/note/note-button-noti";
import { FormCreateNote } from "@/components/note/form-create-note";
// 
import { StatusCustomerFeeling } from "@/components/customer/status-customer-feeling";
import { StatusComplaintLv } from "@/components/customer/status-complaint-lv";
import { StatusCustomer } from "@/components/customer/status-customer";
import { StatusPayment } from "@/components/customer/status-payment";
import { StatusMobileApp } from "@/components/customer/status-mobile-app";
// 
import { DataWithCopy } from "./_components/data-with-copy";
import { SectionCard } from "./_components/section-card";
import { DisplayValue } from "./_components/display-value";
import { useCustomerInfo } from "@/hooks/use-customer-info";
import { ChartAreaDefault } from "@/components/chart/mockup";
import { StatusVerify } from "@/components/customer/status-verify";
import { Skeleton } from "@/components/ui/skeleton";
import { Promotion } from "@/types/promotion.type";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLazyGetCustomerNotesQuery } from "@/features/noteApiSlice";
import { CaseTypeText } from "@/types/case.type";
import { lang } from "@/services/api";

type SuggestionCardProps = {
    loading: boolean
    suggestPromotions?: Promotion[]
}

const SuggestionCard = ({ loading, suggestPromotions = [] }: SuggestionCardProps) => {
    const [page, setPage] = useState<number>(1)
    const promotion = useMemo(() => suggestPromotions[page - 1] || {
        promotionCode: '',
        promotionName: '',
        promotionDetails: '',
        action: '',
        promotionResultTimestamp: '',
        period: '',
        eligibleCard: ['']
    }, [page, suggestPromotions])
    return <SectionCard title="Suggested Promotion" TopRight={
        <>
            {loading ?
                <Skeleton className="min-w-[6rem] py-1 px-2 text-transparent" >-</Skeleton> :
                <>
                    {/* <Popover>
                <PopoverTrigger asChild> */}
                    <div className="min-w-[6rem] justify-center cursor-pointer bg-[#f2d5fb] py-1 px-2 rounded-md text-sm flex items-center gap-1">
                        {promotion.action}
                        {/* TODO: COLOR */}
                        <ChevronDown size={18} color="#722ed1" />
                    </div>
                    {/* </PopoverTrigger>
                <PopoverContent className="w-[9rem] py-1 px-0">
                    <div >
                        {
                            [1, 1, 1, 1].map((item) => (
                                <div className="cursor-pointer hover:bg-gray-600/10">aaaaaaaaaaaaaa</div>
                            ))
                        }
                    </div>
                </PopoverContent>
            </Popover> */}

                </>
            }


        </>
    } className={cn("lg:col-span-4 md:col-span-6 col-span-12")}>
        <div className="space-y-3 mt-1">
            <div className="space-y-1">
                {loading ? <Skeleton className="w-[10rem] text-transparent w-full" >
                    <Typography className="line-clamp-1">-</Typography>
                </Skeleton> : <Typography className="line-clamp-1">{promotion.promotionName}</Typography>}
                <div className="flex gap-1">
                    <Typography variant="caption" className="line-clamp-1 flex">
                        Period:
                    </Typography>
                    {loading ?
                        <Skeleton className="w-[10rem]" >
                            <Typography variant="caption" className="text-transparent">-</Typography>
                        </Skeleton> :
                        <Typography variant="caption" className="line-clamp-1"> {promotion.period}</Typography>}
                </div>
                <div className="flex gap-1">
                    <Typography variant="caption" className="line-clamp-1 flex">
                        Eligible Card:
                    </Typography>
                    {loading ?
                        <Skeleton className="w-[10rem]" >
                            <Typography variant="caption" className="text-transparent">-</Typography>
                        </Skeleton> : <Typography variant="caption" className="line-clamp-1 flex">  {promotion.eligibleCard.join(',')}</Typography>}
                </div>
            </div>
            {
                loading ?
                    <Skeleton className="h-[10.5rem] w-full" />
                    :
                    <div className="bg-[#D5A3F926] p-3 rounded-md h-[10.5rem]">
                        <Typography variant="body2" className="line-clamp-6 leading-6">{promotion.promotionDetails}</Typography>
                    </div>
            }

            <div className="flex justify-between">
                {
                    loading ?
                        <Skeleton className="h-[0.7rem] w-[3rem]" /> :
                        <Typography variant="caption">{page}/{suggestPromotions.length} results</Typography>

                }
                <div className="gap-3 flex">
                    <Button disabled={loading || page === 1} onClick={() => setPage(v => v - 1)}>Previous</Button>
                    <Button disabled={loading || suggestPromotions.length <= page} onClick={() => setPage(v => v + 1)}>Next</Button>
                </div>
            </div>
        </div>
        {/* {JSON.stringify(promotion)} */}
    </SectionCard>
}

type CustomerDashboardProps = {
    customerId: string;
}

const CustomerDashboard = ({ customerId }: CustomerDashboardProps) => {
    const router = useRouter()
    const formNewCaseRef = useRef<FormNewCaseRef>(null)
    const { myPermission } = usePermission()
    const {
        customer,
        loading,
        fetch,
    } = useCustomerInfo(customerId)

    useEffect(() => {
        if (!customerId) {
            console.log('!!not have query customerId')
            return
        }
        fetch(['custsegment', 'info', 'profile', 'suggestion'])
    }, [customerId]);

    const [openSelectCase, setOpenSelectCase] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [statusNote, setStatusNote] = useState<boolean>(false);
    const onSelectCase = (id: string, caseType: CaseTypeText = 'Inquiry') => {
        setOpenSelectCase(false);
        setStatus(true)
        formNewCaseRef.current?.onOpen(id, customerId, caseType)
    }
    const handleOpenSelectCase = () => {
        setOpenSelectCase(true);
        setStatus(false);
        setStatusNote(false);
    }

    const [getData, { data: tableNotes, isFetching: isFetchingTableNotes }] = useLazyGetCustomerNotesQuery();
    const refetchNotes = () => {
        if (!customerId) return
        getData({
            customerId,
            page: 1,
            limit: 1,
            sort: null,
            keyword: '',
            createdDate: '',
        })
    }
    useEffect(() => {
        refetchNotes()
    }, [customerId])

    return (
        <div>
            <Tabs defaultValue="account">
                <TabsList className="bg-white w-full flex justify-start rounded-none pb-0 ">
                    <Container >
                        <TabsTrigger value="account" className="cursor-pointer data-[state=active]:cursor-default my-0 w-[200px] max-w-[300px] data-[state=active]:shadow-none  rounded-none border-0 data-[state=active]:border-b-4  border-[#5570f1] data-[state=inactive]:hover:text-primary">Overview</TabsTrigger>
                        <TabsTrigger value="password" className="cursor-pointer data-[state=active]:cursor-default my-0 w-[200px] max-w-[300px] data-[state=active]:shadow-none  rounded-none border-0 data-[state=active]:border-b-4  border-[#5570f1] data-[state=inactive]:hover:text-primary">Product</TabsTrigger>
                    </Container>
                </TabsList>
                <Container className="space-y-4 my-3">
                    <DialogSelectCaseType
                        open={openSelectCase}
                        setOpen={setOpenSelectCase}
                        onSelect={onSelectCase}
                    />
                    <div className="flex gap-3 h-[2rem]">
                        <DataWithCopy title='Aeon ID' value='#47378877' showCopy loading={loading.info} />
                        <DataWithCopy title='Customer ID/Passport' value={customer.info?.nationalId} loading={loading.info} showCopy />
                        <DataWithCopy title='Customer Since' value='2024-02-02' loading={loading.info} />
                        <div className="flex-1" />
                        {
                            myPermission?.["add.case"] &&
                            <BtnNew
                                disabled={!(customer.info?.customerNameEng || customer.info?.customerNameTh)}
                                onClick={handleOpenSelectCase}
                            />
                        }
                    </div>
                    <TabsContent value="account" className="max-w-none">
                        <div className="grid grid-cols-12 gap-4">
                            <SectionCard title={customer.info?.customerNameEng} TopRight={
                                <>
                                    <StatusVerify status='1' loading={loading.info} />
                                </>
                            } className={cn("lg:col-span-4 md:col-span-6 col-span-12")} loadingTitle={loading.info} >
                                <>
                                    <div className="flex gap-3  mt-0">
                                        <StatusComplaintLv lv={customer.custsegment?.complaintLevel} loading={loading.info} />
                                        <StatusCustomerFeeling status={customer.custsegment?.sweetheart} loading={loading.info} />
                                    </div>
                                    <div className="grid grid-cols-6 gap-2">
                                        <DisplayValue title="Phone" loading={loading.info} value={
                                            <div className="flex gap-1">
                                                <Typography variant="body2">{'+66'}</Typography>
                                                <Typography variant="body2" className="text-[#FA541C]">{customer.info?.mobileNO}</Typography>
                                            </div>
                                        } className="col-span-3" />
                                        <DisplayValue title="Email" value={customer.info?.customerNameEng} loading={loading.info} className="col-span-3 " />
                                        <DisplayValue title="Status" value={<StatusCustomer status={'Normal'} />} loading={loading.info} className="col-span-2" />
                                        <DisplayValue title="Customer Type:" value={customer.custsegment?.customerType} loading={loading.info} className="col-span-2" />
                                        <DisplayValue title="Customer Group" value={customer.custsegment?.complaintGroup} loading={loading.info} className="col-span-2" />
                                        <DisplayValue title="Payment Status" value={<StatusPayment status='On-Time' />} loading={loading.info} className="col-span-2" />
                                        <DisplayValue title="Segment" value={customer.custsegment?.customerSegment} loading={loading.info} className={cn("col-span-4")} />
                                        <DisplayValue title="Mobile App Status" value={<StatusMobileApp status='Active' />} loading={loading.info} className="col-span-2" />
                                        <DisplayValue title="Gender" value={customer.profile?.gender} loading={loading.info} className="col-span-2" />
                                        {
                                            (myPermission?.["view.custnote"] || myPermission?.["add.custnote"]) &&
                                            <DisplayValue title="Notes"
                                                value={
                                                    <div className="flex items-center gap-1">
                                                        {
                                                            myPermission?.["view.custnote"] &&
                                                            <NoteButtonNoti
                                                                onClick={() => router.push(`/${lang}/customer/dashboard/note/list?customerId=${customerId}`)}
                                                                // count={0}
                                                                n={tableNotes?.total || 0}
                                                                size='sm'
                                                            />}
                                                        {
                                                            myPermission?.["add.custnote"] &&
                                                            <>
                                                                <Button variant='ghost' size='sm'
                                                                    onClick={() => {
                                                                        setStatus(false)
                                                                        setStatusNote(true)
                                                                    }}
                                                                >
                                                                    <ClipboardPlus />
                                                                </Button>
                                                            </>
                                                        }
                                                    </div>
                                                } className="col-span-6 flex items-center gap-3" classNameValue='flex-1' />}
                                    </div>
                                </>
                            </SectionCard>
                            <SuggestionCard loading={loading.info} suggestPromotions={customer.suggestion?.suggestPromotions} />
                            <SectionCard title="Case History" TopRight={null} className={cn("lg:col-span-4 md:col-span-4 col-span-12")}>
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
                                    <div className="max-w-[25rem] w-[100%] min-w-[10rem] mx-auto">
                                        <ChartAreaDefault />
                                    </div>
                                    <div className="flex justify-end">
                                        <Typography variant="caption">
                                            See all
                                        </Typography>
                                    </div>
                                </>
                            </SectionCard>
                            <SectionCard title="Top Purchased Categories" TopRight={null} className={cn("lg:col-span-4 md:col-span-4 col-span-12 min-h-[20rem]")}>
                                <>

                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                </>
                            </SectionCard>
                            <SectionCard title="Suggested Card" TopRight={null} className={cn("lg:col-span-3 md:col-span-4 col-span-12")} >
                                <>

                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                </>
                            </SectionCard>
                            <SectionCard title="Last Activity" TopRight={null} className={cn("lg:col-span-5 md:col-span-12 col-span-12")}>
                                <>
                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                    <Typography >{""}</Typography>
                                </>
                            </SectionCard>
                        </div>
                    </TabsContent>
                    <TabsContent value="password" className="w-full max-w-none h-[70vh]">
                        <div className="flex gap-3 h-full">
                            <div className="bg-white">
                                <div className="w-[500px]"></div>
                            </div>
                            <div className="flex-1 flex flex-col gap-3 h-full">
                                <div className="flex w-full gap-3">
                                    <div className="bg-white flex-1 h-[200px]"></div>
                                    <div className="bg-white flex-1 h-[200px]"></div>
                                    <div className="bg-white flex-1 h-[200px]"></div>
                                </div>
                                <div className="bg-white flex-1"></div>
                            </div>
                        </div>
                    </TabsContent>
                </Container>
            </Tabs >
            <FloatingWidget
                title="New Case"
                status={status}
                setStatus={setStatus}
            >
                <FormNewCase
                    ref={formNewCaseRef} />
            </FloatingWidget>
            <FloatingWidget
                title="New Customer Note"
                status={statusNote}
                setStatus={setStatusNote}
            >
                <FormCreateNote
                    customerId={customerId || ''}
                    afterPost={
                        () => refetchNotes()
                    }
                />
            </FloatingWidget>

        </div>
    );
};

export default CustomerDashboard;
