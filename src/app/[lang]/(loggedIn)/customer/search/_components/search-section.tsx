'use client';
import { SearchFieldInput } from "@/components/form/search-field";
import { CostomerCard } from "./costomer-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { useRouter } from 'next/navigation'
import { useLazySearchCustomerQuery } from "@/features/customers/customersApiSlice";
import { getErrorText } from "@/services/api";
import { Typography } from "@/components/common/typography";
import { FormError } from "@/components/form/form-error";

export const SearchSection = ({
    query = '',
    lang = 'en'
}: {
    query?: string;
    lang?: 'en' | 'th';
}) => {
    const router = useRouter()
    const [searchCustomer, { data: costumer, isFetching, isError, error }] = useLazySearchCustomerQuery();
    const [search, setSearch] = useState<string>(query);
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
        <div className="mx-auto max-w-xl">
            <SearchFieldInput
                loading={isFetching}
                placeholder="Search Customer ID/AEON ID"
                field={{
                    value: search,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
                }}
            />

        </div>
        <div className="flex justify-center">
            <Button className="min-w-[15rem]" loading={isFetching} onClick={handleSearch}>
                Search
            </Button>
        </div>

        <div className="mx-auto max-w-md space-y-3">
            {/* <FormError message={isError ? getErrorText(error) : undefined}></FormError> */}
            {costumer?.data ?
                <CostomerCard code={costumer.data.code} name={costumer.data.name} img={costumer.data.img} />
                :
                (isSearhted ?
                    <div className="text-center space-y-6">
                        {/* <div > Not Fond</div> */}
                        <>{isError ?
                            <div className="space-y-3">
                                <div>{getErrorText(error) || 'Not Fond'}</div>
                                <div><Button>Inquiry & Disposition</Button></div>
                            </div> : undefined}
                        </>
                    </div> : null)
            }
        </div >
    </div >
}