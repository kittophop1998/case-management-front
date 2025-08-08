import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({
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
      data-slot="input"
      className={cn(
        'w-full h-10 px-4 py-2 text-base md:text-sm rounded-md border transition-all outline-none',
        'bg-white dark:bg-[#1f1f1f] border-gray-300 dark:border-gray-600',
        'placeholder-gray-400 dark:placeholder-gray-500',
        'base-input-casemm',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'file:text-gray-700 file:font-medium file:text-sm file:border-0 file:bg-transparent file:h-7',
        'selection:bg-[#5570f1] selection:text-white',
        'aria-invalid:border-red-500 aria-invalid:ring-red-300',
        prependInnerIcon ? 'pl-[2.5rem]' : '',
        appendInnerIcon ? 'pr-[2.5rem]' : '',
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
