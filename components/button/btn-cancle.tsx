import { cn } from '@/lib/utils'
import { Button } from '../common/Button'

export const ButtonCancel = (
  {
    className,
    onClick = () => { },
    disabled = false,
    ...props
  }: {
    className?: string
    onClick?: () => void
    disabled?: boolean
  }
) => {
  return (
    <Button onClick={onClick} disabled={disabled} variant='outline-primary' type='button' {...props} className={cn('', className)}>
      Cancel
    </Button>
  )
}
