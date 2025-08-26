import {
  Inter
} from 'next/font/google'
import { StoreProvider } from '@/store/provider'
import { cn } from '@/lib/utils'

const inter = Inter({
  weight: '400',
  subsets: ['latin']
})

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'th' }]
}

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'th' }>
}>) {
  // const { lang } = await params
  const lang = 'th'
  // const { user, accessToken, refreshToken } = await updateTokenAuth();
  // if (!user) {
  //   const headerList = headers();
  //   const pathname = (await headerList).get("x-current-path") as string;
  //   await handleError401({ pathname });
  // }
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
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
