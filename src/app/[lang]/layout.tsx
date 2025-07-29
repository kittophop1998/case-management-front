import { Kanit } from 'next/font/google'
import { cn } from '@/lib/utils'
import { StoreProvider } from '@/store/provider'
const kanit = Kanit({
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
  return (
    <html lang={lang}>
      <body
        className={cn(
          'antialiased overflow-y-auto',
          lang === 'th' ? kanit.className : kanit.className
        )}
      >

        <StoreProvider>
          {/* <DndProviderCpn> */}
          {/* <InitializersData user={user} accessToken={accessToken} /> */}
          {children}
          {/* </DndProviderCpn> */}
        </StoreProvider>
      </body>
    </html>
  )
}
