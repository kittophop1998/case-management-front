"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        // ? COSTOM-CLASS
        'size-4 aspect-square',
        'rounded-[5.5px]',
        'data-[state=checked]:border-primary',
        'disabled:bg-gray-400',
        // ? COSTOM-CLASS
        className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center checked:border-primary checked:bg-red-500 bg-red-400"
      >
        <div
          className="absolute size-3 bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[3.5px]"
        >
          <Check
            // @ts-expect-error className is valid but TS resolution is wrong
            className='stroke-3 absolute size-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' color="white" />
        </div>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
