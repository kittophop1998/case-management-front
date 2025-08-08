import { cn } from "@/lib/utils/index"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      // className={cn("bg-accent animate-pulse rounded-md", className)}
      className={cn("bg-gray-200/50 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
