"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, ArrowRight, Github } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const { signIn } = useAuth()
  const { toast } = useToast()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const translations = {
    en: {
      title: "Sign in to your account",
      subtitle: "Welcome back! Enter your details to continue.",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      signIn: "Sign in",
      signInWithGoogle: "Sign in with Google",
      signInWithGithub: "Sign in with GitHub",
      signInWithEmail: "Sign in with Email",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      or: "or",
      errorTitle: "Authentication Error",
      errorMessage: "Invalid email or password. Please try again.",
    },
    bn: {
      title: "আপনার অ্যাকাউন্টে সাইন ইন করুন",
      subtitle: "স্বাগতম! চালিয়ে যেতে আপনার বিবরণ লিখুন।",
      email: "ইমেইল",
      emailPlaceholder: "আপনার ইমেইল লিখুন",
      password: "পাসওয়ার্ড",
      passwordPlaceholder: "আপনার পাসওয়ার্ড লিখুন",
      rememberMe: "আমাকে মনে রাখুন",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      signIn: "সাইন ইন",
      signInWithGoogle: "গুগল দিয়ে সাইন ইন করুন",
      signInWithGithub: "গিটহাব দিয়ে সাইন ইন করুন",
      signInWithEmail: "ইমেইল দিয়ে সাইন ইন করুন",
      noAccount: "অ্যাকাউন্ট নেই?",
      signUp: "সাইন আপ",
      or: "অথবা",
      errorTitle: "প্রমাণীকরণ ত্রুটি",
      errorMessage: "অবৈধ ইমেইল বা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।",
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
      await signIn(email, password)
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: t.errorTitle,
        description: t.errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{t.subtitle}</p>
            </div>

            <div className="space-y-4 mb-6">
              <Button
                variant="outline"
                className="w-full justify-center gap-2"
                onClick={() => {
                  setIsLoading(true)
                  // Simulate Google sign-in
                  setTimeout(() => {
                    setIsLoading(false)
                    // In a real app, you would handle Google authentication here
                  }, 1500)
                }}
                disabled={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {t.signInWithGoogle}
              </Button>

              <Button
                variant="outline"
                className="w-full justify-center gap-2"
                onClick={() => {
                  setIsLoading(true)
                  // Simulate GitHub sign-in
                  setTimeout(() => {
                    setIsLoading(false)
                    // In a real app, you would handle GitHub authentication here
                  }, 1500)
                }}
                disabled={isLoading}
              >
                <Github size={18} />
                {t.signInWithGithub}
              </Button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white dark:bg-slate-800 px-2 text-sm text-slate-500 dark:text-slate-400">
                  {t.or}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">{t.password}</Label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    {t.forgotPassword}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full aspect-square"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  {t.rememberMe}
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !email || !password}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{language === "en" ? "Signing in..." : "সাইন ইন হচ্ছে..."}</span>
                  </div>
                ) : (
                  <>
                    {t.signIn}
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t.noAccount}{" "}
                <Link href="/sign-up" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  {t.signUp}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

