'use client';
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useRouter } from 'next/navigation'


interface CostomerCardProps {
    code: string;
    name: string;
    img: string;
}
const CostomerCard = ({ code, name, img }: CostomerCardProps) => {
    const router = useRouter()

    return (
        // <Link href={`/customer/dashboard?costomerId=${code}`} >
        <Card className="p-4 flex items-center gap-4"
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
        // </Link>
    );
}


export default async function CostomerSearchPage({
    params
}: Readonly<{
    params: Promise<{ lang: 'en' | 'th' }>
}>) {
    const { lang } = await params

    const costumers = [
        { code: 'C001', name: 'John Doe', img: '/path/to/image1.jpg' },
        { code: 'C002', name: 'Jane Smith', img: '/path/to/image2.jpg' },
    ]
    return (
        <CardPageWrapper className="my-6">
            <Typography variant="h3" className="text-center">
                Search Customer ID/AEON ID
            </Typography>
            <div>
                INPUT search
            </div>
            <div className="mx-auto max-w-md">
                {costumers.map((item, index) => (
                    <CostomerCard key={index} code={item.code} name={item.name} img={item.img} />
                ))}
            </div>

        </CardPageWrapper>
    );
}
