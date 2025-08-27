
import {
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { AppBar } from './_components/app-bar'
import { Suspense } from 'react'
import LoadingPage from '@/components/loading-page'
import { headers } from 'next/headers'
import { handleError401 } from '@/lib/utils/handleError'
import { InitializersData } from '../_components/initializers-data'
import { cookies } from "next/headers";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // console.time('getCookie')
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  if (!accessToken) {
    const headerList = headers();
    const pathname = (await headerList).get("x-current-path") as string;
    await handleError401({ pathname });
  }
  // console.timeEnd('getCookie')
  return (
    <>
      <InitializersData accessToken={accessToken} refreshToken={refreshToken} />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='bg-[#f4f5fa]'>
          <AppBar />
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}



