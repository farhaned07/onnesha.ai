"use client"

import { useState, useRef, useEffect } from "react"
import type { Message } from "ai"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import MarkdownRenderer from "@/components/markdown-renderer"
import { Copy, Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface EnhancedChatMessageProps {
  message: Message
  language: "en" | "bn"
  isLoading?: boolean
  onRegenerate?: () => void
  onCopy?: (content: string) => void
  isLastMessage?: boolean
}

export default function EnhancedChatMessage({
  message,
  language,
  isLoading = false,
  onRegenerate,
  onCopy,
  isLastMessage = false,
}: EnhancedChatMessageProps) {
  const isUser = message.role === "user"
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Debug message content
  useEffect(() => {
    console.log("Rendering message:", { 
      role: message.role,
      content: message.content?.substring(0, 50) + "...", 
      contentLength: message.content?.length 
    });
  }, [message]);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Intersection observer for animation
  useEffect(() => {
    if (!messageRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(messageRef.current)
    return () => {
      if (messageRef.current) {
        observer.unobserve(messageRef.current)
      }
    }
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    if (onCopy) onCopy(message.content)
    setTimeout(() => setCopied(false), 2000)
  }

  const translations = {
    en: {
      you: "You",
      ai: "অন্বেষা",
      copy: "Copy",
      copied: "Copied!",
      regenerate: "Regenerate",
    },
    bn: {
      you: "আপনি",
      ai: "অন্বেষা",
      copy: "কপি করুন",
      copied: "কপি করা হয়েছে!",
      regenerate: "পুনরায় তৈরি করুন",
    },
  }

  const t = translations[language]

  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  }

  return (
    <motion.div
      ref={messageRef}
      className={cn("max-w-3xl mx-auto py-1.5 md:py-4", isUser ? "text-right" : "text-left")}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={messageVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("flex items-center gap-1 mb-1", isUser ? "justify-end" : "justify-start")}>
        <div className="text-xs text-muted-foreground font-medium">
          {isUser ? t.you : t.ai}
        </div>
      </div>
      
      <motion.div
        className={cn(
          "inline-block max-w-[95%] sm:max-w-[85%] text-left overflow-hidden",
          isUser
            ? "bg-[#2A2B30] rounded-t-xl md:rounded-t-2xl rounded-bl-xl md:rounded-bl-2xl rounded-br-sm"
            : "bg-[#2A2B30] rounded-t-xl md:rounded-t-2xl rounded-br-xl md:rounded-br-2xl rounded-bl-sm shadow-md",
        )}
        whileHover={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          y: -1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className={cn(
          "p-2.5 md:p-4 text-sm md:text-base overflow-hidden break-words max-w-full",
          !isUser && "prose-headings:font-semibold prose-headings:text-primary prose-h1:text-lg prose-h1:md:text-xl prose-h2:text-base prose-h2:md:text-lg prose-h3:text-sm prose-h3:md:text-base prose-li:my-0.5 prose-p:my-1.5 prose-hr:my-3 prose-blockquote:border-l-2 prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:py-0.5 prose-blockquote:px-3 prose-blockquote:rounded-sm"
        )}>
          <MarkdownRenderer content={message.content} />
        </div>

        <motion.div
          className={cn(
            "flex items-center gap-1 md:gap-2 px-2.5 md:px-4 py-1 md:py-2 border-t border-white/5",
            isUser ? "justify-end" : "justify-start",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {!isUser && onRegenerate && (
            <motion.div variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 md:h-7 rounded-full text-[10px] md:text-xs bg-white/5 hover:bg-white/10 px-1.5 md:px-2"
                onClick={onRegenerate}
              >
                <Sparkles size={10} className="mr-1" />
                {t.regenerate}
              </Button>
            </motion.div>
          )}

          <motion.div variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 md:h-7 rounded-full text-[10px] md:text-xs bg-white/5 hover:bg-white/10 px-1.5 md:px-2"
              onClick={copyToClipboard}
            >
              {copied ? <Check size={10} className="mr-1" /> : <Copy size={10} className="mr-1" />}
              {copied ? t.copied : t.copy}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

