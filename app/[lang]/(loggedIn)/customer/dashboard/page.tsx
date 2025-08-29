'use client'

import { redirect } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import CustomerDashboard from './dashboardPage'

export default function Page() {
    const searchParams = useSearchParams()

    const customerId = searchParams.get('customerId')
    const from = searchParams.get('from')

    if (from !== 'search' || !customerId) {
        redirect('/customer/search')
    }

    return <CustomerDashboard customerId={customerId} />
}