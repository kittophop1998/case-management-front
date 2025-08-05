import { Kanit } from 'next/font/google'
import { cn } from '@/lib/utils'
import { StoreProvider } from '@/store/provider'
import { InitializersData } from './_components/initializers-data'
import { updateTokenAuth } from '@/actions/updateTokenAuth'
import { handleError401 } from '@/lib/utils/handleError'
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import getInitPathByRole from '@/lib/utils/get-init-path-by-role'

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
  const { user, accessToken, refreshToken } = await updateTokenAuth();
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path") as string;
  if (!user) {
    await handleError401({ pathname });
  } else {
    // const initPath = await getInitPathByRole(pathname, user?.role?.name, 'aaaaaaaaaa');
    // console.log('initPath', initPath);
    // if (initPath) {
    //   redirect(initPath);
    // }
  }
  return (
    <html lang={lang}>
      <body
        className={cn(
          'antialiased overflow-y-auto',
          lang === 'th' ? kanit.className : kanit.className
        )}
      >
        <StoreProvider>
          <InitializersData user={user} accessToken={accessToken} refreshToken={refreshToken} />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
