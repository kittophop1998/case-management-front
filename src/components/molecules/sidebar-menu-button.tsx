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
      className={cn('gap-3', isActive ? 'bg-[#7461cf] text-white' : '')}
      tooltip={tooltip}
      onClick={onClick}
      isActive={isActive}
    >
      {item.icon && <item.icon />}
      <Typography>{item.title}</Typography>
    </SidebarMenuButtonChadcn>
  )
}
