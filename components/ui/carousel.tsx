"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode
  className?: string
}

export function Carousel({ children, className }: CarouselProps) {
  return (
    <div className={cn("overflow-x-auto whitespace-nowrap scrollbar-hide", className)}>
      {children}
    </div>
  )
}
