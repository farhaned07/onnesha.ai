"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  HelpCircle,
  FileText,
  Crown,
  LogOut,
  ChevronRight,
  ChevronLeft,
  User,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  language: "en" | "bn"
  activePage?: string
  className?: string
}

export default function DashboardSidebar({ language, activePage, className }: DashboardSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const translations = {
    en: {
      dashboard: "Dashboard",
      chat: "Chat",
      documents: "Documents",
      settings: "Settings",
      help: "Help & Support",
      profile: "Profile",
      upgrade: "Upgrade to Premium",
      logout: "Log Out",
      collapse: "Collapse",
      expand: "Expand",
    },
    bn: {
      dashboard: "ড্যাশবোর্ড",
      chat: "চ্যাট",
      documents: "ডকুমেন্টস",
      settings: "সেটিংস",
      help: "সাহায্য এবং সমর্থন",
      profile: "প্রোফাইল",
      upgrade: "প্রিমিয়ামে আপগ্রেড করুন",
      logout: "লগ আউট",
      collapse: "সংকুচিত করুন",
      expand: "প্রসারিত করুন",
    },
  }

  const t = translations[language]

  const menuItems = [
    { icon: <LayoutDashboard size={collapsed ? 20 : 16} />, label: t.dashboard, href: "/dashboard" },
    { icon: <MessageSquare size={collapsed ? 20 : 16} />, label: t.chat, href: "/chat" },
    { icon: <FileText size={collapsed ? 20 : 16} />, label: t.documents, href: "/documents" },
    { icon: <User size={collapsed ? 20 : 16} />, label: t.profile, href: "/profile" },
    { icon: <Settings size={collapsed ? 20 : 16} />, label: t.settings, href: "/settings" },
    { icon: <HelpCircle size={collapsed ? 20 : 16} />, label: t.help, href: "/help" },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className={cn("w-[240px] border-r border-slate-200 dark:border-slate-800 h-full flex flex-col", className)}>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          {!collapsed && <span className="text-lg font-semibold">Onnesha AI</span>}
        </Link>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-2">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size={collapsed ? "icon" : "default"}
              className={cn(
                "w-full justify-start",
                collapsed ? "h-10 w-10" : "px-3 py-2 h-10",
                isActive(item.href) && "bg-slate-100 dark:bg-slate-800 font-medium",
              )}
              onClick={() => router.push(item.href)}
            >
              <span className={cn("mr-2", collapsed && "mr-0")}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start gap-2 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
            collapsed && "px-0 justify-center",
          )}
          onClick={() => router.push("/pricing")}
        >
          <Crown size={16} />
          {!collapsed && <span>{t.upgrade}</span>}
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-red-600 dark:text-red-400",
            collapsed && "px-0 justify-center",
          )}
          onClick={() => router.push("/")}
        >
          <LogOut size={16} />
          {!collapsed && <span>{t.logout}</span>}
        </Button>
      </div>
    </div>
  )
}

