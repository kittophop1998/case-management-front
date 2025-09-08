"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer  dark:bg-input/30  data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary  focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40  size-4 shrink-0 rounded-[4px]  shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        'data-[state=checked]:bg-primary',
        'outline-2 outline-offset-1 outline-solid outline-input data-[state=checked]:outline-primary',
        'border border-white data-[state=checked]:border-white focus-visible:border-ring aria-invalid:border-destructive',

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="absolute size-2 stroke-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
  // return (
  //   <CheckboxPrimitive.Root
  //     data-slot="checkbox"
  //     className={cn(
  //       "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  //       'data-[state=checked]:bg-white flex items-center justify-center overflow-hidden',

  //       className
  //     )}
  //     {...props}
  //   >
  //     <CheckboxPrimitive.Indicator
  //       data-slot="checkbox-indicator"
  //       className={cn("flex items-center justify-center text-current transition-none",
  //         'data-[state=checked]:bg-white relative w-fill h-full min-w-full min-h-full. bg-transparent',

  //         // ? COSTOM-CLASS
  //         // 'size-4 aspect-square relative ',
  //         // 'rounded-[5.5px]',
  //         // 'data-[state=checked]:border-primary',
  //         // 'disabled:bg-gray-400',
  //         // ? COSTOM-CLASS

  //       )}
  //     >
  //       {/* <CheckIcon
  //         // @ts-expect-error className is valid but TS resolution is wrong
  //         className="size-3.5" color="white" /> */}
  //       <div
  //         className="absolute w-[95%] min-w-[95%] h-[95%] min-h-[95%] max-w-[95%] max-h-[95%] bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[3.5px]"
  //       >
  //         <CheckIcon
  //           className='stroke-3 absolute size-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' color="white" />
  //       </div>
  //     </CheckboxPrimitive.Indicator>
  //   </CheckboxPrimitive.Root>
  // )
}

export { Checkbox }
