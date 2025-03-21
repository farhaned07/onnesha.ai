"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, ArrowRight, Github, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { signIn } from "next-auth/react"

export default function SignInPage() {
  const router = useRouter()
  const { signIn: contextSignIn } = useAuth()
  const { toast } = useToast()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const translations = {
    en: {
      title: "Sign in",
      subtitle: "Welcome back",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      signIn: "Sign in",
      signInWithGoogle: "Continue with Google",
      signInWithGithub: "Continue with GitHub",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      or: "or",
      backToHome: "Back to home",
    },
    bn: {
      title: "সাইন ইন",
      subtitle: "স্বাগতম",
      email: "ইমেইল",
      emailPlaceholder: "আপনার ইমেইল লিখুন",
      password: "পাসওয়ার্ড",
      passwordPlaceholder: "আপনার পাসওয়ার্ড লিখুন",
      rememberMe: "আমাকে মনে রাখুন",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      signIn: "সাইন ইন",
      signInWithGoogle: "গুগল দিয়ে চালিয়ে যান",
      signInWithGithub: "গিটহাব দিয়ে চালিয়ে যান",
      noAccount: "অ্যাকাউন্ট নেই?",
      signUp: "সাইন আপ",
      or: "অথবা",
      backToHome: "হোমে ফিরে যান",
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
      await contextSignIn(email, password)
      router.push("/chat")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Invalid email or password. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/chat" })
    } catch (error) {
      console.error("Google signin error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("github", { callbackUrl: "/chat" })
    } catch (error) {
      console.error("GitHub signin error:", error)
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
          <div className="bg-[#25262B] rounded-xl md:rounded-2xl border border-white/5 p-5 md:p-8 shadow-xl">
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

              <div className="space-y-1.5 md:space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white/80 text-xs md:text-sm">
                    {t.password}
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-blue-400 hover:text-blue-300 text-[10px] md:text-xs"
                  >
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
                    className="bg-[#1A1B1E] border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50 h-9 md:h-11 text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full aspect-square text-white/60 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} className="md:size-18" /> : <Eye size={16} className="md:size-18" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-[10px] md:text-xs font-normal text-white/80 cursor-pointer"
                  >
                    {t.rememberMe}
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-9 md:h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg md:rounded-xl text-sm"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 md:h-4 md:w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{language === "en" ? "Signing in..." : "সাইন ইন হচ্ছে..."}</span>
                  </div>
                ) : (
                  <>
                    {t.signIn}
                    <ArrowRight size={14} className="ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-5 md:my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#25262B] px-2 text-xs md:text-sm text-white/40">{t.or}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-center gap-2 bg-transparent border-white/10 text-white hover:bg-white/5 h-9 md:h-11 rounded-lg md:rounded-xl text-xs md:text-sm"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
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
                type="button"
                variant="outline"
                className="w-full justify-center gap-2 bg-transparent border-white/10 text-white hover:bg-white/5 h-9 md:h-11 rounded-lg md:rounded-xl text-xs md:text-sm"
                onClick={handleGithubSignIn}
                disabled={isLoading}
              >
                <Github size={16} className="md:size-18" />
                {t.signInWithGithub}
              </Button>
            </div>

            <div className="mt-5 md:mt-6 text-center">
              <p className="text-[10px] md:text-xs text-white/60">
                {t.noAccount}{" "}
                <Link href="/sign-up" className="text-blue-400 hover:text-blue-300">
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

