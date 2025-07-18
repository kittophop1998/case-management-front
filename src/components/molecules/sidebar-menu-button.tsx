import { SidebarMenuButton as SidebarMenuButtonChadcn } from '@/components/ui/sidebar'
import { Typography } from '../atoms/typography'
import { cn } from '@/lib/utils'
interface SidebarMenuButtonProps {
  tooltip: string
  onClick: () => void
  isActive: boolean
  item: {
    icon?: React.ComponentType
    title: string
  }
}

export const SidebarMenuButton = ({
  tooltip,
  onClick,
  isActive,
  item
}: SidebarMenuButtonProps) => {
  return (
    // TODO:SET COLOR
    <SidebarMenuButtonChadcn
      className={cn(
        // 'gap-3 data-active:bg-teal-300',
        'bg-[#7461cf]',
        isActive ? 'bg-[#7461cf] text-white' : ''
        // '[data-active="true"]:bg-blue-600 [data-active="true"]:text-white',
        // '[data-active="false"]:bg-gray-100 [data-active="false"]:text-gray-800'
      )}
      // className='gap-3 data-active:bg-teal-300'
      tooltip={tooltip}
      onClick={onClick}
      isActive={isActive}
    >
      {item.icon && <item.icon />}
      <Typography>
        {item.title} {isActive ? '1' : '0'}
      </Typography>
    </SidebarMenuButtonChadcn>
  )
}
