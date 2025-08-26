'use client';
import { SearchFieldInput } from "@/components/form/search-field";
import { CustomerCard } from "./customer-card";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/common/Button";
import { useRouter } from 'next/navigation'
import { useLazyCustomerCustinfoQuery } from "@/features/customers/customersApiSlice";
import { getErrorText } from "@/services/api";
import { FloatingWidget } from "@/components/common/floating-widget";
import { FormNewCase, FormNewCaseRef } from "@/components/case/form-new-case";
import useCaseType from "@/hooks/use-case-type";

export const SearchSection = ({
    lang = 'en'
}: {
    lang?: 'en' | 'th';
}) => {
    const formNewCaseRef = useRef<FormNewCaseRef>(null)
    const [status, setStatus] = useState<boolean>(false);
    const router = useRouter()
    const [searchCustomer, {
        // data: costumer,
        isFetching, isError, error, reset, currentData: costumer }] = useLazyCustomerCustinfoQuery();
    const [search, setSearch] = useState<string>('');
    const [isSearhted, setIsSearhted] = useState<boolean>(false);
    const handleSearch = async () => {
        try {
            let data = await searchCustomer({
                id: search
            }).unwrap()
            console.log('data:', data)
        } catch (error: unknown) {
            // reset()
            // console.log(`currentData`, currentData)
            console.log('error', (error as any).message)
        }
        setIsSearhted(true)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push(`/${lang}/customer/search?q=${encodeURIComponent(search)}`);
        }, 400);
        return () => clearTimeout(timeout);
    }, [search]);
    const {
        functions: { getByName },
        // Inquiry and disposition
    } = useCaseType();



    const openDialogInquiry = async () => {
        const forceName = 'Inquiry and disposition'
        const inqID = await getByName(forceName)
        console.log('inqID:', inqID)
        if (inqID) {
            formNewCaseRef.current?.onOpen(inqID, search)
            setStatus(true)
        } else {
            alert(`Not found case type: ${forceName}`)
        }



    }
    return <div className="space-y-6 mt-6">

        <div className="mx-auto max-w-3xl space-y-6">
            <form className="block space-y-3 md:space-y-0 md:flex md:gap-6 md:items-center justify-center">
                <div className="w-full flex flex-col gap-3 md:flex-row ">
                    <div className='flex-1'></div>
                    <div className="w-[100%] md:w-[50%] ">
                        <SearchFieldInput
                            loading={isFetching}
                            placeholder="Search Customer ID/AEON ID"
                            field={{
                                value: search,
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
                            }}
                        />
                    </div>
                    <div className='flex-1 relative'>
                        <Button className="min-w-full md:min-w-[10rem] absolute" loading={isFetching} onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                </div>
            </form>
            <div className="w-full flex flex-col gap-3 md:flex-row  ">
                <div className='flex-1'></div>
                <div className="w-[100%] md:w-[50%]  mt-6 md:mt-0">
                    {JSON.stringify(costumer)}
                    {costumer ?
                        <CustomerCard
                            {...costumer || {}}
                        />
                        :
                        (isSearhted ?
                            <div className="text-center space-y-6">
                                <>{isError ?
                                    <div className="space-y-3">
                                        <div>{getErrorText(error) || 'Not Fond'}</div>
                                        <div><Button onClick={openDialogInquiry}>Inquiry & Disposition</Button></div>
                                    </div>
                                    : undefined}
                                </>
                            </div> : null)
                    }
                </div>
                <div className='flex-1'>
                </div>
            </div>
        </div>



        <FloatingWidget
            title="New Case"
            status={status}
            setStatus={setStatus}
        >
            <FormNewCase
                ref={formNewCaseRef}
            />
        </FloatingWidget>
    </div >
}