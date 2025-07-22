import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { UserAppBar } from '@/components/user-app-bar'
export default async function UserLayout({
  children,
  params
}:
  Readonly<{
    children: React.ReactNode
    params: Promise<{ lang: 'en' | 'th' }>
  }>) {
  const { lang } = await params
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='bg-[#f4f5fa]'>
          <UserAppBar />
          <div className='max-w-[1600px] mx-auto w-full  px-2'>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
