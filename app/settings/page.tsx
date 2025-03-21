"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Moon, Sun, Globe, Bell, Shield, Save, Laptop, Sparkles, Zap, Briefcase, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Settings states
  const [settings, setSettings] = useState({
    appearance: {
      theme: theme || "system",
      fontSize: "medium",
      reducedMotion: false,
    },
    language: language,
    notifications: {
      email: true,
      browser: true,
      marketing: false,
    },
    privacy: {
      saveHistory: true,
      shareUsageData: true,
      allowCookies: true,
    },
    aiPreferences: {
      model: "balanced",
      webSearch: true,
      suggestionsEnabled: true,
    },
  })

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "bn" : "en"
    setLanguage(newLanguage)
    setSettings({ ...settings, language: newLanguage })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: language === "en" ? "Settings updated" : "সেটিংস আপডেট করা হয়েছে",
        description:
          language === "en" ? "Your settings have been updated successfully" : "আপনার সেটিংস সফলভাবে আপডেট করা হয়েছে",
      })
    }, 1000)
  }

  const translations = {
    en: {
      settings: "Settings",
      appearance: "Appearance",
      language: "Language",
      notifications: "Notifications",
      privacy: "Privacy & Security",
      aiPreferences: "AI Preferences",
      theme: "Theme",
      system: "System",
      light: "Light",
      dark: "Dark",
      fontSize: "Font Size",
      small: "Small",
      medium: "Medium",
      large: "Large",
      reducedMotion: "Reduced Motion",
      reducedMotionDesc: "Reduce animations and motion effects",
      languagePreference: "Language Preference",
      english: "English",
      bengali: "Bengali",
      emailNotifications: "Email Notifications",
      emailNotificationsDesc: "Receive notifications via email",
      browserNotifications: "Browser Notifications",
      browserNotificationsDesc: "Receive notifications in your browser",
      marketingEmails: "Marketing Emails",
      marketingEmailsDesc: "Receive marketing emails and offers",
      saveHistory: "Save Chat History",
      saveHistoryDesc: "Save your chat history for future reference",
      shareUsageData: "Share Usage Data",
      shareUsageDataDesc: "Help us improve by sharing anonymous usage data",
      allowCookies: "Allow Cookies",
      allowCookiesDesc: "Allow cookies to enhance your experience",
      aiModel: "AI Model Preference",
      balanced: "Balanced",
      professional: "Professional",
      creative: "Creative",
      educational: "Educational",
      webSearch: "Web Search",
      webSearchDesc: "Allow AI to search the web for up-to-date information",
      suggestions: "Smart Suggestions",
      suggestionsDesc: "Show smart suggestions based on your conversations",
      save: "Save Changes",
      cancel: "Cancel",
      appearanceDesc: "Customize the look and feel of the application",
      languageDesc: "Set your preferred language",
      notificationsDesc: "Manage how you receive notifications",
      privacyDesc: "Control your privacy and security settings",
      aiPreferencesDesc: "Customize your AI assistant experience",
    },
    bn: {
      settings: "সেটিংস",
      appearance: "অ্যাপিয়ারেন্স",
      language: "ভাষা",
      notifications: "বিজ্ঞপ্তি",
      privacy: "গোপনীয়তা এবং নিরাপত্তা",
      aiPreferences: "এআই পছন্দসমূহ",
      theme: "থিম",
      system: "সিস্টেম",
      light: "লাইট",
      dark: "ডার্ক",
      fontSize: "ফন্ট সাইজ",
      small: "ছোট",
      medium: "মাঝারি",
      large: "বড়",
      reducedMotion: "কম মোশন",
      reducedMotionDesc: "অ্যানিমেশন এবং মোশন ইফেক্ট কমান",
      languagePreference: "ভাষা পছন্দ",
      english: "ইংরেজি",
      bengali: "বাংলা",
      emailNotifications: "ইমেইল বিজ্ঞপ্তি",
      emailNotificationsDesc: "ইমেইলের মাধ্যমে বিজ্ঞপ্তি পান",
      browserNotifications: "ব্রাউজার বিজ্ঞপ্তি",
      browserNotificationsDesc: "আপনার ব্রাউজারে বিজ্ঞপ্তি পান",
      marketingEmails: "মার্কেটিং ইমেইল",
      marketingEmailsDesc: "মার্কেটিং ইমেইল এবং অফার পান",
      saveHistory: "চ্যাট ইতিহাস সংরক্ষণ করুন",
      saveHistoryDesc: "ভবিষ্যতে রেফারেন্সের জন্য আপনার চ্যাট ইতিহাস সংরক্ষণ করুন",
      shareUsageData: "ব্যবহারের ডেটা শেয়ার করুন",
      shareUsageDataDesc: "বেনামী ব্যবহারের ডেটা শেয়ার করে আমাদের উন্নতি করতে সাহায্য করুন",
      allowCookies: "কুকিজ অনুমতি দিন",
      allowCookiesDesc: "আপনার অভিজ্ঞতা উন্নত করতে কুকিজ অনুমতি দিন",
      aiModel: "এআই মডেল পছন্দ",
      balanced: "ভারসাম্যপূর্ণ",
      professional: "পেশাদার",
      creative: "সৃজনশীল",
      educational: "শিক্ষামূলক",
      webSearch: "ওয়েব সার্চ",
      webSearchDesc: "আপ-টু-ডেট তথ্যের জন্য এআই কে ওয়েব সার্চ করতে দিন",
      suggestions: "স্মার্ট সাজেশন",
      suggestionsDesc: "আপনার কথোপকথনের উপর ভিত্তি করে স্মার্ট সাজেশন দেখান",
      save: "পরিবর্তনগুলি সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      appearanceDesc: "অ্যাপ্লিকেশনের চেহারা এবং অনুভূতি কাস্টমাইজ করুন",
      languageDesc: "আপনার পছন্দসই ভাষা সেট করুন",
      notificationsDesc: "কীভাবে আপনি বিজ্ঞপ্তি পাবেন তা পরিচালনা করুন",
      privacyDesc: "আপনার গোপনীয়তা এবং নিরাপত্তা সেটিংস নিয়ন্ত্রণ করুন",
      aiPreferencesDesc: "আপনার এআই সহকারী অভিজ্ঞতা কাস্টমাইজ করুন",
    },
  }

  const t = translations[language]

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && <DashboardSidebar language={language} activePage="settings" />}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardHeader
          language={language}
          toggleLanguage={toggleLanguage}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{t.settings}</h1>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Manage your application settings and preferences"
                  : "আপনার অ্যাপ্লিকেশন সেটিংস এবং পছন্দসমূহ পরিচালনা করুন"}
              </p>
            </div>

            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="appearance" className="text-sm">
                  <Sun size={16} className="mr-2" />
                  {t.appearance}
                </TabsTrigger>
                <TabsTrigger value="language" className="text-sm">
                  <Globe size={16} className="mr-2" />
                  {t.language}
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-sm">
                  <Bell size={16} className="mr-2" />
                  {t.notifications}
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-sm">
                  <Shield size={16} className="mr-2" />
                  {t.privacy}
                </TabsTrigger>
                <TabsTrigger value="ai-preferences" className="text-sm">
                  <Sparkles size={16} className="mr-2" />
                  {t.aiPreferences}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.appearance}</CardTitle>
                    <CardDescription>{t.appearanceDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>{t.theme}</Label>
                      <RadioGroup
                        defaultValue={settings.appearance.theme}
                        onValueChange={(value) => {
                          setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, theme: value },
                          })
                          setTheme(value)
                        }}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="system" id="system" />
                          <Label htmlFor="system" className="flex items-center gap-2">
                            <Laptop size={16} />
                            {t.system}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="light" id="light" />
                          <Label htmlFor="light" className="flex items-center gap-2">
                            <Sun size={16} />
                            {t.light}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dark" id="dark" />
                          <Label htmlFor="dark" className="flex items-center gap-2">
                            <Moon size={16} />
                            {t.dark}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>{t.fontSize}</Label>
                      <RadioGroup
                        defaultValue={settings.appearance.fontSize}
                        onValueChange={(value) =>
                          setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, fontSize: value },
                          })
                        }
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="small" id="small" />
                          <Label htmlFor="small">{t.small}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">{t.medium}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="large" id="large" />
                          <Label htmlFor="large">{t.large}</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reduced-motion">{t.reducedMotion}</Label>
                        <p className="text-sm text-muted-foreground">{t.reducedMotionDesc}</p>
                      </div>
                      <Switch
                        id="reduced-motion"
                        checked={settings.appearance.reducedMotion}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            appearance: { ...settings.appearance, reducedMotion: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="language" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.languagePreference}</CardTitle>
                    <CardDescription>{t.languageDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      defaultValue={settings.language}
                      onValueChange={(value) => {
                        setSettings({ ...settings, language: value as "en" | "bn" })
                        setLanguage(value as "en" | "bn")
                      }}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                        <RadioGroupItem value="en" id="english" />
                        <Label htmlFor="english" className="flex items-center gap-2">
                          <Globe size={16} />
                          {t.english}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                        <RadioGroupItem value="bn" id="bengali" />
                        <Label htmlFor="bengali" className="flex items-center gap-2">
                          <Globe size={16} />
                          {t.bengali}
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.notifications}</CardTitle>
                    <CardDescription>{t.notificationsDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">{t.emailNotifications}</Label>
                        <p className="text-sm text-muted-foreground">{t.emailNotificationsDesc}</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, email: checked },
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="browser-notifications">{t.browserNotifications}</Label>
                        <p className="text-sm text-muted-foreground">{t.browserNotificationsDesc}</p>
                      </div>
                      <Switch
                        id="browser-notifications"
                        checked={settings.notifications.browser}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, browser: checked },
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">{t.marketingEmails}</Label>
                        <p className="text-sm text-muted-foreground">{t.marketingEmailsDesc}</p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={settings.notifications.marketing}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, marketing: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.privacy}</CardTitle>
                    <CardDescription>{t.privacyDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="save-history">{t.saveHistory}</Label>
                        <p className="text-sm text-muted-foreground">{t.saveHistoryDesc}</p>
                      </div>
                      <Switch
                        id="save-history"
                        checked={settings.privacy.saveHistory}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, saveHistory: checked },
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="share-usage-data">{t.shareUsageData}</Label>
                        <p className="text-sm text-muted-foreground">{t.shareUsageDataDesc}</p>
                      </div>
                      <Switch
                        id="share-usage-data"
                        checked={settings.privacy.shareUsageData}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, shareUsageData: checked },
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-cookies">{t.allowCookies}</Label>
                        <p className="text-sm text-muted-foreground">{t.allowCookiesDesc}</p>
                      </div>
                      <Switch
                        id="allow-cookies"
                        checked={settings.privacy.allowCookies}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            privacy: { ...settings.privacy, allowCookies: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.aiPreferences}</CardTitle>
                    <CardDescription>{t.aiPreferencesDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>{t.aiModel}</Label>
                      <RadioGroup
                        defaultValue={settings.aiPreferences.model}
                        onValueChange={(value) =>
                          setSettings({
                            ...settings,
                            aiPreferences: { ...settings.aiPreferences, model: value },
                          })
                        }
                        className="grid grid-cols-1 md:grid-cols-2 gap-2"
                      >
                        <div className="flex items-start space-x-2 p-3 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-800">
                          <RadioGroupItem value="balanced" id="balanced" className="mt-1" />
                          <div>
                            <Label htmlFor="balanced" className="flex items-center gap-2">
                              <Zap size={16} className="text-blue-500" />
                              {t.balanced}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === "en"
                                ? "A good balance of creativity and accuracy"
                                : "সৃজনশীলতা এবং নির্ভুলতার একটি ভাল ভারসাম্য"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 p-3 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-800">
                          <RadioGroupItem value="professional" id="professional" className="mt-1" />
                          <div>
                            <Label htmlFor="professional" className="flex items-center gap-2">
                              <Briefcase size={16} className="text-blue-500" />
                              {t.professional}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === "en" ? "Formal and precise responses" : "আনুষ্ঠানিক এবং সঠিক প্রতিক্রিয়া"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 p-3 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-800">
                          <RadioGroupItem value="creative" id="creative" className="mt-1" />
                          <div>
                            <Label htmlFor="creative" className="flex items-center gap-2">
                              <Sparkles size={16} className="text-blue-500" />
                              {t.creative}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === "en"
                                ? "More creative and expressive responses"
                                : "আরও সৃজনশীল এবং অভিব্যক্তিপূর্ণ প্রতিক্রিয়া"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 p-3 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-800">
                          <RadioGroupItem value="educational" id="educational" className="mt-1" />
                          <div>
                            <Label htmlFor="educational" className="flex items-center gap-2">
                              <BookOpen size={16} className="text-blue-500" />
                              {t.educational}
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === "en"
                                ? "Explanatory and educational responses"
                                : "ব্যাখ্যামূলক এবং শিক্ষামূলক প্রতিক্রিয়া"}
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="web-search">{t.webSearch}</Label>
                        <p className="text-sm text-muted-foreground">{t.webSearchDesc}</p>
                      </div>
                      <Switch
                        id="web-search"
                        checked={settings.aiPreferences.webSearch}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            aiPreferences: { ...settings.aiPreferences, webSearch: checked },
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="suggestions">{t.suggestions}</Label>
                        <p className="text-sm text-muted-foreground">{t.suggestionsDesc}</p>
                      </div>
                      <Switch
                        id="suggestions"
                        checked={settings.aiPreferences.suggestionsEnabled}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            aiPreferences: { ...settings.aiPreferences, suggestionsEnabled: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end mt-6">
              <Button variant="outline" className="mr-2">
                {t.cancel}
              </Button>
              <Button onClick={handleSettingsUpdate} disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{language === "en" ? "Saving..." : "সংরক্ষণ করা হচ্ছে..."}</span>
                  </div>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    {t.save}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

