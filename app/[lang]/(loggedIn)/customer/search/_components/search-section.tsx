'use client';
import { SearchFieldInput } from "@/components/form/search-field";
import { CustomerCard } from "./customer-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { useRouter } from 'next/navigation'
import { useLazySearchCustomerQuery } from "@/features/customers/customersApiSlice";
import { getErrorText } from "@/services/api";
import { FloatingWidget } from "@/components/common/floating-widget";
import { FormNewCase } from "@/components/case/form-new-case";

export const SearchSection = ({
    lang = 'en'
}: {
    lang?: 'en' | 'th';
}) => {
    const [status, setStatus] = useState<boolean>(false);
    const router = useRouter()
    const [searchCustomer, { data: costumer, isFetching, isError, error }] = useLazySearchCustomerQuery();
    const [search, setSearch] = useState<string>('');
    const [isSearhted, setIsSearhted] = useState<boolean>(false);
    const handleSearch = async () => {
        try {
            let data = await searchCustomer({
                id: search
            }).unwrap()
            console.log('data:', data)
        } catch (error) {
            console.log('asdasdas', error.message)
        }
        setIsSearhted(true)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push(`/${lang}/customer/search?q=${encodeURIComponent(search)}`);
        }, 400);
        return () => clearTimeout(timeout);
    }, [search]);

    return <div className="space-y-6 mt-6">
        <div className="mx-auto max-w-3xl space-y-6">
            <div className="block space-y-3 md:space-y-0 md:flex md:gap-6 md:items-center">
                <div
                    className="md:flex-1"
                >
                    <SearchFieldInput
                        loading={isFetching}
                        placeholder="Search Customer ID/AEON ID"
                        field={{
                            value: search,
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
                        }}
                    />
                </div>
                {/*  */}
                <Button className="min-w-full md:min-w-[10rem]" loading={isFetching} onClick={handleSearch}>
                    Search
                </Button>
                {/*  */}
            </div>
            <div className="mx-auto max-w-md space-y-3 w-full min-w-full">
                {/* <FormError message={isError ? getErrorText(error) : undefined}></FormError> */}
                {costumer?.data ?
                    <CustomerCard
                        {...costumer?.data || {}}
                    />
                    :
                    (isSearhted ?
                        <div className="text-center space-y-6">
                            <>{isError ?
                                <div className="space-y-3">
                                    <div>{getErrorText(error) || 'Not Fond'}</div>
                                    <div><Button onClick={() => setStatus(true)}>Inquiry & Disposition</Button></div>
                                </div>
                                : undefined}
                            </>
                        </div> : null)
                }
            </div >
        </div>



        <FloatingWidget
            title="New Case"
            status={status}
            setStatus={setStatus}
        >
            <FormNewCase />
        </FloatingWidget>
    </div >
}