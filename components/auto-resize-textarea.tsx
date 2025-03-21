"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  minRows?: number
  maxRows?: number
}

export default function AutoResizeTextarea({
  value,
  onChange,
  minRows = 1,
  maxRows = 5,
  className,
  ...props
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto"

    // Calculate the height based on scrollHeight
    const lineHeight = Number.parseInt(getComputedStyle(textarea).lineHeight)
    const paddingTop = Number.parseInt(getComputedStyle(textarea).paddingTop)
    const paddingBottom = Number.parseInt(getComputedStyle(textarea).paddingBottom)

    const minHeight = minRows * lineHeight + paddingTop + paddingBottom
    const maxHeight = maxRows * lineHeight + paddingTop + paddingBottom

    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
    textarea.style.height = `${newHeight}px`
  }

  // Resize on value change
  useEffect(() => {
    resizeTextarea()
  }, [value])

  // Initial resize
  useEffect(() => {
    resizeTextarea()
  }, [])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={cn(
        "auto-resize-textarea w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0",
        className,
      )}
      rows={minRows}
      {...props}
    />
  )
}

