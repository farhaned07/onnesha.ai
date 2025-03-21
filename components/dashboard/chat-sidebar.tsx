"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Search,
  MessageSquare,
  Crown,
  Inbox,
  ArrowUpRight,
  MoreVertical,
  Trash2,
  Edit,
  Share2,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for recent chats
const mockChats = [
  {
    id: "chat1",
    title: "Understanding Bengali culture",
    preview: "Can you tell me about the key aspects of Bengali culture?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    pinned: true,
  },
  {
    id: "chat2",
    title: "Business plan for e-commerce",
    preview: "I need help creating a business plan for my e-commerce startup in Dhaka",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    pinned: false,
  },
  {
    id: "chat3",
    title: "Translation assistance",
    preview: "Can you help me translate this document from English to Bangla?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    pinned: false,
  },
  {
    id: "chat4",
    title: "Software development workflow",
    preview: "What's the best agile workflow for a small development team?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    pinned: false,
  },
  {
    id: "chat5",
    title: "Marketing strategies",
    preview: "What are some effective digital marketing strategies for small businesses in Bangladesh?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    pinned: false,
  },
]

interface ChatSidebarProps {
  language: "en" | "bn"
  onNewChat: () => void
  onChatSelect: (id: string) => void
  activeChatId: string | null
}

export default function ChatSidebar({ language, onNewChat, onChatSelect, activeChatId }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const translations = {
    en: {
      newChat: "New Chat",
      recentChats: "Recent Chats",
      searchPlaceholder: "Search chats",
      upgrade: "Upgrade to Pro",
      inbox: "Inbox",
      beta: "BETA",
      noChats: "No recent chats",
      pinnedChats: "Pinned",
      today: "Today",
      yesterday: "Yesterday",
      older: "Older",
      edit: "Rename",
      delete: "Delete",
      share: "Share",
    },
    bn: {
      newChat: "নতুন চ্যাট",
      recentChats: "সাম্প্রতিক চ্যাট",
      searchPlaceholder: "চ্যাট অনুসন্ধান করুন",
      upgrade: "প্রো-তে আপগ্রেড করুন",
      inbox: "ইনবক্স",
      beta: "বেটা",
      noChats: "কোন সাম্প্রতিক চ্যাট নেই",
      pinnedChats: "পিন করা",
      today: "আজ",
      yesterday: "গতকাল",
      older: "পুরানো",
      edit: "নাম পরিবর্তন করুন",
      delete: "মুছে ফেলুন",
      share: "শেয়ার করুন",
    },
  }

  const t = translations[language]

  // Filter chats based on search query
  const filteredChats = mockChats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group chats by date
  const pinnedChats = filteredChats.filter((chat) => chat.pinned)

  const todayChats = filteredChats.filter((chat) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return chat.timestamp >= today && !chat.pinned
  })

  const yesterdayChats = filteredChats.filter((chat) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return chat.timestamp >= yesterday && chat.timestamp < today && !chat.pinned
  })

  const olderChats = filteredChats.filter((chat) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return chat.timestamp < yesterday && !chat.pinned
  })

  // Format timestamp
  const formatTime = (date: Date) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date >= today) {
      return date.toLocaleTimeString(language === "en" ? "en-US" : "bn-BD", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    } else if (date >= yesterday) {
      return language === "en" ? "Yesterday" : "গতকাল"
    } else {
      return date.toLocaleDateString(language === "en" ? "en-US" : "bn-BD", {
        month: "short",
        day: "numeric",
      })
    }
  }

  const handleEditChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, you would implement chat renaming functionality
    console.log("Edit chat:", chatId)
  }

  const handleShareChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, you would implement chat sharing functionality
    console.log("Share chat:", chatId)
  }

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, you would implement chat deletion functionality
    console.log("Delete chat:", chatId)
  }

  const handleUpgradeClick = () => {
    router.push("/pricing")
  }

  const handleInboxClick = () => {
    router.push("/inbox")
  }

  // Render chat list with sections
  const renderChatList = () => {
    if (filteredChats.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
          <MessageSquare className="h-12 w-12 mb-3 opacity-20" />
          <p>{t.noChats}</p>
        </div>
      )
    }

    return (
      <>
        {pinnedChats.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 mb-2">{t.pinnedChats}</h3>
            {renderChatGroup(pinnedChats)}
          </div>
        )}

        {todayChats.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 mb-2">{t.today}</h3>
            {renderChatGroup(todayChats)}
          </div>
        )}

        {yesterdayChats.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 mb-2">{t.yesterday}</h3>
            {renderChatGroup(yesterdayChats)}
          </div>
        )}

        {olderChats.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2 mb-2">{t.older}</h3>
            {renderChatGroup(olderChats)}
          </div>
        )}
      </>
    )
  }

  // Render a group of chats
  const renderChatGroup = (chats: typeof mockChats) => {
    return chats.map((chat) => (
      <motion.div
        key={chat.id}
        whileHover={{ x: 3 }}
        className={`px-2 py-2 rounded-lg cursor-pointer mb-1 ${
          chat.id === activeChatId ? "bg-blue-50 dark:bg-blue-900/20" : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
        }`}
        onClick={() => onChatSelect(chat.id)}
      >
        <div className="flex justify-between w-full">
          <div className="flex-1 min-w-0">
            <div className="flex items-start">
              <MessageSquare className="h-4 w-4 mt-1 mr-2 text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium truncate">{chat.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{chat.preview}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center ml-2">
            <div className="text-xs text-slate-500 dark:text-slate-400 mr-2">{formatTime(chat.timestamp)}</div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => handleEditChat(chat.id, e)}>
                  <Edit size={14} className="mr-2" />
                  <span>{t.edit}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleShareChat(chat.id, e)}>
                  <Share2 size={14} className="mr-2" />
                  <span>{t.share}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-400"
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                >
                  <Trash2 size={14} className="mr-2" />
                  <span>{t.delete}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    ))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-800">
        <Button onClick={onNewChat} className="w-full justify-between text-xs md:text-sm" size="sm">
          {t.newChat}
          <Plus size={14} className="md:size-16" />
        </Button>
      </div>

      <div className="px-3 md:px-4 py-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-slate-500 dark:text-slate-400" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 md:pl-8 text-xs md:text-sm h-7 md:h-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">{renderChatList()}</div>
      </ScrollArea>

      <div className="p-2 md:p-3 border-t border-slate-200 dark:border-slate-800">
        <Button
          variant="outline"
          className="w-full justify-between text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-xs md:text-sm h-7 md:h-8"
          size="sm"
          onClick={handleUpgradeClick}
        >
          <span className="flex items-center">
            <Crown size={12} className="mr-1 md:mr-2 md:size-14" />
            {t.upgrade}
          </span>
          <ArrowUpRight size={12} className="md:size-14" />
        </Button>

        <div className="mt-2 md:mt-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-xs md:text-sm h-7 md:h-8"
            size="sm"
            onClick={handleInboxClick}
          >
            <Inbox size={14} className="mr-1 md:mr-2 md:size-16" />
            <span>{t.inbox}</span>
            <div className="ml-1 md:ml-2 px-1 md:px-1.5 py-0.5 rounded text-[10px] md:text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              {t.beta}
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

