"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Lock, Bell, Globe, Save, Upload, Trash2, Facebook, Twitter, Linkedin, Github } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Form states
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "AI enthusiast and tech lover. Interested in natural language processing and machine learning.",
    location: "Dhaka, Bangladesh",
    website: "johndoe.dev",
    twitter: "johndoe",
    linkedin: "johndoe",
    github: "johndoe",
    facebook: "johndoe",
    notifications: {
      email: true,
      marketing: false,
      updates: true,
    },
    language: "en",
  })

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: language === "en" ? "Profile updated" : "প্রোফাইল আপডেট করা হয়েছে",
        description:
          language === "en" ? "Your profile has been updated successfully" : "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে",
      })
    }, 1000)
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: language === "en" ? "Password updated" : "পাসওয়ার্ড আপডেট করা হয়েছে",
        description:
          language === "en" ? "Your password has been updated successfully" : "আপনার পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে",
      })
    }, 1000)
  }

  const translations = {
    en: {
      profile: "Profile",
      account: "Account",
      notifications: "Notifications",
      security: "Security",
      personalInfo: "Personal Information",
      personalInfoDesc: "Update your personal details and public profile",
      name: "Full Name",
      email: "Email Address",
      bio: "Bio",
      bioPlaceholder: "Write a short bio about yourself...",
      location: "Location",
      website: "Website",
      save: "Save Changes",
      cancel: "Cancel",
      socialProfiles: "Social Profiles",
      socialProfilesDesc: "Connect your social media accounts",
      twitter: "Twitter",
      linkedin: "LinkedIn",
      github: "GitHub",
      facebook: "Facebook",
      notificationPreferences: "Notification Preferences",
      notificationPreferencesDesc: "Manage how you receive notifications",
      emailNotifications: "Email Notifications",
      marketingEmails: "Marketing Emails",
      productUpdates: "Product Updates",
      languagePreference: "Language Preference",
      languagePreferenceDesc: "Set your preferred language",
      english: "English",
      bengali: "Bengali",
      changePassword: "Change Password",
      changePasswordDesc: "Update your password to keep your account secure",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      updatePassword: "Update Password",
      deleteAccount: "Delete Account",
      deleteAccountDesc: "Permanently delete your account and all of your data",
      deleteAccountWarning:
        "This action cannot be undone. Once you delete your account, all of your data will be permanently removed.",
      deleteAccountButton: "Delete Account",
      uploadPhoto: "Upload Photo",
    },
    bn: {
      profile: "প্রোফাইল",
      account: "অ্যাকাউন্ট",
      notifications: "বিজ্ঞপ্তি",
      security: "নিরাপত্তা",
      personalInfo: "ব্যক্তিগত তথ্য",
      personalInfoDesc: "আপনার ব্যক্তিগত বিবরণ এবং পাবলিক প্রোফাইল আপডেট করুন",
      name: "পুরো নাম",
      email: "ইমেইল ঠিকানা",
      bio: "বায়ো",
      bioPlaceholder: "নিজের সম্পর্কে একটি সংক্ষিপ্ত বায়ো লিখুন...",
      location: "অবস্থান",
      website: "ওয়েবসাইট",
      save: "পরিবর্তনগুলি সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      socialProfiles: "সোশ্যাল প্রোফাইল",
      socialProfilesDesc: "আপনার সোশ্যাল মিডিয়া অ্যাকাউন্টগুলি সংযুক্ত করুন",
      twitter: "টুইটার",
      linkedin: "লিংকডইন",
      github: "গিটহাব",
      facebook: "ফেসবুক",
      notificationPreferences: "বিজ্ঞপ্তি পছন্দসমূহ",
      notificationPreferencesDesc: "কীভাবে আপনি বিজ্ঞপ্তি পাবেন তা পরিচালনা করুন",
      emailNotifications: "ইমেইল বিজ্ঞপ্তি",
      marketingEmails: "মার্কেটিং ইমেইল",
      productUpdates: "পণ্য আপডেট",
      languagePreference: "ভাষা পছন্দ",
      languagePreferenceDesc: "আপনার পছন্দসই ভাষা সেট করুন",
      english: "ইংরেজি",
      bengali: "বাংলা",
      changePassword: "পাসওয়ার্ড পরিবর্তন করুন",
      changePasswordDesc: "আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে আপনার পাসওয়ার্ড আপডেট করুন",
      currentPassword: "বর্তমান পাসওয়ার্ড",
      newPassword: "নতুন পাসওয়ার্ড",
      confirmPassword: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
      updatePassword: "পাসওয়ার্ড আপডেট করুন",
      deleteAccount: "অ্যাকাউন্ট মুছুন",
      deleteAccountDesc: "আপনার অ্যাকাউন্ট এবং আপনার সমস্ত ডেটা স্থায়ীভাবে মুছুন",
      deleteAccountWarning: "এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। একবার আপনার অ্যাকাউন্ট মুছে ফেললে, আপনার সমস্ত ডেটা স্থায়ীভাবে সরানো হবে।",
      deleteAccountButton: "অ্যাকাউন্ট মুছুন",
      uploadPhoto: "ছবি আপলোড করুন",
    },
  }

  const t = translations[language]

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && <DashboardSidebar language={language} activePage="profile" />}

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
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <Avatar className="h-20 w-20 border-4 border-background">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profile.name} />
                  <AvatarFallback className="text-xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Upload size={14} />
                  <span className="sr-only">{t.uploadPhoto}</span>
                </Button>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="account" className="text-sm">
                  <User size={16} className="mr-2" />
                  {t.account}
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-sm">
                  <Bell size={16} className="mr-2" />
                  {t.notifications}
                </TabsTrigger>
                <TabsTrigger value="security" className="text-sm">
                  <Lock size={16} className="mr-2" />
                  {t.security}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.personalInfo}</CardTitle>
                    <CardDescription>{t.personalInfoDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.name}</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">{t.bio}</Label>
                        <Textarea
                          id="bio"
                          placeholder={t.bioPlaceholder}
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">{t.location}</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">{t.website}</Label>
                          <Input
                            id="website"
                            value={profile.website}
                            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">{t.cancel}</Button>
                    <Button onClick={handleProfileUpdate} disabled={isLoading}>
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
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.socialProfiles}</CardTitle>
                    <CardDescription>{t.socialProfilesDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="twitter" className="flex items-center gap-2">
                            <Twitter size={16} className="text-[#1DA1F2]" />
                            {t.twitter}
                          </Label>
                          <Input
                            id="twitter"
                            value={profile.twitter}
                            onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                            placeholder="username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin" className="flex items-center gap-2">
                            <Linkedin size={16} className="text-[#0077B5]" />
                            {t.linkedin}
                          </Label>
                          <Input
                            id="linkedin"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                            placeholder="username"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="github" className="flex items-center gap-2">
                            <Github size={16} />
                            {t.github}
                          </Label>
                          <Input
                            id="github"
                            value={profile.github}
                            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                            placeholder="username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="facebook" className="flex items-center gap-2">
                            <Facebook size={16} className="text-[#1877F2]" />
                            {t.facebook}
                          </Label>
                          <Input
                            id="facebook"
                            value={profile.facebook}
                            onChange={(e) => setProfile({ ...profile, facebook: e.target.value })}
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleProfileUpdate} disabled={isLoading}>
                      <Save size={16} className="mr-2" />
                      {t.save}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.notificationPreferences}</CardTitle>
                    <CardDescription>{t.notificationPreferencesDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">{t.emailNotifications}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Receive notifications via email" : "ইমেইলের মাধ্যমে বিজ্ঞপ্তি পান"}
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={profile.notifications.email}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            notifications: { ...profile.notifications, email: checked },
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">{t.marketingEmails}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Receive marketing emails and offers" : "মার্কেটিং ইমেইল এবং অফার পান"}
                        </p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={profile.notifications.marketing}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            notifications: { ...profile.notifications, marketing: checked },
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="product-updates">{t.productUpdates}</Label>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? "Receive updates about product changes" : "পণ্য পরিবর্তন সম্পর্কে আপডেট পান"}
                        </p>
                      </div>
                      <Switch
                        id="product-updates"
                        checked={profile.notifications.updates}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            notifications: { ...profile.notifications, updates: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleProfileUpdate} disabled={isLoading}>
                      <Save size={16} className="mr-2" />
                      {t.save}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.languagePreference}</CardTitle>
                    <CardDescription>{t.languagePreferenceDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="english"
                          name="language"
                          value="en"
                          checked={profile.language === "en"}
                          onChange={() => setProfile({ ...profile, language: "en" })}
                          className="h-4 w-4 text-primary"
                        />
                        <Label htmlFor="english" className="flex items-center gap-2">
                          <Globe size={16} />
                          {t.english}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="bengali"
                          name="language"
                          value="bn"
                          checked={profile.language === "bn"}
                          onChange={() => setProfile({ ...profile, language: "bn" })}
                          className="h-4 w-4 text-primary"
                        />
                        <Label htmlFor="bengali" className="flex items-center gap-2">
                          <Globe size={16} />
                          {t.bengali}
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleProfileUpdate} disabled={isLoading}>
                      <Save size={16} className="mr-2" />
                      {t.save}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.changePassword}</CardTitle>
                    <CardDescription>{t.changePasswordDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">{t.currentPassword}</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">{t.newPassword}</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handlePasswordUpdate} disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          <span>{language === "en" ? "Updating..." : "আপডেট করা হচ্ছে..."}</span>
                        </div>
                      ) : (
                        <>
                          <Lock size={16} className="mr-2" />
                          {t.updatePassword}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-red-200 dark:border-red-900">
                  <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400">{t.deleteAccount}</CardTitle>
                    <CardDescription>{t.deleteAccountDesc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t.deleteAccountWarning}</p>
                    <Button variant="destructive">
                      <Trash2 size={16} className="mr-2" />
                      {t.deleteAccountButton}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

