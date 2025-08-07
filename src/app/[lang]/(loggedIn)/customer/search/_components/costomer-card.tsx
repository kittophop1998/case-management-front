'use client';
import { Typography } from "@/components/common/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Customer } from "@/types/customer.type";
import { useRouter } from 'next/navigation'


export const CostomerCard = ({ code, name, img }: Customer) => {
    const router = useRouter()
    return (
        <Card className="p-4 flex items-center gap-4 cursor-pointer"
            onClick={() => router.push(`/customer/dashboard?costomerId=${code}`)}>
            <Avatar className='h-[2.5rem] w-[2.5rem]'>
                <AvatarImage src={img} />
                <AvatarFallback className='bg-primary/10'>
                    {name?.[0] ?? ''}
                    {name?.[1] ?? ''}
                </AvatarFallback>
            </Avatar>
            <Typography variant="body1">Customer Name: {name}</Typography>
            <Typography variant="body1">Customer ID: {code}</Typography>
        </Card>
    );
}