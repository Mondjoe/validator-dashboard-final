"use client"

import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cn } from "@/lib/utils"

export function Toggle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm transition-colors data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}
