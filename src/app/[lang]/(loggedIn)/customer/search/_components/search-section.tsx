'use client';
import { SearchFieldInput } from "@/components/form/search-field";
import { CostomerCard } from "./costomer-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { useRouter } from 'next/navigation'

export const SearchSection = ({
    items = [],
    query = '',
    lang = 'en'
}: {
    items?: any[];
    query?: string;
    lang?: 'en' | 'th';
}) => {
    const [search, setSearch] = useState<string>(query);
    const costumers = items
    const router = useRouter()
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push(`/${lang}/customer/search?q=${encodeURIComponent(search)}`);
        }, 400);
        return () => clearTimeout(timeout);
    }, [search]);
    return <div className="space-y-6 mt-6">
        <div className="mx-auto max-w-xl">
            <SearchFieldInput
                placeholder="Search Customer ID/AEON ID"
                field={{
                    value: search,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
                }}
            />

        </div>
        <div className="flex justify-center">
            <Button className="min-w-[15rem]">
                Search
            </Button>
        </div>
        <div className="mx-auto max-w-md space-y-3">
            {costumers.map((item, index) => (
                <CostomerCard key={index} code={item.code} name={item.name} img={item.img} />
            ))}
        </div>
    </div>
}