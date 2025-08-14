import { cn } from '@/lib/utils'
import { Button } from '../common/Button'

export const ButtonCancel = (
  {
    className,
    ...props
  }: {
    className?: string
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
  }
) => {
  return (
    <Button variant='outline-primary' type='button' {...props} className={cn('', className)}>
      Cancel
    </Button>
  )
}
