import { Button } from '../common/Button'

export const ButtonCancel = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <Button variant='outline' type='button' {...props} className='border-primary text-primary hover:text-primary'>
      Cancel
    </Button>
  )
}
