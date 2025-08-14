'use client';
import { Typography } from "@/components/common/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AvatarUser } from "@/components/user/avatar";
import { Customer } from "@/types/customer.type";
import { useRouter } from 'next/navigation'


export const CustomerCard = ({ nationalId, customerNameEng, customerNameTh, img }: Partial<Customer>) => {
    const router = useRouter()
    return (
        <Card className="p-4 cursor-pointer border-0 shadow-none"
            onClick={() => router.push(`/customer/dashboard?customerId=${nationalId}`)}
        >
            <div className="flex items-center gap-4  w-full">
                <AvatarUser />
                <div className="flex gap-2">
                    <Typography variant="body1">{nationalId}</Typography>
                    <Typography variant="body1">{customerNameEng}</Typography>
                </div>
            </div>
        </Card>
    );
}