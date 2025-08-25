import {
  // Kanit,
  Inter
} from 'next/font/google'

import { cn } from '@/lib/utils'
import { StoreProvider } from '@/store/provider'
import { InitializersData } from './_components/initializers-data'
import { updateTokenAuth } from '@/actions/updateTokenAuth'
import { handleError401 } from '@/lib/utils/handleError'
import { headers } from "next/headers";
import { FormTest } from '@/components/case/input-disposition'
import { Suspense } from 'react'

// const kanit = Kanit({
//   weight: '400',
//   subsets: ['latin']
// })
const inter = Inter({
  weight: '400',
  subsets: ['latin']
})

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'th' }]
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'th' }>
}>) {
  const { lang } = await params
  const { user, accessToken, refreshToken } = await updateTokenAuth();
  if (!user) {
    const headerList = headers();
    const pathname = (await headerList).get("x-current-path") as string;
    await handleError401({ pathname });
  }
  return (
    <html lang={lang}>
      <body
        className={cn(
          'antialiased overflow-y-auto',
          // lang === 'th' ? kanit.className : inter.className
          inter.className
        )}
      >
        <StoreProvider>
          <InitializersData accessToken={accessToken} refreshToken={refreshToken} />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
