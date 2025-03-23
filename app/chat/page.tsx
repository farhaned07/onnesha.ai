"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { ArrowUp, BookOpen, HelpCircle, BarChart3, Code, Mic, Paperclip, Sparkles, Search, Lightbulb, FileBox, HelpingHand, LineChart, BrainCircuit } from "lucide-react"
import EnhancedChatMessage from "@/components/enhanced-chat-message"
import FileUpload from "@/components/file-upload"
import PaymentModal from "@/components/payment-modal"
import EnhancedTypingIndicator from "@/components/enhanced-typing-indicator"
import VoiceInput from "@/components/voice-input"
import WebSearchIndicator from "@/components/web-search-indicator"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import AutoResizeTextarea from "@/components/auto-resize-textarea"
import ChatSidebar from "@/components/dashboard/chat-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { Message } from "ai"

export default function ChatPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [isVoiceInputActive, setIsVoiceInputActive] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [enableWebSearch, setEnableWebSearch] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  
  // Optimized network status and device detection
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' && navigator.onLine)
  const [messageQueue, setMessageQueue] = useState<{content: string, timestamp: number}[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  
  // Virtual keyboard detection for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check for low-end device based on memory or CPU cores if available
    const checkPerformance = () => {
      // Check memory (if available in browser)
      if ('deviceMemory' in navigator) {
        // @ts-ignore - deviceMemory exists but TypeScript doesn't know about it
        setIsLowEndDevice(navigator.deviceMemory < 4)
        return
      }
      
      // Fallback: check if device is mobile as a proxy for potentially lower performance
      setIsLowEndDevice(window.innerWidth < 768)
    }
    
    checkMobile()
    checkPerformance()
    
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Listen for virtual keyboard on mobile
  useEffect(() => {
    if (!isMobile) return
    
    const handleResize = () => {
      // If visual viewport API is available (most modern browsers)
      if (window.visualViewport) {
        // Detect keyboard by significant height reduction
        const heightRatio = window.visualViewport.height / window.innerHeight
        setIsKeyboardVisible(heightRatio < 0.7)
      } else {
        // Fallback: assume keyboard is visible when focused on input
        setIsKeyboardVisible(document.activeElement?.tagName === 'TEXTAREA')
      }
    }
    
    window.addEventListener('resize', handleResize)
    window.visualViewport?.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  // Enhanced error handling for chat
  const errorHandler = useCallback((error: Error) => {
    console.error("Chat API error:", error);
    toast({
      variant: "destructive",
      title: language === "en" ? "An error occurred" : "একটি ত্রুটি ঘটেছে",
      description: error.message,
    });
    
    // Try to recover the chat after error with shorter timeout (3s instead of 5s)
    setTimeout(() => {
      if (isLoading) {
        console.log("Attempting recovery from stuck state");
        setMessages(prevMessages => [...prevMessages]); // Force a re-render
      }
    }, 3000);
  }, [language, toast]);
  
  // Optimize response handling
  const responseHandler = useCallback((response: Response) => {
    if (!response.ok) {
      console.error(`Chat API error: ${response.status} ${response.statusText}`);
    }
  }, []);
  
  // Optimize message finishing handler
  const finishHandler = useCallback((message: any) => {
    if (showWelcome) setShowWelcome(false);
    if (enableWebSearch) setIsSearching(false);
    
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [showWelcome, enableWebSearch]);
  
  // Initialize chat with optimized handlers
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    append, 
    error, 
    setMessages, 
    reload 
  } = useChat({
    api: "/api/chat",
    onError: errorHandler,
    onResponse: responseHandler,
    onFinish: finishHandler,
    body: {
      personality: "balanced",
      enableWebSearch,
    },
  });
  
  // Use memo for translations to prevent recalculations
  const t = useMemo(() => ({
    welcome: language === "en" ? "Hi 👋" : "হ্যালো 👋",
    helpLine: language === "en" ? "How can I assist you today?" : "আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
    placeholder: language === "en" ? "What do you want to know?" : "আপনি কী জানতে চান?",
    send: language === "en" ? "Send" : "পাঠান",
    reset: language === "en" ? "Reset Conversation" : "কথোপকথন রিসেট করুন",
    info: language === "en" ? "About" : "সম্পর্কে",
    options: language === "en" ? "Options" : "বিকল্পসমূহ",
    loadingDots: language === "en" ? "..." : "...",
    searchPlaceholder: language === "en" ? "Search conversations..." : "কথোপকথন খুঁজুন...",
    newChat: language === "en" ? "New Chat" : "নতুন চ্যাট",
    pinnedChats: language === "en" ? "Pinned" : "পিন করা",
    today: language === "en" ? "Today" : "আজ",
    yesterday: language === "en" ? "Yesterday" : "গতকাল",
    older: language === "en" ? "Older" : "পুরোনো",
    noChats: language === "en" ? "No chats yet" : "এখনো কোন চ্যাট নেই",
    edit: language === "en" ? "Edit" : "সম্পাদনা",
    delete: language === "en" ? "Delete" : "মুছুন",
    pin: language === "en" ? "Pin" : "পিন",
    unpin: language === "en" ? "Unpin" : "আনপিন",
    share: language === "en" ? "Share" : "শেয়ার",
    stopVoice: language === "en" ? "Stop Recording" : "রেকর্ডিং বন্ধ করুন",
    tryAsking: language === "en" ? "Try asking about" : "সম্পর্কে জিজ্ঞাসা করুন",
    regenerate: language === "en" ? "Regenerate" : "পুনঃতৈরি",
    deepsearch: language === "en" ? "DeepSearch" : "ডিপসার্চ",
    think: language === "en" ? "Think" : "চিন্তা",
    research: language === "en" ? "Research" : "গবেষণা",
    howto: language === "en" ? "How to" : "কিভাবে",
    analyze: language === "en" ? "Analyze" : "বিশ্লেষণ",
    code: language === "en" ? "Code" : "কোড",
    browsing: language === "en" ? "Browsing" : "ব্রাউজিং",
    terms: language === "en" ? "By using this service, you agree to our Terms of Service and Privacy Policy" : "এই পরিষেবা ব্যবহার করে, আপনি আমাদের পরিষেবার শর্তাবলী এবং গোপনীয়তা নীতি মেনে নিচ্ছেন",
    you: language === "en" ? "You" : "আপনি",
    ai: language === "en" ? "Onnesha AI" : "অন্বেষা এআই",
    searching: language === "en" ? "Searching the web for the latest information..." : "সর্বশেষ তথ্যের জন্য ওয়েব অনুসন্ধান করছি...",
  }), [language]); // Only recalculate when language changes
  
  // Process queued messages when back online
  const processMessageQueue = useCallback(async () => {
    if (!isOnline || messageQueue.length === 0) return
    
    // Sort by timestamp to send oldest first
    const sortedQueue = [...messageQueue].sort((a, b) => a.timestamp - b.timestamp)
    
    for (const queuedMessage of sortedQueue) {
      try {
        await append({
          content: queuedMessage.content,
          role: 'user',
        })
        
        // Remove from queue after successful send
        setMessageQueue(prev => prev.filter(msg => msg.timestamp !== queuedMessage.timestamp))
      } catch (error) {
        console.error('Failed to send queued message:', error)
        // Stop processing if an error occurs
        break
      }
    }
  }, [isOnline, messageQueue, append])

  // Optimized custom submit handler with debounce protection
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCustomSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!input.trim() || isSubmitting) return
    
    setIsSubmitting(true);
    
    // Use timeout to prevent double-submissions
    setTimeout(() => setIsSubmitting(false), 500);
    
    if (enableWebSearch) {
      setIsSearching(true)
    }
    
    const currentInput = input.trim();
    
    try {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
      
      const messageCountBefore = messages.length;
      
      // Submit the message
      handleSubmit(e);
      
      // Optimized message tracking with shorter timeout
      setTimeout(() => {
        if (messageCountBefore === messages.length && !isLoading) {
          console.log("Message count didn't change, manually adding message");
          
          // Force append user message
          setMessages(prev => [
            ...prev,
            {
              id: `manual-${Date.now()}`,
              content: currentInput,
              role: 'user'
            }
          ]);
          
          // Try triggering a reload if needed
          if (!isLoading) {
            reload();
          }
        }
      }, 500); // Reduced from 1000ms to 500ms
    } catch (error) {
      console.error("Error submitting message:", error);
      
      if (!isOnline) {
        // Offline handling
        const newQueuedMessage = {
          content: currentInput,
          timestamp: Date.now()
        }
        setMessageQueue(prev => [...prev, newQueuedMessage])
        
        // Optimistic UI update
        setMessages(prev => [
          ...prev,
          {
            id: `temp-${Date.now()}`,
            content: currentInput,
            role: 'user'
          },
          {
            id: `temp-response-${Date.now()}`,
            content: language === 'en' 
              ? "You're currently offline. This message will be processed when you reconnect."
              : "আপনি বর্তমানে অফলাইন আছেন। আপনি পুনরায় সংযোগ করলে এই বার্তাটি প্রক্রিয়া করা হবে।",
            role: 'assistant'
          }
        ]);
        
        // Clear input
        handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
      }
    }
  }, [input, isSubmitting, enableWebSearch, messages.length, isLoading, handleSubmit, reload, isOnline, language, handleInputChange]);

  // Optimize message rendering by limiting animations
  const shouldAnimate = useMemo(() => !isLowEndDevice && messages.length < 50, [isLowEndDevice, messages.length]);
  
  // Get animation settings based on device capabilities
  const getAnimationSettings = useCallback(() => {
    if (isLowEndDevice || messages.length > 30) {
      // Minimal animations for low-end devices or many messages
      return {
        initial: { opacity: 0.8 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.1 }
      }
    }
    
    // Full animations for capable devices with fewer messages
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    }
  }, [isLowEndDevice, messages.length]);
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "bn" : "en"))
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleFileClear = () => {
    setSelectedFile(null)
    setUploadProgress(0)
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return
    }

    setIsUploading(true)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append("file", selectedFile)

      // Send file to API
      const response = await fetch("/api/process-file", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process file")
      }

      const result = await response.json()
      setUploadProgress(100)

      // Add file analysis as an assistant message
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now().toString(),
            content: `Analysis of ${selectedFile.name}:\n\n${result.analysis}`,
            role: "assistant",
          },
        ])
        setIsUploading(false)
        setSelectedFile(null)
        setUploadProgress(0)
        setShowFileUpload(false)
      }, 500)
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadProgress(0)
      setIsUploading(false)
      toast({
        variant: "destructive",
        title: language === "en" ? "File Upload Error" : "ফাইল আপলোড ত্রুটি",
        description:
          language === "en"
            ? "Failed to process the file. Please try again."
            : "ফাইল প্রক্রিয়া করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      })
    }
  }

  const handlePromptSelect = (promptText: string) => {
    if (!promptText.trim()) return;
    
    // Set the input text first (to show what was selected)
    handleInputChange({ target: { value: promptText } } as React.ChangeEvent<HTMLTextAreaElement>);
    
    // Then submit it after a small delay to ensure UI updates
    setTimeout(() => {
      if (inputRef.current) {
        const form = inputRef.current.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
    }, 100);
  }

  const handleVoiceInput = (transcript: string) => {
    handleInputChange({ target: { value: transcript } } as React.ChangeEvent<HTMLTextAreaElement>)
    setIsVoiceInputActive(false)
  }

  const handleRegenerateMessage = () => {
    reload()
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        toast({
          description: language === "en" ? "Copied to clipboard" : "ক্লিপবোর্ডে কপি করা হয়েছে",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          variant: "destructive",
          description: language === "en" ? "Failed to copy" : "কপি করতে ব্যর্থ হয়েছে",
        })
      }
    )
  }

  const handleWebSearchToggle = (enabled: boolean) => {
    setEnableWebSearch(enabled)
  }

  const handleVoiceInputToggle = () => {
    setIsVoiceInputActive(!isVoiceInputActive)
  }

  const actions = [
    { icon: <Search size={18} />, text: t.deepsearch },
    { icon: <BrainCircuit size={18} />, text: t.think },
    { icon: <BookOpen size={18} />, text: t.research },
    { icon: <HelpCircle size={18} />, text: t.howto },
    { icon: <LineChart size={18} />, text: t.analyze },
    { icon: <Code size={18} />, text: t.code },
  ]

  const createNewChat = () => {
    setMessages([])
    setShowWelcome(true)
    setActiveChatId(null)
  }

  const messageAnimationProps = getAnimationSettings()

  // Add back the network monitoring code which was removed
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Try to send queued messages when back online
      processMessageQueue();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [processMessageQueue]);

  // Auto-scroll to bottom when messages change - optimized version
  useEffect(() => {
    if (messages.length > 0 || isLoading) {
      // Use requestAnimationFrame for smoother scrolling
      const scrollToBottom = () => {
        requestAnimationFrame(() => {
          messagesEndRef.current?.scrollIntoView({ 
            behavior: isLowEndDevice ? "auto" : "smooth" // Use auto for low-end devices
          });
        });
      };
      
      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(scrollToBottom, isLowEndDevice ? 0 : 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isLoading, isLowEndDevice]);

  // Retry sending a failed message from the UI - optimized version
  const retryFailedMessage = useCallback(() => {
    if (messageQueue.length > 0 && isOnline) {
      processMessageQueue();
    }
  }, [messageQueue.length, isOnline, processMessageQueue]);

  // Optimize message display by using windowing for large message counts
  const messageElements = useMemo(() => {
    // Only create message elements when they change
    return messages.map((message, index) => (
      <motion.div
        key={message.id}
        {...messageAnimationProps}
        transition={{
          ...messageAnimationProps.transition,
          delay: shouldAnimate ? Math.min(index * 0.03, 0.3) : 0, // Cap delay at 300ms
        }}
        className="w-full"
      >
        <EnhancedChatMessage
          message={message}
          language={language}
          onRegenerate={message.role === "assistant" ? handleRegenerateMessage : undefined}
          onCopy={handleCopyMessage}
          isLastMessage={index === messages.length - 1 && message.role === "assistant"}
        />
      </motion.div>
    ));
  }, [messages, messageAnimationProps, shouldAnimate, language, handleRegenerateMessage, handleCopyMessage]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[240px] md:w-[280px] border-r border-slate-200 dark:border-slate-800 h-full flex flex-col"
          >
            <ChatSidebar
              language={language}
              onNewChat={createNewChat}
              onChatSelect={(id) => setActiveChatId(id)}
              activeChatId={activeChatId}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full">
        <DashboardHeader
          language={language}
          toggleLanguage={toggleLanguage}
          toggleTheme={toggleTheme}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          onNewChat={createNewChat}
        />

        {/* Simple flexbox layout with fixed footer */}
        <div className="flex flex-col h-full relative">
          {/* Messages area with dynamic padding based on keyboard visibility */}
          <div 
            className="flex-1 overflow-y-auto" 
            style={{ 
              paddingBottom: isKeyboardVisible ? "80px" : "140px",
              transition: "padding-bottom 0.2s ease-out"
            }}
          >
            <AnimatePresence mode="wait">
              {showWelcome ? (
                <motion.div
                  key="welcome"
                  className="flex flex-col items-center justify-center h-full px-3 md:px-4 py-8 md:py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 max-w-2xl mx-auto">
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="text-center space-y-1.5 md:space-y-2">
                      <h1 className="text-2xl md:text-3xl font-bold">{t.welcome}</h1>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">{t.helpLine}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full">
                      {actions.map((action, index) => (
                        <motion.button
                          key={index}
                          className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                          onClick={() => handlePromptSelect(action.text)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                            {action.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm md:text-base">{action.text}</div>
                            <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                              {language === "en" ? "Try asking for help with this" : "এর সাথে সাহায্য চাওয়ার চেষ্টা করুন"}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="p-4">
                  <div className="max-w-3xl mx-auto">
                    {/* Web Search Indicator */}
                    <AnimatePresence>
                      {enableWebSearch && <WebSearchIndicator language={language} isSearching={isSearching} />}
                    </AnimatePresence>

                    <AnimatePresence initial={false}>
                      {messageElements}
                    </AnimatePresence>

                    {isLoading && (
                      <motion.div
                        {...messageAnimationProps}
                        className="max-w-3xl mx-auto py-2 md:py-4"
                      >
                        <div className="flex items-start gap-2 md:gap-3">
                          <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 md:p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                            <EnhancedTypingIndicator variant="modern" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-10" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Fixed input area with network status indicator */}
          <div className={`sticky bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 md:p-4 shadow-md ${isKeyboardVisible ? 'pb-1' : ''}`}>
            {/* Network status indicator */}
            {typeof navigator !== 'undefined' && !navigator.onLine && (
              <div className="bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs p-1 text-center rounded mb-1">
                {language === "en" ? "You are offline. Messages will be sent when you reconnect." : "আপনি অফলাইন আছেন। আপনি পুনরায় সংযোগ স্থাপন করলে বার্তা পাঠানো হবে।"}
              </div>
            )}
            
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleCustomSubmit}>
                <div className={`relative bg-white dark:bg-slate-800 rounded-lg border ${isFocused ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200 dark:border-slate-700"} transition-all duration-200`}>
                  {isVoiceInputActive ? (
                    <div className="flex items-center justify-center p-3 md:p-4">
                      <VoiceInput onTranscription={handleVoiceInput} language={language} />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsVoiceInputActive(false)}
                        className="ml-3 md:ml-4 rounded-md text-xs min-h-[44px] min-w-[44px]"
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
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-transparent border-0 focus:ring-0 resize-none text-sm md:text-base"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        inputMode={isMobile ? "text" : undefined} // Better virtual keyboard on mobile
                      />

                      <div className="absolute right-2 bottom-2">
                        <Button
                          type="submit"
                          size="icon"
                          disabled={isLoading || !input.trim()}
                          className={cn(
                            "h-11 w-11 rounded-full", // Increased touch target size
                            input.trim()
                              ? "bg-blue-500 hover:bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-400"
                          )}
                        >
                          <ArrowUp size={isMobile ? 20 : 16} />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="text-center mt-2">
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">{t.terms}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} language={language} />
    </div>
  )
}

