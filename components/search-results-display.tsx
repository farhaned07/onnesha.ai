"use client"

import { motion } from "framer-motion"
import { ExternalLink, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SearchResult {
  title: string
  link: string
  snippet: string
  source: string
  published?: string
}

interface SearchResultsDisplayProps {
  results: SearchResult[]
  language: "en" | "bn"
}

export default function SearchResultsDisplay({ results, language }: SearchResultsDisplayProps) {
  const translations = {
    en: {
      title: "Web Search Results",
      visitSource: "Visit source",
      noResults: "No search results found",
    },
    bn: {
      title: "ওয়েব সার্চ ফলাফল",
      visitSource: "উৎস দেখুন",
      noResults: "কোন সার্চ ফলাফল পাওয়া যায়নি",
    },
  }

  const t = translations[language]

  if (!results || results.length === 0) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">{t.noResults}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="py-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Globe size={14} className="text-blue-500" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <a href={result.link} target="_blank" rel="noopener noreferrer" className="block space-y-1">
                <h3 className="font-medium text-sm text-blue-600 dark:text-blue-400 flex items-center">
                  {result.title}
                  <ExternalLink size={12} className="ml-1 inline-flex" />
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{result.source}</span>
                  {result.published && (
                    <>
                      <span>•</span>
                      <span>{result.published}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{result.snippet}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

