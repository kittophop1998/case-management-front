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
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        'data-[state=checked]:bg-white',

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn("flex items-center justify-center text-current transition-none",
          'data-[state=checked]:bg-white relative',

          // ? COSTOM-CLASS
          // 'size-4 aspect-square relative ',
          // 'rounded-[5.5px]',
          // 'data-[state=checked]:border-primary',
          // 'disabled:bg-gray-400',
          // ? COSTOM-CLASS

        )}
      >
        {/* <CheckIcon
          // @ts-expect-error className is valid but TS resolution is wrong
          className="size-3.5" color="white" /> */}
        <div
          className="absolute size-3 bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[3.5px]"
        >
          <CheckIcon
            // @ts-expect-error className is valid but TS resolution is wrong
            className='stroke-3 absolute size-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' color="white" />
        </div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
