"use client"

import { motion } from "framer-motion"
import { Globe, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WebSearchIndicatorProps {
  language: "en" | "bn"
  isSearching?: boolean
}

export default function WebSearchIndicator({ language, isSearching = false }: WebSearchIndicatorProps) {
  const translations = {
    en: {
      searching: "Searching the web for information...",
      enabled: "Web search enabled",
      learnMore: "Learn more",
    },
    bn: {
      searching: "তথ্যের জন্য ওয়েব অনুসন্ধান করা হচ্ছে...",
      enabled: "ওয়েব সার্চ সক্ষম করা হয়েছে",
      learnMore: "আরও জানুন",
    },
  }

  const t = translations[language]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 text-xs text-muted-foreground bg-background/20 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit mx-auto mb-4"
    >
      <Globe size={14} className={isSearching ? "animate-pulse text-blue-400" : ""} />
      <span>{isSearching ? t.searching : t.enabled}</span>
      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-400">
        <ExternalLink size={10} className="mr-1" />
        {t.learnMore}
      </Button>
    </motion.div>
  )
}

