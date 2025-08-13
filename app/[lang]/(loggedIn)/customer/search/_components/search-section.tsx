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
        <div className="flex gap-6 items-center mx-auto max-w-3xl">
            <div
                className="flex-1"
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
            <Button className="min-w-[10rem]" loading={isFetching} onClick={handleSearch}>
                Search
            </Button>
        </div>

        <div className="mx-auto max-w-md space-y-3">
            {/* <FormError message={isError ? getErrorText(error) : undefined}></FormError> */}
            {costumer?.data ?
                <CustomerCard code={costumer.data.code} name={costumer.data.name} img={costumer.data.img} />
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

        <FloatingWidget
            title="New Case"
            status={status}
            setStatus={setStatus}
        >
            <FormNewCase />
        </FloatingWidget>
    </div >
}