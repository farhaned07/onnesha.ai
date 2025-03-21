"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function VerifyTokenPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [errorMessage, setErrorMessage] = useState("")

  const translations = {
    en: {
      verifying: "Verifying your email...",
      success: "Email verified successfully!",
      error: "Verification failed",
      errorExpired: "Verification link has expired",
      errorInvalid: "Invalid verification link",
      signIn: "Sign in",
      retry: "Try again",
    },
    bn: {
      verifying: "আপনার ইমেইল যাচাই করা হচ্ছে...",
      success: "ইমেইল সফলভাবে যাচাই করা হয়েছে!",
      error: "যাচাইকরণ ব্যর্থ হয়েছে",
      errorExpired: "যাচাইকরণ লিঙ্ক মেয়াদ শেষ হয়ে গেছে",
      errorInvalid: "অবৈধ যাচাইকরণ লিঙ্ক",
      signIn: "সাইন ইন",
      retry: "আবার চেষ্টা করুন",
    },
  }

  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch("/api/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: params.token }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
        } else {
          setStatus("error")
          setErrorMessage(data.error || "Verification failed")
        }
      } catch (error) {
        setStatus("error")
        setErrorMessage("An unexpected error occurred")
      }
    }

    verifyEmail()
  }, [params.token])

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1B1E]">
      <header className="py-3 md:py-4 px-4 md:px-6">
        <div className="max-w-md mx-auto w-full flex justify-end">
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

      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#25262B] rounded-xl md:rounded-2xl border border-white/5 p-5 md:p-8 shadow-xl text-center">
            {status === "loading" && (
              <>
                <div className="flex justify-center mb-4 md:mb-6">
                  <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white mb-4">{t.verifying}</h1>
              </>
            )}

            {status === "success" && (
              <>
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-green-500" />
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white mb-6">{t.success}</h1>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white h-10 md:h-11 px-6"
                  onClick={() => router.push("/sign-in")}
                >
                  {t.signIn}
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="h-8 w-8 md:h-10 md:w-10 text-red-500" />
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{t.error}</h1>
                <p className="text-white/60 text-sm md:text-base mb-6">
                  {errorMessage === "Verification token has expired"
                    ? t.errorExpired
                    : errorMessage === "Invalid or expired verification token"
                    ? t.errorInvalid
                    : errorMessage}
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white h-10 md:h-11 px-6"
                  onClick={() => router.push("/sign-up")}
                >
                  {t.retry}
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
} 