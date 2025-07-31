'use client'

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { AppBar } from './_components/app-bar'
import { useState } from 'react';
import { useHeaderTitle } from '@/hooks/useHeaderTitle';
import { HeaderWrapper } from '../../../components/common/HeaderWrapper';
import { useRouter } from 'next/navigation';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [title, setTitle] = useState('');
  useHeaderTitle(setTitle);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='bg-[#f4f5fa]'>
          <AppBar title={title} />
          <div className='max-w-[1600px] mx-auto w-full  px-2'>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
