import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/components/ui/breadcrumb'
import { ChevronLeft } from 'lucide-react'
import { UserAppBar } from '@/components/user-app-bar'

// export default async function UserLayout ({
export default async function UserLayout({
  children,
  params
}: // params
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
            {/* <SidebarTrigger /> */}
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
