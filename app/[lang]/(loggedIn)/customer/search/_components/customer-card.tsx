'use client';
import { Typography } from "@/components/common/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AvatarUser } from "@/components/user/avatar";
import { CustomerResApiInfo } from "@/types/customer.type";
import { useRouter } from 'next/navigation'


export const CustomerCard = ({ nationalId, customerNameEng, customerNameTh }: Partial<CustomerResApiInfo>) => {
    const router = useRouter()
    return (
        <Card className="px-0 mx-0 cursor-pointer border-0 shadow-none pl-6 py-0"
            onClick={() => router.push(`/customer/dashboard?customerId=${nationalId}`)}
        >
            <div className="flex items-center gap-4  w-full ">

                <AvatarUser />
                {/* className="w-[2.5rem] h-[2.5rem]" */}
                <div className="flex gap-2">
                    <Typography variant="body2" className="font-medium">{nationalId}</Typography>
                    <Typography variant="body2" className="font-medium">{customerNameEng}</Typography>
                </div>
            </div>
        </Card>
    );
}