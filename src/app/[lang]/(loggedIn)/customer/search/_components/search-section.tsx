'use client';
import { SearchFieldInput } from "@/components/form/search-field";
import { CostomerCard } from "./costomer-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { useRouter } from 'next/navigation'

export const SearchSection = ({
    query = '',
    lang = 'en'
}: {
    query?: string;
    lang?: 'en' | 'th';
}) => {
    const [search, setSearch] = useState<string>(query);
    const [isSearhted, setIsSearhted] = useState<boolean>(false);
    let costumer = {
        code: '1234567890',
        name: 'John Doe',
        img: 'https://via.placeholder.com/150'
    }
    // costumer = null
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
            {costumer ?
                <CostomerCard code={costumer.code} name={costumer.name} img={costumer.img} />
                :
                (isSearhted ?
                    <div className="text-center space-y-6">
                        <div > Not Fond</div>
                        <div><Button>Inquiry & Disposition</Button></div>
                    </div> : null)
            }
        </div >
    </div >
}