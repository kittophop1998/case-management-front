'use client' // Error boundaries must be Client Components

import { Button } from '@/components/common/Button'
import Container from '@/components/common/containter'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <Container>
            <div>
                <h2>Something went wrong!</h2>
                <Button
                    onClick={
                        () => reset()
                    }
                >
                    Try again
                </Button>
            </div>
        </Container>
    )
}