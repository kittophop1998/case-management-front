'use client'
import CardPageWrapper from "@/components/common/card-page-warpper";
import Container from "@/components/common/containter";
import { Typography } from "@/components/common/typography";
import QueueTable, { QueueTableRef } from "./_components/queue-table";
import { CreateQueueSection } from "./_components/create-queue";
import { useRef } from "react";

export default function QueueManagementPage({
}: Readonly<{
}>) {
    const queueTableRef = useRef<QueueTableRef>(null)
    const fetchTable = () => {
        console.log(`fetchTable.call()`)
        queueTableRef.current?.fetchTable()
    }

    return (
        <>
            <Container className="mt-4">
                <div className="flex justify-end">
                    <CreateQueueSection fetchTable={fetchTable} />
                </div>
            </Container>
            <CardPageWrapper className="mt-4" >
                <>
                    <Typography variant="h6" className="mb-3">Queue List</Typography>
                    <QueueTable ref={queueTableRef} />
                </>
            </CardPageWrapper>
        </>
    )
}