import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { AppBar } from './_components/app-bar'
export default async function UserLayout ({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'th' }>
}>) {
  const { lang } = await params
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='bg-[#f4f5fa]'>
          <AppBar />
          <div className='max-w-[1600px] mx-auto w-full  px-2'>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
