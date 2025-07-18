import * as React from 'react'

import { cn } from '@/lib/utils'

function Input ({
  className,
  prependInnerIcon = false,
  appendInnerIcon = false,
  type,
  ...props
}: React.ComponentProps<'input'> & {
  prependInnerIcon?: boolean
  appendInnerIcon?: boolean
}) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'bg-[#f6f7fb]', // TODO: SET COLOR
        prependInnerIcon ? 'pl-[2rem]' : '',
        appendInnerIcon ? 'pr-[2rem]' : '',
        className
      )}
      {...props}
    />
  )
}

export { Input }
// .icon {
//   padding-left: 25px;
//   background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat left;
//   background-size: 20px;
// }
