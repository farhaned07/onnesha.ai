"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  MessageSquare,
  FileText,
  Clock,
  Zap,
  Crown,
  ChevronRight,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Globe,
} from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const translations = {
    en: {
      overview: "Overview",
      activity: "Activity",
      usage: "Usage",
      conversations: "Conversations",
      totalConversations: "Total Conversations",
      messagesExchanged: "Messages Exchanged",
      charactersGenerated: "Characters Generated",
      topicsExplored: "Topics Explored",
      recentActivity: "Recent Activity",
      viewAll: "View all",
      usageLimits: "Usage Limits",
      dailyMessages: "Daily Messages",
      monthlyQuota: "Monthly Quota",
      fileUploads: "File Uploads",
      upgradeAccount: "Upgrade Account",
      unlockPremium: "Unlock Premium Features",
      premiumDescription: "Get unlimited messages, priority support, and advanced features",
      upgrade: "Upgrade",
      continueChat: "Continue Chat",
      newChat: "New Chat",
      today: "Today",
      yesterday: "Yesterday",
      daysAgo: "days ago",
      usageStats: "Usage Statistics",
      usageDescription: "Track your usage and limits",
      messagesRemaining: "messages remaining today",
      quotaReset: "Quota resets in 3 days",
      recentTopics: "Recent Topics",
      aiTechnology: "AI Technology",
      webDevelopment: "Web Development",
      dataScience: "Data Science",
      bangladeshHistory: "Bangladesh History",
      businessIdeas: "Business Ideas",
    },
    bn: {
      overview: "ওভারভিউ",
      activity: "অ্যাক্টিভিটি",
      usage: "ব্যবহার",
      conversations: "কথোপকথন",
      totalConversations: "মোট কথোপকথন",
      messagesExchanged: "বিনিময় করা বার্তা",
      charactersGenerated: "জেনারেট করা অক্ষর",
      topicsExplored: "অন্বেষিত বিষয়",
      recentActivity: "সাম্প্রতিক কার্যকলাপ",
      viewAll: "সব দেখুন",
      usageLimits: "ব্যবহারের সীমা",
      dailyMessages: "দৈনিক বার্তা",
      monthlyQuota: "মাসিক কোটা",
      fileUploads: "ফাইল আপলোড",
      upgradeAccount: "অ্যাকাউন্ট আপগ্রেড করুন",
      unlockPremium: "প্রিমিয়াম বৈশিষ্ট্য আনলক করুন",
      premiumDescription: "অসীমিত বার্তা, অগ্রাধিকার সমর্থন এবং উন্নত বৈশিষ্ট্য পান",
      upgrade: "আপগ্রেড",
      continueChat: "চ্যাট চালিয়ে যান",
      newChat: "নতুন চ্যাট",
      today: "আজ",
      yesterday: "গতকাল",
      daysAgo: "দিন আগে",
      usageStats: "ব্যবহারের পরিসংখ্যান",
      usageDescription: "আপনার ব্যবহার এবং সীমা ট্র্যাক করুন",
      messagesRemaining: "আজ অবশিষ্ট বার্তা",
      quotaReset: "কোটা ৩ দিনে রিসেট হবে",
      recentTopics: "সাম্প্রতিক বিষয়",
      aiTechnology: "এআই প্রযুক্তি",
      webDevelopment: "ওয়েব ডেভেলপমেন্ট",
      dataScience: "ডাটা সায়েন্স",
      bangladeshHistory: "বাংলাদেশের ইতিহাস",
      businessIdeas: "ব্যবসার ধারণা",
    },
  }

  const t = translations[language]

  // Mock data
  const stats = {
    conversations: 42,
    messages: 386,
    characters: "1.2M",
    topics: 18,
  }

  const recentChats = [
    {
      id: "chat1",
      title: "Understanding Bengali culture",
      preview: "Can you tell me about the key aspects of Bengali culture?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "chat2",
      title: "Business plan for e-commerce",
      preview: "I need help creating a business plan for my e-commerce startup in Dhaka",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    },
    {
      id: "chat3",
      title: "Translation assistance",
      preview: "Can you help me translate this document from English to Bangla?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ]

  const usageLimits = {
    dailyMessages: { used: 12, total: 50 },
    monthlyQuota: { used: 386, total: 1000 },
    fileUploads: { used: 3, total: 10 },
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return t.today
    } else if (diffDays === 1) {
      return t.yesterday
    } else {
      return `${diffDays} ${t.daysAgo}`
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && <DashboardSidebar language={language} activePage="dashboard" />}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardHeader
          language={language}
          toggleLanguage={toggleLanguage}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview" className="text-sm">
                  <BarChart3 size={16} className="mr-2" />
                  {t.overview}
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-sm">
                  <Clock size={16} className="mr-2" />
                  {t.activity}
                </TabsTrigger>
                <TabsTrigger value="usage" className="text-sm">
                  <Zap size={16} className="mr-2" />
                  {t.usage}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 md:space-y-6">
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{t.totalConversations}</p>
                          <p className="text-2xl md:text-3xl font-bold mt-1">{stats.conversations}</p>
                        </div>
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{t.messagesExchanged}</p>
                          <p className="text-2xl md:text-3xl font-bold mt-1">{stats.messages}</p>
                        </div>
                        <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{t.charactersGenerated}</p>
                          <p className="text-2xl md:text-3xl font-bold mt-1">{stats.characters}</p>
                        </div>
                        <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{t.topicsExplored}</p>
                          <p className="text-2xl md:text-3xl font-bold mt-1">{stats.topics}</p>
                        </div>
                        <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent conversations */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{t.recentActivity}</CardTitle>
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => router.push("/chat")}>
                        {t.viewAll}
                        <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </div>
                    <CardDescription>{t.conversations}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {recentChats.map((chat) => (
                        <motion.div
                          key={chat.id}
                          whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                          className="p-4 cursor-pointer"
                          onClick={() => router.push(`/chat?id=${chat.id}`)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium">{chat.title}</h3>
                            <span className="text-xs text-muted-foreground">{formatTime(chat.timestamp)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">{chat.preview}</p>
                          <div className="flex justify-end mt-2">
                            <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">
                              {t.continueChat}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Usage limits and upgrade card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t.usageLimits}</CardTitle>
                      <CardDescription>{t.usageDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t.dailyMessages}</span>
                          <span className="font-medium">
                            {usageLimits.dailyMessages.used}/{usageLimits.dailyMessages.total}
                          </span>
                        </div>
                        <Progress value={(usageLimits.dailyMessages.used / usageLimits.dailyMessages.total) * 100} />
                        <p className="text-xs text-muted-foreground">
                          {usageLimits.dailyMessages.total - usageLimits.dailyMessages.used} {t.messagesRemaining}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t.monthlyQuota}</span>
                          <span className="font-medium">
                            {usageLimits.monthlyQuota.used}/{usageLimits.monthlyQuota.total}
                          </span>
                        </div>
                        <Progress value={(usageLimits.monthlyQuota.used / usageLimits.monthlyQuota.total) * 100} />
                        <p className="text-xs text-muted-foreground">{t.quotaReset}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t.fileUploads}</span>
                          <span className="font-medium">
                            {usageLimits.fileUploads.used}/{usageLimits.fileUploads.total}
                          </span>
                        </div>
                        <Progress value={(usageLimits.fileUploads.used / usageLimits.fileUploads.total) * 100} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="text-lg">{t.upgradeAccount}</CardTitle>
                      <CardDescription>{t.unlockPremium}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Sparkles size={16} className="text-amber-500" />
                          <span className="text-sm">Unlimited daily messages</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap size={16} className="text-amber-500" />
                          <span className="text-sm">Priority response time</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-amber-500" />
                          <span className="text-sm">Unlimited file uploads</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-amber-500" />
                          <span className="text-sm">Extended conversation history</span>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Crown size={16} className="mr-2" />
                        {t.upgrade}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.recentTopics}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: t.aiTechnology, count: 12 },
                        { name: t.webDevelopment, count: 8 },
                        { name: t.dataScience, count: 7 },
                        { name: t.bangladeshHistory, count: 5 },
                        { name: t.businessIdeas, count: 4 },
                      ].map((topic, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{topic.name}</span>
                            <span>{topic.count}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="bg-blue-500 dark:bg-blue-600 h-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(topic.count / 12) * 100}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end space-x-1 h-40">
                      {Array.from({ length: 14 }).map((_, index) => {
                        const height = Math.floor(Math.random() * 100)
                        return (
                          <div key={index} className="flex flex-col items-center flex-1">
                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm overflow-hidden h-32 flex items-end">
                              <motion.div
                                className="bg-blue-500 dark:bg-blue-600 w-full"
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                              />
                            </div>
                            <span className="text-xs mt-1 text-slate-500 dark:text-slate-400">{index + 1}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.usageStats}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Messages by Type</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                            <CardContent className="p-4 text-center">
                              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                              <p className="text-2xl font-bold">286</p>
                              <p className="text-sm text-muted-foreground">Text Messages</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800">
                            <CardContent className="p-4 text-center">
                              <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                              <p className="text-2xl font-bold">24</p>
                              <p className="text-sm text-muted-foreground">File Analyses</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800">
                            <CardContent className="p-4 text-center">
                              <Globe className="h-8 w-8 mx-auto mb-2 text-amber-600 dark:text-amber-400" />
                              <p className="text-2xl font-bold">76</p>
                              <p className="text-sm text-muted-foreground">Web Searches</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-3">Language Distribution</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>English</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} />

                          <div className="flex justify-between text-sm mt-4">
                            <span>Bangla</span>
                            <span>35%</span>
                          </div>
                          <Progress value={35} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subscription Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Current Plan</p>
                          <p className="text-xl font-semibold">Free</p>
                          <Badge variant="outline" className="mt-1">
                            Basic
                          </Badge>
                        </div>
                        <Button className="gap-1" onClick={() => router.push("/pricing")}>
                          <ArrowUpRight size={14} />
                          Upgrade
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Plan renewal</span>
                          <span className="text-sm font-medium">N/A</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next billing date</span>
                          <span className="text-sm font-medium">N/A</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Premium Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-amber-500" />
                            <span className="text-sm">Advanced AI Models</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Premium
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-amber-500" />
                            <span className="text-sm">Unlimited File Analysis</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Premium
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-amber-500" />
                            <span className="text-sm">Enhanced Web Search</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Premium
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap size={16} className="text-amber-500" />
                            <span className="text-sm">Priority Processing</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Premium
                          </Badge>
                        </div>

                        <Button className="w-full mt-4" onClick={() => router.push("/pricing")}>
                          <Crown size={16} className="mr-2" />
                          Upgrade to Premium
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

