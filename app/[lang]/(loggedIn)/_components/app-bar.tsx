import Container from '@/components/common/containter'
import { Separator } from '@/components/ui/separator'
import { AppBarUserUI } from './app-bar-user-ui'
import { SwitchLanguage } from './switch-language'
import { Notification } from './notification'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { AppBarTitle } from './app-bar-title'
import { ClientPath } from './client-path'

export function AppBar() {
  return (
    <header className='bg-white shrink-0 items-center gap-2 transition-[width,height] ease-linear '>
      <Container className='flex items-center'>
        <SidebarTrigger className='block md:hidden' />
        <AppBarTitle />
        <div className='flex-1' />
        <div className='flex items-center gap-6 py-3'>
          <div className='flex items-center gap-2'>
            <SwitchLanguage />
            <Notification />
          </div>
          <AppBarUserUI />
        </div>
      </Container>
      <Separator />
      <Container className='flex gap-2 items-center py-1'>
        <ClientPath />
      </Container>
    </header>
  )
}
