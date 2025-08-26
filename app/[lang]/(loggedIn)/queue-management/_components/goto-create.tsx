'use client'
import { Button } from "@/components/common/Button"
import { useRouter } from "next/navigation";

export const GoToCreate = () => {
    const router = useRouter();
    return <Button variant='black' onClick={() => router.push("/queue-management/create")}>Add Queue</Button>
}
