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
    <Button variant='outline' type='button' {...props} className={cn('border-primary text-primary hover:text-primary', className)}>
      Cancel
    </Button>
  )
}
