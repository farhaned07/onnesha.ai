"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Smile, Paperclip, ArrowUp, Search, Lightbulb, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import AutoResizeTextarea from "@/components/auto-resize-textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface EnhancedChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  placeholder?: string
  onFileUpload?: () => void
  onVoiceInput?: () => void
  language: "en" | "bn"
  showEmojiPicker?: boolean
  onEmojiSelect?: (emoji: string) => void
  className?: string
  enableWebSearch?: boolean
  onWebSearchToggle?: (enabled: boolean) => void
}

export default function EnhancedChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  placeholder,
  onFileUpload,
  onVoiceInput,
  language,
  showEmojiPicker = true,
  onEmojiSelect,
  className,
  enableWebSearch = false,
  onWebSearchToggle,
}: EnhancedChatInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasInput, setHasInput] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setHasInput(input.trim().length > 0)
  }, [input])

  const translations = {
    en: {
      placeholder: placeholder || "What do you want to know?",
      deepsearch: "DeepSearch",
      think: "Think",
      webSearch: "Web Search",
      webSearchDescription: "Enable real-time web search for up-to-date information",
    },
    bn: {
      placeholder: placeholder || "আপনি কী জানতে চান?",
      deepsearch: "ডিপসার্চ",
      think: "চিন্তা",
      webSearch: "ওয়েব সার্চ",
      webSearchDescription: "আপ-টু-ডেট তথ্যের জন্য রিয়েল-টাইম ওয়েব সার্চ সক্ষম করুন",
    },
  }

  const t = translations[language]

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div
        className={cn(
          "relative flex flex-col gap-2 rounded-2xl transition-all duration-200 bg-background/10 backdrop-blur-md p-2",
          isFocused ? "shadow-lg ring-1 ring-foreground/20" : "",
        )}
      >
        <div className="relative">
          <AutoResizeTextarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder={t.placeholder}
            className="w-full px-4 py-3 bg-transparent border-0 focus:ring-0 text-lg resize-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <div className="absolute right-2 bottom-2">
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className={cn(
                "h-8 w-8 rounded-full transition-all duration-200",
                hasInput ? "bg-primary text-primary-foreground" : "bg-background/10 text-muted-foreground",
              )}
              onClick={(e) => {
                e.preventDefault()
                if (input.trim() && !isLoading) {
                  handleSubmit(e as any)
                }
              }}
            >
              <ArrowUp size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2">
          <Button variant="ghost" size="sm" className="h-8 rounded-full bg-background/10 hover:bg-background/20">
            <Search size={16} className="mr-2" />
            {t.deepsearch}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 rounded-full bg-background/10 hover:bg-background/20">
            <Lightbulb size={16} className="mr-2" />
            {t.think}
          </Button>

          <div className="flex-1" />

          {/* Web Search Toggle */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8 rounded-full", enableWebSearch ? "text-primary bg-primary/10" : "")}
              >
                <Globe size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="web-search" className="text-sm font-medium">
                    {t.webSearch}
                  </Label>
                  <p className="text-xs text-muted-foreground">{t.webSearchDescription}</p>
                </div>
                <Switch
                  id="web-search"
                  checked={enableWebSearch}
                  onCheckedChange={(checked) => onWebSearchToggle?.(checked)}
                />
              </div>
            </PopoverContent>
          </Popover>

          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onVoiceInput}>
            <Mic size={16} />
          </Button>

          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onFileUpload}>
            <Paperclip size={16} />
          </Button>

          {showEmojiPicker && (
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Smile size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="end">
                <div className="grid grid-cols-5 gap-1">
                  {["😊", "👍", "🙏", "❤️", "🎉", "🤔", "👏", "🔥", "✨", "🇧🇩"].map((emoji) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => onEmojiSelect?.(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

