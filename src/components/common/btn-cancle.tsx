import { Button } from '../ui/button'

export const ButtonCancel = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <Button variant='outline' type='button' {...props}>
      Cancel
    </Button>
  )
}
