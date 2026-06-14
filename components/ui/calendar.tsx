"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { cn } from "@/lib/utils"

interface CalendarProps {
  className?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

export function Calendar({ className, selected, onSelect }: CalendarProps) {
  return (
    <div className={cn("p-2 rounded-md bg-background border", className)}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        className="text-foreground"
      />
    </div>
  )
}
