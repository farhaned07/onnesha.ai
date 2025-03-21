"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, ArrowRight, ChevronLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const { toast } = useToast()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const translations = {
    en: {
      title: "Check your email",
      subtitle: "We've sent a verification link to:",
      description: "Click the link in the email to verify your account. If you don't see it, check your spam folder.",
      resend: "Resend email",
      resending: "Resending...",
      resendCountdown: (seconds: number) => `Resend email (${seconds}s)`,
      signIn: "Go to sign in",
      backToHome: "Back to home",
      resendSuccess: "Verification email has been resent",
      resendError: "Failed to resend email. Please try again.",
    },
    bn: {
      title: "আপনার ইমেইল চেক করুন",
      subtitle: "আমরা একটি ভেরিফিকেশন লিঙ্ক পাঠিয়েছি:",
      description: "আপনার অ্যাকাউন্ট ভেরিফাই করতে ইমেইলে লিঙ্কটি ক্লিক করুন। যদি আপনি এটি না দেখেন, আপনার স্প্যাম ফোল্ডার চেক করুন।",
      resend: "ইমেইল আবার পাঠান",
      resending: "পাঠানো হচ্ছে...",
      resendCountdown: (seconds: number) => `ইমেইল আবার পাঠান (${seconds}সে)`,
      signIn: "সাইন ইন এ যান",
      backToHome: "হোমে ফিরে যান",
      resendSuccess: "ভেরিফিকেশন ইমেইল আবার পাঠানো হয়েছে",
      resendError: "ইমেইল আবার পাঠাতে ব্যর্থ। আবার চেষ্টা করুন।",
    },
  }

  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  const handleResendEmail = async () => {
    if (countdown === 0 && !isResending) {
      try {
        setIsResending(true)
        
        // Look up user by email - needed to get userId
        const lookupResponse = await fetch(`/api/user-lookup?email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        })
        
        const lookupData = await lookupResponse.json()
        
        if (!lookupResponse.ok) {
          throw new Error(lookupData.error || "User not found")
        }
        
        // Request verification email
        const response = await fetch("/api/send-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: lookupData.userId, email }),
        })
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to resend verification email")
        }
        
        toast({
          title: "Success",
          description: t.resendSuccess,
        })
        
        // Reset countdown
        setCountdown(60)
      } catch (error) {
        console.error("Resend verification error:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: t.resendError,
        })
      } finally {
        setIsResending(false)
      }
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
            onClick={() => router.push("/")}
          >
            <ChevronLeft size={14} className="mr-1" />
            {t.backToHome}
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
          <div className="bg-[#25262B] rounded-xl md:rounded-2xl border border-white/5 p-5 md:p-8 shadow-xl text-center">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Mail className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{t.title}</h1>
            
            <div className="mb-1 text-sm md:text-base text-white/80">{t.subtitle}</div>
            <div className="text-blue-400 font-medium break-all mb-4">{email}</div>
            
            <p className="text-white/60 text-sm md:text-base mb-6">{t.description}</p>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 h-9 md:h-11 text-sm"
                onClick={handleResendEmail}
                disabled={countdown > 0 || isResending}
              >
                {isResending ? t.resending : countdown > 0 ? t.resendCountdown(countdown) : t.resend}
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white h-9 md:h-11 text-sm"
                onClick={() => router.push("/sign-in")}
              >
                {t.signIn}
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

