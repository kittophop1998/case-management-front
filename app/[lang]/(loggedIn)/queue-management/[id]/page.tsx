import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import QueueManagementClientPage from "../_components/queue-management-client-page";
import Container from "@/components/common/containter";

export default function QueueManagementIDPage({
    // params
}: Readonly<{
    // params: Promise<{ lang: 'en' | 'th' }>
}>) {
    // const { lang } = await params
    return (
        <>
            <CardPageWrapper className="mt-4" >
                <>
                    <Typography variant="h6" className="mb-3">Queue List</Typography>
                </>
            </CardPageWrapper>
        </>
    )
}
