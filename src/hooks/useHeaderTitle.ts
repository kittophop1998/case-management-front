'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { headerTitleMap } from './headerTitleMap';

export const useHeaderTitle = (setHeaderTitle: (title: string) => void) => {
  const pathname = usePathname();

  useEffect(() => {
    const title = headerTitleMap[pathname] || 'ไม่พบหน้า';
    setHeaderTitle(title);
  }, [pathname]);
};