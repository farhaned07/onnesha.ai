"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Edit,
  MessageSquare,
  MapPin,
  Mail,
  Globe,
  Twitter,
  Linkedin,
  Github,
  BarChart3,
  Calendar,
  FileText,
  Settings,
  Crown,
  Sparkles,
  Zap,
  CheckCircle,
  ChevronRight,
  Download,
  Share2,
  TrendingUp,
  Bookmark,
  Trash2,
} from "lucide-react"
import { motion } from "framer-motion"

interface UserDashboardProps {
  language: "en" | "bn"
}

export default function UserDashboard({ language }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "AI enthusiast and tech lover. Interested in natural language processing and machine learning. Exploring the intersection of technology and creativity.",
    location: "Dhaka, Bangladesh",
    joinDate: "March 2023",
    conversationCount: 42,
    website: "johndoe.dev",
    twitter: "johndoe",
    linkedin: "johndoe",
    github: "johndoe",
    interests: ["AI", "Technology", "Education", "Science", "Machine Learning", "Data Science"],
    avatarUrl: "",
    coverUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
    stats: {
      conversations: 142,
      tokens: 25420,
      questions: 356,
      savedResponses: 53,
      streak: 7,
      daysActive: 42,
      topicsExplored: 18,
      filesUploaded: 12,
    },
    recentTopics: [
      { name: "Machine Learning", count: 32 },
      { name: "Web Development", count: 28 },
      { name: "Data Science", count: 17 },
      { name: "AI Ethics", count: 15 },
      { name: "Natural Language Processing", count: 12 },
    ],
    activity: [
      { date: "2023-10-15", count: 5 },
      { date: "2023-10-16", count: 3 },
      { date: "2023-10-17", count: 7 },
      { date: "2023-10-18", count: 2 },
      { date: "2023-10-19", count: 4 },
      { date: "2023-10-20", count: 6 },
      { date: "2023-10-21", count: 8 },
      { date: "2023-10-22", count: 5 },
      { date: "2023-10-23", count: 9 },
      { date: "2023-10-24", count: 4 },
      { date: "2023-10-25", count: 7 },
      { date: "2023-10-26", count: 3 },
      { date: "2023-10-27", count: 6 },
      { date: "2023-10-28", count: 8 },
    ],
    achievements: [
      {
        id: 1,
        name: "First Conversation",
        description: "Started your first conversation",
        completed: true,
        icon: <MessageSquare size={16} />,
      },
      {
        id: 2,
        name: "Power User",
        description: "Used the AI for 7 consecutive days",
        completed: true,
        icon: <Zap size={16} />,
      },
      {
        id: 3,
        name: "Knowledge Explorer",
        description: "Explored 10 different topics",
        completed: true,
        icon: <Globe size={16} />,
      },
      {
        id: 4,
        name: "Document Master",
        description: "Analyzed 10 documents",
        completed: true,
        icon: <FileText size={16} />,
      },
      {
        id: 5,
        name: "AI Enthusiast",
        description: "Reached 100 conversations",
        completed: true,
        icon: <Sparkles size={16} />,
      },
      {
        id: 6,
        name: "Feedback Provider",
        description: "Provided feedback on 5 responses",
        completed: false,
        icon: <MessageSquare size={16} />,
      },
      {
        id: 7,
        name: "Bilingual Expert",
        description: "Used both English and Bangla",
        completed: true,
        icon: <Globe size={16} />,
      },
      {
        id: 8,
        name: "Premium Member",
        description: "Subscribed to premium plan",
        completed: false,
        icon: <Crown size={16} />,
      },
    ],
    savedChats: [
      {
        id: 1,
        title: "Machine Learning Basics",
        date: "2023-10-25",
        preview: "An introduction to machine learning concepts and applications...",
      },
      {
        id: 2,
        title: "Web Development Tips",
        date: "2023-10-20",
        preview: "Best practices for modern web development and responsive design...",
      },
      {
        id: 3,
        title: "Data Analysis Project",
        date: "2023-10-15",
        preview: "Steps to analyze a dataset and extract meaningful insights...",
      },
      {
        id: 4,
        title: "AI Ethics Discussion",
        date: "2023-10-10",
        preview: "Exploring the ethical considerations in artificial intelligence...",
      },
    ],
    usageByTime: [
      { time: "Morning", percentage: 35 },
      { time: "Afternoon", percentage: 45 },
      { time: "Evening", percentage: 15 },
      { time: "Night", percentage: 5 },
    ],
    usageByDevice: [
      { device: "Desktop", percentage: 65 },
      { device: "Mobile", percentage: 30 },
      { device: "Tablet", percentage: 5 },
    ],
    subscriptionPlan: "Free",
    subscriptionRenews: "N/A",
    subscriptionFeatures: [
      { name: "Conversations", limit: "100/month", used: 42 },
      { name: "File Uploads", limit: "20/month", used: 12 },
      { name: "Response Length", limit: "Standard", used: null },
      { name: "Priority Support", limit: "No", used: null },
    ],
  })

  const translations = {
    en: {
      dashboard: "Dashboard",
      profile: "Profile",
      editProfile: "Edit Profile",
      name: "Name",
      email: "Email",
      bio: "Bio",
      location: "Location",
      website: "Website",
      joined: "Joined",
      conversations: "Conversations",
      interests: "Interests",
      settings: "Settings",
      logout: "Log Out",
      save: "Save Changes",
      cancel: "Cancel",
      overview: "Overview",
      activity: "Activity",
      achievements: "Achievements",
      saved: "Saved",
      subscription: "Subscription",
      social: "Social Profiles",
      twitter: "Twitter",
      linkedin: "LinkedIn",
      github: "GitHub",
      stats: "Stats",
      tokens: "Tokens Used",
      questions: "Questions Asked",
      savedResponses: "Saved Responses",
      streak: "Current Streak",
      daysActive: "Days Active",
      topicsExplored: "Topics Explored",
      filesUploaded: "Files Uploaded",
      recentTopics: "Recent Topics",
      changeCover: "Change Cover",
      changeAvatar: "Change Avatar",
      personalInfo: "Personal Information",
      socialProfiles: "Social Profiles",
      accountPreferences: "Account Preferences",
      usageStatistics: "Usage Statistics",
      usageByTime: "Usage by Time",
      usageByDevice: "Usage by Device",
      recentActivity: "Recent Activity",
      viewAll: "View All",
      achievementsEarned: "Achievements Earned",
      achievementsProgress: "You've earned",
      outOf: "out of",
      savedChats: "Saved Chats",
      noSavedChats: "No saved chats yet",
      subscriptionDetails: "Subscription Details",
      currentPlan: "Current Plan",
      renewsOn: "Renews on",
      upgrade: "Upgrade Plan",
      usageLimits: "Usage Limits",
      downloadData: "Download Your Data",
      downloadDescription: "Get a copy of all your conversations and data",
      download: "Download Data",
      deleteAccount: "Delete Account",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      night: "Night",
      desktop: "Desktop",
      mobile: "Mobile",
      tablet: "Tablet",
      completed: "Completed",
      inProgress: "In Progress",
    },
    bn: {
      dashboard: "ড্যাশবোর্ড",
      profile: "প্রোফাইল",
      editProfile: "প্রোফাইল সম্পাদনা করুন",
      name: "নাম",
      email: "ইমেইল",
      bio: "বায়ো",
      location: "অবস্থান",
      website: "ওয়েবসাইট",
      joined: "যোগদান করেছেন",
      conversations: "কথোপকথন",
      interests: "আগ্রহ",
      settings: "সেটিংস",
      logout: "লগ আউট",
      save: "পরিবর্তনগুলি সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      overview: "ওভারভিউ",
      activity: "অ্যাক্টিভিটি",
      achievements: "অর্জন",
      saved: "সংরক্ষিত",
      subscription: "সাবস্ক্রিপশন",
      social: "সোশ্যাল প্রোফাইল",
      twitter: "টুইটার",
      linkedin: "লিংকডইন",
      github: "গিটহাব",
      stats: "পরিসংখ্যান",
      tokens: "ব্যবহৃত টোকেন",
      questions: "জিজ্ঞাসিত প্রশ্ন",
      savedResponses: "সংরক্ষিত উত্তর",
      streak: "বর্তমান স্ট্রিক",
      daysActive: "সক্রিয় দিন",
      topicsExplored: "অন্বেষিত বিষয়",
      filesUploaded: "আপলোড করা ফাইল",
      recentTopics: "সাম্প্রতিক বিষয়",
      changeCover: "কভার পরিবর্তন করুন",
      changeAvatar: "অবতার পরিবর্তন করুন",
      personalInfo: "ব্যক্তিগত তথ্য",
      socialProfiles: "সোশ্যাল প্রোফাইল",
      accountPreferences: "অ্যাকাউন্ট পছন্দসমূহ",
      usageStatistics: "ব্যবহারের পরিসংখ্যান",
      usageByTime: "সময় অনুসারে ব্যবহার",
      usageByDevice: "ডিভাইস অনুসারে ব্যবহার",
      recentActivity: "সাম্প্রতিক কার্যকলাপ",
      viewAll: "সব দেখুন",
      achievementsEarned: "অর্জিত অর্জন",
      achievementsProgress: "আপনি অর্জন করেছেন",
      outOf: "এর মধ্যে",
      savedChats: "সংরক্ষিত চ্যাট",
      noSavedChats: "এখনও কোন সংরক্ষিত চ্যাট নেই",
      subscriptionDetails: "সাবস্ক্রিপশন বিবরণ",
      currentPlan: "বর্তমান প্ল্যান",
      renewsOn: "নবায়ন হবে",
      upgrade: "প্ল্যান আপগ্রেড করুন",
      usageLimits: "ব্যবহারের সীমা",
      downloadData: "আপনার ডেটা ডাউনলোড করুন",
      downloadDescription: "আপনার সমস্ত কথোপকথন এবং ডেটার একটি কপি পান",
      download: "ডেটা ডাউনলোড করুন",
      deleteAccount: "অ্যাকাউন্ট মুছুন",
      morning: "সকাল",
      afternoon: "দুপুর",
      evening: "সন্ধ্যা",
      night: "রাত",
      desktop: "ডেস্কটপ",
      mobile: "মোবাইল",
      tablet: "ট্যাবলেট",
      completed: "সম্পন্ন",
      inProgress: "চলমান",
    },
  }

  const t = translations[language]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleSaveProfile = () => {
    // In a real app, you would save to a database or API
    setIsEditing(false)
  }

  const completedAchievements = profile.achievements.filter((a) => a.completed).length
  const totalAchievements = profile.achievements.length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header with user info */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 h-64">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 w-full">
            <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-lg">
              {profile.avatarUrl ? (
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              ) : (
                <AvatarFallback className="text-3xl bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400">
                  {getInitials(profile.name)}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{profile.name}</h1>
              <div className="flex flex-wrap gap-3 mt-2 text-white/80">
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span className="text-sm">{profile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span className="text-sm">
                    {t.joined}: {profile.joinDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-2 md:mt-0">
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Edit size={16} className="mr-2" />
                {t.editProfile}
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Settings size={16} className="mr-2" />
                {t.settings}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 -mt-6">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <div className="bg-white dark:bg-slate-800 rounded-t-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <BarChart3 size={16} className="mr-2" />
                {t.overview}
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <TrendingUp size={16} className="mr-2" />
                {t.activity}
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Sparkles size={16} className="mr-2" />
                {t.achievements}
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Bookmark size={16} className="mr-2" />
                {t.saved}
              </TabsTrigger>
              <TabsTrigger
                value="subscription"
                className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Crown size={16} className="mr-2" />
                {t.subscription}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <div className="bg-white dark:bg-slate-800 p-6 shadow-sm border-x border-b rounded-b-xl border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Section */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">{t.stats}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                          <p className="text-2xl font-bold">{profile.stats.conversations}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{t.conversations}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                          <p className="text-2xl font-bold">{profile.stats.streak}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{t.streak}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Globe className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                          <p className="text-2xl font-bold">{profile.stats.topicsExplored}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{t.topicsExplored}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <FileText className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                          <p className="text-2xl font-bold">{profile.stats.filesUploaded}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{t.filesUploaded}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">{t.recentActivity}</h2>
                      <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                        {t.viewAll}
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-end space-x-2 h-32">
                          {profile.activity.slice(-14).map((day, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm overflow-hidden">
                                <motion.div
                                  className="bg-blue-500 dark:bg-blue-600 w-full"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${(day.count / 10) * 100}%` }}
                                  transition={{ duration: 0.5, delay: index * 0.05 }}
                                  style={{ height: `${(day.count / 10) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs mt-1 text-slate-500 dark:text-slate-400">
                                {day.date.split("-")[2]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  {/* Bio Section */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>{t.bio}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400">{profile.bio}</p>
                    </CardContent>
                  </Card>

                  {/* Interests Section */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>{t.interests}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Profiles */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.social}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {profile.twitter && (
                        <a
                          href={`https://twitter.com/${profile.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Twitter size={18} className="text-[#1DA1F2]" />
                          <span>@{profile.twitter}</span>
                        </a>
                      )}
                      {profile.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${profile.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Linkedin size={18} className="text-[#0077B5]" />
                          <span>{profile.linkedin}</span>
                        </a>
                      )}
                      {profile.github && (
                        <a
                          href={`https://github.com/${profile.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Github size={18} />
                          <span>{profile.github}</span>
                        </a>
                      )}
                      {profile.website && (
                        <a
                          href={`https://${profile.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <Globe size={18} className="text-blue-500" />
                          <span>{profile.website}</span>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-0">
            <div className="bg-white dark:bg-slate-800 p-6 shadow-sm border-x border-b rounded-b-xl border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Usage Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.usageStatistics}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">{t.usageByTime}</h3>
                        <div className="space-y-3">
                          {profile.usageByTime.map((item, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>
                                  {language === "en"
                                    ? item.time
                                    : translations.bn[item.time.toLowerCase() as keyof typeof translations.bn]}
                                </span>
                                <span>{item.percentage}%</span>
                              </div>
                              <Progress value={item.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-3">{t.usageByDevice}</h3>
                        <div className="space-y-3">
                          {profile.usageByDevice.map((item, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>
                                  {language === "en"
                                    ? item.device
                                    : translations.bn[item.device.toLowerCase() as keyof typeof translations.bn]}
                                </span>
                                <span>{item.percentage}%</span>
                              </div>
                              <Progress value={item.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t.recentTopics}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profile.recentTopics.map((topic, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{topic.name}</span>
                            <span>{topic.count}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="bg-blue-500 dark:bg-blue-600 h-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(topic.count / profile.recentTopics[0].count) * 100}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Calendar */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>{t.recentActivity}</CardTitle>
                    <CardDescription>
                      {language === "en"
                        ? `Your activity over the past ${profile.activity.length} days`
                        : `গত ${profile.activity.length} দিনের আপনার কার্যকলাপ`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end space-x-1 h-40">
                      {profile.activity.map((day, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm overflow-hidden h-32 flex items-end">
                            <motion.div
                              className="bg-blue-500 dark:bg-blue-600 w-full"
                              initial={{ height: 0 }}
                              animate={{ height: `${(day.count / 10) * 100}%` }}
                              transition={{ duration: 0.5, delay: index * 0.05 }}
                            />
                          </div>
                          <span className="text-xs mt-1 text-slate-500 dark:text-slate-400">
                            {day.date.split("-")[2]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-0">
            <div className="bg-white dark:bg-slate-800 p-6 shadow-sm border-x border-b rounded-b-xl border-slate-200 dark:border-slate-700">
              <div className="mb-6">
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                          <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{t.achievementsEarned}</h3>
                          <p className="text-slate-600 dark:text-slate-400">
                            {t.achievementsProgress} {completedAchievements} {t.outOf} {totalAchievements}
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-48">
                        <Progress value={(completedAchievements / totalAchievements) * 100} className="h-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`${
                      achievement.completed
                        ? "border-green-100 dark:border-green-800"
                        : "border-slate-200 dark:border-slate-700 opacity-70"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            achievement.completed
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {achievement.completed ? <CheckCircle size={20} /> : achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
                          <Badge variant={achievement.completed ? "success" : "outline"} className="mt-2">
                            {achievement.completed ? t.completed : t.inProgress}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="mt-0">
            <div className="bg-white dark:bg-slate-800 p-6 shadow-sm border-x border-b rounded-b-xl border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4">{t.savedChats}</h2>

              {profile.savedChats.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>{t.noSavedChats}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.savedChats.map((chat) => (
                    <Card key={chat.id} className="hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{chat.title}</h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{chat.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{chat.preview}</p>
                        <div className="flex justify-between items-center mt-3">
                          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                            {language === "en" ? "View" : "দেখুন"}
                          </Button>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Share2 size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-red-500 dark:text-red-400"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="mt-0">
            <div className="bg-white dark:bg-slate-800 p-6 shadow-sm border-x border-b rounded-b-xl border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Subscription Details */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>{t.subscriptionDetails}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-6">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{t.currentPlan}</p>
                        <p className="text-xl font-semibold">{profile.subscriptionPlan}</p>
                        {profile.subscriptionRenews !== "N/A" && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {t.renewsOn} {profile.subscriptionRenews}
                          </p>
                        )}
                      </div>
                      <Button className="mt-4 md:mt-0">
                        <Crown size={16} className="mr-2" />
                        {t.upgrade}
                      </Button>
                    </div>

                    <h3 className="font-medium mb-3">{t.usageLimits}</h3>
                    <div className="space-y-4">
                      {profile.subscriptionFeatures.map((feature, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{feature.name}</span>
                            <span>{feature.used !== null ? `${feature.used} / ${feature.limit}` : feature.limit}</span>
                          </div>
                          {feature.used !== null && (
                            <Progress value={(feature.used / Number.parseInt(feature.limit)) * 100} className="h-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Account Actions */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.downloadData}</CardTitle>
                      <CardDescription>{t.downloadDescription}</CardHeader>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download size={16} className="mr-2" />
                        {t.download}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 dark:border-red-900">
                    <CardHeader>
                      <CardTitle className="text-red-600 dark:text-red-400">{t.deleteAccount}</CardTitle>
                      <CardDescription>
                        {language === "en" ? "This action cannot be undone" : "এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="destructive" className="w-full">
                        {t.deleteAccount}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

