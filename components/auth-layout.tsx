"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface AuthLayoutProps {
  children: ReactNode
  language: "en" | "bn"
  toggleLanguage: () => void
}

export default function AuthLayout({ children, language, toggleLanguage }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="py-4 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Wiser AI
          </Link>
          <Button variant="ghost" size="sm" onClick={toggleLanguage}>
            {language === "en" ? "বাংলা" : "English"}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

