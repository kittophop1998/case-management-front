import { Button } from "@/components/common/Button";
import CardPageWrapper from "@/components/common/card-page-warpper";
import Container from "@/components/common/containter";
import { Typography } from "@/components/common/typography";
import QueueManagementClientPage from "./_components/queue-management-client-page";
import { GoToCreate } from "./_components/goto-create";

export default function QueueManagementPage({
    // params
}: Readonly<{
    // params: Promise<{ lang: 'en' | 'th' }>
}>) {
    // const { lang } = await params
    return (
        <>
            <Container className="mt-4">
                <div className="flex justify-end">
                    <GoToCreate />
                </div>
            </Container>
            <CardPageWrapper className="mt-4" >
                <>
                    <Typography variant="h6" className="mb-3">Queue List</Typography>
                    <QueueManagementClientPage />
                </>
            </CardPageWrapper>
        </>
    )
}
