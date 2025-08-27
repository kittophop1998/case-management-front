import CardPageWrapper from "@/components/common/card-page-warpper";
import Container from "@/components/common/containter";
import { Typography } from "@/components/common/typography";
import { GoToCreate } from "./_components/goto-create";
import { Suspense } from "react";
import QueueTable from "./_components/queue-table";

const QueueManagementTable = async () => {
    // let page = 1
    // let limit = 1
    // let data = await getMockupData([], page, limit)
    // return <>{JSON.stringify(data)}</>
    return <QueueTable />
}


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
                    <Suspense fallback={<div>Loading...</div>}>
                        <QueueManagementTable />
                    </Suspense>
                </>
            </CardPageWrapper>
        </>
    )
}
