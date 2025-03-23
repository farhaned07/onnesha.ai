"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import {
  Settings,
  ArrowUp,
  Search,
  Lightbulb,
  BookOpen,
  HelpCircle,
  BarChart3,
  Code,
  Mic,
  Crown,
  Menu,
  Globe,
} from "lucide-react"
import EnhancedChatMessage from "@/components/enhanced-chat-message"
import PaymentModal from "@/components/payment-modal"
import EnhancedTypingIndicator from "@/components/enhanced-typing-indicator"
import VoiceInput from "@/components/voice-input"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import AutoResizeTextarea from "@/components/auto-resize-textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function ChatPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [language, setLanguage] = useState<"en" | "bn">("bn")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isVoiceInputActive, setIsVoiceInputActive] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append, error, setMessages, reload } = useChat({
    api: "/api/chat",
    body: {},
    onResponse: (response) => {
      if (!response.ok) {
        toast({
          title: language === "en" ? "Error" : "ত্রুটি",
          description:
            language === "en"
              ? "There was an error communicating with the AI. Please try again."
              : "এআই-এর সাথে যোগাযোগে একটি ত্রুটি ছিল। অনুগ্রহ করে আবার চেষ্টা করুন।",
          variant: "destructive",
        })
      }
      setShowWelcome(false)
    },
    onError: (error) => {
      toast({
        title: language === "en" ? "Error" : "ত্রুটি",
        description: error.message,
        variant: "destructive",
      })
    },
    onFinish: () => {
      // Scroll to bottom when the response is complete
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  })

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  const handlePromptSelect = (prompt: string) => {
    append({
      role: "user",
      content: prompt,
    })
  }

  const handleVoiceInput = (text: string) => {
    append({
      role: "user",
      content: text,
    })
    setIsVoiceInputActive(false)
  }

  const handleRegenerateMessage = () => {
    if (messages.length > 0) {
      // Find the last user message
      const lastUserMessageIndex = [...messages].reverse().findIndex((m) => m.role === "user")
      if (lastUserMessageIndex !== -1) {
        const actualIndex = messages.length - 1 - lastUserMessageIndex
        const lastUserMessage = messages[actualIndex]

        // Remove all messages after the last user message
        const newMessages = messages.slice(0, actualIndex + 1)
        setMessages(newMessages)

        // Reload the response
        reload()
      }
    }
  }

  const handleCopyMessage = (content: string) => {
    toast({
      title: language === "en" ? "Copied" : "কপি করা হয়েছে",
      description: language === "en" ? "Message copied to clipboard" : "বার্তা ক্লিপবোর্ডে কপি করা হয়েছে",
      variant: "default",
    })
  }

  const translations = {
    en: {
      welcome: "HI! 👋",
      helpLine: "How can I help you today?",
      placeholder: "Ask me anything...",
      deepsearch: "DeepSearch",
      think: "Think",
      research: "Research",
      howto: "How to",
      analyze: "Analyze",
      createImages: "Create images",
      code: "Code",
      terms: "By messaging Onnesha, you agree to our Terms and Privacy Policy.",
      clearChat: "Clear Chat",
      stopVoice: "Stop Voice Input",
      premium: "Premium subscription",
      suggestions: [
        "What's the weather like?",
        "Help me with my homework",
        "Write a story",
        "Solve a math problem",
        "Explain a concept"
      ]
    },
    bn: {
      welcome: "হ্যালো! 👋",
      helpLine: "আপনাকে কীভাবে সাহায্য করতে পারি?",
      placeholder: "যেকোনো কিছু জিজ্ঞেস করুন...",
      deepsearch: "ডিপসার্চ",
      think: "চিন্তা",
      research: "গবেষণা",
      howto: "কিভাবে",
      analyze: "বিশ্লেষণ",
      createImages: "ছবি তৈরি",
      code: "কোড",
      terms: "অন্বেষাকে মেসেজ করে, আপনি আমাদের শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হচ্ছেন।",
      clearChat: "চ্যাট পরিষ্কার করুন",
      stopVoice: "ভয়েস ইনপুট বন্ধ করুন",
      premium: "প্রিমিয়াম সাবস্ক্রিপশন",
      suggestions: [
        "আবহাওয়া কেমন?",
        "হোমওয়ার্কে সাহায্য করুন",
        "একটি গল্প লিখুন",
        "গণিত সমস্যা সমাধান করুন",
        "একটি ধারণা ব্যাখ্যা করুন"
      ]
    },
  }

  const t = translations[language]

  const handleClearChat = () => {
    setMessages([])
    setShowWelcome(true)
  }

  const handleVoiceInputToggle = () => {
    setIsVoiceInputActive(!isVoiceInputActive)
  }

  const actions = [
    { icon: <Search size={18} />, text: t.deepsearch },
    { icon: <Lightbulb size={18} />, text: t.think },
    { icon: <BookOpen size={18} />, text: t.research },
    { icon: <HelpCircle size={18} />, text: t.howto },
    { icon: <BarChart3 size={18} />, text: t.analyze },
    { icon: <Code size={18} />, text: t.code },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.1,
      },
    },
  }

  return (
    <main className="flex flex-col h-screen bg-[#1A1B1E] overflow-hidden">
      {/* Ultra-clean, Le Chat-inspired header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-sm bg-[#1A1B1E]/60 h-12 md:h-16 flex items-center px-2 md:px-6"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo - Extremely minimal */}
          <div className="flex items-center ml-2 md:ml-4">
            <span className="text-base md:text-lg font-medium text-white/90">onnesha</span>
          </div>

          {/* Center section - Empty for cleanliness */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Intentionally left empty for minimalist design */}
          </div>

          {/* Right section - Minimal controls */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Language toggle - Simple text button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-md px-1.5 md:px-2 h-7 md:h-8"
            >
              {language === "bn" ? "English" : "বাংলা"}
            </Button>

            {/* Mobile menu - Clean hamburger */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 md:h-8 md:w-8 rounded-md text-white/70 hover:text-white hover:bg-white/5"
                >
                  <Menu size={16} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-[#1A1B1E] border-white/5 p-0">
                <div className="flex flex-col h-full">
                  {/* Menu items */}
                  <div className="flex-1 overflow-auto py-2">
                    <div className="px-2 space-y-1">
                      {/* Language */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="w-full justify-start rounded-md h-9 text-sm text-white/70 hover:text-white"
                      >
                        <Globe size={16} className="mr-2 opacity-70" />
                        {language === "en" ? "বাংলা" : "English"}
                      </Button>

                      {/* Settings */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSettingsDialog(!showSettingsDialog)}
                        className="w-full justify-start rounded-md h-9 text-sm text-white/70 hover:text-white"
                      >
                        <Settings size={16} className="mr-2 opacity-70" />
                        {language === "en" ? "Settings" : "সেটিংস"}
                      </Button>

                      {/* Premium */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full justify-start rounded-md h-9 text-sm text-white/70 hover:text-white"
                      >
                        <Crown size={16} className="mr-2 text-yellow-400/90" />
                        {t.premium}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {showWelcome ? (
            <motion.div
              key="welcome"
              className="flex flex-col items-center justify-center w-full max-w-2xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <motion.div className="text-center space-y-2 md:space-y-3 mb-4 md:mb-10" variants={itemVariants}>
                <h1 className="text-2xl md:text-4xl font-semibold text-foreground bg-gradient-to-r from-blue-100 to-white bg-clip-text">
                  {t.welcome}
                </h1>
                <p className="text-lg md:text-2xl text-muted-foreground">{t.helpLine}</p>
              </motion.div>

              {/* Input area */}
              <motion.div className="w-full max-w-2xl mb-4 md:mb-8 px-2 md:px-0" variants={itemVariants}>
                <form onSubmit={handleSubmit} className="w-full">
                  <motion.div
                    className="relative bg-white/5 backdrop-blur-md rounded-2xl p-3 md:p-4 border border-white/10 transition-all duration-300"
                    animate={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
                  >
                    <AutoResizeTextarea
                      value={input}
                      onChange={handleInputChange}
                      placeholder={t.placeholder}
                      className="w-full px-2 md:px-4 py-2 md:py-3 bg-transparent border-0 focus:ring-0 text-base md:text-lg resize-none"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />

                    <div className="flex items-center mt-2 md:mt-3">
                      <div className="flex gap-1 md:gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 md:h-8 text-xs rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 px-2 md:px-3"
                            onClick={() => handlePromptSelect(t.deepsearch)}
                          >
                            <Search size={14} className="mr-1 md:mr-2" />
                            <span className="hidden xs:inline">{t.deepsearch}</span>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 md:h-8 text-xs rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 px-2 md:px-3"
                            onClick={() => handlePromptSelect(t.think)}
                          >
                            <Lightbulb size={14} className="mr-1 md:mr-2" />
                            <span className="hidden xs:inline">{t.think}</span>
                          </Button>
                        </motion.div>
                      </div>

                      <div className="flex-1"></div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          opacity: input.trim() ? 1 : 0.5,
                          scale: input.trim() ? 1 : 0.95,
                        }}
                      >
                        <Button
                          type="submit"
                          size="icon"
                          disabled={isLoading || !input.trim()}
                          className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                        >
                          <ArrowUp size={14} />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </form>
              </motion.div>

              {/* Action buttons */}
              <motion.div className="flex flex-wrap justify-center gap-1.5 md:gap-2 px-1" variants={itemVariants}>
                {actions.map((action, index) => (
                  <motion.div
                    key={action.text}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.3 + index * 0.1 },
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 md:h-8 text-xs md:text-sm rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 px-2 py-1 md:px-3 md:py-1.5"
                      onClick={() => handlePromptSelect(action.text)}
                    >
                      {action.icon}
                      <span className="ml-1 md:ml-2">{action.text}</span>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Terms */}
              <motion.p
                className="text-xs text-center text-muted-foreground/60 mt-10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.6,
                  transition: { delay: 0.8 },
                }}
              >
                {t.terms}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              className="w-full max-w-3xl mx-auto h-full overflow-y-auto py-4 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: index * 0.05,
                      }}
                    >
                      <EnhancedChatMessage
                        message={message}
                        language={language}
                        onRegenerate={message.role === "assistant" ? handleRegenerateMessage : undefined}
                        onCopy={handleCopyMessage}
                        isLastMessage={index === messages.length - 1 && message.role === "assistant"}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="max-w-3xl mx-auto py-4"
                  >
                    <div className="inline-block bg-[#2A2B30] rounded-t-2xl rounded-br-2xl rounded-bl-sm p-4">
                      <EnhancedTypingIndicator variant="modern" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input when in chat mode */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 p-2 md:p-4 bg-[#1A1B1E]/80 backdrop-blur-md border-t border-white/5"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="max-w-3xl mx-auto">
                  <form onSubmit={handleSubmit} className="w-full">
                    <motion.div
                      className="relative bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl p-2 md:p-4 border border-white/10 transition-all duration-300"
                      animate={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
                    >
                      {isVoiceInputActive ? (
                        <div className="flex items-center justify-center p-2 md:p-4">
                          <VoiceInput onTranscription={handleVoiceInput} language={language} />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsVoiceInputActive(false)}
                            className="ml-4 rounded-full text-xs"
                          >
                            {t.stopVoice}
                          </Button>
                        </div>
                      ) : (
                        <>
                          <AutoResizeTextarea
                            value={input}
                            onChange={handleInputChange}
                            placeholder={t.placeholder}
                            className="w-full px-2 md:px-4 py-2 md:py-3 bg-transparent border-0 focus:ring-0 text-sm md:text-base resize-none"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                          />

                          <div className="flex items-center mt-1 md:mt-3">
                            <div className="flex gap-1 md:gap-2 overflow-x-auto no-scrollbar">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 md:h-8 text-xs rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 whitespace-nowrap px-2 py-0 md:px-3 md:py-1"
                                  onClick={() => handlePromptSelect(t.deepsearch)}
                                >
                                  <Search size={12} className="mr-1 md:mr-2" />
                                  <span className="text-[10px] md:text-xs">{t.deepsearch}</span>
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 md:h-8 text-xs rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 whitespace-nowrap px-2 py-0 md:px-3 md:py-1"
                                  onClick={() => handlePromptSelect(t.think)}
                                >
                                  <Lightbulb size={12} className="mr-1 md:mr-2" />
                                  <span className="text-[10px] md:text-xs">{t.think}</span>
                                </Button>
                              </motion.div>
                            </div>

                            <div className="flex-1"></div>

                            <div className="flex items-center gap-1 md:gap-2">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-white/5 hover:bg-white/10"
                                  onClick={handleVoiceInputToggle}
                                >
                                  <Mic size={12} className="md:size-14" />
                                </Button>
                              </motion.div>

                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                animate={{
                                  opacity: input.trim() ? 1 : 0.5,
                                  scale: input.trim() ? 1 : 0.95,
                                }}
                              >
                                <Button
                                  type="submit"
                                  size="icon"
                                  disabled={isLoading || !input.trim()}
                                  className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                                >
                                  <ArrowUp size={12} className="md:size-14" />
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Payment Modal */}
      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} language={language} />
    </main>
  )
}

