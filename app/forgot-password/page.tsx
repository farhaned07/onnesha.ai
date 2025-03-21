"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const { toast } = useToast()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const translations = {
    en: {
      title: "Reset password",
      subtitle: "We'll send you a link to reset your password",
      email: "Email",
      emailPlaceholder: "Enter your email",
      resetPassword: "Send reset link",
      backToSignIn: "Back to sign in",
      backToHome: "Back to home",
      submittedTitle: "Check your email",
      submittedText: "If your email exists in our system, we've sent a password reset link.",
    },
    bn: {
      title: "পাসওয়ার্ড রিসেট",
      subtitle: "আমরা আপনাকে পাসওয়ার্ড রিসেট করার জন্য একটি লিঙ্ক পাঠাব",
      email: "ইমেইল",
      emailPlaceholder: "আপনার ইমেইল লিখুন",
      resetPassword: "রিসেট লিঙ্ক পাঠান",
      backToSignIn: "সাইন ইন এ ফিরে যান",
      backToHome: "হোমে ফিরে যান",
      submittedTitle: "আপনার ইমেইল চেক করুন",
      submittedText: "আপনার ইমেইল যদি আমাদের সিস্টেমে থাকে, আমরা একটি পাসওয়ার্ড রিসেট লিঙ্ক পাঠিয়েছি।",
    },
  }

  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await resetPassword(email)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Password reset error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send reset email. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1B1E]">
      {/* Minimal header */}
      <header className="py-3 md:py-4 px-4 md:px-6">
        <div className="max-w-md mx-auto w-full flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 text-xs h-7 md:h-8"
            onClick={() => router.push("/sign-in")}
          >
            <ChevronLeft size={14} className="mr-1" />
            {t.backToSignIn}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-white/70 hover:text-white hover:bg-white/5 text-xs h-7 md:h-8"
          >
            {language === "en" ? "বাংলা" : "English"}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#25262B] rounded-xl md:rounded-2xl border border-white/5 p-5 md:p-8 shadow-xl">
            {!isSubmitted ? (
              <>
                <div className="mb-4 md:mb-6">
                  <h1 className="text-xl md:text-2xl font-bold text-white">{t.title}</h1>
                  <p className="text-white/60 mt-1 text-sm md:text-base">{t.subtitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="email" className="text-white/80 text-xs md:text-sm">
                      {t.email}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-[#1A1B1E] border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50 h-9 md:h-11 text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-9 md:h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg md:rounded-xl text-sm"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 md:h-4 md:w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>{language === "en" ? "Sending..." : "পাঠানো হচ্ছে..."}</span>
                      </div>
                    ) : (
                      <>
                        {t.resetPassword}
                        <ArrowRight size={14} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{t.submittedTitle}</h1>
                <p className="text-white/60 text-sm md:text-base">{t.submittedText}</p>
                <Button
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white h-9 md:h-11 rounded-lg md:rounded-xl text-sm"
                  onClick={() => router.push("/sign-in")}
                >
                  {t.backToSignIn}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

