"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon, LogOut, Settings, HelpCircle, User, Bell, Plus } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  language: "en" | "bn"
  toggleLanguage: () => void
  toggleTheme: () => void
  toggleSidebar: () => void
  isSidebarOpen: boolean
  onNewChat?: () => void
}

export default function DashboardHeader({
  language,
  toggleLanguage,
  toggleTheme,
  toggleSidebar,
  isSidebarOpen,
  onNewChat,
}: DashboardHeaderProps) {
  const { theme } = useTheme()
  const router = useRouter()

  const translations = {
    en: {
      title: "Onnesha AI",
      newChat: "New chat",
      settings: "Settings",
      help: "Help",
      profile: "My profile",
      logout: "Log out",
      activity: "Activity",
      customInstructions: "Custom instructions",
    },
    bn: {
      title: "অন্বেষা এআই",
      newChat: "নতুন চ্যাট",
      settings: "সেটিংস",
      help: "সাহায্য",
      profile: "আমার প্রোফাইল",
      logout: "লগ আউট",
      activity: "কার্যকলাপ",
      customInstructions: "কাস্টম নির্দেশাবলী",
    },
  }

  const t = translations[language]

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat()
    }
  }

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 flex items-center justify-between px-3 sticky top-0 z-10">
      {/* Left section with menu and brand */}
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="h-8 w-8 rounded-md mr-3 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
        </Button>

        <Link href="/" className="font-semibold text-base">
          {t.title}
        </Link>
      </div>

      {/* New chat button (center) - ChatGPT style */}
      <Button 
        onClick={handleNewChat}
        variant="outline" 
        className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md h-9"
      >
        <Plus size={14} />
        <span className="text-sm font-medium">{t.newChat}</span>
      </Button>

      {/* Right section with user actions */}
      <div className="flex items-center space-x-1.5">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          className="h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </Button>

        <LanguageToggle language={language} toggleLanguage={toggleLanguage} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-md overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="User menu"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="text-xs bg-emerald-600 text-white">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User size={14} className="mr-2" />
              <span>{t.profile}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell size={14} className="mr-2" />
              <span>{t.activity}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings size={14} className="mr-2" />
              <span>{t.customInstructions}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings size={14} className="mr-2" />
              <span>{t.settings}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={handleLogout}>
              <LogOut size={14} className="mr-2" />
              <span>{t.logout}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

