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
